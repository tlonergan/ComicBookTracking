using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web.Mvc;
using ComicBook.Models;
using Microsoft.Practices.EnterpriseLibrary.Common.Utility;

//TODO: Preload Issue # fields with incremented number
//TODO: Book/Series Editor

namespace ComicBook.Controllers
{
    public class BookController : Controller
    {
        public ActionResult Index()
        {
            return View("BookSearch");
        }

        public JsonResult GetAvailableBooks()
        {
            var dataStore = new ComicBookEntities();
            List<Book> books = dataStore.Books.Where(b => !b.BookInventories.Any() && !b.WantLists.Any()).ToList();
            var availableBooks = new List<Models.Book>();
            foreach (Book book in books)
            {
                Models.Book availableBook = book.MapBook();
                availableBooks.Add(availableBook);
            }

            return Json(availableBooks.OrderBy(b => b.DisplayName), JsonRequestBehavior.AllowGet);
        }

        public JsonResult LoadBookSearch()
        {
            var dataStore = new ComicBookEntities();
            List<Models.Location> locations = dataStore.Locations.ToList().MapLocations();
            List<KeyValuePair<int, string>> wantStatuses = dataStore.WantListStatus.ToList().MapWantStatuses();
            List<KeyValuePair<int, string>> inventoryStatus =
                dataStore.InventoryStatus.ToList().Select(s => new KeyValuePair<int, string>(s.Id, s.Status)).ToList();

            return Json(new
                {
                    locations,
                    wantStatuses,
                    inventoryStatus
                },
                        JsonRequestBehavior.AllowGet);
        }

        public void SaveBook(Models.Book bookToSave)
        {
            var dataStore = new ComicBookEntities();
            try
            {
                DbSet<Book> books = dataStore.Books;
                Book book = bookToSave.MapBook();

                Book existingBook = books.SingleOrDefault(b => b.Id == book.Id);
                if (existingBook == null)
                {
                    if (!bookToSave.IsSpecialCover
                        && books.Any(b => b.SeriesId == bookToSave.Series.Id && b.Issue == bookToSave.Issue))
                        throw new Exception("Book exists");
                    books.Add(book);

                    Want want = bookToSave.Want;
                    if (want != null && want.StatusId != 0)
                    {
                        dataStore.WantLists.Add(new WantList
                            {
                                BookId = book.Id,
                                WantListStatusId = want.StatusId
                            });
                    }

                    Models.Location location = bookToSave.Location;
                    if (location != null && location.Id != 0)
                    {
                        dataStore.BookInventories.Add(new BookInventory
                            {
                                BookId = book.Id,
                                LocationId = location.Id,
                                InventoryStatusId = (int) bookToSave.Status
                            });
                    }
                }
                else
                {
                    Want want = bookToSave.Want;

                    existingBook.Id = book.Id;
                    existingBook.IsSpecialCover = book.IsSpecialCover;
                    existingBook.Notes = book.Notes;
                    existingBook.Issue = book.Issue;
                    existingBook.BookInventories.ForEach(
                        bi => bi.InventoryStatusId = (int)bookToSave.Status);
                    existingBook.WantLists.ForEach(wl => wl.WantListStatusId = want.StatusId);
                }
                dataStore.SaveChanges();

                var groups =
                    dataStore.Books.Where(
                        b =>
                        !b.IsSpecialCover ||
                        (b.IsSpecialCover &&
                         dataStore.Books.Any(
                             b2 =>
                             b2.Notes == b.Notes && b2.SeriesId == b.SeriesId && b2.Issue == b.Issue && b2.Id != b.Id)))
                             .GroupBy(b => new {b.SeriesId, b.Issue}).ToList();

                foreach (var group in groups)
                {
                    if (group.Count() < 2)
                        continue;

                    List<Book> removableBooks =
                        group.Where(
                            b =>
                            (b.BookInventories == null || !b.BookInventories.Any()) ||
                            (b.WantLists == null || !b.WantLists.Any())).ToList();

                    if (group.Count() == removableBooks.Count())
                        removableBooks.Remove(removableBooks.First());

                    removableBooks.ForEach(b => books.Remove(b));
                }

                dataStore.SaveChanges();
            }
            finally
            {
                dataStore.Dispose();
            }
        }

