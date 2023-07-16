import { MovieDtoV13, Rating, Review } from '@openmoviedb/kinopoiskdev_client';

import { Comment } from '../ui/film/comment/Comment';

// export interface MovieProps {
// 	id: number;
// 	name: string;
// 	poster: {
// 		url: string;
// 		previewUrl: string;
// 	};
// 	description?: string;
// 	shortDescription?: string;
// 	rating: {
// 		kp: number;
// 		imdb?: number;
// 		filmCritics?: number;
// 		russianFilmCritics?: number;
// 		await?: number;
// 	};
// 	year: number;
// }

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
	movie: MovieDtoV13;
}

export interface DataProps {
	array: MovieDtoV13[] | undefined;
	arrayType?: 'films' | 'affiche' | 'tv-series';
}

export interface MovieDtoV13Extended extends MovieDtoV13 {
	comments?: Review[];
	myType?: 'films' | 'affiche' | 'tv-series';
}

export interface CommentProps {
	comment: Review;
}
