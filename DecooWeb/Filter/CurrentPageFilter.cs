using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace DecooWeb.Filter
{
    public class CurrentPageFilter : ActionFilterAttribute
    {
        public override void OnResultExecuting(ResultExecutingContext filterContext)
        {
            if (filterContext.RouteData.Values["action"] != null)
            {
                filterContext.Controller.ViewBag.Action = filterContext.RouteData.Values["action"].ToString();
            }
            base.OnResultExecuting(filterContext);
        }
    }
}