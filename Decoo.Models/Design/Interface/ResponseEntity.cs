using SOAFramework.Library.DAL;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Decoo.Models
{
    public class ResponseEntity : BaseMongoEntity
    {
        public List<ResponseEntity> 响应参数 { get; set; }
    }
}
