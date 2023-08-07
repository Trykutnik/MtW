import {
	KinopoiskDev,
	MovieQueryBuilder,
	ReviewQueryBuilder,
	SORT_TYPE,
	SPECIAL_VALUE,
} from '@openmoviedb/kinopoiskdev_client';

import { API_KEY } from './urls';

export const currentYear = new Date().getFullYear();

export const kp = new KinopoiskDev(API_KEY);

export const movieQueryBuilder = (currentPage: number) => {
	const queryBuilder = new MovieQueryBuilder();

	return (
		queryBuilder
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
				'facts',
			])
			// .filterRange('year', [2020, 2023])
			.filterRange('rating.kp', [7.5, 10])
			// .filterRange('reviewInfo', SPECIAL_VALUE.NOT_NULL)
			.filterExact('poster.url', SPECIAL_VALUE.NOT_NULL)
			.filterExact('type', 'movie')
			.sort('rating.kp', SORT_TYPE.DESC)
			.paginate(currentPage, 15)
			.build()
	);
};

export const afficheQueryBuilder = () => {
	const queryBuilder = new MovieQueryBuilder();

	return (
		queryBuilder
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
				'facts',
			])
			.filterRange('year', [currentYear, currentYear])
			// .filterRange('rating.kp', [7.5, 10])
			// .filterExact('poster.url', SPECIAL_VALUE.NOT_NULL)
			// .filterExact('ticketsOnSale', SPECIAL_VALUE.NOT_NULL)
			.filterExact('ticketsOnSale', true)
			.sort('rating.kp', SORT_TYPE.DESC)
			.paginate(1, 250)
			.build()
	);
};

export const tvSeriesQueryBuilder = (currentPage: number) => {
	const queryBuilder = new MovieQueryBuilder();

	return (
		queryBuilder
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
				'seasonsInfo',
				'isSeries',
				'facts',
			])
			.filterRange('rating.kp', [7.5, 10])
			// .filterRange('reviewInfo', SPECIAL_VALUE.NOT_NULL)
			.filterExact('poster.url', SPECIAL_VALUE.NOT_NULL)
			.filterExact('type', 'tv-series')
			.sort('rating.kp', SORT_TYPE.DESC)
			.paginate(currentPage, 15)
			.build()
	);
};

export const commentQueryBuilder = (currentMovieId: number) => {
	const queryBuilder = new ReviewQueryBuilder();

	return (
		queryBuilder
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
			.build()
	);
};

export const findFilmQueryBuilder = (filmName: string) => {
	const queryBuilder = new MovieQueryBuilder();

	return queryBuilder
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
			'ticketsOnSale',
		])
		.filterExact('name', filmName)
		.filterExact('poster.url', SPECIAL_VALUE.NOT_NULL)
		.sort('rating.kp', SORT_TYPE.DESC)
		.paginate(1, 15)
		.build();
};
