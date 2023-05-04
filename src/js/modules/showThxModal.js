import { Fancybox } from '@fancyapps/ui'
import { getScrollbarWidth } from './functions.js'

export const showThxModal = () => {
  Fancybox.show(
    [{ src: "#thx", type: 'inline' }],
    {
      showClass: 'fancybox-fadeIn',
      hideClass: 'fancybox-fadeOut',
      dragToClose: false,
      on: {
        init: () => {
          const fixedBlocks = document.querySelectorAll('.fixed-block')
    
          fixedBlocks.forEach(item => item.style.paddingRight = `${getScrollbarWidth()}px`)
        },
        destroy: () => {
          const fixedBlocks = document.querySelectorAll('.fixed-block')

          fixedBlocks.forEach(item => item.style.paddingRight = '0')
        }
      }
    }
  )
}