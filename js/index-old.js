ymaps.ready().then(() => {
  var myMap = new ymaps.Map("map", {
    center: [52.403665, 55.741273],
    zoom: 16
  }, {
    searchControlProvider: 'yandex#search'
  });

  ymaps.route([
      { type: 'wayPoint', point: [52.403665, 55.741273] }, // Chelny
      { type: 'wayPoint', point: [55.796127, 49.106414] }, // Kazan
  ], {
      mapStateAutoApply: true,
  }).then(function (route) {
    const pathsObjects = ymaps.geoQuery(route.getPaths()),
      edges = [];

    pathsObjects.each(function (path) {
      var coordinates = path.geometry.getCoordinates();
      for (var i = 1, l = coordinates.length; i < l; i++) {
          edges.push({
              type: 'LineString',
              coordinates: [coordinates[i], coordinates[i - 1]]
          });
      }
    });

    console.log(edges)
    var routeObjects = ymaps.geoQuery(edges)
                        .add(res.getWayPoints())
                        .add(res.getViaPoints())
                        .setOptions('strokeWidth', 3)
                        .addToMap(myMap);

    console.log(routeObjects)
    // console.log(pathsObjects)
    // route.getPaths().options.set({
    //     // балун показывает только информацию о времени в пути с трафиком
    //     balloonContentLayout: ymaps.templateLayoutFactory.createClass('{{ properties.humanJamsTime }}'),
    //     // вы можете настроить внешний вид маршрута
    //     strokeColor: 'f7f7f7',
    //     opacity: 1
    // });
    // // добавляем маршрут на карту
    // myMap.geoObjects.add(route);
  });
});
