interface IData {
	title: string
	desc: string
	descShort?: string
	link: string
	img: string
}

const positionSystemsData: IData[] = [
	{
		'title': 'Система навигации «Локус»',
		'desc': 'Для создания летной области необходимо четыре ультразвуковых излучателя и специальный модуль на самом аппарате.',
		'link': 'https://google.com/',
		'img': 'assets/images/preview/locus-nav.png',
	},
	{
		'title': 'Система ИК-навигации',
		'desc': 'Дополнительная плата на коптере и базовая станция поддерживают зону полета 12 кв. м.',
		'link': 'https://yahoo.com/',
		'img': 'assets/images/preview/ir-nav.png',
	},
	{
		'title': 'Оптическая система навигации',
		'desc': 'Идет в базовой комплектации. Позиционирование происходит благодаря оптическому датчику, отслеживающему смещение под Пионером.Идет в базовой комплектации. Позиционирование происходит благодаря оптическому датчику, отслеживающему смещение под Пионером.Идет в базовой комплектации. Позиционирование происходит благодаря оптическому датчику, отслеживающему смещение под Пионером.',
		'descShort': 'Идет в базовой комплектации. Позиционирование происходит благодаря оптическому датчику, отслеживающему смещение под Пионером.',
		'link': 'https://yandex.com/',
		'img': 'assets/images/preview/optical-nav.png',
	},
	{
		'title': 'GPS-система навигации',
		'desc': 'Предназначена для пилотирования коптером на открытом воздухе. Для этого на главную плату автопилота нужно установить дополнительный модуль.',
		'link': 'https://bing.com/',
		'img': 'assets/images/preview/gps-nav.png',
	},
]

class PositionSystemsContent {
	private data: IData[]
	private CURRENT: number = 0
	private MOBILE_WIDTH: number = 441
	private TABLET_WIDTH: number = 1215
	private previewImage: HTMLImageElement | null = document.querySelector('.content__image')
	private controlsContainer: HTMLDivElement | null = document.querySelector('.content__controls')
	private detailsLink: HTMLAnchorElement | null = document.querySelector('.content__link')
	private buttonsList: NodeListOf<HTMLButtonElement> | undefined[] = []
	private contentTitle = document.querySelector('.content__title')
	private contentDesc = document.querySelector('.content__desc')

	constructor(data: IData[]) {
		if (!Array.isArray(data) || !data.length) {
			throw new Error('Data not provided')
		}
		this.data = data
	}

	private isTablet() {
		return window.innerWidth <= this.TABLET_WIDTH
	}
	private isMobile() {
		return window.innerWidth <= this.MOBILE_WIDTH
	}

	private preloadImage(image: string) {
		const img = new Image();
		img.src = image;
	}

	private changeImage(index: number) {
		this.previewImage.classList.add('content__image-fadeout')

		setTimeout(() => {
			this.previewImage.setAttribute('src', this.data[index].img)
			this.previewImage.setAttribute('alt', this.data[index].title)
			this.previewImage.classList.remove('content__image-fadeout')
			this.previewImage.classList.add('content__image-fadein')
		}, 400)
	}

	private changeContent(index: number) {
		this.buttonsList[this.CURRENT].classList.toggle('content__button-active')
		this.buttonsList[index].classList.toggle('content__button-active')
		this.contentTitle.textContent = this.data[index].title

		if (this.data[index].descShort && !this.isMobile()) {
			this.contentDesc.textContent = this.data[index].descShort
		}
		else {
			this.contentDesc.textContent = this.data[index].desc
		}

		this.detailsLink.setAttribute('href', this.data[index].link)
		this.CURRENT = index
	}

	private renderButtons() {
		this.data.forEach((data, idx) => {
			const button = document.createElement('button')
			button.className = `content__button ${!idx ? 'content__button-active' : ''}`

			const span = document.createElement('span')
			span.innerText = data.title
			button.appendChild(span)

			this.controlsContainer.appendChild(button)
		})

		this.buttonsList = document.querySelectorAll('.content__controls button')

		this.buttonsList.forEach((button, index) => button.addEventListener('click', (ev) => {
			if (index === this.CURRENT) return

			this.changeContent(index)
			this.changeImage(index)


			if (this.isTablet()) {
				this.controlsContainer.scroll({
					left: button.offsetLeft - 65,
					behavior: 'smooth',
				})
			}

			if (this.isMobile()) this.contentTitle.scrollIntoView({behavior: 'smooth'})
		}))
	}


	init() {
		if (!this.previewImage || !this.controlsContainer || !this.detailsLink) {
			throw new Error('DOM elements not found')
		}

		this.data.forEach(el => this.preloadImage(el.img))
		this.previewImage.setAttribute('src', this.data[0].img)
		this.previewImage.setAttribute('alt', this.data[0].title)
		this.contentTitle.textContent = this.data[0].title
		this.contentDesc.textContent = this.data[0].desc
		this.detailsLink.setAttribute('href', this.data[0].link)
		this.renderButtons()
	}
}

const positionSystemContent = new PositionSystemsContent(positionSystemsData)
window.onload = () => positionSystemContent.init()

