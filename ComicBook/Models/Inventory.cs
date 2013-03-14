using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ComicBook.Models
{
    public enum InventoryStatus
    {
        Unread = 1,
        Read = 2, 
        ReadPreSort = 3,
        Collection = 4
    }
}