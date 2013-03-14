using System.Web;
using System.Web.Http;
using System.Web.Mvc;
using System.Web.Routing;
using Nustache.Mvc;

namespace ComicBook
{
    // Note: For instructions on enabling IIS6 or IIS7 classic mode, 
    // visit http://go.microsoft.com/?LinkId=9394801
    public class MvcApplication : HttpApplication
    {
        protected void Application_Start()
        {
            AreaRegistration.RegisterAllAreas();

            WebApiConfig.Register(GlobalConfiguration.Configuration);
            FilterConfig.RegisterGlobalFilters(GlobalFilters.Filters);
            RouteConfig.RegisterRoutes(RouteTable.Routes);

            ViewEngines.Engines.Add(new NustacheViewEngine {RootContext = NustacheViewEngineRootContext.Model});
        }
    }
}