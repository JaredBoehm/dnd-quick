function accordion(el) {
    let accordionHead = el.firstElementChild
    let accordionBody = el.lastElementChild

    let dropdown = accordionHead.querySelector('img')

    if (accordionBody.style.maxHeight) {
        accordionBody.style.maxHeight = null
        dropdown.style.transform = 'rotate(0deg)'
        accordionHead.style.marginBottom = '0'
    } else {
        accordionBody.style.maxHeight = accordionBody.scrollHeight + "px"
        dropdown.style.transform = 'rotate(180deg)'
        accordionHead.style.marginBottom = '2rem'
    } 
}