        public JsonResult SearchBooks(string seriesName, int? issue, int? locationId)
        {
            var dataStore = new ComicBookEntities();
            try
            {
                IQueryable<Book> books = dataStore.Books.AsQueryable();
                var locations = new List<Models.Location>();
                List<Location> l = dataStore.Locations.ToList();
                foreach (Location location in l)
                {
                    locations.Add(location.MapLocation());
                }

                List<KeyValuePair<int, string>> statuses =
                    dataStore.InventoryStatus.ToList()
                             .Select(s => new KeyValuePair<int, string>(s.Id, s.Status))
                             .ToList();

                List<KeyValuePair<int, string>> wantStatuses = dataStore.WantListStatus.ToList().MapWantStatuses();

                if (!string.IsNullOrEmpty(seriesName))
                    books = books.Where(b => b.Series.Name.Contains(seriesName));
                if (issue.HasValue)
                    books = books.Where(b => b.Issue == issue.Value);
                if (locationId.HasValue)
                    books = books.Where(b => b.BookInventories.Any(bi => bi.LocationId == locationId));

                var returnableBooks = new List<Models.Book>();
                foreach (Book book in books)
                {
                    Models.Book returnableBook = book.MapBook();

                    IQueryable<Location> bookLocations =
                        dataStore.BookInventories.Where(bi => bi.BookId == returnableBook.Id).Select(bi => bi.Location);

                    returnableBook.Location =
                        bookLocations.SingleOrDefault().MapLocation();
                    returnableBook.Want =
                        dataStore.WantLists.SingleOrDefault(wl => wl.BookId == returnableBook.Id).MapWant();
                    returnableBook.NextLocation = GetSuggestedLocationMove(book, dataStore).MapLocation();

                    returnableBooks.Add(returnableBook);
                }

                returnableBooks = returnableBooks.OrderBy(b => b.Series.Name).ThenByDescending(b => b.Issue).ToList();

                return Json(new
                    {
                        returnableBooks,
                        locations,
                        InventoryStatus = statuses,
                        wantStatuses
                    },
                            JsonRequestBehavior.AllowGet);
            }
            finally
            {
                dataStore.Dispose();
            }
        }

        private Location GetSuggestedLocationMove(Book book, ComicBookEntities dataStore)
        {
            BookInventory currentInventory = book.BookInventories.SingleOrDefault();
            if (currentInventory == null)
                return dataStore.Locations.Single(l => l.Id == 6);

            Location currentLocation = currentInventory.Location;

            Location suggestedLocation = GetReadSuggestedLocation(book, currentInventory, currentLocation, dataStore);

            if (suggestedLocation == null)
                suggestedLocation = GetUnreadSuggestedLocation(book, currentInventory, currentLocation, dataStore);

            return suggestedLocation;
        }

        public Location GetReadSuggestedLocation(Book book,
                                                 BookInventory currentInventory,
                                                 Location currentLocation,
                                                 ComicBookEntities dataStore)
        {
            //ReadLogic
            const int readStatusId = (int) InventoryStatus.Read;
            if (currentInventory.InventoryStatusId != readStatusId && currentLocation.Id != 7)
                return null;

            IQueryable<Location> readLocations =
                dataStore.Locations.Where(
                    l =>
                    l.BookInventories.Any(bi => bi.Book.SeriesId == book.SeriesId && bi.InventoryStatusId == 2)
                    && (l.Id != 7 && l.Id != currentLocation.Id));

            return readLocations.OrderByDescending(l => l.BookInventories.Count).FirstOrDefault();
        }

        public Location GetUnreadSuggestedLocation(Book book,
                                                   BookInventory currentInventory,
                                                   Location currentLocation,
                                                   ComicBookEntities dataStore)
        {
            //Presort Logic
            const int unreadStatusId = (int) InventoryStatus.Unread;
            if (currentLocation.Id != 6 && currentInventory.InventoryStatusId == unreadStatusId)
                return null;

            int? nextLocationId = currentLocation.NextLocationId;

            Location defaultLocation = null;
            if (currentLocation.NextLocationId.HasValue)
                defaultLocation = dataStore.Locations.Single(l => l.Id == nextLocationId.Value);

            if (currentInventory.InventoryStatusId != unreadStatusId)
                return defaultLocation;

            List<Book> unreadBooksInSeries =
                dataStore.BookInventories.Where(
                    bi =>
                    bi.Book.SeriesId == book.SeriesId && bi.Book.Issue < book.Issue &&
                    bi.InventoryStatusId == unreadStatusId).
                          Select(bi => bi.Book).ToList();

            if (!unreadBooksInSeries.Any())
                return defaultLocation;

            Book maxIssueBook =
                unreadBooksInSeries.Where(b => b.SeriesId == book.SeriesId && b.Issue < book.Issue)
                                   .OrderByDescending(b => b.Issue)
                                   .FirstOrDefault();

            if (maxIssueBook == null || !maxIssueBook.BookInventories.Any())
                return defaultLocation;

            Location lastIssueLocation = maxIssueBook.BookInventories.First().Location;

            if (lastIssueLocation.NextLocationId.HasValue && lastIssueLocation.Id != 6)
                return dataStore.Locations.Single(l => l.Id == lastIssueLocation.NextLocationId.Value);

            return null;
        }

