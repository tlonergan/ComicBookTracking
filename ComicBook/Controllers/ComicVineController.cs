using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Mvc;

namespace ComicBook.Controllers
{
    public class ComicVineController : Controller
    {
        //
        // GET: /ComicVine/

        public ActionResult Index()
        {
            return View("ComicVine");
        }

        public ContentResult ComicList(DateTime? storeDate)
        {
            if(!storeDate.HasValue)
                throw new Exception();
            var query =
                "http://beta.comicvine.com/api/issues/?api_key=703394b1ecd8cfcc996648a3c60eb8e604fdfb02&format=json&field_list=id,name,issue_number,volume,date_added&filter=store_date:" +
                storeDate.Value.ToString("yyyy-MM-dd");

            var webRequest = (HttpWebRequest) WebRequest.Create(query);
            string json;
            using (var response = webRequest.GetResponse())
            {
                using (var reader = new StreamReader(response.GetResponseStream()))
                {
                    json = reader.ReadToEnd();
                }
            }

            return new ContentResult { Content = json, ContentType = "application/json" };
        }
    }
}
