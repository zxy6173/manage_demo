export default function() {
    $("#studentsTable").datagrid({
        method: "get",
        url: "/students",
        pagination: true,
        pageList: [5, 10, 15, 20, 25],
        pageSize: 5,
        columns: [
            [
                { field: "name", title: "姓名", width: 100 },
                { field: "gender", title: "性别", width: 100 },
                { field: "age", title: "年龄", width: 100 },
                {
                    field: "classes",
                    title: "所属班级",
                    width: 100,
                    formatter: function(value, row, index) {
                        console.log(value, row, index);
                        return value && value.name;
                    }
                },
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
            $.parser.parse("#studentsParent");
        }
    });
    $("#studentsAddBtn").click(function() {
        $("#studentsAddDialog").dialog("open");
    });
    // 初始化增加窗口
    $("#studentsAddDialog").dialog({
        buttons: [
            {
                text: "保存",
                handler: function() {
                    $("#studentsAddDialog").dialog("close");
                    let addName = $("#addName").val();
                    let addAge = $("#addAge").val();
                    let addGender = $("#addGender").val();
                    let addHeadImg = $("#addHeadImgPath").val();
                    let addTheirClasses = $("#addTheirClasses").combobox(
                        "getValue"
                    );

                    $.ajax({
                        type: "post",
                        url: "/students",
                        data: {
                            name: addName,
                            age: addAge,
                            gender: addGender,
                            classesId: addTheirClasses,
                            headImg: addHeadImg
                        },
                        success: function() {
                            show();
                            $("#studentsAddForm").form("clear");
                        }
                    });
                }
            },
            {
                text: "关闭",
                handler: function() {
                    $("#studentsAddDialog").dialog("close");
                }
            }
        ]
    });

    // 初始化修改窗口
    $("#studentsUpdateDialog").dialog({
        buttons: [
            {
                text: "保存",
                handler: function() {
                    let id = $("#updateId").val();
                    let updateName = $("#updateName").val();
                    let updateAge = $("#updateAge").val();
                    let updateGender = $("#updateGender").val();
                    let updateTheirClasses = $("#updateTheirClasses").combobox(
                        "getValue"
                    );
                    $.ajax({
                        type: "put",
                        url: "/students/" + id,
                        data: {
                            name: updateName,
                            age: updateAge,
                            gender: updateGender,
                            classesId: updateTheirClasses
                        },
                        success: function() {
                            $("#studentsUpdateDialog").dialog("close");
                            $("#studentsUpdateForm").form("clear");
                            show();
                        }
                    });
                }
            },
            {
                text: "关闭",
                handler: function() {
                    $("#studentsUpdateDialog").dialog("close");
                }
            }
        ]
    });
    $("#studentsParent").on("click", ".del-btn", function() {
        let id = $(this).attr("data-id");
        console.log("id", id);
        $.messager.confirm("消息", "是否确认删除？", function(r) {
            if (r) {
                $.ajax({
                    type: "delete",
                    url: "/students/" + id,
                    success: function() {
                        show();
                    }
                });
            }
        });
    });
    $("#studentsParent").on("click", ".update-btn", function() {
        let id = $(this).attr("data-id");
        $("#studentsUpdateDialog").dialog("open");
        $.ajax({
            type: "get",
            url: "/students/" + id,
            success: function(data) {
                $("#updateId").val(id);
                $("#updateName").textbox("setValue", data.name);
                $("#updateAge").textbox("setValue", data.age);
                $("#updateGender").combobox("setValue", data.gender);
                $("#updateTheirClasses").combobox("setValue", data.classes.$id);
            }
        });
    });
    $("#studentsSearch").searchbox({
        searcher: function(value, type) {
            console.log(value, type);
            show(value, type);
        }
    });

    $("#addStudentUploadBtn").click(function() {
        $.ajaxFileUpload({
            url: "/upload",
            dataType: "string",
            fileElementId: $("[name=addStudentFile]").attr("id"),
            success: function(path) {
                $(".addHeadImg>img").attr("src", "/upload/" + path);
                $("#addHeadImgPath").val(path);
            }
        });
    });
    function show(value, type) {
        $("#studentsTable").datagrid("reload", { type, value });
    }
}