        public Location BalanceInventory(Location perspectiveLocation, ComicBookEntities dataStore)
        {
            int currentQuantity = perspectiveLocation.BookInventories.Count;
            if (currentQuantity < 60)
                return perspectiveLocation;

            if (!perspectiveLocation.NextLocationId.HasValue)
                return null;

            Location newLocation = dataStore.Locations.Single(l => l.Id == perspectiveLocation.NextLocationId.Value);
            return BalanceInventory(newLocation, dataStore);
        }

        [HttpPost]
        public void MoveBook(int bookId, int locationId)
        {
            var dataStore = new ComicBookEntities();
            BookInventory inventory = dataStore.BookInventories.SingleOrDefault(b => b.BookId == bookId);
            if (inventory == null)
            {
                inventory = new BookInventory
                    {
                        InventoryStatusId = (int) InventoryStatus.Unread,
                        LocationId = locationId,
                        BookId = bookId
                    };

                dataStore.BookInventories.Add(inventory);
                dataStore.SaveChanges();
                return;
            }

            inventory.LocationId = locationId;
            dataStore.SaveChanges();
        }

        [HttpPost]
        public void ReadBook(int bookId)
        {
            var dataStore = new ComicBookEntities();
            BookInventory inventory = dataStore.BookInventories.Single(bi => bi.BookId == bookId);
            if (inventory.InventoryStatusId != (int) InventoryStatus.Unread)
                throw new Exception("Book is not unread");

            inventory.InventoryStatusId = (int) InventoryStatus.Read;
            inventory.LocationId = 7; //ReadPresort

            dataStore.SaveChanges();
        }

        [HttpGet]
        public JsonResult GetBookCount()
        {
            var dataStore = new ComicBookEntities();
            List<Location> locations = dataStore.Locations.ToList();
            List<KeyValuePair<string, int>> results =
                locations.Select(l => new KeyValuePair<string, int>(l.Name, l.BookInventories.Count)).ToList();
            return Json(results, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public void MoveLocationsUp()
        {
            var dataStore = new ComicBookEntities();
            List<Location> locations =
                dataStore.Locations.Where(l => l.Id != 6 && dataStore.Locations.Any(l2 => l2.NextLocationId == l.Id))
                         .ToList();

            Location finalLocation = null;
            foreach (Location location in locations)
            {
                if (locations.All(l => l.NextLocationId != location.Id))
                    finalLocation = location;
            }

            if (finalLocation == null)
                return;
            if (finalLocation.BookInventories.Any())
                return;

            foreach (Location location in locations)
            {
                if (location.Id == finalLocation.Id)
                    continue;

                Location nextStepLocation = locations.SingleOrDefault(l => l.NextLocationId == location.Id);
                if (nextStepLocation == null)
                    continue;

                location.BookInventories.ForEach(bi => bi.LocationId = nextStepLocation.Id);
            }

            dataStore.SaveChanges();
        }

        [HttpGet]
        public JsonResult GetSurroundingBooks(int bookId)
        {
            var dataStore = new ComicBookEntities();
            Book currentBook = dataStore.Books.Single(b => b.Id == bookId);

            int numberToPull = 3;

            List<Book> surroundingBooks =
                dataStore.Books.Where(b => b.SeriesId == currentBook.SeriesId && b.Issue <= currentBook.Issue)
                         .OrderByDescending(
                             b => b.Issue).Take(numberToPull).ToList();
            surroundingBooks.AddRange(
                dataStore.Books.Where(b => b.SeriesId == currentBook.SeriesId && b.Issue > currentBook.Issue).OrderBy(
                    b => b.Issue).Take(numberToPull).ToList());

            var books = new List<Models.Book>();
            foreach (Book surroundingBook in surroundingBooks)
            {
                Models.Book book = surroundingBook.MapBook();
                book.Location =
                    dataStore.BookInventories.Where(bi => bi.BookId == book.Id)
                             .Select(bi => bi.Location)
                             .SingleOrDefault()
                             .
                              MapLocation();
                books.Add(book);
            }

            return Json(new {books = books.OrderBy(b => b.Issue), bookId}, JsonRequestBehavior.AllowGet);
        }
    }
}