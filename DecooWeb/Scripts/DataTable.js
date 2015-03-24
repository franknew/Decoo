
var DataTable = function (data) {
    this.Rows = new Array(),
    this.Data = data;
    this.InitData = function (dataList) {
        this.Data = dataList;
        var i = 0;
        for (key in this.Data) {
            var data = this.Data[key];
            var row = this.NewRow(key);
            row.ID = key;
            row.Index = i;
            row.SetData(data);
            row.OwnerTable = this;
            row.Commit();
            i++;
        }
    },
    this.NewRow = function (id) {
        var row = new DataRow(id, Object.keys(this.Rows).length);
        row.Status = DataStatus.Added;
        row.OwnerTable = this;
        this.Rows[id] = row;
        return row;
    },
    this.Commit = function () {
        for (key in this.Rows) {
            var row = this.Rows[key];
            row.Commit();
        }
    },
    this.RollBack = function () {
        for (key in this.Rows) {
            var row = this.Rows[key];
            row.RollBack();
        }
    },
    this.GetChanges = function (status) {
        var list = new Array();
        if (status == undefined || status == null) {
            for (key in this.Rows) {
                var row = this.Rows[key];
                if (row.Status != DataStatus.UnChanged) {
                    var data = {};
                    for (prop in row.Cells) {
                        var cell = row.Cells[prop];
                        data[prop] = cell.CurrentValue;
                    }
                    list.push(data);
                }
            }
        }
        else {
            for (key in this.Rows) {
                var row = this.Rows[key];
                if (row.Status == status) {
                    var data = {};
                    for (prop in row.Cells) {
                        var cell = row.Cells[prop];
                        data[prop] = cell.CurrentValue;
                    }
                    list.push(data);
                }
            }
        }
        return list;
    }
}
var DataRow = function (id, index) {
    this.OwnerTable = null,
    this.Status = DataStatus.UnChanged,
    this.Cells = new Array(),
    this.ID = id,
    this.Index = index,
    this.SetData = function (data) {
        var index = 0;
        for (i in data) {
            var cell = new DataCell(data[i]);
            cell.Index = index;
            cell.OwnerRow = this;
            cell.Name = i;
            this.Cells[i] = cell;
            cell.Commit();
            index++;
        }
    },
    this.Commit = function () {
        for (i in this.Cells) {
            var data = this.Cells[i];
            data.Commit();
        }
        this.Status = DataStatus.UnChanged;
    },
    this.RollBack = function () {
        for (i in this.Cells) {
            var data = this.Cells[i];
            data.RollBack();
        }
        this.Status = DataStatus.UnChanged;
    },
    this.GetData = function () {
        var data = {};
        for (i in this.Cells) {
            data[i] = this.Cells[i].CurrentValue;
        }
        return data;
    },
    this.NewCell = function (name) {
        var cell = new DataCell(null);
        cell.Name = name;
        cell.Index = Object.keys(this.Cells).length;
        cell.OwnerRow = this;
        cell.Status = DataStatus.Added;
        this.Cells[cell.Name] = cell;
        return cell;
    }
}

var DataCell = function (value) {
    this.OwnerRow = null;
    this.OldValue = null,
    this.CurrentValue = value,
    this.Status = DataStatus.UnChanged,
    this.Index = -1,
    this.Name = "",
    this.SetValue = function (value) {
        this.CurrentValue = value;
        if (this.Status == DataStatus.Added) {
        }
        else if (this.CurrentValue != this.OldValue) {
            this.Status = DataStatus.Modified;
        }
        else {
            this.Status = DataStatus.UnChanged;
        }
    },
    this.Commit = function () {
        this.OldValue = this.CurrentValue;
        this.Status = DataStatus.UnChanged;
    },
    this.RollBack = function () {
        this.CurrentValue = this.OldValue;
        this.Status = DataStatus.UnChanged;
    }
}

var DataStatus = {
    UnChanged: 0,
    Added: 1,
    Modified: 2,
    Deleted: 3
}