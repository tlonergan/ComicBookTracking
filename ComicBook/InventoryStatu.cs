//------------------------------------------------------------------------------
// <auto-generated>
//    This code was generated from a template.
//
//    Manual changes to this file may cause unexpected behavior in your application.
//    Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace ComicBook
{
    using System;
    using System.Collections.Generic;
    
    public partial class InventoryStatu
    {
        public InventoryStatu()
        {
            this.BookInventories = new HashSet<BookInventory>();
        }
    
        public int Id { get; set; }
        public string Status { get; set; }
    
        public virtual ICollection<BookInventory> BookInventories { get; set; }
    }
}