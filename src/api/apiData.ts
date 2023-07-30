import {
	KinopoiskDev,
	MovieQueryBuilder,
	ReviewQueryBuilder,
	SORT_TYPE,
	SPECIAL_VALUE,
} from '@openmoviedb/kinopoiskdev_client';

import { addToAffiche } from '../redux/reducers/moviesReducer';

import { API_KEY } from './urls';

export const kp = new KinopoiskDev(API_KEY);

export const movieQueryBuilder = (currentPage: number) => {
	const queryBuilder = new MovieQueryBuilder();

	const query = queryBuilder
		.select([
			'id',
			'name',
			'alternativeName',
			'rating',
			'poster',
			'year',
			'logo',
			'genres',
			'description',
			'shortDescription',
			'movieLength',
			'ageRating',
			'videos',
			'countries',
			'persons',
			'type',
			'names',
		])
		.filterRange('year', [2020, 2023])
		.filterRange('rating.kp', [7.5, 10])
		// .filterRange('reviewInfo', SPECIAL_VALUE.NOT_NULL)
		.filterExact('poster.url', SPECIAL_VALUE.NOT_NULL)
		.filterExact('type', 'movie')
		.sort('rating.kp', SORT_TYPE.DESC)
		.paginate(currentPage, 15)
		.build();

	return query;
};

export const afficheQueryBuilder = () => {
	const queryBuilder = new MovieQueryBuilder();

	const query = queryBuilder
		.select([
			'id',
			'name',
			'alternativeName',
			'rating',
			'poster',
			'year',
			'logo',
			'genres',
			'description',
			'shortDescription',
			'movieLength',
			'ageRating',
			'videos',
			'countries',
			'persons',
			'ticketsOnSale',
			'reviewInfo',
			'type',
		])
		.filterRange('year', [2023, 2023])
		// .filterRange('rating.kp', [7.5, 10])
		// .filterExact('poster.url', SPECIAL_VALUE.NOT_NULL)
		// .filterExact('ticketsOnSale', SPECIAL_VALUE.NOT_NULL)
		.filterExact('ticketsOnSale', true)
		.sort('rating.kp', SORT_TYPE.DESC)
		.paginate(1, 250)
		.build();

	return query;
};

export const commentQueryBuilder = (currentMovieId: number) => {
	const queryBuilder = new ReviewQueryBuilder();

	const query = queryBuilder
		.select([
			'id',
			'movieId',
			'type',
			'review',
			'title',
			'date',
			'author',
			'type',
		])
		// .filterRange('rating.kp', [7.5, 10])
		// .filterExact('poster.url', SPECIAL_VALUE.NOT_NULL)
		// .filterExact('ticketsOnSale', SPECIAL_VALUE.NOT_NULL)
		// .filterExact('ticketsOnSale', true)
		// .sort('rating.kp', SORT_TYPE.DESC)
		.filterExact('movieId', currentMovieId)
		.paginate(1, 250)
		.build();

	return query;
};

export const findFilmQueryBuilder = (filmName: string) => {
	const queryBuilder = new MovieQueryBuilder();

	const query = queryBuilder
		.select([
			'id',
			'name',
			'alternativeName',
			'rating',
			'poster',
			'year',
			'logo',
			'genres',
			'description',
			'shortDescription',
			'movieLength',
			'ageRating',
			'videos',
			'countries',
			'persons',
			'type',
		])
		.filterExact('name', filmName)
		.filterExact('poster.url', SPECIAL_VALUE.NOT_NULL)
		.sort('rating.kp', SORT_TYPE.DESC)
		.paginate(1, 15)
		.build();

	return query;
};
