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
	blurSearch?: () => void;
}

export interface DataProps {
	array: MoviesProps[] | undefined;
	arrayType?: MyType;
}

export interface SliderProps {
	array: MovieDtoV13Extended[] | undefined;
	arrayType?: MyType;
}

export interface MovieDtoV13Extended extends MovieDtoV13 {
	comments?: Review[];
	myType?: MyType;
	page?: number;
}

export interface CommentProps {
	comment: Review;
}

export interface PaginationProps {
	page: number;
	lastPage: number;
	setCurrentPage: (page: number) => void;
	arrayType: MyType;
}

export interface MoviesProps {
	filmsArray: MovieDtoV13Extended[] | undefined;
	page: number;
	type: MyType;
}

export interface AddOneFilmProps {
	film: MovieDtoV13Extended;
	type: MyType;
}

export type MyType = 'films' | 'affiche' | 'tv-series';

export interface NewCommentProps {
	id: number;
}
export interface AddNewCommentProps {
	filmId: number;
	title: string;
	review: string;
}

export interface addPagesProps {
	arrayType: MyType;
	lastPage: number;
}
