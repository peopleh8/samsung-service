import SimpleBar from 'simplebar'
import ResizeObserver from 'resize-observer-polyfill'

window.ResizeObserver = ResizeObserver

const sections = document.querySelectorAll('.scroll-section')

export const setCustomScroll = () => {
  sections.forEach(section => new SimpleBar(section, { 
    autoHide: false,
  }))
}

sections && sections.length !== 0 && setCustomScroll()