export const move_pill = (pill, status)=>{
    let parameters = {
        0: {
            marginLeft: "0%",
            transform: "translate(0%, 0%)",
            bg: `bg-success`,
            del_bg: [`bg-warning`,`bg-danger`]
        },
        1: {
            marginLeft: "50%",
            transform: "translate(-46%, 0%)",
            bg: `bg-warning`,
            del_bg: [`bg-success`,`bg-danger`]
        },
        2: {
            marginLeft: "100%",
            transform: "translate(-100%, 0%)",
            bg: `bg-danger`,
            del_bg: [`bg-warning`,`bg-success`]
        },
        3: {
            marginLeft: "0%",
            transform: "translate(-0%, 0%)",
            bg: `bg-warning`,
            del_bg: [`bg-success`,`bg-danger`]
        },
    }
    pill.classList.remove(`d-none`)
    pill.style.marginLeft = parameters[status].marginLeft
    pill.style.transition = "1s"
    pill.style.transform = parameters[status].transform
    parameters[status].del_bg.forEach(el => {
        pill.classList.remove(el)
    });
    pill.classList.add(`${parameters[status].bg}`)
}
