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
var previewImg = document.querySelector('#content__image');
var contentControls = document.querySelector('.content__controls');
var externalDesc = document.querySelector('#external__desc');
/////////////////////////
var renderButtons = function () {
    data.forEach(function (data, idx) {
        contentControls.insertAdjacentHTML('beforeend', "<button>".concat(data.title, "</buton>"));
        externalDesc.setAttribute('href', data.link);
    });
    var buttons = document.querySelectorAll('.content__controls button');
    previewImg.setAttribute('src', data[0].img);
    buttons.forEach(function (button, idx) { return button.addEventListener('click', function () {
        previewImg.setAttribute('src', data[idx].img);
    }); });
};
window.onload = function () {
    renderButtons();
};
