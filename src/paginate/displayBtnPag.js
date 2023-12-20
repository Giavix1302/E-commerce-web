const displayBtnPag = (container, pages, activeIndex) => {
    let btns = pages.map((_, pageIndex) => {
        return `<button class="num-page ${
            activeIndex === pageIndex ? "active-page" : "null"
        }" data-index="${pageIndex}">${pageIndex + 1}</button>`
    })
    btns.push(`
        <button class="next-page">
            <i class="fa-solid fa-arrow-right"></i>
        </button>`)
    btns.unshift(`
        <button class="prev-page">
            <i class="fa-solid fa-arrow-left"></i>
        </button>`)
        container.innerHTML = btns.join('');
}
export default displayBtnPag;