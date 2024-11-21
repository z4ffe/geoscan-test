const positionSystemsData = [
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
        'desc': 'Идет в базовой комплектации. Позиционирование происходит благодаря оптическому датчику, отслеживающему смещение под Пионером.',
        'link': 'https://yandex.com/',
        'img': 'assets/images/preview/optical-nav.png',
    },
    {
        'title': 'GPS-система навигации',
        'desc': 'Предназначена для пилотирования коптером на открытом воздухе. Для этого на главную плату автопилота нужно установить дополнительный модуль.',
        'link': 'https://bing.com/',
        'img': 'assets/images/preview/gps-nav.png',
    },
];
class PositionSystemsContent {
    constructor(data) {
        this.CURRENT = 0;
        this.MOBILE_WIDTH = 441;
        this.previewImage = document.querySelector('.content__image');
        this.controlsContainer = document.querySelector('.content__controls');
        this.detailsLink = document.querySelector('.content__link');
        this.buttonsList = [];
        this.contentTitle = document.querySelector('.content__title');
        if (!Array.isArray(data) || !data.length) {
            throw new Error('Data not provided');
        }
        this.data = data;
    }
    isMobile() {
        return window.innerWidth <= this.MOBILE_WIDTH;
    }
    preloadImage(image) {
        const img = new Image();
        img.src = image;
    }
    changeImage(index) {
        this.previewImage.classList.add('content__image-fadeout');
        setTimeout(() => {
            this.previewImage.setAttribute('src', this.data[index].img);
            this.previewImage.setAttribute('alt', this.data[index].title);
            this.previewImage.classList.remove('content__image-fadeout');
            this.previewImage.classList.add('content__image-fadein');
        }, 400);
    }
    changeButton(index) {
        this.buttonsList[this.CURRENT].classList.toggle('content__button-active');
        this.buttonsList[index].classList.toggle('content__button-active');
        this.detailsLink.setAttribute('href', this.data[index].link);
        this.CURRENT = index;
    }
    renderButtons() {
        this.data.forEach((data, idx) => {
            const button = document.createElement('button');
            button.className = `content__button ${!idx ? 'content__button-active' : ''}`;
            const span = document.createElement('span');
            span.innerText = data.title;
            button.appendChild(span);
            this.controlsContainer.appendChild(button);
        });
        this.detailsLink.setAttribute('href', this.data[0].link);
        this.buttonsList = document.querySelectorAll('.content__controls button');
        this.buttonsList.forEach((button, index) => button.addEventListener('click', () => {
            if (index === this.CURRENT)
                return;
            this.changeButton(index);
            this.changeImage(index);
            if (this.isMobile())
                this.contentTitle.scrollIntoView({ behavior: 'smooth' });
        }));
    }
    init() {
        if (!this.previewImage || !this.controlsContainer || !this.detailsLink) {
            throw new Error('DOM elements not found');
        }
        this.data.forEach(el => this.preloadImage(el.img));
        this.previewImage.setAttribute('src', this.data[0].img);
        this.previewImage.setAttribute('alt', this.data[0].title);
        this.renderButtons();
    }
}
const positionSystemContent = new PositionSystemsContent(positionSystemsData);
window.onload = () => positionSystemContent.init();
