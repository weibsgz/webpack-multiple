import 'css/common.scss';
import './index.scss'
import '../../spritesmith-generated/sprite.css'
// import 'components/header/header.js' // 头部组件
import 'components/layout2/layout2.js' // 底部组件

import {
    methods1
} from 'js/util.js'
import templateList from '../../components/template/list.art'
import temlateWord from '../../components/template/word.art'
console.log('这是首页的Js')


$(function () {
    $(".test").text('jquery给改了')

    var data1 = {
        name:"Ray",
        age:"18",
        phone:"18233989613"
    };

    var data2 = {
        value:'测试文字'
    }
    var html = templateList(data1);
    var html2 = temlateWord(data2);


    $("#testDIV").html(html)
    $("#testDIV2").html(html2)

})

methods1([1, 1, 2, 2, 3, 3]);