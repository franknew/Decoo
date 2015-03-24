using Decoo.BLL;
using DecooWeb.Filter;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using DecooWeb.Lib;

namespace DecooWeb.Controllers
{
    [CurrentPageFilter]
    public class HomeController : Controller
    {
        //
        // GET: /Home/

        public ActionResult Index()
        {
            return View();
        }

        public ActionResult List(string DesignName, string Creator, string CreateStartDate, string CreateEndDate, string ProjectID)
        {
            DateTime? startDate = null;
            DateTime? endDate = null;
            if (!string.IsNullOrEmpty(CreateStartDate))
            {
                startDate = Convert.ToDateTime(CreateStartDate);
            }
            if (!string.IsNullOrEmpty(CreateEndDate))
            {
                endDate = Convert.ToDateTime(CreateEndDate);
            }
            Design bll = new Design();
            this.ViewBag.Project = bll.QueryDesignDocs(DesignName, Creator, startDate, endDate);
            return View();
        }

        public ActionResult New()
        {
            return View();
        } 

    }
}
