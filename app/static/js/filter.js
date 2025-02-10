import { move_pill } from "./pill.js"

let filter_btns = document.querySelectorAll(`.pos`)
let pill = document.querySelector(`#pill`)
let filter_state = 3
let main_cards = document.querySelectorAll(`.main-card`)
let filter_inp = document.querySelector(`#filter_input`)


const filter_by_status = (cards, status)=>{
    let check = cards[0].querySelector(`.status`).classList.contains(`ps-0`)
    let classes = {
        0: `working`,
        1: `problem`,
        2: `broken`,
        3: NaN,
    }
    cards.forEach(el=>{
        if(status == 3){
            el.classList.remove(`d-none`)
        } else{
            if (!el.id){
                if (check? el.querySelector(`.`+`${classes[status]}`).innerHTML > 0 : el.querySelector(`.status`).classList.contains(classes[status])){
                    el.classList.remove(`d-none`)
                } else {
                    el.classList.add(`d-none`)
                }
            }
        }
    })
}

const filter_by_name = (cards, input)=>{
    cards.forEach(el=>{
        if(!el.id){
            if (!el.querySelector(`.filter-name`).innerHTML.includes(input)){
                el.classList.add(`d-none`)
            }
        }
    })
}


filter_inp.addEventListener(`input`, ()=>{
    filter_by_status(main_cards, filter_state)
    filter_by_name(main_cards, filter_inp.value)
})


filter_btns[0].addEventListener(`click`, ()=>{
    if (filter_state != 0){
        filter_state = 0;
        move_pill(pill, filter_state)
        filter_by_status(main_cards, filter_state)
        filter_by_name(main_cards, filter_inp.value)
    } else {
        pill.classList.add(`d-none`)
        filter_by_status(main_cards, 3)
        filter_by_name(main_cards, filter_inp.value)
        filter_state = 3;
    }
})
filter_btns[1].addEventListener(`click`, ()=>{
    if (filter_state != 1) {
        filter_state = 1;
        move_pill(pill, filter_state)
        filter_by_status(main_cards, filter_state)
        filter_by_name(main_cards, filter_inp.value)
    } else {
        pill.classList.add(`d-none`)
        filter_by_status(main_cards, 3)
        filter_by_name(main_cards, filter_inp.value)
        filter_state = 3;
    }
})
filter_btns[2].addEventListener(`click`, ()=>{
    if (filter_state != 2){
        filter_state = 2;
        move_pill(pill, filter_state)
        filter_by_status(main_cards, filter_state)
        filter_by_name(main_cards, filter_inp.value)
    } else {
        pill.classList.add(`d-none`)
        filter_by_status(main_cards, 3)
        filter_by_name(main_cards, filter_inp.value)
        filter_state = 3;
    }
})




// СКРИПТ POP-UP ФИЛЬТРА
let filter_node = document.querySelector(`#filter`)
let popup_node = document.querySelector(`#popup`)
let krest_node = document.querySelector(`#krest`)
let popup_card_node = document.querySelector(`#popup_card`)

filter_node.addEventListener(`click`, (evt)=>{
    popup_node.classList.remove(`d-none`)
    popup_card_node.classList.add(`d-none`)
    evt.stopPropagation();
})

krest_node.addEventListener(`click`, ()=>{
    popup_node.classList.add(`d-none`)
})

document.addEventListener(`click`, (evt) => {
    if (!popup_node.contains(evt.target) && !filter_node.contains(evt.target)) {
        popup_node.classList.add(`d-none`);
    }
});