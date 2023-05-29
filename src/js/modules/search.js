import axios from 'axios'
import SimpleBar from 'simplebar'

import { BASE_URL } from './vars.js'

const forms = document.querySelectorAll('.search')
const header = document.querySelector('.header')
const overlay = document.querySelectorAll('.overlay--search')

const btnsClose = document.querySelectorAll('.close-search')

const searchNavItems = document.querySelectorAll('span.search-dropdown__link')

export const openSearch = () => {
  forms.forEach(form => {
    form.addEventListener('submit', e => {
      e.preventDefault()

      const dropdown = form.querySelector('.search-dropdown')
      const list = form.querySelector('.search-dropdown__list')

      const overlay = form.querySelector('.overlay--search')
      const inpWrapper = form.querySelector('.search__inp-wrapper')
      
      const closeIcons = form.querySelector('.close-search')
      const openIcons = form.querySelector('.open-search')

      const popularItemsContainer = form.querySelector('.modal-search-section__items')

      const serieId = form.dataset.serieId
      const typeId = form.dataset.typeId

      const value = form.querySelector('[type="text"]').value.trim()

      if (value === '') return

      form.classList.add('loading')

      axios
        .get(
          typeId
            ? `${BASE_URL}index.php?route=product/search/searchAjaxByTypeTech&key=${value}&type_tech_id=${typeId}`
            : serieId
            ? `${BASE_URL}index.php?route=product/search/searchAjaxSeries&key=${value}&serie_id=${serieId}`
            : `${BASE_URL}index.php?route=product/search/searchAjax&key=${value}`
        )
        .then(({ data }) => {
          form.classList.remove('loading')

          list.innerHTML = ''
          list.classList.remove('fluid')

          if (data.length !== 0) {
            if (form.classList.contains('calculate-model-search__inp-wrapper')) {
              data.forEach(item => {
                list.insertAdjacentHTML('beforeend', `
                  <div class="search-dropdown__item">
                    <div class="search-dropdown__inner">
                      <span class="search-dropdown__link" href="${item.href}" data-href="${item.id}"></span>
                      <div class="search-dropdown__photo">
                        <img src="${item.image}" alt="${item.name}">
                      </div>
                      <div class="search-dropdown__name text-underline text-underline--black">
                        <span>${item.name}</span>
                      </div>
                    </div>
                  </div>
                `)
              })
            } else {
              data.forEach(item => {
                list.insertAdjacentHTML('beforeend', `
                  <div class="search-dropdown__item">
                    <div class="search-dropdown__inner">
                      <a class="search-dropdown__link" href="${item.href}"></a>
                      <div class="search-dropdown__photo">
                        <img src="${item.image}" alt="${item.name}">
                      </div>
                      <div class="search-dropdown__name text-underline text-underline--black">
                        <span>${item.name}</span>
                      </div>
                    </div>
                  </div>
                `)
              })
            }
          } else {
            list.insertAdjacentHTML('beforeend', `
              ${typeId || serieId 
                ? `<a class="search-dropdown__err anchor-btn text-underline text-underline--black" href="#find">
                    <span>Елементів не знайдено, можливо у вас інша модель</span>
                  </a>` 
                : `<div class="search-dropdown__err-wrapper">
                    <div class="search-dropdown__err">Елементів не знайдено</div>
                    <div class="search-dropdown__subtitle">Оберіть зі списку:</div>
                    <ul class="search-dropdown__err-list">
                      <li class="search-dropdown__err-item">
                        <a class="search-dropdown__err-link" href="#"></a>
                        <div class="search-dropdown__err-text text-underline text-underline--black">
                          <span>Cмартфони</span>
                        </div>
                        <div class="search-dropdown__err-icon icon">
                          <img src="./img/search-moc-1.svg" alt="" />
                        <div>
                      </li>
                      <li class="search-dropdown__err-item">
                        <a class="search-dropdown__err-link" href="#"></a>
                        <div class="search-dropdown__err-text text-underline text-underline--black">
                          <span>Cмартфони</span>
                        </div>
                        <div class="search-dropdown__err-icon icon">
                          <img src="./img/search-moc-1.svg" alt="" />
                        <div>
                      </li>
                      <li class="search-dropdown__err-item">
                        <a class="search-dropdown__err-link" href="#"></a>
                        <div class="search-dropdown__err-text text-underline text-underline--black">
                          <span>Cмартфони</span>
                        </div>
                        <div class="search-dropdown__err-icon icon">
                          <img src="./img/search-moc-1.svg" alt="" />
                        <div>
                      </li>
                      <li class="search-dropdown__err-item">
                        <a class="search-dropdown__err-link" href="#"></a>
                        <div class="search-dropdown__err-text text-underline text-underline--black">
                          <span>Cмартфони</span>
                        </div>
                        <div class="search-dropdown__err-icon icon">
                          <img src="./img/search-moc-1.svg" alt="" />
                        <div>
                      </li>
                      <li class="search-dropdown__err-item">
                        <a class="search-dropdown__err-link" href="#"></a>
                        <div class="search-dropdown__err-text text-underline text-underline--black">
                          <span>Cмартфони</span>
                        </div>
                        <div class="search-dropdown__err-icon icon">
                          <img src="./img/search-moc-1.svg" alt="" />
                        <div>
                      </li>
                      <li class="search-dropdown__err-item">
                        <a class="search-dropdown__err-link" href="#"></a>
                        <div class="search-dropdown__err-text text-underline text-underline--black">
                          <span>Cмартфони</span>
                        </div>
                        <div class="search-dropdown__err-icon icon">
                          <img src="./img/search-moc-1.svg" alt="" />
                        <div>
                      </li>
                    </ul>
                  </div>`
              }`
            )
          }

          if (data.length !== 0) {
            const listInstance = new SimpleBar(list, { autoHide: false, })
            listInstance.recalculate()
          } else {
            list.classList.add('fluid')
          }


          overlay && header.classList.add('search-open')
          overlay && overlay.classList.add('visible')
          
          inpWrapper && inpWrapper.classList.add('search-open')
          
          openIcons && openIcons.classList.add('hide')
          closeIcons && closeIcons.classList.add('visible')

          popularItemsContainer && popularItemsContainer.classList.add('hidden')

          dropdown.classList.add('open')
        })
        .catch(err => {
          console.log(err)
        })
    })
  })
}

