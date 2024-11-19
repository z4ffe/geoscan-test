interface IData {
	title: string
	desc: string
	link: string
	img: string
}

const data: IData[] = [
	{
		"title": "Система навигации «Локус»",
		"desc": "Для создания летной области необходимо четыре ультразвуковых излучателя и специальный модуль на самом аппарате.",
		"link": "https://geoscan.ru",
		"img": 'assets/images/preview/locus-nav.png'
	},
	{
		"title": "Система ИК-навигации",
		"desc": "Дополнительная плата на коптере и базовая станция поддерживают зону полета 12 кв. м.",
		"link": "https://geoscan.ru",
		"img": 'assets/images/preview/ir-nav.png'
	},
	{
		"title": "Оптическая система навигации",
		"desc": "Идет в базовой комплектации. Позиционирование происходит благодаря оптическому датчику, отслеживающему смещение под Пионером.",
		"link": "https://geoscan.ru",
		"img": 'assets/images/preview/optical-nav.png'
	},
	{
		"title": "GPS-система навигации",
		"desc": "Предназначена для пилотирования коптером на открытом воздухе. Для этого на главную плату автопилота нужно установить дополнительный модуль.",
		"link": "https://geoscan.ru",
		"img": 'assets/images/preview/gps-nav.png'
	}
]

const previewImg = document.querySelector('.content__image')
const contentControls = document.querySelector('.content__controls')
const contentLink = document.querySelector('.content__link')


let CURRENT = 0
let BUTTONS: NodeListOf<HTMLButtonElement> | undefined[] = []


const changeImage = (idx: number) => {
	previewImg.classList.add('content__image-fadeout')

	setTimeout(() => {
		previewImg.setAttribute('src', data[idx].img)
		previewImg.setAttribute('alt', data[idx].title)
		previewImg.classList.remove('content__image-fadeout')
		previewImg.classList.add('content__image-fadein')
	}, 250)
}

const changeButton = (index: number) => {
	BUTTONS[CURRENT].classList.toggle('content__button-active')
	BUTTONS[index].classList.toggle('content__button-active')
	CURRENT = index
}

const renderButtons = () => {
	data.forEach((data,idx) => {
		contentControls.insertAdjacentHTML('beforeend',`<button class='content__button ${!idx ? 'content__button-active' : ''}'><span>${data.title}</span></buton>`)
		contentLink.setAttribute('href', data.link)
	})

	BUTTONS = document.querySelectorAll('.content__controls button')

	BUTTONS.forEach((button,idx) => button.addEventListener('click', (event) => {
		changeButton(idx)
		changeImage(idx)
	}))
}

window.onload = () => {
	previewImg.setAttribute('src', data[0].img)
	renderButtons()
}
