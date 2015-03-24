using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace DecooWeb.Lib
{
    public class FormHelper
    {
        public static string GetString(DateTime? time, string format = null)
        {
            if (string.IsNullOrEmpty(format))
            {
                format = "yyyy-MM-dd HH:mm:ss";
            }
            string result = "";
            if (!time.HasValue)
            {
                return result;
            }
            if (time != new DateTime(1, 1, 1))
            {
                result = time.Value.ToString(format);
            }
            return result;
        }
    }
}