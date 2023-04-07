const btn_menu=document.querySelectorAll('.btn-menu')

btn_menu.forEach(btn=>{
    btn.addEventListener('click',()=>{
        document.querySelector('#menu-detail .mt img').src=`./assets/img/${btn.dataset.value}.png`
    })
})

