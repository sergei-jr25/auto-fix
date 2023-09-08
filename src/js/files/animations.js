const boxes = document.querySelectorAll('[data-scroll]')

export function checkScroll() {
	boxes.forEach((box, index) => {
		const boxPosition = box.getBoundingClientRect().top
		const screenHeight = window.innerHeight

		if (boxPosition < screenHeight * 0.8) {
			// Если блок виден более чем на 80%, переместите его обратно на начальное положение
			box.classList.add('_active')
		} else {
			box.classList.remove('_active')
		}
	})
}

// Проверка положения блоков при загрузке страницы и прокрутке
window.addEventListener('load', checkScroll)
window.addEventListener('scroll', checkScroll)
