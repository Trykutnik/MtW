import { MovieDtoV13, Rating } from '@openmoviedb/kinopoiskdev_client';

import { InformationFromArrayContainer } from '../ui/film/informationFromArrayContainer';
import { RatingText } from '../ui/film/styled/ratingText';

export interface MovieProps {
	id: number;
	name: string;
	poster: {
		url: string;
		previewUrl: string;
	};
	description?: string;
	shortDescription?: string;
	rating: {
		kp: number;
		imdb?: number;
		filmCritics?: number;
		russianFilmCritics?: number;
		await?: number;
	};
	year: number;
}

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