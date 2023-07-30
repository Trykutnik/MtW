import { Dispatch, SetStateAction } from 'react';
import { MovieDtoV13, Review } from '@openmoviedb/kinopoiskdev_client';

export interface InformationContainerProps {
	title:
		| 'Год'
		| 'Страны'
		| 'Жанры'
		| 'Актёры'
		| 'Возрастной рейтинг'
		| 'Продолжительность'
		| 'Оригинальное название';
	content: string | number | undefined;
	additionalContent?: string;
}

export interface InformationFromArrayContainerProps {
	title:
		| 'Год'
		| 'Страны'
		| 'Жанры'
		| 'Актёры'
		| 'Возрастной рейтинг'
		| 'Продолжительность'
		| 'Оригинальное название';
	array: MovieDtoV13;
	additionalParms: 'genre' | 'person';
}

export interface RatingTextProps {
	array: MovieDtoV13;
	critic: 'kp' | 'imdb' | 'tmdb' | 'filmCritics' | 'russianFilmCritics';
	text: string;
}

export interface ComponentMovieProps {
	movie: MovieDtoV13Extended;
}

export interface DataProps {
	array: MoviesProps[] | undefined;
	arrayType?: 'films' | 'affiche' | 'tv-series';
}

export interface SliderProps {
	array: MovieDtoV13Extended[] | undefined;
	arrayType?: 'films' | 'affiche' | 'tv-series';
}

export interface MovieDtoV13Extended extends MovieDtoV13 {
	comments?: Review[];
	myType?: 'films' | 'affiche' | 'tv-series';
	page?: number;
}

export interface CommentProps {
	comment: Review;
}

export interface PaginationProps {
	page: number;
	lastPage: number;
	setCurrentPage: (page: number) => void;
}

export interface MoviesProps {
	filmsArray: MovieDtoV13Extended[] | undefined;
	page: number;
	type: 'films' | 'affiche' | 'tv-series';
}

// export interface AddTypeProps {
// 	type: 'films' | 'affiche' | 'tv-series';
// 	page: number;
// }
