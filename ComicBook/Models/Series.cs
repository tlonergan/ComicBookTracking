namespace ComicBook.Models
{
    public class Series
    {
        public Series()
        {
            Publisher = new Publisher();
        }

        public int Id { get; set; }
        public string Name { get; set; }
        public bool IsCurrent { get; set; }
        public Publisher Publisher { get; set; }
    }
}