import { anchorScroll } from './functions.js'

const repairItems = document.querySelectorAll('.repair-item')
const burger = document.querySelector('.burger')

const hashChangeHandler = () => {
  let hash = window.location.hash.slice(1)

  if (!hash) return

  if (hash === 'more') {
    anchorScroll(window, document.querySelector('.find'), 1)

    return
  }

  let target = 
    innerWidth >= 1161 
      ? document.querySelector(`.repair-cards .repair-item[data-serie-id="${hash}"]`) 
      : document.querySelector(`.repair__cards-mob .repair-item[data-serie-id="${hash}"]`)

  repairItems.forEach(item => {
    item.removeAttribute('id')
    innerWidth >= 1161 && item.classList.remove('active')
  })

  target.setAttribute('id', hash)

  if (innerWidth >= 1161) {
    anchorScroll(window, document.getElementById(hash), 1)
    target.classList.add('active')
    const items = target.parentElement.querySelectorAll('.repair-item')

    items.forEach(item => item.dataset.serieId !== hash && item.classList.add('neighborhood'))
  } else {
    burger.classList.contains('open') && burger.click()
    setTimeout(() => {
      target.querySelector('.repair-item__visible').click()
    }, 700)
  }

}

repairItems.forEach(item => {
  item.addEventListener('mouseleave', () => {
    item.parentElement.classList.contains('repair-cards-desk') && item.classList.remove('active', 'neighborhood')
  })
})

window.addEventListener('load', hashChangeHandler)
window.addEventListener('hashchange', hashChangeHandler)