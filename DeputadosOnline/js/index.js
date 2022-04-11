// Animacao Header

var nav = document.querySelector('.navHeader')
var hamburguer = document.querySelector('.hamburguerHeader')
let headerInHamburguer = document.querySelector('.headerInHamburguer')
let headerAnimation = document.querySelector('.headerAnimation')

var container = document.querySelector('.container')
var icon = document.querySelector('.fa-bars')
var redimensionar = document.querySelector('.redimensionar')

headerInHamburguer.style.display = 'none'
let hamburterButton = true

hamburguer.addEventListener('click', () => {
  if (hamburterButton) {
    headerInHamburguer.style.display = ''
    redimensionar.style.animation = 'headerOpenAnimation 1s'
    headerInHamburguer.style.animation = 'headerOpenAnimation 1s'
    hamburterButton = false
  } else {
    headerInHamburguer.style.animation = 'headerCloseAnimation 1s'
    redimensionar.style.animation = 'headerCloseAnimation 1s'
    icon.class = 'fa-solid fa-xmark-large fa-2xl'
    setTimeout(() => {
      headerInHamburguer.style.display = 'none'
      redimensionar.style.animation = 'headerOpenAnimation 1s'
      hamburterButton = true
    }, 700)
    setTimeout(() => {
      redimensionar.style.animation = ''
    }, 2000)
  }
})

// Jquery Links Direcionados

jQuery(document).ready(($) => {
  $('.scroll').click((e) => {
    e.preventDefault()
    $('html,body').animate({ scrollTop: $(this.hash).offset().top }, 800)
  })
})

// Deputado Objeto

class Deputado {
  constructor(
    email,
    id,
    idLegislatura,
    nome,
    siglaPartido,
    siglaUf,
    urlFoto,
    uriPartido,
    uri
  ) {
    this.email = email
    this.id = id
    this.idLegislatura = idLegislatura
    this.nome = nome
    this.siglaPartido = siglaPartido
    this.siglaUf = siglaUf
    this.urlFoto = urlFoto
    this.uriPartido = uriPartido
    this.uri = uri
  }

  get createHtmlDeputado() {
    return this.novoDeputado()
  }

  novoDeputado() {
    let divBox = document.createElement('div')
    divBox.className = 'box'

    let imgBox = document.createElement('img')
    imgBox.setAttribute('width', '100%')
    imgBox.setAttribute('height', '50%')
    imgBox.setAttribute('src', this.urlFoto)
    imgBox.setAttribute('alt', this.nome)

    let divInBox = document.createElement('div')

    let h1Box = document.createElement('h1')
    h1Box.className = 'text3'
    h1Box.innerText = `${this.nome} (${this.siglaPartido} - ${this.siglaUf})`

    let ulBox = document.createElement('ul')
    ulBox.className = 'text4'
    ulBox.innerText = 'Detalhes:'

    let liBoxLegislatura = document.createElement('li')
    liBoxLegislatura.innerText = `Legislatura em que exerceu mandato: ${this.idLegislatura}ª`

    let liBoxPartidos = document.createElement('li')
    liBoxPartidos.innerText = `Partidos pelos quais ja foi deputado: ${this.siglaPartido}ª`

    let divBoxIcon = document.createElement('div')
    divBoxIcon.className = 'containerIcon'

    let icon1 = document.createElement('i')
    icon1.className = 'fa-brands fa-facebook-square fa-xl'

    let icon2 = document.createElement('i')
    icon2.className = 'fa-brands fa-twitter-square fa-xl'

    let icon3 = document.createElement('i')
    icon3.className = 'fa-brands fa-instagram-square fa-xl'

    divBox.appendChild(imgBox)
    divBox.appendChild(divInBox)

    divInBox.appendChild(h1Box)
    divInBox.appendChild(ulBox)
    divInBox.appendChild(divBoxIcon)

    ulBox.appendChild(liBoxLegislatura)
    ulBox.appendChild(liBoxPartidos)

    divBoxIcon.appendChild(icon1)
    divBoxIcon.appendChild(icon2)
    divBoxIcon.appendChild(icon3)

    return divBox
  }
}

class Partido {
  constructor(id, nome, sigla, url) {
    this.id = id
    this.nome = nome
    this.nome = sigla
    this.url = url
  }

  get createHtmlPartido() {
    return this.novoPartido()
  }

  novoPartido() {
    let divBox = document.createElement('div')
    divBox.className = 'box'

    let imgBox = document.createElement('img')
    imgBox.setAttribute('width', '100%')
    imgBox.setAttribute('height', '50%')
    imgBox.setAttribute('src', this.url)
    imgBox.setAttribute('alt', this.nome)

    let divInBox = document.createElement('div')

    let h1Box = document.createElement('h1')
    h1Box.className = 'text3'
    h1Box.innerText = this.nome

    let divBoxIcon = document.createElement('div')
    divBoxIcon.className = 'containerIcon'

    let icon1 = document.createElement('i')
    icon1.className = 'fa-brands fa-facebook-square fa-xl'

    let icon2 = document.createElement('i')
    icon2.className = 'fa-brands fa-twitter-square fa-xl'

    let icon3 = document.createElement('i')
    icon3.className = 'fa-brands fa-instagram-square fa-xl'

    divBox.appendChild(imgBox)
    divBox.appendChild(divInBox)

    divInBox.appendChild(h1Box)
    divInBox.appendChild(divBoxIcon)

    divBoxIcon.appendChild(icon1)
    divBoxIcon.appendChild(icon2)
    divBoxIcon.appendChild(icon3)

    return divBox
  }
}

// Request Api

var AllDeputados =
  'https://dadosabertos.camara.leg.br/api/v2/deputados?pagina=1&itens=20'

var AllPartidos =
  'https://dadosabertos.camara.leg.br/api/v2/partidos?pagina=1&itens=20'

fetch(AllDeputados)
  .then(function (response) {
    return response.json()
  })
  .then((e) => {
    let deputados = e.dados
    console.log(deputados)
    var containerBox = document.querySelector('.containerBox')

    deputados.forEach((e) => {
      const newDeputado = new Deputado(
        e.email,
        e.id,
        e.idLegislatura,
        e.nome,
        e.siglaPartido,
        e.siglaUf,
        e.urlFoto,
        e.uriPartido,
        e.uri
      )

      containerBox.appendChild(newDeputado.createHtmlDeputado)
    })
  })

fetch(AllPartidos)
  .then(function (response) {
    return response.json()
  })
  .then((allPartidos) => {
    let partidos = allPartidos.dados
    var containerPartido = document.querySelector('.partido')

    partidos.forEach((partidoUnico) => {
      fetch(partidoUnico.uri)
        .then(function (response) {
          return response.json()
        })
        .then((response) => {
          let partidosFoto = response.dados.urlLogo

          testImage(partidosFoto, 200).then(function () {
            const newPartidos = new Partido(
              partidoUnico.id,
              partidoUnico.nome,
              partidoUnico.sigla,
              partidosFoto
            )
            containerPartido.appendChild(newPartidos.createHtmlPartido)
          })
        })
    })
  })

function testImage(url, timeoutT) {
  return new Promise(function (resolve, reject) {
    var timeout = timeoutT || 5000
    var timer,
      img = new Image()
    img.onerror = img.onabort = function () {
      clearTimeout(timer)
      reject('error')
    }
    img.onload = function () {
      clearTimeout(timer)
      resolve('success')
    }
    timer = setTimeout(function () {
      img.src = '//!!!!/test.jpg'
      reject('timeout')
    }, timeout)
    img.src = url
  })
}
