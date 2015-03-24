using Decoo.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using SOAFramework.Library.DAL;
using Norm.Collections;
using Norm.BSON;
using Norm;


namespace Decoo.BLL
{
    public class Design
    {
        private IMongoCollection<ProjectEntity> manager = null;

        public Design()
        {
            MongoDBHelper helper = new MongoDBHelper(DBNameEnum.DecooDB.ToString());
            manager = helper.GetDataManager<ProjectEntity>();
        }

        public ProjectEntity QueryDesignDocs(string designDocName, string creator, DateTime? startDate, DateTime? endDate)
        {
            ProjectEntity project = null;
            var query = new Expando();
            if (!string.IsNullOrEmpty(designDocName))
            {
                query["设计文档列表"] = Q.ElementMatch(new { 接口列表 = new { 设计文档名称 = Q.Matches(designDocName) } });
            }
            if (!string.IsNullOrEmpty(creator))
            {
                query["设计文档列表"] = Q.ElementMatch(new { 接口列表 = new { 创建人 = Q.Matches(creator) } });
            }
            if (startDate.HasValue)
            {
                query["设计文档列表"] = Q.ElementMatch(new { 接口列表 = new { 创建时间 = Q.GreaterOrEqual(startDate.Value) } });
            }
            if (endDate.HasValue)
            {
                query["设计文档列表"] = Q.ElementMatch(new { 接口列表 = new { 创建时间 = Q.LessOrEqual(endDate.Value) } });
            }
            project = manager.FindOne(query);
            return project;
        }
    }
}
