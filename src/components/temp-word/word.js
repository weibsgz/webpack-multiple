import templateWord from './word.art'

var data2 = {
    value: '测试文字'
}
var wordHtml = templateWord(data2);
var $word = $(wordHtml);
$word.on("click",()=>{
    alert(3)
})
export {
    $word
}
