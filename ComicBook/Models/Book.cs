namespace ComicBook.Models
{
    public class Book
    {
        public Book()
        {
            Series = new Series();
        }

        public int Id { get; set; }
        public int Issue { get; set; }
        public bool IsSpecialCover { get; set; }
        public string Notes { get; set; }
        public Series Series { get; set; }
        public InventoryStatus Status { get; set; }
        public string StatusDisplay { get; set; }

        public Want Want { get; set; }
        public Location Location { get; set; }
        public Location NextLocation { get; set; }

        public string DisplayName
        {
            get
            {
                string displayName = string.Format("{0} #{1}", Series.Name, Issue);
                if (IsSpecialCover)
                    displayName += string.Format(" ({0})", Notes);

                return displayName;
            }
        }

    }
}