


var GridStore = new Array();

var DataGridView = function () {

    this._id = null,
    this._data = new Array(),
    this._eidtable = false,
    this.DataSource = new DataTable();
    this.Columns = [],
    this.Container = null,
    this.DisplayCheckbox = false,
    this.Buttons = [],

    this.Render = function (control) {
        var container;
        if (typeof control == "string") {
            container = $("#" + control);
        }
        else if (control.selector == undefined) {
            container = $(control);
        }
        else {
            container = control;
        }
        if (container.length == 0) {
            alert("没有找到容器控件！");
            return;
        }
        this.Container = container;
        var html = "";
        html += "<div class='panel-body'>";
        html += this.RenderButtons();
        html += this.RenderTable();
        html += "</div>";
        container.html(html);
    },
    this.RenderTableHeader = function (columns) {
        var html = "";
        html += "<table class='table table-hover table-bordered table-striped' id='" + this._id + "'>";
        html += "<thead><tr>";
        if (this.DisplayCheckbox) {
            html += "<td class='text-center' style='width:20px;'>";
            html += "<input type='checkbox' class='checkbox text-center' id='checkAll' onchange='DataGridViewHelper.CheckAll(\"" + this._id + "\")' />"
            html += "</td>";
        }
        for (i in columns) {
            html += "<td class='text-center'";
            if (columns[i].Width > 0) {
                html += " style='width:" + columns[i].Width.toString() + "px;'";
            }
            html += ">" + columns[i].Header.toString() + "</td>";
        }
        html += "</tr></thead>";
        return html;
    },
    this.RenderTableBody = function (data) {
        var html = "";
        html += "<tbody>";
        var i = 0;
        if (data != null) {
            for (obj in data) {
                html += this.RenderRow(obj, data[obj], i);
                i++;
            }
        }
        html += "</tbody>";
        return html;
    },
    this.RenderRow = function (rowid, data, useDefault) {
        if (data == null) return;
        var html = "";
        html += "<tr id='" + rowid + "'>";
        if (this.DisplayCheckbox) {
            html += "<td style='width:20px;'><input type='checkbox' class='checkbox' id='chk'" + rowid + "'></td>";
        }
        var columns = this.GetColumnSettings();
        for (i in columns) {
            var column = columns[i];
            var columnName = column.Name;
            var value = data[columnName] != null ? data[columnName].toString() : "";
            if (useDefault != null && useDefault && value == "") {
                value = column.Default;
            }
            if (column.OperationColumn) {
                html += "<td class='text-center'><a href='javascript:void(0);' onclick='javacript:DataGridViewHelper.InvokeColumnEvent(\"" + this._id + "\",this,\"" + columnName + "\");' class='button'>" + column.OperationText + "</a>";
            }
            else if (this._eidtable && (column.Editable || column.Editable == null)) {
                html += "<td><input name='" + columnName + "' class='editable-control' type='text' style='width:100%;' value='" + value + "' />";
            }
            else {
                html += "<td><span name='" + columnName + "'>" + value + "</span>";
            }
            html += "</td>"
        }

        html += "</tr>";
        return html;
    },
    this.RenderButtons = function () {
        var html = "";
        html += "<div class='btn-group' role='group'>";
        for (var i = 0; i < this.Buttons.length; i++) {
            var button = this.Buttons[i];
            if (button.ID == null) {
                button.ID = Math.uuid();
            }
            html += "<button class='btn btn-default' onclick='DataGridViewHelper.InvokeButtonEvent(\"" + this._id + "\", this)' ";
            html += "id='" + button.ID + "'";
            html += ">" + button.Text + "</button>";
        }
        html += "</div>";
        return html;
    },
    this.RenderTable = function () {
        var columns = this.GetColumnSettings();
        var html = this.RenderTableHeader(columns);
        html += this.RenderTableBody(this._data);
        return html;
    },
    this.CollectData = function () {
        var collectedDataList = new Array();
        var collectedData = {};
        var rows = $("#" + this._id + " tbody tr");
        var columns = this.GetColumnSettings();
        for (var i = 0; i < rows.length; i++) {
            var row = $(rows[i]);
            var rowid = row.prop("id");
            if (this._data[rowid] == undefined || this._data[rowid] == null) {
                this._data[rowid] = {};
            }
            var dataRow = this.DataSource.Rows[rowid];
            if (dataRow == null) {
                dataRow = this.DataSource.NewRow(rowid);
            }
            for (x in columns) {
                var columnName = columns[x].Name;
                var value = null;
                if (this._eidtable) {
                    value = row.find("[name='" + columnName + "']").val();
                }
                else {
                    value = row.find("[name='" + columnName + "']").text();
                }
                if (dataRow.Cells[columnName] == null) {
                    dataRow.Cells[columnName] = dataRow.NewCell(columnName);
                }
                dataRow.Cells[columnName].SetValue(value);
            }
        }
    },
    this.SetData = function (data) {
        for (obj in data) {
            this._data[Math.uuid()] = data[obj];
        }
        this.DataSource.InitData(this._data);
    },
    this.Add = function (data) {
        var id = Math.uuid();
        var gridData = GridStore[this._id]._data;
        gridData[id] = data;
        var html = this.RenderRow(id, data, true);
        var grid = $("#" + this._id);
        $(html).insertAfter(grid.find("tr").last());
    },
    this.NewRow = function () {
        var data = {
        };
        this.Add(data);
    },
    this.DeleteRow = function (rowid) {
        this._data[rowid] = null;
        $("#" + rowid).empty();
    },
    this.DeleteSelectedRows = function () {
        var checked = $("#" + this._id + " tbody :checked");
        if (checked.length == 0) {
            alert("请选择数据！");
            return;
        }
        if (confirm("是否删除选中数据？")) {
            for (var i = 0; i < checked.length; i++) {
                var rowid = $(checked[i]).parentsUntil("tr").parent().prop("id")
                this.DeleteRow(rowid);
            }
        }
    },
    this.CheckAll = function () {
        var grid = $("#" + this._id);
        var checked = grid.find("#checkAll").prop("checked");
        var tableBody = grid.find("tbody");
        tableBody.find(":checkbox").prop("checked", checked);
    },
    this.GetColumnSettings = function () {
        var columns = new Array();
        for (var i = 0; i < this.Columns.length; i++) {
            var column = {
                Header: "",
                Name: "",
                Width: -1,
                Type: "string",
                Default: ""
            };
            if (typeof this.Columns[i] == "string") {
                column.Header = this.Columns[i];
                column.Name = this.Columns[i];
            } else {
                column = this.Columns[i];
            }
            columns.push(column);
        }
        this.Columns = columns;
        return columns;
    },
    this.BeginEdit = function (rowid) {
        if (rowid == null || rowid == null) {
            this._eidtable = true;
            this.Render(this.Container);
        }
    },
    this.EndEdit = function () {
        this.CollectData();
        this._eidtable = false;
        this.Render(this.Container);
    },
    this.GetChanges = function (status) {
        return this.DataSource.GetChanges(status);
    }
};

