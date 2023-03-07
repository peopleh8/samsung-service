import gsap from 'gsap'
import Flip from 'gsap/Flip.js'

gsap.registerPlugin(Flip)

const repairItems = document.querySelectorAll('.repair-cards-mob.repair-cards-mob--collapse .repair-item__visible')

repairItems.forEach((item, index) => {
  item.addEventListener('click', () => {
    const state = Flip.getState('.repair-item')

    let startHeight = gsap.getProperty('.repair-cards__wrapper', 'height')

    item.parentElement.parentElement.classList.toggle('active')

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