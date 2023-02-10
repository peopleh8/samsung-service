const images = document.querySelectorAll('.zoom-img')

const zoomHandler = e => {
  let zoomer = e.currentTarget,
      offsetX,
      offsetY,
      x,
      y

  e.offsetX ? offsetX = e.offsetX : offsetX = e.touches[0].pageX
  e.offsetY ? offsetY = e.offsetY : offsetX = e.touches[0].pageX
  x = offsetX / zoomer.offsetWidth * 100
  y = offsetY / zoomer.offsetHeight * 100
  zoomer.style.backgroundPosition = x + '% ' + y + '%'
}

export const zoomImage = () => images.forEach(img => img.addEventListener('mousemove', zoomHandler))

images && images.length !== 0 && zoomImage()