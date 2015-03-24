using SOAFramework.Library.DAL;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Decoo.Models
{
    public class InterfaceEntity : BaseMongoEntity
    {
        public RequestEntity 请求实体 { get; set; }

        public ResponseEntity 响应实体 { get; set; }
    }
}
