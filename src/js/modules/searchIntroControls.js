const forms = document.querySelectorAll('.search')

export const openIntroSearch = () => {
  forms.forEach(form => {
    form.addEventListener('submit', e => {
      e.preventDefault()

      console.log(1)
    })
  })
}


export const closeIntroSearch = () => {
  console.log(2)
}

if (forms && forms.length !== 0) {
  openIntroSearch()
  closeIntroSearch()
}