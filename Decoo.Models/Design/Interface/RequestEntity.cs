using SOAFramework.Library.DAL;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Decoo.Models
{
    public class RequestEntity : BaseMongoEntity
    {
        public string 请求地址 { get; set; }

        public List<RequestParameterEntity> 请求参数 { get; set; }
    }
}
