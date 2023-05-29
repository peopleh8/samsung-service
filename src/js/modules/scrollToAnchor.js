import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger.js'
import { anchorScroll } from './functions.js'

gsap.registerPlugin(ScrollTrigger)

export const scrollToAnchor = () => {
  document.addEventListener('click', e => {
    if (e.target.closest('.anchor-btn')) {
      e.preventDefault()

      document.body.click()

      ScrollTrigger.refresh()

      let href = `#${e.target.href.split('#')[1]}`

      anchorScroll(window, document.querySelector(href), 1)
    }
  })
}

scrollToAnchor()