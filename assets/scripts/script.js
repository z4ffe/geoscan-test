var data = [
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
];
var previewImg = document.querySelector('.content__image');
var contentControls = document.querySelector('.content__controls');
var contentLink = document.querySelector('.content__link');
var CURRENT = 0;
var BUTTONS = [];
var changeImage = function (idx) {
    previewImg.classList.add('content__image-fadeout');
    setTimeout(function () {
        previewImg.setAttribute('src', data[idx].img);
        previewImg.setAttribute('alt', data[idx].title);
        previewImg.classList.remove('content__image-fadeout');
        previewImg.classList.add('content__image-fadein');
    }, 250);
};
var changeButton = function (index) {
    BUTTONS[CURRENT].classList.toggle('content__button-active');
    BUTTONS[index].classList.toggle('content__button-active');
    CURRENT = index;
};
var renderButtons = function () {
    data.forEach(function (data, idx) {
        contentControls.insertAdjacentHTML('beforeend', "<button class='content__button ".concat(!idx ? 'content__button-active' : '', "'><span>").concat(data.title, "</span></buton>"));
        contentLink.setAttribute('href', data.link);
    });
    BUTTONS = document.querySelectorAll('.content__controls button');
    BUTTONS.forEach(function (button, idx) { return button.addEventListener('click', function (event) {
        changeButton(idx);
        changeImage(idx);
    }); });
};
window.onload = function () {
    previewImg.setAttribute('src', data[0].img);
    renderButtons();
};
