import Swiper, { EffectFade, Pagination, Navigation, FreeMode, Mousewheel, Grid } from 'swiper'

export const introSlider = new Swiper('.main-intro-slider', {
  modules: [EffectFade, Pagination, Navigation],
  loop: true,
  effect: 'fade',
  fadeEffect: {
    crossFade: true
  },
  slidesPerView: 1,
  speed: 500,
  spaceBetween: 0,
  pagination: {
    el: '.main-intro-pagination',
    clickable: true,
  },
  navigation: {
    prevEl: '.main-intro__prev',
    nextEl: '.main-intro__next'
  },
  on: {
    slideChange: swiper => {
      let index = swiper.realIndex
      const popular = document.querySelector('.popular')
      
      if (index !== 0) {
        popular.style.transitionDuration = '.5s'
        popular.style.zIndex = -1
        popular.style.opacity = 0
      } else {
        popular.style.transitionDuration = '.5s'
        popular.style.zIndex = ''
        popular.style.opacity = 1
      }
    }
  }
})

export const trustSlider = new Swiper('.main-trust-slider', {
  slidesPerView: 4,
  speed: 500,
  spaceBetween: 30,
  breakpoints: {
    1441: {
    spaceBetween: 30,
    },
    1025: {
      slidesPerView: 4,
      spaceBetween: 24,
    },
    768: {
      slidesPerView: 4,
      spaceBetween: 16,
    },
    645: {
      slidesPerView: 2,
      spaceBetween: 24,
    },
    0: {
      slidesPerView: 1.3,
      spaceBetween: 10,
    }
  }
})

export const certificatesSlider = new Swiper('.about-certificates-slider', {
  slidesPerView: 3,
  speed: 500,
  spaceBetween: 30,
  initialSlide: 1,
  breakpoints: {
    1441: {
      spaceBetween: 30,
    },
    992: {
      spaceBetween: 30,
      slidesPerView: 3,
    },
    596: {
      spaceBetween: 0,
      slidesPerView: 3,
    },
    0: {
      spaceBetween: 20,
      slidesPerView: 1,
    }
  }
})

export const blogMobSlider = innerWidth <= 585 && new Swiper('.blog-intro-slider', {
  modules: [Pagination],
  slidesPerView: 1.3,
  speed: 500,
  spaceBetween: 10,
  pagination: {
    el: '.blog-intro__slider-pagination',
    clickable: true,
  },
})

export const nonwarrantyMobSlider = innerWidth <= 585 && new Swiper('.nonwarranty-intro-slider', {
  slidesPerView: 1.3,
  speed: 500,
  spaceBetween: 10,
})

export const findNav = new Swiper('.find-nav', {
  modules: [FreeMode, Mousewheel],
  slidesPerView: 'auto',
  spaceBetween: 24,
  freeMode: true,
  mousewheel: {
    invert: false,
  },
  breakpoints: {
    586: {
      spaceBetween: 24,
    },
    0: {
      spaceBetween: 16,
    }
  }
})

export const tabSlider = new Swiper('.tab-slider', {
  modules: [EffectFade],
  effect: 'fade',
  autoHeight: true,
  speed: 200,
  allowTouchMove: false,
  fadeEffect: {
    crossFade: false
  },
})

// export const menuTabSlider = new Swiper('.menu-tab-slider', {
//   modules: [EffectFade],
//   effect: 'fade',
//   autoHeight: true,
//   speed: 200,
//   allowTouchMove: false,
//   fadeEffect: {
//     crossFade: false
//   },
// })

document.querySelectorAll('.menu-tab-slider').forEach(slider => {
  new Swiper(slider, {
    modules: [EffectFade],
    effect: 'fade',
    autoHeight: true,
    speed: 200,
    allowTouchMove: false,
    fadeEffect: {
      crossFade: false
    },
  })
})

