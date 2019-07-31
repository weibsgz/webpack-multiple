import templateList from '../../components/template/list.art'



var data1 = {
    name:"weibin",
    age:"18",
    phone:"18233989613"
};

var html = templateList(data1);
$("#testDIV").html(html)