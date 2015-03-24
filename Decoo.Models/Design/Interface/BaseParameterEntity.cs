using SOAFramework.Library.DAL;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Decoo.Models
{
    public class BaseParameterEntity : BaseMongoEntity
    {
        public string 参数名称 { get; set; }

        public string 类型 { get; set; }

        public string 备注 { get; set; }
    }
}