export const calculateInfoSlider = new Swiper('.calculate-info-slider', {
  modules: [EffectFade],
  effect: 'fade',
  autoHeight: true,
  speed: 200,
  allowTouchMove: false,
  fadeEffect: {
    crossFade: false
  },
})

export const calculateContentSlider = new Swiper('.calculate-content-slider', {
  modules: [EffectFade],
  effect: 'fade',
  autoHeight: true,
  speed: 200,
  allowTouchMove: false,
  fadeEffect: {
    crossFade: false
  },
})

export const typeSlider = new Swiper('.calculate-type-slider', {
  modules: [Navigation, Pagination],
  slidesPerView: 4,
  spaceBetween: 30,
  speed: 500,
  pagination: {
    el: '.calculate-type__slider-pagination',
    clickable: true,
  },
  navigation: {
    prevEl: '.calculate-type__slider-prev',
    nextEl: '.calculate-type__slider-next'
  },
  breakpoints: {
    1441: {
      slidesPerView: 4,
      spaceBetween: 30,
    },
    1025: {
      slidesPerView: 3,
      spaceBetween: 24,
    },
    586: {
      slidesPerView: 3.1,
      spaceBetween: 16,
    },
    0: {
      slidesPerView: 1.8,
      spaceBetween: 10,
    }
  }
})

document.querySelectorAll('.calculate-model-main').forEach(slider => {
  new Swiper(slider, {
    modules: [EffectFade],
    effect: 'fade',
    autoHeight: true,
    speed: 200,
    allowTouchMove: false,
    fadeEffect: {
      crossFade: false
    },
  })
})

export const modelNav = new Swiper('.calculate-model-nav', {
  slidesPerView: 8, 
  spaceBetween: 6,
  breakpoints: {
    1441: {
      slidesPerView: 8, 
      spaceBetween: 6,
    },
    1025: {
      slidesPerView: 6, 
      spaceBetween: 12,
    },
    586: {
      slidesPerView: 6, 
      spaceBetween: 12,
    },
    0: {
      slidesPerView: 2.9, 
      spaceBetween: 8,
    }
  }
})


document.querySelectorAll('.repair-item-slider').forEach((slider, index) => {
  new Swiper(slider, {
    modules: [Grid, Pagination],
    slidesPerView: 5.5,
    speed: 500,
    grid: {
      rows: 2,
    },
    pagination: {
      el: `.repair-item__popular-pagination-${slider.dataset.serieId}`,
      clickable: true
    },
    breakpoints: {
      1441: {
        grid: {
          rows: 2,
        },
        slidesPerView: 5.5,
      },
      0: {
        grid: {
          rows: 1,
        },
        slidesPerView: 3.5,
      }
    },
  })
})

document.querySelectorAll('.warranty-cover-slide__inner').forEach(slider => {
  new Swiper(slider, {
    slidesPerView: 3,
    speed: 500,
    spaceBetween: 30,
    breakpoints: {
      1441: {
        slidesPerView: 3,
        spaceBetween: 30,
      },
      1161: {
        slidesPerView: 3,
        spaceBetween: 24,
      },
      691: {
        slidesPerView: 1.8,
        spaceBetween: 16,
      },
      0: {
        slidesPerView: 1.25,
        spaceBetween: 10,
      }
    },
    on: {
      slideChange: () => {
        document.querySelectorAll('.warranty-cover-chars__tooltip-section').forEach(item => item.classList.remove('visible'))
      }
    }
  })
})

export const warrantyInfoMob = innerWidth <= 1160 && new Swiper('.warranty-info-slider', {
  modules: [Pagination],
  slidesPerView: 1.5,
  speed: 500,
  spaceBetween: 40,
  pagination: {
    el: '.warranty-info__slider-pagination',
    clickable: true,
  },
  breakpoints: {
    586: {
      slidesPerView: 1.5,
      spaceBetween: 40,
    },
    0: {
      slidesPerView: 1,
      spaceBetween: 20,
    }
  }
})