export const closeSearch = () => {
  overlay && overlay.forEach(overlay => {
    overlay.addEventListener('click', () => {
      overlay.classList.remove('visible')
      overlay.parentElement.querySelector('.search__times').classList.remove('visible')
      overlay.parentElement.querySelector('.search-dropdown').classList.remove('open')

      setTimeout(() => {
        header.classList.remove('search-open')
        overlay.nextElementSibling.classList.remove('search-open')
      }, 350)
    })
  })

  btnsClose && btnsClose.length !== 0 && btnsClose.forEach(btn => {
    btn.addEventListener('click', () => {
      btn.classList.remove('visible')
      btn.nextElementSibling.classList.remove('hide')
      btn.nextElementSibling.nextElementSibling.classList.remove('open')
      
      btn.parentElement.previousElementSibling.classList.remove('visible')
      setTimeout(() => {
        header.classList.remove('search-open')
        btn.parentElement.classList.remove('search-open')
      }, 350)
    })
  })
}

export const validateSeach = () => {
  forms.forEach(form => {
    form.querySelector('[type="text"]').addEventListener('input', e => {
      const btn = form.querySelector('[type="submit"]')

      e.currentTarget.value.trim() !== '' ? btn.classList.add('active') : btn.classList.remove('active')
    })
  })
}

export const clickSeachOutside = () => {
  btnsClose && btnsClose.length !== 0 && window.addEventListener('click', e => {
    let target = e.target

    if (!target.closest('.search')) {
      btnsClose.forEach(btn => btn.click())
    }
  })
}

export const searchNav = () => {
  document.addEventListener('click', e => {
    if (e.target.closest('span.search-dropdown__link')) {
      let item = e.target.closest('span.search-dropdown__link')
      let href = item.dataset.href

      const target = document.querySelector(`[data-id="${href}"]`)
      const targetIndex = Array.from(target.parentElement.children).indexOf(target)

      target.querySelector('.calculate-model-nav__inner').click()
      target.parentElement.parentElement.swiper.slideTo(targetIndex)

      closeSearch()
    }
  })
}

if (forms && forms.length !== 0) {
  openSearch()
  closeSearch()
  validateSeach()
  clickSeachOutside()
  searchNav()
}
