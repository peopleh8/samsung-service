const links = document.querySelectorAll('[data-link]')

export const openLink = () => {
  links.forEach(link => {
    link.addEventListener('click', () => window.open(link.dataset.link))
  })
}

links && links.length !== 0 && openLink()