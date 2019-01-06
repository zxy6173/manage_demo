import register from "../register/index.js"
import login from "../login/index.js"
import manage from "../manage/index.js"

// register();
// login();
// manage();
let hash = location.hash;
if(hash == "#register"){
    register();
}else if(hash == "#login"){
    login();
}else if(hash == "#manage"){
    manage();
}else{
    login();
}