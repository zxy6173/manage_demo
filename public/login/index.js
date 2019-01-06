import manage from "../manage/index.js";

export default function(){
    location.hash = "#login";
    $("#root").load("/login/template.html",function(){
        $.parser.parse();
        $("#submitForm").click(function(){
            if($("#loginForm").form("validate")){
                $.ajax({
                    type:"post",
                    url:"/users/login",
                    data:{
                        phone:$("#phone").val(),
                        pwd:$("#pwd").val()
                    },success:function(data){
                        if(data.status == 1){
                            // window.location = "manage.html"; 
                            manage();
                        }else{
                            $.messager.alert('警告','用户名或密码错误');  
                        }
                    }
                })
            }
        })
    });
}