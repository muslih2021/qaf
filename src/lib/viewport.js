export function viewport(element) {
	const observer = new IntersectionObserver((entries) => {
		entries.forEach(entry => {
			if (entry.isIntersecting) {
				element.classList.add('visible');
				observer.unobserve(element);
			}
		});
	}, { threshold: 0.1 });

	observer.observe(element);

	return {
		destroy() {
			observer.disconnect();
		}
	};
}
