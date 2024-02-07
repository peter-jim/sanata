//mobile nav 相关功能
const overlay = document.createElement('div')
overlay.classList.add('overlay')
const menuwrapper = document.getElementById('menuwrapper')

function addMenuButtonListener() {
  const menuButton = document.getElementById('menuButton')
  const menu = document.getElementById('menu')

  if (menuButton) {
    menuButton.addEventListener('click', toggleMenu)
  }

    overlay.addEventListener('click', toggleMenu)

  if (menu) {
    if (menu.classList.contains('menu-mobile')) {
      toggleMenu()
    }
  }


  window.addEventListener('resize', () => {
    if (window.innerWidth >= 640 && menu.classList.contains('menu-mobile')) {
      toggleMenu()
    }
  })
}

function loadFile(filePath, elementId) {
  console.log('loadFile called with', filePath, elementId) // 添加调试日志
  return fetch(filePath) // 注意这里的 return 语句
    .then(function (response) {
      return response.text()
    })
    .then(function (html) {
      document.getElementById(elementId).innerHTML = html
    })
    .catch(function (err) {
      console.warn('Something went wrong.', err)
    })
}


// Load the header and footer
loadFile('/header.html', 'header').then(() => {
  addMenuButtonListener()
})
loadFile('/footer.html', 'footer')

function toggleMenu() {
  const menuButton = document.getElementById('menuButton')
  const menu = document.getElementById('menu')
  const menuwrapper = document.getElementById('menuwrapper')
  const header = document.getElementById('header-inner')

  console.log('toggleMenu called') // 添加调试日志
  menu.classList.toggle('hidden')
  menu.classList.toggle('menu-mobile')
  header.classList.toggle('header-mobile')

  if (menu.classList.contains('menu-mobile')) {
    console.log('Menu is now mobile, adding overlay') // 添加调试日志
    document.body.appendChild(overlay)
    document.body.style.overflow = 'hidden'
    document.documentElement.style.overflow = 'hidden'
    overlay.style.display = 'block'
  } else {
    console.log('Menu is now hidden, removing overlay') // 添加调试日志
    document.body.style.overflow = ''
    document.documentElement.style.overflow = ''
    overlay.style.display = 'none'
  }
}


function addScrollListener() {
  // 这个功能现在不能用，还要调试一段时间
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault()

      const targetId = this.getAttribute('href').substring(1)
      const targetElement = document.getElementById(targetId)
      alert(targetElement)

      if (targetElement) {
        const offset = window.innerHeight * 0.1
        const targetPosition = targetElement.offsetTop - offset

        window.scrollTo({ top: targetPosition, behavior: 'smooth' })
      }
    })
  })

}

// Preload images 减少图片加载时间
document.addEventListener('DOMContentLoaded', function () {
  const preloadImages = document.querySelectorAll('[data-high-res-image]')

  preloadImages.forEach((imgElement) => {
    const highResImage = imgElement.getAttribute('data-high-res-image')
    const img = new Image()
    img.onload = () => {
      if (imgElement.tagName === 'IMG') {
        imgElement.src = highResImage
      } else {
        imgElement.style.backgroundImage = `url('${highResImage}')`
      }
    }
    img.src = highResImage
  })

  const bgElements = document.querySelectorAll('[data-high-res-bg]')

  bgElements.forEach((element) => {
    const highResBg = element.getAttribute('data-high-res-bg')
    const img = new Image()
    img.onload = () => {
      element.style.backgroundImage = `url('${highResBg}')`
    }
    img.src = highResBg
  })
})
