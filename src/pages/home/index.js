
import 'css/common.scss';
import './index.scss'
import '../../spritesmith-generated/sprite.css'
// import 'components/header/header.js' // 头部组件
import 'components/layout2/layout2.js' // 底部组件

import {
    methods1,api
} from 'js/util.js'

import {$ele} from 'components/temp-list/list.js'
import {$word} from 'components/temp-word/word.js'

console.log('这是首页的Js')


$(function () {
    // $(".test").text('jquery给改了')

   
    setTimeout(() => {
        console.log('测试箭头函数')
    }, 200)
    class TestClass {
        constructor(str) {
            this.str = str
        }
        print() {
            console.log(this.str)
        }
    }

    var a = new TestClass('测试class类')
    a.print()


    var res = Promise.resolve(1);
    res.then(item=>{
        console.log(`${item} 测试promise`)
    })


    $("#testDIV").html($ele)

    $("#testDIV2").html($word)

    api.get('/',{a:1}).then(res=>{
        console.log(res)
    })

    let obj1 = {a:1}
    let obj2 = {b:2}
    let c = Object.assign({},obj1,obj2);
    console.log(c)

})

methods1([1, 1, 2, 2, 3, 3]);