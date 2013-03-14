using System.Collections.Generic;
using System.Linq;
using System.Web.Mvc;
using ComicBook.Models;

namespace ComicBook.Controllers
{
    public class WantListController : Controller
    {
        public ActionResult Index()
        {
            return View("WantList");
        }

        [HttpGet]
        public JsonResult GetWantLists()
        {
            var dataStore = new ComicBookEntities();
            List<WantListStatu> wantLists = dataStore.WantListStatus.Where(wls => wls.Status != "Recieved").ToList();

            var wants = new Dictionary<int, List<Want>>();
            foreach (WantListStatu wantItem in wantLists)
            {
                if (!wants.ContainsKey(wantItem.Id))
                    wants.Add(wantItem.Id, new List<Want>());

                foreach (WantList wl in wantItem.WantLists)
                {
                    Book b = wl.Book;
                    Series s = b.Series;
                    var want = new Want
                        {
                            Book = new Models.Book
                                {
                                    Id = b.Id,
                                    IsSpecialCover = b.IsSpecialCover,
                                    Issue = b.Issue,
                                    Notes = b.Notes,
                                    Series = new Models.Series
                                        {
                                            Id = s.Id,
                                            Name = s.Name,
                                            Publisher = new Models.Publisher
                                                {
                                                    Id = s.Publisher.Id,
                                                    Name = s.Publisher.Name
                                                }
                                        }
                                },
                            Id = wl.Id,
                            Notes = wl.Notes,
                            Status = (WantStatus) wl.WantListStatusId,
                            StatusDisplay = wl.WantListStatu.Status,
                            StatusId = wl.WantListStatu.Id
                        };

                    List<Want> wantList = wants[wantItem.Id];
                    wantList.Add(want);
                }
            }

            var wantListRemoval = new List<int>();
            foreach (var want in wants)
            {
                if (!want.Value.Any())
                    wantListRemoval.Add(want.Key);

                List<Want> newWant = want.Value.OrderBy(w => w.Book.Series.Name).ThenBy(w => w.Book.Issue).ToList();
                want.Value.Clear();
                want.Value.AddRange(newWant);
            }

            wantListRemoval.ForEach(wl => wants.Remove(wl));

            return Json(wants.ToList(), JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public void SaveBookToWant(Want item)
        {
            WantList want = item.MapWant();
            var dataStore = new ComicBookEntities();
            dataStore.WantLists.Add(want);
            dataStore.SaveChanges();
        }

        [HttpPost]
        public void RecieveWant(int wantId)
        {
            var dataStore = new ComicBookEntities();
            try
            {
                WantList want = dataStore.WantLists.Single(w => w.Id == wantId);
                want.WantListStatusId = (int) WantStatus.Recieved;

                dataStore.BookInventories.Add(new BookInventory
                    {
                        BookId = want.BookId ?? 0,
                        LocationId = 6,
                        InventoryStatusId = (int) InventoryStatus.Unread
                    });
                dataStore.SaveChanges();
            }
            finally
            {
                dataStore.Dispose();
            }
        }

        [HttpPost]
        public void ChangeBookWantStatus(int bookId, int wantStatusId)
        {
            var dataStore = new ComicBookEntities();
            try
            {
                WantList wantListItem = dataStore.WantLists.Single(wl => wl.BookId == bookId);
                wantListItem.WantListStatusId = wantStatusId;
                dataStore.SaveChanges();
            }
            finally
            {
                dataStore.Dispose();
            }
        }
    }
}