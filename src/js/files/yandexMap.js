document.addEventListener('DOMContentLoaded', function () {
	ymaps.ready(init)

	function init() {
		const mapContainer = document.getElementById('map')
		const myMap = new ymaps.Map(mapContainer, {
			center: [55.7558, 37.6173],
			zoom: 10,
			controls: ['routeButtonControl'],
		})

		const customMarkerIcon = 'img/market.png'
		const MyIconContentLayout = ymaps.templateLayoutFactory.createClass(
				'<div class="my-marker"  >$[properties.iconContent] </div>'
			),
			myPlacemarkWithContent = new ymaps.Placemark(
				[55.661574, 37.573856],
				{
					// iconContent: 'Проложить марширут',
				},
				{
					// Опции.
					// Необходимо указать данный тип макета.
					iconLayout: 'default#imageWithContent',
					// Своё изображение иконки метки.
					iconImageHref: customMarkerIcon,
					// Размеры метки.
					iconImageSize: [52, 91],
					// Смещение левого верхнего угла иконки относительно
					// её "ножки" (точки привязки).
					iconImageOffset: [-24, -80],
					// Смещение слоя с содержимым относительно слоя с картинкой.
					iconContentOffset: [15, 15],
					// Макет содержимого.
					// iconContentLayout: MyIconContentLayout,
				}
			)

		myMap.geoObjects.add(myPlacemarkWithContent)
		const routeMarker = new ymaps.Placemark(
			[55.661574, 37.573856],
			// { iconContent: 'Проложить марширут' },
			{
				iconLayout: 'default#imageWithContent',
				iconImageHref: customMarkerIcon,
				iconImageSize: [52, 91],
				iconImageOffset: [-24, -80],
				iconContentOffset: [15, 15],
				iconContentLayout: MyIconContentLayout,
			}
		)

		myPlacemarkWithContent.events.add('click', function () {
			ymaps.geolocation.get().then(function (result) {
				const userPosition = result.geoObjects.get(0).geometry.getCoordinates()
				ymaps
					.route([
						userPosition,
						myPlacemarkWithContent.geometry.getCoordinates(),
					])
					.then(function (route) {
						const routeLine = route.getPaths().get(0) // Получаем линию маршрута
						routeLine.options.set({
							strokeColor: '#ff0000', // Цвет линии
							strokeWidth: 4, // Толщина линии
						})
						myMap.geoObjects.add(routeLine) // Добавляем толь
					})
			})
		})
	}
})
