const moreBtns = document.querySelectorAll('.more')

export const toggleMore = () => {
  moreBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      let container = btn.parentElement.previousElementSibling,
          containerExpandHeight = container.scrollHeight

      container.classList.toggle('expand')
      container.classList.contains('expand') ? container.style.height = `${containerExpandHeight}px` : container.style.height = ''

      btn.classList.add('fade')

      if (container.classList.contains('expand')) {
        setTimeout(() => btn.textContent = 'read less', 200)
      } else {
        setTimeout(() => btn.textContent = 'read more', 200)
      }
      
      setTimeout(() => btn.classList.remove('fade'), 250)
    })
  })
}


moreBtns && moreBtns.length !== 0 && toggleMore()