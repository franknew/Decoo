using SOAFramework.Library.DAL;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Decoo.Models
{
    public class RequestParameterEntity : BaseParameterEntity
    {

        public bool 是否必填 { get; set; }

        public string 默认值 { get; set; }

    }
}