var DataGridViewHelper = {

    CreateInstance: function (gridSettings) {
        var grid = new DataGridView();
        if (gridSettings != null) {
            grid = gridSettings;
        }
        grid._id = Math.uuid();
        GridStore[grid._id] = grid;
        return grid;
    },

    NewRow: function (id) {
        var grid = GridStore[id];
        grid.NewRow();
    },
    DeleteSelectedRows: function (gridIDOrContainerID) {
        var grid = GridStore[gridIDOrContainerID];
        if (grid == null) {
            grid = GridStore[$("#" + gridIDOrContainerID + " table").prop("id")];
        }
        grid.DeleteSelectedRows();
    },
    BeginEdit: function (gridIDOrContainerID) {
        var grid = GridStore[gridIDOrContainerID];
        if (grid == null) {
            grid = GridStore[$("#" + gridIDOrContainerID + " table").prop("id")];
        }
        grid.BeginEdit();
    },
    CheckAll: function (id) {
        var grid = GridStore[id];
        grid.CheckAll();
    },
    InvokeButtonEvent: function (gridid, sender) {
        var grid = GridStore[gridid];
        var id = $(sender).prop("id");
        for (var i = 0; i < grid.Buttons.length; i++) {
            var button = grid.Buttons[i];
            if (id == button.ID && button.OnClick != null) {
                button.OnClick(sender, grid);
                break;
            }
        }
    },
    InvokeColumnEvent: function (gridid, sender, columnName) {
        var grid = GridStore[gridid];
        var columns = grid.GetColumnSettings();
        for (i in columns) {
            if (columns[i].Name == columnName) {
                columns[i].OnClick(sender, grid);
                break;
            }
        }
    }
};




