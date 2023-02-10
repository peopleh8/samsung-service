/* Маска */
import Inputmask from "../../../node_modules/inputmask/dist/inputmask.es6.js"

const setMask = (selector, mask) => {
  let phoneFields = document.querySelectorAll(selector)
  let maskInstance = new Inputmask(mask, { showMaskOnHover: false, showMaskOnFocus: false })
  
  return maskInstance.mask(phoneFields)
}

export default setMask

setMask('input[type="tel"]', '+38 (999) 999-99-99')
setMask('input[name="receipt"]', '9999 9999')