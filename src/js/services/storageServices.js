const storageServices = {
	save(key, value) {
		localStorage.setItem(key, value);
	},
	getData(key) {
		return JSON.parse(localStorage.getItem(key));
	},
	removeFilm(filmId) {
		const currentData = this.getData('films').filter(film => film.imdbID !== filmId);
		this.save('films', JSON.stringify(currentData));
	}
};

export default storageServices;