
import templateList from './list.art'
var data1 = {
    name: "Ray",
    age: "18",
    phone: "18233989613"
};


var listHmtl = templateList(data1);
var $ele = $(listHmtl);
$ele.on("click","li",()=>{
    alert(2)
})
export {
    $ele
}


