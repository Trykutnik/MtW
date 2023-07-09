import {
	KinopoiskDev,
	MovieQueryBuilder,
	SORT_TYPE,
	SPECIAL_VALUE,
} from '@openmoviedb/kinopoiskdev_client';

import { API_KEY } from './urls';

export const kp = new KinopoiskDev(API_KEY);

export const getRelatedByQueryBuilderMovies = async () => {
	const queryBuilder = new MovieQueryBuilder();

	const query = queryBuilder
		.select(['id', 'name', 'rating', 'poster', 'year'])
		.filterRange('year', [2020, 2023])
		.filterRange('rating.kp', [7.5, 10])
		.filterExact('poster.url', SPECIAL_VALUE.NOT_NULL)
		.sort('rating.kp', SORT_TYPE.DESC)
		.paginate(1, 10)
		.build();
	return query;
	// // const { data, error, message } = await kp.movie;
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
};
