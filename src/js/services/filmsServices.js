import { API, API_KEY } from '../constants/constant.js';
import storageServices from "./storageServices.js";

let films = null;

const filmsServices = {
	async getAll() {
		const res  = await fetch(`${ API }?apikey=${ API_KEY }&s=Naruto&plot=full`);
		const data = await res.json();
		
		// Elimina los objetos con propiedades duplicadas
		let set = new Set(data.Search.map(JSON.stringify));
		films   = Array.from(set).map(JSON.parse);
		
		if (storageServices.getData('films')) {
			const favorites = storageServices.getData('films').map(film => film.imdbID);
			// 	// Sacamos los que ya tenemos en favoritos
			for (let i = 0; i < films.length; i++) {
				for (let j = 0; j < favorites.length; j++) {
					if (films[i].imdbID === favorites[j]) {
						films[i].addFavorite = true;
					}
				}
			}
		}
		
		
		return films;
	},
	async getById(id) {
		const res = await fetch(`${ API }?apikey=${ API_KEY }&i=${ id }`);
		return await res.json();
	},
	async getByName(filmWanted) {
		const res   = await fetch(`${ API }?apikey=${ API_KEY }&s=${ filmWanted }`);
		const data  = await res.json();
		const films = await data.Search;
		
		if (storageServices.getData('films')) {
			const favorites = storageServices.getData('films').map(film => film.imdbID);
			// 	// Sacamos los que ya tenemos en favoritos
			for (let i = 0; i < films.length; i++) {
				for (let j = 0; j < favorites.length; j++) {
					if (films[i].imdbID === favorites[j]) {
						films[i].addFavorite = true;
					}
				}
			}
		}
		
		
		return films;
	}
};

export default filmsServices;