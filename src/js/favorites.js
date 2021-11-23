import filmsServices from "./services/filmsServices.js";
import storageServices from "./services/storageServices.js";

const $favoritesContainer = document.querySelector('.films-container');
const films               = storageServices.getData('films');

renderFilms(films);

function renderFilms(films) {
	films.forEach(item => {
		$favoritesContainer.innerHTML += `
			<div>
				<a href="/" aria-label="film.Title" class="film__link" data-id="${ item.imdbID }">
					<article class="film__item">
						<h4 class="sr-only"></h4>
						<img src="${ item.Poster }" alt="${ item.Title }" class="film__image" width="220" height="330"/>
					</article>
				</a>
				<button class="btn btn--active" data-id="${ item.imdbID }">
					<i class="icon__delete1"></i>
					Quitar
				</button>
			</div>
		`;
	});
	
	removeFavorites();
}

function renderDetailFilm(elem, id) {
	const film = filmsServices.getById(id);
	film.then(data => {
		elem.innerHTML = `
	<section class="wrapper">
		<div class="back-section">
			<a href="./favoritos.html" aria-label="Volver a favoritos" class="btn btn--outline btn--shrink">
				<i class="icon__back" aria-hidden="true"></i>
				Volver
			</a>
		</div>
		<article class="detail__container">
			<div class="detail__description-area-1">
				<div class="detail__description-area-2">
					<div class="detail__description">
						<h2 class="detail__title">
							<span class="sr-only">Detalle de la película</span>
							${ data.Title }
						</h2>
							<p class="detail__paragraph">
								${ data.Plot }
							</p>
							<div class="detail__info">
								<time datetime="PT${ data.Runtime.replace(' ', '').toUpperCase() }">${ data.Runtime ? data.Runtime : 'No disponible' }</time>
							<div class="detail__genres">
								<span class="badge badge--active">${ data.Genre ? data.Genre.replaceAll(',', ' - ') : 'No disponible' }</span>
							</div>
						<time datetime="${ data.Released }">${ data.Released }</time>
					</div>
				</div>
			</div>
			<div class="detail__actions">
			<a href="/" class="btn btn--active" aria-label="Ver ahora">
				<i class="icon__play" aria-hidden="true"></i>
				VER AHORA
			</a>
			<a href="/" class="btn btn--outline" aria-label="Ver después">
				<i class="icon__plus" aria-hidden="true"></i>
				VER DESPUÉS
			</a>
			</div>
			</div>
			<div class="detail__image">
				<div class="film__item" tabindex="0" aria-label="Poster de la película">
				<div class="film__rankin">
				<i class="icon__star" aria-hidden="true"></i>
				<span></span>
			</div>
				<img src="${ data.Poster }" alt="${ data.Title }" width="220" height="330"/>
			</div>
			</div>
		</article>
	</section>
	`;
	});
}

function removeFavorites() {
	const $btns = document.querySelectorAll('.films-container .btn');
	
	$btns.forEach(item => {
		item.addEventListener('click', e => {
			e.currentTarget.parentNode.remove();
			const id = e.currentTarget.dataset.id;
			storageServices.removeFilm(id);
		});
	});
}

const $filmLinks = document.querySelectorAll('.film__link');
const $root      = document.getElementById('root');

$filmLinks.forEach(item => {
	item.addEventListener('click', e => {
		e.preventDefault();
		renderDetailFilm($root, e.currentTarget.dataset.id);
	});
});