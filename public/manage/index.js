import students from "../students/index.js"
import classes from "../classes/index.js"
import teachers from "../teachers/index.js"
import login from "../login/index.js";
const components = {
    students,classes,teachers
}
export default function(){
    location.hash = "#manage";
    $("#root").load("/manage/template.html",function(){
        $.parser.parse();
        $.ajax({
            type:"get",
            url:"/getSession",
            success:function(data){
                if(data.phone){
                    $("#phone").text(data.phone);
                }else{
                    // location.href = "/login.html"
                    login();
                }
            }
        });
        $(".login-info>input").click(function(){
            $.ajax({
                type:"get",
                url:"/removeSession",
                success:function(){
                    // location.href = "/login.html"
                    login();
                }
            });
        });
        $("#nav li").click(function() {
            let selectType = $(this).attr("data-type");
            let selectTitle = $(this).text();
            if ($("#studentsTabs").tabs("exists", selectTitle)) {
                $("#studentsTabs").tabs("select", selectTitle);
            } else {
                $("#studentsTabs").tabs("add", {
                    title: selectTitle,
                    href: "/"+selectType + "/template.html",
                    closable: true,
                    onLoad: function() {
                        // window[selectType]();
                        components[selectType]();
                    }
                });
            }
        });
    });
}