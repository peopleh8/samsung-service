import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger.js'
import GoogleMapsApi from './GoogleMapsApi.js'
import { styles } from './styles.js'
import { anchorScroll } from '../functions.js'
import { GOOGLE_MAPS_API_KEY } from '../vars.js'
import { renderContent } from './renderContent.js'
import { locations } from './locations.js'

gsap.registerPlugin(ScrollTrigger)

const mapWrapper = document.querySelector('#map')
const gmapApi = new GoogleMapsApi(GOOGLE_MAPS_API_KEY)

const initMap = (mapSelector) => {
  const element = document.getElementById(mapSelector)
  const map = new google.maps.Map(element, {
    zoom: 10,
    center: new google.maps.LatLng(locations[0].lat, locations[0].lng),
    mapTypeControl: true,
    mapTypeControlOptions: {
      style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
      position: google.maps.ControlPosition.TOP_CENTER,
    },
    zoomControl: true,
    zoomControlOptions: {
      position: google.maps.ControlPosition.LEFT_CENTER,
    },
    scaleControl: true,
    streetViewControl: true,
    streetViewControlOptions: {
      position: google.maps.ControlPosition.LEFT_TOP,
    },
    fullscreenControl: true,
    styles: styles.styles
  })

  const infowindow = new google.maps.InfoWindow()

  let i, marker
  const markers = []

  for (i = 0; i < locations.length; i++) {  
    marker = new google.maps.Marker({
      position: new google.maps.LatLng(locations[i].lat, locations[i].lng),
      label: { 
        color: '#fff', 
        fontWeight: '500', 
        fontSize: '10px', 
        lineHeight: '150%', 
        fontFamily: 'IBMPlexSans', 
        className: 'map-marker', 
        text: `${i + 1}` 
      },
      optimized: true,
      map: map,
      icon: '.'
    })

    markers.push(marker)
    
    google.maps.event.addListener(marker, 'click', (function(marker, i) {
      return function() {
        infowindow.setContent(renderContent(locations[i], i))
        infowindow.open(map, marker)

        const elements = document.querySelectorAll('[id^=card]')

        elements.forEach((elem, index) => i === index && elem.querySelector('.header-elem').click())
      }
    })(marker, i))
  }

  if (window.location.pathname.indexOf('contact') !== -1) {
    infowindow.setContent(renderContent(locations[0], 0))
    infowindow.open(map, markers[0])
  }

  window.markers = markers
  window.map = map
  window.infowindow = infowindow

  google.maps.event.addListener(map, 'click', function () {
    infowindow.close()

    const elements = [...document.querySelectorAll('[id^=card]')],
          activeEl = elements.filter(elem => elem.classList.contains('active'))[0]

    activeEl && activeEl.querySelector('.header-elem').click()
  })

  google.maps.event.addListener(infowindow, 'domready', function() {
    let windowBtn = document.querySelector('.window-btn')
    let windowLogo = document.querySelector('.window-logo')
    windowBtn && windowBtn.addEventListener('click', e => {
      e.preventDefault()

      let href = `#${e.currentTarget.href.split('#')[1]}`
        
      anchorScroll(window, document.querySelector(href), 1)
    })

    windowLogo && windowLogo.addEventListener('click', e => {
      e.preventDefault()

      if (innerWidth >= 1161) return

      let href = `#${e.currentTarget.href.split('#')[1]}`
        
      anchorScroll(window, document.querySelector(href), 1)
    })
  })
}

gmapApi.load().then(() => mapWrapper && initMap('map'))