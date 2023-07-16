import {
	KinopoiskDev,
	MovieQueryBuilder,
	SORT_TYPE,
	SPECIAL_VALUE,
} from '@openmoviedb/kinopoiskdev_client';

import { addToAffiche } from '../redux/reducers/moviesReducer';

import { API_KEY } from './urls';

export const kp = new KinopoiskDev(API_KEY);

export const getRelatedByQueryBuilderMovies = async () => {
	// const queryBuilder = new MovieQueryBuilder();
	//
	// const query = queryBuilder
	// 	.select(['id', 'name', 'rating', 'poster', 'year'])
	// 	.filterRange('year', [2020, 2023])
	// 	.filterRange('rating.kp', [7.5, 10])
	// 	.filterExact('poster.url', SPECIAL_VALUE.NOT_NULL)
	// 	.sort('rating.kp', SORT_TYPE.DESC)
	// 	.paginate(1, 10)
	// 	.build();
	// return query;
	//
	// const { data, error, message } = await kp.movie.getByFilters(query);
	//
	// // console.log(await kp.movie);
	// console.log(data, error, message);
	// if (data) {
	// 	const { docs, page, limit } = data;
	// 	console.log(`Страница ${page} из ${limit}`);
	// 	console.log(docs);
	// 	return data;
	// }
	//
	// // Если будет ошибка, то выведем ее в консоль
	// if (error) console.log(error, message);

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
		])
		.filterRange('year', [2023, 2023])
		// .filterRange('rating.kp', [7.5, 10])
		// .filterExact('poster.url', SPECIAL_VALUE.NOT_NULL)
		// .filterExact('ticketsOnSale', SPECIAL_VALUE.NOT_NULL)
		.filterExact('ticketsOnSale', true)
		.sort('rating.kp', SORT_TYPE.DESC)
		.paginate(1, 30)
		.build();

	const { data, error, message } = await kp.movie.getByFilters(query);

	if (data) {
		const { docs, page, limit } = data;
		console.log(`Страница ${page} из ${limit}`);
		console.log(docs);
		// dispatch(addToAffiche(data.docs));
	}

	// Если будет ошибка, то выведем ее в консоль
	if (error) {
		console.log(error, message);
		// rejectWithValue(error);
	}
};
