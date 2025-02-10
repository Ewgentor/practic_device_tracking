import { move_pill } from "./pill.js"

let popup_card_node = document.querySelector(`#popup_card`)
let plus_node = document.querySelector(`#plus`)
let krest_plus_node = document.querySelector(`#krest_plus`)
let popup_status_node = document.querySelector(`#popup_status`)
let status_message_node = document.querySelectorAll(`.status_message`)
let krest_status_node = document.querySelector(`#krest_status`)
let popup_node = document.querySelector(`#popup`)
let add_btns = document.querySelectorAll(`.pos-add`)
let pill = document.querySelector(`.add-pill`)
let add_state = 0
let status_id = document.querySelector(`#popup_status_id`)
let status_status = document.querySelector(`#popup_status_status`)

status_status.value = 'working'


add_btns[0].addEventListener(`click`, ()=>{
    if (add_state != 0){
        add_state = 0;
        move_pill(pill, add_state)
        status_status.value = 'working'
    }
})

add_btns[1].addEventListener(`click`, ()=>{
    if (add_state != 1){
        add_state = 1;
        move_pill(pill, add_state)
        status_status.value = 'problem'
    }
})

add_btns[2].addEventListener(`click`, ()=>{
    if (add_state != 2){
        add_state = 2;
        move_pill(pill, add_state)
        status_status.value = 'broken'
    }
})

plus_node.addEventListener(`click`, (evt)=>{
    popup_card_node.classList.remove(`d-none`)
    popup_node.classList.add(`d-none`)
    evt.stopPropagation();
})

krest_plus_node.addEventListener(`click`, ()=>{
    popup_card_node.classList.add(`d-none`)
})

document.addEventListener(`click`, (evt) => {
    if (!popup_card_node.contains(evt.target) && !plus_node.contains(evt.target) && !popup_status_node.contains(evt.target)) {
        popup_card_node.classList.add(`d-none`);
    }
});

status_message_node.forEach(el=>{
    el.addEventListener(`click`, (evt)=>{
        status_id.value = el.id
        popup_status_node.classList.remove(`d-none`)
        popup_node.classList.add(`d-none`)
        evt.stopPropagation();
    })
})

krest_status_node.addEventListener(`click`, ()=>{
    popup_status_node.classList.add(`d-none`)
})



