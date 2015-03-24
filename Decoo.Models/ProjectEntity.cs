using SOAFramework.Library.DAL;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Decoo.Models
{
    public class ProjectEntity : BaseMongoEntity
    {
        public List<DesignDocEntity> 设计文档列表 { get; set; }

        public string 项目名称 { get; set; }

        public string 备注 { get; set; }
    }
}
