namespace ComicBook.Models
{
    public class Want
    {
        public int Id { get; set; }
        public WantStatus Status { get; set; }
        public int StatusId { get; set; }
        public string StatusDisplay { get; set; }
        public Book Book { get; set; }
        public string Notes { get; set; }
    }
}