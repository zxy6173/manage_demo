export default function() {
    $("#classesTable").datagrid({
        method: "get",
        url: "/classes",
        pagination: true,
        pageList: [5, 10, 15, 20, 25],
        pageSize: 5,
        columns: [
            [
                { field: "name", title: "班级名称", width: 100 },
                { field: "date", title: "开班时间", width: 100 },
                { field: "count", title: "班级人数", width: 100 },
                {
                    field: "operate",
                    title: "操作",
                    width: 200,
                    formatter: function(value, row, index) {
                        return `<a class="easyui-linkbutton update-btn" data-options="iconCls:'icon-edit'" data-id="${
                            row._id
                        }">修改</a>
                                                    <a class="easyui-linkbutton del-btn" data-id="${
                                                        row._id
                                                    }" data-options="iconCls:'icon-remove'">删除</a>`;
                    }
                }
            ]
        ],
        onLoadSuccess: function() {
            $.parser.parse("#classesParent");
        }
    });
    $("#classesAddBtn").click(function() {
        $("#classesAddDialog").dialog("open");
    });
    // 初始化增加窗口
    $("#classesAddDialog").dialog({
        buttons: [
            {
                text: "保存",
                handler: function() {
                    $("#classesAddDialog").dialog("close");
                    let addName = $("#addClassesName").val();
                    let addDate = $("#addClassesDate").val();
                    $.ajax({
                        type: "post",
                        url: "/classes",
                        data: {
                            name: addName,
                            date: addDate
                        },
                        success: function() {
                            show();
                            $("#classesAddForm").form("clear");
                        }
                    });
                }
            },
            {
                text: "关闭",
                handler: function() {
                    $("#classesAddDialog").dialog("close");
                }
            }
        ]
    });

    // 初始化修改窗口
    $("#classesUpdateDialog").dialog({
        buttons: [
            {
                text: "保存",
                handler: function() {
                    let id = $("#updateClassesId").val();
                    let updateName = $("#updateClassesName").val();
                    let updateDate = $("#updateClassesDate").val();
                    let updateCount = $("#updateClassesCount").val();
                    $.ajax({
                        type: "put",
                        url: "/classes/" + id,
                        data: {
                            name: updateName,
                            date: updateDate,
                            count: updateCount
                        },
                        success: function() {
                            $("#classesUpdateDialog").dialog("close");
                            $("#classesUpdateForm").form("clear");
                            show();
                        }
                    });
                }
            },
            {
                text: "关闭",
                handler: function() {
                    $("#classesUpdateDialog").dialog("close");
                }
            }
        ]
    });
    $("#classesParent").on("click", ".del-btn", function() {
        let id = $(this).attr("data-id");
        console.log("id", id);
        $.messager.confirm("消息", "是否确认删除？", function(r) {
            if (r) {
                $.ajax({
                    type: "delete",
                    url: "/classes/" + id,
                    success: function() {
                        show();
                    }
                });
            }
        });
    });
    $("#classesParent").on("click", ".update-btn", function() {
        let id = $(this).attr("data-id");
        $("#classesUpdateDialog").dialog("open");
        $.ajax({
            type: "get",
            url: "/classes/" + id,
            success: function(data) {
                $("#updateClassesId").val(id);
                $("#updateClassesName").textbox("setValue", data.name);
                $("#updateClassesDate").textbox("setValue", data.date);
                $("#updateClassesCount").textbox("setValue", data.count);
            }
        });
    });
    $("#classesSearch").searchbox({
        searcher: function(value, type) {
            show(value, type);
        }
    });

    function show(value, type) {
        $("#classesTable").datagrid("reload", { type, value });
    }
}
