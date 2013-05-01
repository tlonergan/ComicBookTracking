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
            return View("EditSeries");
        }

        public JsonResult GetCurrentSeries(bool inactive)
        {
            var dataStore = new ComicBookEntities();
            List<Series> series =
                dataStore.Series.Where(s => (inactive && !s.IsCurrent) || (!inactive && s.IsCurrent)).ToList();
            var currentSeries = new List<Models.Series>();
            foreach (Series s in series)
            {
                Models.Series cs = s.MapSeries();
                currentSeries.Add(cs);
            }

            return Json(new {series = currentSeries.OrderBy(s => s.Name)}, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetSeries(int seriesId)
        {
            using (var dataStore = new ComicBookEntities())
            {
                Series series = dataStore.Series.SingleOrDefault(s => s.Id == seriesId);
                Models.Series result = series.MapSeries();
                return Json(result, JsonRequestBehavior.AllowGet);
            }
        }

        public void SaveSeries(Models.Series series)
        {
            try
            {
                if (string.IsNullOrEmpty(series.Name))
                    throw new Exception("Series Name required");
                if (series.Publisher == null || series.Publisher.Id == 0)
                    throw new Exception("Publisher is required");

                Series dataSeries = series.MapSeries();

                var dataStore = new ComicBookEntities();
                DbSet<Series> seriesList = dataStore.Series;
                if (seriesList.Any(s => s.Name == dataSeries.Name && s.Id != series.Id))
                    throw new Exception("Series Exists");


                Series existingSeries = seriesList.FirstOrDefault(s => s.Id == series.Id);
                if (existingSeries != null)
                {
                    existingSeries.PublisherId = series.Publisher.Id;
                    existingSeries.IsCurrent = series.IsCurrent;
                    existingSeries.Name = series.Name;
                }
                else
                    seriesList.Add(dataSeries);


                dataStore.SaveChanges();
            }
            catch (Exception ex)
            {
                throw;
            }
        }
    }
}