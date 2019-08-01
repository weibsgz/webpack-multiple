require('core-js/features/object/define-property')
require('core-js/features/object/create')
require('core-js/features/object/assign')
require('core-js/features/array/for-each')
require('core-js/features/array/index-of')
require('core-js/features/function/bind')
require('core-js/features/promise')

//也可以只导出模板  数据在业务自己取的渲染组件
import templateList from '../../components/temp-list/list.art'

var data1 = {
    name:"weibin",
    age:"18",
    phone:"18233989613"
};

var html = templateList(data1);
$("#testDIV").html(html)

$("#testDIV ul li").on("click",()=>{
    alert(4)
})