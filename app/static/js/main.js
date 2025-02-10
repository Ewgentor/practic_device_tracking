 // СКРИПТ ДОБАВЛЕНИЯ
let popup_card_node = document.querySelector(`#popup_card`)
let plus_node = document.querySelector(`#plus`)
let krest_plus_node = document.querySelector(`#krest_plus`)
let popup_node = document.querySelector(`#popup`)

plus_node.addEventListener(`click`, (evt)=>{
    popup_card_node.classList.remove(`d-none`)
    popup_node.classList.add(`d-none`)
    evt.stopPropagation();
})

krest_plus_node.addEventListener(`click`, ()=>{
    popup_card_node.classList.add(`d-none`)
})

document.addEventListener(`click`, (evt) => {
    if (!popup_card_node.contains(evt.target) && !plus_node.contains(evt.target)) {
        popup_card_node.classList.add(`d-none`);
    }
});