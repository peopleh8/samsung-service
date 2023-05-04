const checkbox = document.querySelectorAll('.services-item__check'),
      servicesBtn = document.querySelectorAll('.services__btn[data-fancybox]')

export const selectServices = () => {
  checkbox.forEach(check => {
    check.addEventListener('change', () => {
      const checked = [...checkbox].filter(item => item.checked)

      checked && checked.length !== 0 ? servicesBtn.forEach(btn => btn.dataset.src = '#services') : servicesBtn.forEach(btn => btn.dataset.src = '#contact')
    })
  })
  
}

checkbox && checkbox.length !== 0 && selectServices()