/**
 * Created by lenovo on 2018/5/12.
 */
let btn = document.getElementById('toChange');
let text = document.getElementById('text');
let underline = document.getElementById('underline');

btn.addEventListener('click', ()=>{
    if(!text.classList.contains('later')){
        text.classList.add('later');
    }else {
        text.classList.remove('later');
    }
    if(underline.classList.contains('short')){
        underline.classList.remove('short');
        underline.classList.add('long');
    }else {
        underline.classList.remove('long');
        underline.classList.add('short');
    }
});