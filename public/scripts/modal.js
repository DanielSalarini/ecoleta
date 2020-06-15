const buttonSearch = document.querySelector('#page-home main a')
const modal = document.querySelector('#modal')
const closeHome = document.querySelector('#modal .header a')

buttonSearch.addEventListener('click', () => {
    modal.classList.remove('hide')
})

closeHome.addEventListener('click', () => {
    modal.classList.add('hide')
})