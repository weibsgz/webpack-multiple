import 'css/common.scss';
import './index.scss'
import '../../spritesmith-generated/sprite.css'
import 'components/header/header.js' // 头部组件
import 'components/footer/footer.js' // 底部组件
import _ from 'lodash'

import {
    methods1
} from 'js/util.js'

console.log('这是首页的Js')
console.log(_.join(['a','b','c'],'***'))

$(function () {
    $(".test").text('jquery给改了')
})

methods1([1, 1, 2, 2, 3, 3]);