var positionSystemsData = [
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
];
var PositionSystemsContent = /** @class */ (function () {
    function PositionSystemsContent(data) {
        this.CURRENT = 0;
        this.previewImage = document.querySelector('.content__image');
        this.controlsContainer = document.querySelector('.content__controls');
        this.detailsLink = document.querySelector('.content__link');
        this.buttonsList = [];
        if (!Array.isArray(data) || !data.length) {
            throw new Error('Data not provided');
        }
        this.data = data;
    }
    PositionSystemsContent.prototype.changeImage = function (index) {
        var _this = this;
        this.previewImage.classList.add('content__image-fadeout');
        setTimeout(function () {
            _this.previewImage.setAttribute('src', _this.data[index].img);
            _this.previewImage.setAttribute('alt', _this.data[index].title);
            _this.previewImage.classList.remove('content__image-fadeout');
            _this.previewImage.classList.add('content__image-fadein');
        }, 400);
    };
    PositionSystemsContent.prototype.changeButton = function (index) {
        this.buttonsList[this.CURRENT].classList.toggle('content__button-active');
        this.buttonsList[index].classList.toggle('content__button-active');
        this.detailsLink.setAttribute('href', this.data[index].link);
        this.CURRENT = index;
    };
    PositionSystemsContent.prototype.renderButtons = function () {
        var _this = this;
        this.data.forEach(function (data, idx) {
            _this.controlsContainer.insertAdjacentHTML('beforeend', "<button class='content__button ".concat(!idx ? 'content__button-active' : '', "'>\n\t\t\t\t\t\t<span>").concat(data.title, "</span>\n\t\t\t\t</buton>"));
            _this.detailsLink.setAttribute('href', data.link);
        });
        this.buttonsList = document.querySelectorAll('.content__controls button');
        this.buttonsList.forEach(function (button, index) { return button.addEventListener('click', function (event) {
            if (index === _this.CURRENT)
                return;
            _this.changeButton(index);
            _this.changeImage(index);
        }); });
    };
    PositionSystemsContent.prototype.init = function () {
        if (!this.previewImage || !this.controlsContainer || !this.detailsLink) {
            throw new Error('DOM elements not found');
        }
        this.previewImage.setAttribute('src', this.data[0].img);
        this.previewImage.setAttribute('alt', this.data[0].title);
        this.renderButtons();
    };
    return PositionSystemsContent;
}());
var positionSystemContent = new PositionSystemsContent(positionSystemsData);
window.onload = function () { return positionSystemContent.init(); };
