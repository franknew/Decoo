using DecooWeb.Filter;
using System.Web;
using System.Web.Mvc;

namespace DecooWeb
{
    public class FilterConfig
    {
        public static void RegisterGlobalFilters(GlobalFilterCollection filters)
        {
            filters.Add(new HandleErrorAttribute());
        }
    }
}