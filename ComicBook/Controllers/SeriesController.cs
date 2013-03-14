using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web.Mvc;
using ComicBook.Models;

namespace ComicBook.Controllers
{
    public class SeriesController : Controller
    {
        public ActionResult Index()
        {
            return View();
        }

        public JsonResult GetCurrentSeries()
        {
            var dataStore = new ComicBookEntities();
            List<Series> series = dataStore.Series.Where(s => s.IsCurrent).ToList();
            var currentSeries = new List<Models.Series>();
            foreach (Series s in series)
            {
                Models.Series cs = s.MapSeries();
                currentSeries.Add(cs);
            }
            return Json(new {series = currentSeries.OrderBy(s => s.Name)}, JsonRequestBehavior.AllowGet);
        }

        public void SaveSeries(Models.Series series)
        {
            try
            {
                if(string.IsNullOrEmpty(series.Name))
                    throw new Exception("Series Name required");
                if(series.Publisher == null || series.Publisher.Id == 0)
                    throw new Exception("Publisher is required");

                Series dataSeries = series.MapSeries();

                var dataStore = new ComicBookEntities();
                DbSet<Series> seriesList = dataStore.Series;
                if (seriesList.Any(s => s.Name == dataSeries.Name))
                    throw new Exception("Series Exists");

                seriesList.Add(dataSeries);
                dataStore.SaveChanges();
            }
            catch(Exception ex)
            {
                throw;
            }
        }
    }
}