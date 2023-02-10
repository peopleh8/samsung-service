const checkbox = document.querySelectorAll('.services-item__check'),
      servicesBtn = document.querySelector('.services__btn')

export const selectServices = () => {
  checkbox.forEach(check => {
    check.addEventListener('change', () => {
      const checked = [...checkbox].filter(item => item.checked)

      checked && checked.length !== 0 ? servicesBtn.dataset.src = '#services' : servicesBtn.dataset.src = '#contact'
    })
  })
  
}

checkbox && checkbox.length !== 0 && selectServices()