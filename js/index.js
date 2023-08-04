ymaps.ready().then(() => {
  var myMap = new ymaps.Map("map", {
    center: [55.741272, 52.403662],
    zoom: 6
  }, {
    searchControlProvider: 'yandex#search'
  });

  ymaps.route([
      { type: 'wayPoint', point: [55.741272, 52.403662] }, // Chelny
      { type: 'wayPoint', point: [55.796127, 49.106414] }, // Kazan
  ], {
      mapStateAutoApply: true,
  }).then(function (route) {
    const pathsObjects = ymaps.geoQuery(route.getPaths()),
      edges = [],
      coords = [];

    const marker = new ymaps.Placemark(myMap.getCenter(), {
      hintContent: 'Собственный значок метки',
      balloonContent: 'Это красивая метка'
    }, {
      iconLayout: 'default#image',
      // Своё изображение иконки метки.
      iconImageHref: 'img/car.svg',
      // Размеры метки.
      iconImageSize: [30, 42],
      // Смещение левого верхнего угла иконки относительно
      // её "ножки" (точки привязки).
      iconImageOffset: [-5, -38]
    });

    pathsObjects.each(function (path) {
      var coordinates = path.geometry.getCoordinates();
      coords.push(...coordinates);
    });

    route.getPaths().options.set({
        // балун показывает только информацию о времени в пути с трафиком
        balloonContentLayout: ymaps.templateLayoutFactory.createClass('{{ properties.humanJamsTime }}'),
        // вы можете настроить внешний вид маршрута
        strokeColor: 'ff0066',
        opacity: 1
    });
    // добавляем маршрут на карту
    myMap.geoObjects
      .add(route)
      .add(marker);

    // console.log(marker.geometry.setCoordinates)

    setInterval(() => {
      const newCoords = coords.splice(0, 1)[0];
      marker.geometry.setCoordinates(newCoords);
    }, 100);
  });
});
