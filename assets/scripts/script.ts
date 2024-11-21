interface IData {
	title: string
	desc: string
	link: string
	img: string
}

const positionSystemsData: IData[] = [
	{
		'title': 'Система навигации «Локус»',
		'desc': 'Для создания летной области необходимо четыре ультразвуковых излучателя и специальный модуль на самом аппарате.',
		'link': 'https://geoscan.ru/',
		'img': 'assets/images/preview/locus-nav.png',
	},
	{
		'title': 'Система ИК-навигации',
		'desc': 'Дополнительная плата на коптере и базовая станция поддерживают зону полета 12 кв. м.',
		'link': 'https://geoscan.ru/',
		'img': 'assets/images/preview/ir-nav.png',
	},
	{
		'title': 'Оптическая система навигации',
		'desc': 'Идет в базовой комплектации. Позиционирование происходит благодаря оптическому датчику, отслеживающему смещение под Пионером.',
		'link': 'https://geoscan.ru/',
		'img': 'assets/images/preview/optical-nav.png',
	},
	{
		'title': 'GPS-система навигации',
		'desc': 'Предназначена для пилотирования коптером на открытом воздухе. Для этого на главную плату автопилота нужно установить дополнительный модуль.',
		'link': 'https://geoscan.ru/',
		'img': 'assets/images/preview/gps-nav.png',
	},
]


class PositionSystemsContent {
	private data: IData[]
	private CURRENT: number = 0
	private previewImage: HTMLImageElement | null = document.querySelector('.content__image')
	private controlsContainer: HTMLDivElement | null = document.querySelector('.content__controls')
	private detailsLink: HTMLAnchorElement | null = document.querySelector('.content__link')
	private buttonsList: NodeListOf<HTMLButtonElement> | undefined[] = []

	constructor(data: IData[]) {
		if (!Array.isArray(data) || !data.length) {
			throw new Error('Data not provided')
		}
		this.data = data
	}

	changeImage(index: number) {
		this.previewImage.classList.add('content__image-fadeout')

		setTimeout(() => {
			this.previewImage.setAttribute('src', this.data[index].img)
			this.previewImage.setAttribute('alt', this.data[index].title)
			this.previewImage.classList.remove('content__image-fadeout')
			this.previewImage.classList.add('content__image-fadein')
		}, 400)
	}

	private changeButton(index: number) {
		this.buttonsList[this.CURRENT].classList.toggle('content__button-active')
		this.buttonsList[index].classList.toggle('content__button-active')
		this.detailsLink.setAttribute('href', this.data[index].link)
		this.CURRENT = index
	}

	private renderButtons() {
		this.data.forEach((data, idx) => {
			this.controlsContainer.insertAdjacentHTML('beforeend',
				`<button class='content__button ${!idx ? 'content__button-active' : ''}'>
						<span>${data.title}</span>
				</buton>`)
			this.detailsLink.setAttribute('href', data.link)
		})

		this.buttonsList = document.querySelectorAll('.content__controls button')

		this.buttonsList.forEach((button, index) => button.addEventListener('click', (event) => {
			if (index === this.CURRENT) return
			this.changeButton(index)
			this.changeImage(index)
		}))
	}


	init() {
		if (!this.previewImage || !this.controlsContainer || !this.detailsLink) {
			throw new Error('DOM elements not found')
		}

		this.previewImage.setAttribute('src', this.data[0].img)
		this.previewImage.setAttribute('alt', this.data[0].title)
		this.renderButtons()
	}
}

const positionSystemContent = new PositionSystemsContent(positionSystemsData)
window.onload = () => positionSystemContent.init()
