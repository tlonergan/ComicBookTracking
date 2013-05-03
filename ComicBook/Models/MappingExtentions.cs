using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Linq;

namespace ComicBook.Models
{
    public static class MappingExtentions
    {
        public static Book MapBook(this ComicBook.Book book)
        {
            BookInventory inventory = book.BookInventories.FirstOrDefault() ?? new BookInventory
                                                                               {
                                                                                   InventoryStatusId = (int) InventoryStatus.Unread,
                                                                                   InventoryStatu = new InventoryStatu
                                                                                                    {
                                                                                                        Id = (int) InventoryStatus.Unread,
                                                                                                        Status = InventoryStatus.Unread.ToString()
                                                                                                    }
                                                                               };

            return new Book
                   {
                       Id = book.Id,
                       IsSpecialCover = book.IsSpecialCover,
                       Issue = book.Issue,
                       Notes = book.Notes,
                       Status = (InventoryStatus) inventory.InventoryStatusId,
                       StatusDisplay = inventory.InventoryStatu.Status,
                       Series = book.Series.MapSeries()
                   };
        }

        public static ComicBook.Book MapBook(this Book book)
        {
            return new ComicBook.Book
                   {
                       Id = book.Id,
                       IsSpecialCover = book.IsSpecialCover,
                       Issue = book.Issue,
                       Notes = book.Notes,
                       SeriesId = book.Series.Id,
                       //BookInventories = new Collection<BookInventory>{new BookInventory{InventoryStatusId = (int)book.Status}},
                       //WantLists = new Collection<WantList>{new WantList{WantListStatusId = (int)book.Want.StatusId}}
                   };
        }

        public static Series MapSeries(this ComicBook.Series series)
        {
            return new Series
                   {
                       Id = series.Id,
                       IsCurrent = series.IsCurrent,
                       Name = series.Name,
                       Publisher = series.Publisher.MapPublisher()
                   };
        }

        public static Publisher MapPublisher(this ComicBook.Publisher publisher)
        {
            return new Publisher
                   {
                       Id = publisher.Id,
                       Name = publisher.Name
                   };
        }

        public static ComicBook.Series MapSeries(this Series series)
        {
            return new ComicBook.Series
                   {
                       Id = series.Id,
                       Name = series.Name,
                       IsCurrent = series.IsCurrent,
                       PublisherId = series.Publisher.Id
                   };
        }

        public static WantList MapWant(this Want want)
        {
            return new WantList
                   {
                       BookId = want.Book.Id,
                       WantListStatusId = want.StatusId
                   };
        }

        public static Want MapWant(this WantList wantListItem)
        {
            if (wantListItem == null)
                return null;

            return new Want
                   {
                       Id = wantListItem.Id,
                       Status = (WantStatus) wantListItem.WantListStatusId,
                       StatusDisplay = wantListItem.WantListStatu.Status
                   };
        }

        public static Location MapLocation(this ComicBook.Location location)
        {
            if (location == null)
                return null;

            return new Location
                   {
                       Id = location.Id,
                       Name = location.Name
                   };
        }

        public static List<Location> MapLocations(this List<ComicBook.Location> dLocations)
        {
            return dLocations.Select(l => l.MapLocation()).ToList();
        }

        public static List<KeyValuePair<int, string>> MapWantStatuses(this List<WantListStatu> wantStatuses)
        {
            return wantStatuses.Select(ws => new KeyValuePair<int, string>(ws.Id, ws.Status)).ToList();
        }
    }
}