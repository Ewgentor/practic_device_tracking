popup_node = document.querySelector(`#popup`)
status_btn = document.querySelector(`#report`)
krest_node = document.querySelector(`#krest`)

status_btn.addEventListener(`click`, (evt)=>{
    popup_node.classList.remove(`d-none`)
    evt.stopPropagation();
})

krest_node.addEventListener(`click`, ()=>{
    popup_node.classList.add(`d-none`)
})

document.addEventListener(`click`, (evt) => {
    if (!popup_node.contains(evt.target)) {
        popup_node.classList.add(`d-none`);
    }
});