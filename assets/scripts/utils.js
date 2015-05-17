// DOM selector
function _ (name){
    return name.indexOf('.') == 0 ? document.getElementsByClassName(name.replace('.', ''))[0] : document.getElementById(name);
}