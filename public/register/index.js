import login from "../login/index.js"
export default function(){
    location.hash = "#register";
    $("#root").load("/register/template.html",function(){
        $.parser.parse();
        $.extend($.fn.validatebox.defaults.rules, {
            repeat:{
                validator: function(value, param) {
                    let flag = false;
                    $.ajax({
                        url:"/users",
                        type:"get",
                        data:{
                            phone:value
                        },
                        async:false,
                        success:function(data){
                            if(data.status == 1){
                                flag = true;
                            }
                        }
                        
                    });
                    return flag;
                },
                message: "手机号重复"
            },
            pattern:{
                validator: function(value, param) {
                    console.log(value,param);
                    return param[0].test(value) 
                },
                message: "格式不正确"
            },
            same:{
                validator: function(value, param) {
                    return $("#pwd").val() == value
                },
                message: "两次密码不一致"
            }
    
        });
        $("#submitForm").click(function(){
            if($("#registerForm").form("validate")){
                $.ajax({
                    type:"post",
                    url:"/users",
                    data:{
                        phone:$("#phone").val(),
                        pwd:$("#pwd").val()
                    },success:function(){
                        $.messager.alert('警告','注册成功',"",function(){
                            // window.location = "login.html";
                            login();
                        });  
                    }
                })
            }else{
                $.messager.alert('警告','格式验证未全部通过');  
            }
        })
    });
   
}