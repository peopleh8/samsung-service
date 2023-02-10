const header = document.querySelector('.header'),
      headerTop = header.querySelector('.header-top'),
      headerBot = header.querySelector('.header-bot')

let headerTopHeight = headerBot.offsetTop

const setStickyHeader = () => scrollY > headerTopHeight - 1 ? headerBot.classList.add('sticky', 'fixed-block') : headerBot.classList.remove('sticky', 'fixed-block') 

window.addEventListener('scroll', setStickyHeader)
window.addEventListener('load', setStickyHeader)
window.addEventListener('resize', setStickyHeader)