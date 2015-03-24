using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using SOAFramework.Library.DAL;

namespace Decoo.Models
{
    public class DesignDocEntity : BaseMongoEntity
    {
        public List<InterfaceEntity> 接口列表 { get; set; }

        public string 设计文档名称 { get; set; }

        public string 创建人 { get; set; }

        public DateTime? 创建时间 { get; set; }

        public string 更新人 { get; set; }

        public DateTime? 最后更新时间 { get; set; }

        public string 备注 { get; set; }
    }
}
