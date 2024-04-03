import { LOGO, STAR_EMPTY, STAR_FILLED } from './resource/index';
import { STAR_MESSAGE } from './constants/messages';
import { $ } from './utils/dom';
import throttle from './utils/throttle';

import Header from './components/Header/Header';
import Title from './components/Title/Title';
import SearchBox from './components/SearchBox/SearchBox';
import MovieListSection from './components/MovieListSection/MovieListSection';
import ModalWrapper from './components/ModalWrapper/ModalWrapper';
import MovieDetail from './components/MovieDetail/MovieDetail';
import MovieDetailSkeleton from './components/SkeletonItem/MovieDetailSkeleton';
import Alert from './components/Alert/Alert';
import TopButton from './components/TopButton/TopButton';

import MovieRenderController from './controller/MovieRenderController';
import MovieDetailController from './controller/MovieDetailController';

class MovieApp {
  static MOBILE_THRESHOLD_WIDTH = 673;
  #app = document.getElementById('app');
  #MovieRenderController;
  #movieDetailController;
  #modal;

  constructor() {
    this.#MovieRenderController = new MovieRenderController();
    this.#movieDetailController = new MovieDetailController(localStorage);
    this.#modal = new ModalWrapper();
  }

  init() {
    if (!(this.#app instanceof HTMLElement)) {
      return;
    }

    this.#app.appendChild(TopButton());
    this.#app.appendChild(this.#setHeader());
    this.#app.appendChild(this.#setMain());
    this.#app.appendChild(this.#modal.element);
    this.#app.appendChild(Alert());
    this.#MovieRenderController.render('');

    window.addEventListener(
      'resize',
      throttle(() => this.#onResize(), 300),
    );
    document.addEventListener('click', (event) => this.#onCloseSearchBar(event));
  }

  #setHeader() {
    const logo = this.#setLogo();
    const title = Title({ element: logo, onClick: () => this.#onHomeButtonClick() });
    const searchBox = SearchBox({ searchHandler: () => this.#onSearchHandler() });
    const header = Header({ title: title, searchBox: searchBox });

    return header;
  }

  #setLogo() {
    const logo = document.createElement('img');

    logo.src = LOGO;
    logo.setAttribute('alt', 'MovieList 로고');

    return logo;
  }

  #setMain() {
    const main = document.createElement('main');
    const movieListSection = MovieListSection({
      onMovieClick: (event: MouseEvent) => this.#onMovieClick(event),
    });

    main.appendChild(movieListSection);

    return main;
  }

  #onResize() {
    const header = $('header') as HTMLElement;

    if (window.innerWidth > MovieApp.MOBILE_THRESHOLD_WIDTH) {
      header.classList.remove('shrinked');
    }
  }

  #onCloseSearchBar(event: Event) {
    const target = event.target as HTMLElement;
    const header = $('header') as HTMLElement;

    if (target.closest('.search-box')) return;

    header.classList.remove('shrinked');
  }

  #onSearchHandler() {
    const searchInput = $('#search-text') as HTMLInputElement;

    this.#MovieRenderController.render(searchInput.value);
    searchInput.value = '';
  }

  #onHomeButtonClick() {
    this.#MovieRenderController.render();
  }

  async #onMovieClick(event: MouseEvent) {
    const target = event.target as Element;
    const li = target.closest('li.movie-item') as HTMLLIElement;
    if (!li) return;
    this.#modal.replaceContent(
      MovieDetailSkeleton({
        onCloseButtonClick: () => this.#modal.toggle(),
      }),
    );
    this.#modal.toggle();

    const movieId = Number(li.dataset.movieId);
    const data = await this.#movieDetailController.getMovieDetail(movieId);
    const movieDetail = MovieDetail({
      data,
      onCloseButtonClick: () => this.#modal.toggle(),
      onStarClick: (movieId: number, event: Event) => this.#onStarClick(movieId, event),
    });

    this.#modal.replaceContent(movieDetail);
  }

  #onStarClick(movieId: number, event: Event) {
    const target = event.target as HTMLElement;
    const targetStar = target.closest('.star') as HTMLImageElement;
    if (!targetStar) return;
    const starIndex = Number(targetStar.dataset?.starIndex);
    const grade = starIndex * 2 + 2;

    this.#movieDetailController.updateMovieDetail(movieId, grade);
  }
}

export default MovieApp;
