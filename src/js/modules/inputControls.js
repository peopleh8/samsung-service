const fields = document.querySelectorAll('.field')

export const focusField = () => {
  fields.forEach(field => {
    field.addEventListener('focus', e => {
      e.currentTarget.nextElementSibling.classList.add('focused')
    })
  })
}

export const blurField = () => {
  fields.forEach(field => {
    field.addEventListener('blur', e => {
      let target = e.currentTarget
      
      target.value.trim() === '' && target.nextElementSibling.classList.remove('focused')
    })
  })
}

if (fields && fields.length !== 0) {
  focusField()
  blurField()
}