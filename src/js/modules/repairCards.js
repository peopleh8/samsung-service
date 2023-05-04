import gsap from 'gsap'
import Flip from 'gsap/Flip.js'
import { anchorScroll } from './functions.js'

gsap.registerPlugin(Flip)

const repairDeskRows = document.querySelectorAll('.repair-cards-desk .repair__row')
const repairMobItems = document.querySelectorAll('.repair-cards-mob .repair-item__visible')

repairDeskRows.forEach(row => {
  row.querySelectorAll('.repair-item__inner').forEach((item, index) => {
    item.addEventListener('mouseenter', () => {
      let slider = item.querySelector('.repair-item-slider')
      let parent = item.parentElement
      let items = parent.parentElement.querySelectorAll('.repair-item')

      if (slider) {
        items.forEach((innerItem, innerIndex) => {
          if (index !== innerIndex) {
            innerItem.classList.add('neighborhood')
          }
        })
        
        parent.classList.add('active')
      }
    })

    item.addEventListener('mouseleave', () => {
      let items = item.parentElement.parentElement.querySelectorAll('.repair-item')
      items.forEach(item => item.classList.remove('active', 'neighborhood'))
    })
  })
})

repairMobItems.forEach((item, index) => {
  item.addEventListener('click', () => {
    const slider = item.parentElement.querySelector('.repair-item__popular-overflow')

    if (!slider) return 

    const state = Flip.getState('.repair-cards-mob .repair-item')

    let startHeight = gsap.getProperty('.repair-cards__wrapper', 'height')

    repairMobItems.forEach((el, itemIndex) => {
      if (itemIndex !== index) {
        el.parentElement.parentElement.classList.remove('active')
      }
    })

    item.parentElement.parentElement.classList.toggle('active')

    item.parentElement.parentElement.classList.contains('active') && anchorScroll(window, '#repair', 1)

    let endHeight = gsap.getProperty('.repair-cards__wrapper', 'height')

    const flip = Flip.from(state, {
      absolute: true,
      duration: 0.4, 
      ease: 'power1.inOut'
    })

    flip.fromTo('.repair-cards__wrapper', {
      height: startHeight
    }, {
      height: endHeight,
      clearProps: 'height',
      duration: flip.duration()
    }, 0)
  })
})