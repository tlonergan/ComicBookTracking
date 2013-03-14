using System.Collections.Generic;
using System.Linq;
using System.Web.Mvc;
using ComicBook.Models;

namespace ComicBook.Controllers
{
    public class PublisherController : Controller
    {
        public ActionResult Index()
        {
            return View();
        }

        public JsonResult GetPublishers()
        {
            var dataStore = new ComicBookEntities();
            List<Publisher> publishers = dataStore.Publishers.ToList();
            List<Models.Publisher> modelPublishers = publishers.Select(p => p.MapPublisher()).OrderBy(p=>p.Name).ToList();
            return Json(new {publishers = modelPublishers}, JsonRequestBehavior.AllowGet);
        }
    }
}