import { move_pill } from "./pill.js"

let popup_teacher_node = document.querySelector(`#popup_card`)
let teacher_message_node = document.querySelectorAll(`.teacher_message`)
let krest_teacher_node = document.querySelector(`#krest_teacher`)
let popup_node = document.querySelector(`#popup`)
let add_btns = document.querySelectorAll(`.pos-add`)
let pill = document.querySelector(`.add-pill`)
let status_id = document.querySelector(`#popup_status_id`)
let status_status = document.querySelector(`#popup_status_status`)
let add_state = 3

status_status.value = 'problem'

add_btns[0].addEventListener(`click`, ()=>{
    if (add_state != 3){
        add_state = 3;
        move_pill(pill, add_state)
        status_status.value = 'problem'
    }
})

add_btns[1].addEventListener(`click`, ()=>{
    if (add_state != 2){
        add_state = 2;
        move_pill(pill, add_state)
        status_status.value = 'broken'
    }
})

teacher_message_node.forEach(el=>{
    el.addEventListener(`click`, (evt)=>{
        status_id.value = el.id
        popup_teacher_node.classList.remove(`d-none`)
        popup_node.classList.add(`d-none`)
        evt.stopPropagation();
})
})

krest_teacher_node.addEventListener(`click`, ()=>{
    popup_teacher_node.classList.add(`d-none`)
})

document.addEventListener(`click`, (evt) => {
    if (!popup_teacher_node.contains(evt.target) && !popup_node.contains(evt.target)) {
        popup_teacher_node.classList.add(`d-none`);
    }
});