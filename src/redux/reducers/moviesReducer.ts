import { Simulate } from 'react-dom/test-utils';
import {
	MovieQueryBuilder,
	Review,
	ReviewQueryBuilder,
	SORT_TYPE,
	SPECIAL_VALUE,
} from '@openmoviedb/kinopoiskdev_client';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { kp } from '../../api/apiData';
import {
	MovieDtoV13Extended,
	MoviesProps,
} from '../../components/shared/types';

const initialState: initialStateProps = {
	movies: [],
	affiche: [],
	pages: { movies: 0 },
	isLoading: false,
	error: null,
	// test: [],
};

interface initialStateProps {
	movies: MovieDtoV13Extended[] | undefined;
	affiche: MovieDtoV13Extended[] | undefined;
	pages: PagesProps;
	isLoading: boolean;
	error: string | null | unknown;
	// test: number[];
}

interface PagesProps {
	movies: number;
}

export const getMovies = createAsyncThunk<void, number>(
	'movies/getMovies',
	async (currentPage, { rejectWithValue, dispatch }) => {
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
			])
			.filterRange('year', [2020, 2023])
			.filterRange('rating.kp', [7.5, 10])
			// .filterRange('reviewInfo', SPECIAL_VALUE.NOT_NULL)
			.filterExact('poster.url', SPECIAL_VALUE.NOT_NULL)
			.sort('rating.kp', SORT_TYPE.DESC)
			.paginate(currentPage, 15)
			.build();

		const { data, error, message } = await kp.movie.getByFilters(query);

		if (data) {
			const { docs, page, limit } = data;
			console.log(`Страница ${page} из ${limit}`);
			console.log(docs);
			// dispatch(addToMovies(data.docs));
			// if (+page === 1) {
			// 	dispatch(fillArray(limit));
			// }
			// dispatch(fillArray(limit));
			dispatch(
				addToMovies({
					filmsArray: docs,
					page: currentPage,
					type: 'films',
				}),
			);
			dispatch(addPages(limit));
			// dispatch(addPageToMovies(page));
			// dispatch(addType('films'));
		}

		// Если будет ошибка, то выведем ее в консоль
		if (error) {
			console.log(error, message);
			rejectWithValue(error);
		}
	},
);

export const getAffiche = createAsyncThunk<void, void>(
	'movies/getAffiche',
	async (_, { rejectWithValue, dispatch }) => {
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

		const { data, error, message } = await kp.movie.getByFilters(query);

		if (data) {
			const { docs, page, limit } = data;
			console.log(`Страница ${page} из ${limit}`);
			console.log(docs);
			// dispatch(addToAffiche(data.docs));
			// dispatch(addType({ type: 'affiche', page: 1 }));

			dispatch(addToAffiche(docs));
			dispatch(addType('affiche'));
		}

		if (error) {
			console.log(error, message);
			rejectWithValue(error);
		}
	},
);

export const getComments = createAsyncThunk<void, number>(
	'movies/getComments',
	async (currnentMovieId, { rejectWithValue, dispatch }) => {
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
			.filterExact('movieId', currnentMovieId)
			.paginate(1, 250)
			.build();

		const { data, error, message } = await kp.review.getByFilters(query);

		if (data) {
			const { docs, page, limit } = data;
			console.log(`Страница ${page} из ${limit}`);
			console.log(docs);
			dispatch(addToMoviesComments(data.docs));
		}

		if (error) {
			console.log(error, message);
			rejectWithValue(error);
		}
	},
);

const moviesSlice = createSlice({
	name: 'movies',
	initialState,
	reducers: {
		addToMovies: (state, action: PayloadAction<MoviesProps>) => {
			if (state.movies) {
				action.payload.filmsArray?.forEach(elem => {
					elem.page = action.payload.page;
					return (elem.myType = action.payload.type);
				});
				state.movies.push(...(action.payload.filmsArray || []));
			}
			// if (state.movies.length === 0) {
			// 	state.movies = action.payload;
			// } else {
			// 	state.movies.concat(action.payload);
			// }
		},
		addToAffiche: (
			state,
			action: PayloadAction<Array<MovieDtoV13Extended>>,
		) => {
			state.affiche = action.payload;
		},
		addType: (
			state,
			action: PayloadAction<'films' | 'affiche' | 'tv-series'>,
		) => {
			if (state.movies && action.payload === 'films') {
				state.movies.forEach(elem => (elem.myType = action.payload));
			}
			if (state.affiche && action.payload === 'affiche') {
				state.affiche.forEach(elem => (elem.myType = action.payload));
			}
		},
		addPageToMovies: (state, action: PayloadAction<number>) => {
			if (state.movies) {
				state.movies.forEach(elem => (elem.page = action.payload));
			}
			if (state.affiche) {
				state.affiche.forEach(elem => (elem.page = action.payload));
			}
		},
		addPages: (state, action: PayloadAction<number>) => {
			state.pages.movies = action.payload;
		},
		addToMoviesComments: (state, action: PayloadAction<Array<Review>>) => {
			if (
				state.movies &&
				state.movies.find(elem => elem.id === action.payload[0].movieId)
			) {
				state.movies.filter(
					elem => elem.id === action.payload[0].movieId,
				)[0].comments = action.payload;
			}
			if (
				state.affiche &&
				state.affiche.find(
					elem => elem.id === action.payload[0].movieId,
				)
			) {
				state.affiche.filter(
					elem => elem.id === action.payload[0].movieId,
				)[0].comments = action.payload;
			}
		},
	},

	extraReducers: builder => {
		builder
			.addCase(getMovies.pending, state => {
				state.isLoading = true;
				state.error = null;
			})
			.addCase(getMovies.fulfilled, state => {
				state.isLoading = false;
			})
			.addCase(getMovies.rejected, (state, action) => {
				state.error = action.payload;
				state.isLoading = false;
			})
			.addCase(getAffiche.pending, state => {
				state.isLoading = true;
				state.error = null;
			})
			.addCase(getAffiche.fulfilled, state => {
				state.isLoading = false;
			})
			.addCase(getAffiche.rejected, (state, action) => {
				state.error = action.payload;
				state.isLoading = false;
			});
	},
});

export const {
	addToMovies,
	addToAffiche,
	addPages,
	addToMoviesComments,
	addType,
	addPageToMovies,
	// fillArray,
} = moviesSlice.actions;

export const usersReducer = moviesSlice.reducer;

// const moviesSlice = createSlice({
// 	name: 'movies',
// 	initialState,
// 	reducers: {
// 	// 	addToMovies: (state, action: PayloadAction<Array<MovieDtoV13Extended>>) => {
// 	// 		if (state.movies) {
// 	// 			// state.movies[action.payload.page - 1].filmsArray =
// 	// 			// 	action.payload.filmsArray;
// 	// 			// state.movies[action.payload.page - 1].page =
// 	// 			// 	action.payload.page;
// 	//
// 	// 			// state.movies[0].filmsArray = action.payload.filmsArray;
// 	// 			// state.movies[0].page = action.payload.page;
// 	//
// 	// 			state.movies = action.payload;
// 	// 			// state.movies.push(action.payload);
// 	// 		}
// 	// 	},
// 	// 	addToAffiche: (
// 	// 		state,
// 	// 		action: PayloadAction<Array<MovieDtoV13Extended>>,
// 	// 	) => {
// 	// 		if (state.affiche) {
// 	// 			state.affiche = action.payload;
// 	// 			// 	state.affiche[action.payload.page - 1].filmsArray =
// 	// 			// 		action.payload.filmsArray;
// 	// 			// 	state.affiche[action.payload.page - 1].page =
// 	// 			// 		action.payload.page;
// 	// 		}
// 	// 	},
// 	// 	addPages: (state, action: PayloadAction<number>) => {
// 	// 		state.pages.movies = action.payload;
// 	// 	},
// 	// 	addType: (state, action: PayloadAction<AddTypeProps>) => {
// 	// 		if (
// 	// 			state.movies &&
// 	// 			// state.movies[action.payload.page - 1] &&
// 	// 			// state.movies[action.payload.page - 1].filmsArray &&
// 	// 			// state.movies[action.payload.page - 1].filmsArray.length > 0 &&
// 	// 			action.payload.type === 'films'
// 	// 		) {
// 	// 			state.movies
// 	// 				// [action.payload.page - 1].filmsArray;
// 	// 				.forEach(elem => (elem.myType = action.payload.type));
// 	// 		}
// 	// 		if (
// 	// 			state.affiche &&
// 	// 			// state.affiche[0].filmsArray &&
// 	// 			action.payload.type === 'affiche'
// 	// 		) {
// 	// 			state.affiche.forEach(
// 	// 				elem => (elem.myType = action.payload.type),
// 	// 			);
// 	// 		}
// 	// 	},
// 	// //
// 	// // 	addToMoviesComments: (state, action: PayloadAction<Array<Review>>) => {
// 	// // 		if (
// 	// // 			state.movies
// 	// // 			// &&
// 	// // 			// state.movies.forEach(currentMovie =>
// 	// // 			// 	currentMovie.filmsArray.find(
// 	// // 			// 		elem => elem.id === action.payload[0].movieId,
// 	// // 			// 	)
// 	// // 			// )
// 	// // 		) {
// 	// // 			// state.movies.filter(elem => elem.id === action.payload[0].movieId)[0].comments = action.payload)
// 	// // 			}
// 	// //
// 	// //
// 	// // 			// 	.filter(
// 	// // 			// 	elem => elem.id === action.payload[0].movieId,
// 	// // 			// )[0].comments = action.payload;
// 	// //
// 	// // 		// if (
// 	// // 		// 	state.affiche &&
// 	// // 		// 	state.affiche.find(
// 	// // 		// 		elem => elem.id === action.payload[0].movieId,
// 	// // 		// 	)
// 	// // 		// ) {
// 	// // 		// 	state.affiche.filter(
// 	// // 		// 		elem => elem.id === action.payload[0].movieId,
// 	// // 		// 	)[0].comments = action.payload;
// 	// // 		// }
// 	// // 	// },
// 	// // 	// fillArray: (state, action: PayloadAction<number>) => {
// 	// // 	// 	// if (state.test) state.test = new Array(20).fill(1);
// 	// // 	// 	if (state.movies) {
// 	// // 	// 		state.movies[action.payload] = { filmsArray: [], page: 0 };
// 	// // 	// 		state.movies.fill(
// 	// // 	// 			{ filmsArray: [], page: 0 },
// 	// // 	// 			2,
// 	// // 	// 			action.payload,
// 	// // 	// 		);
// 	// // 	// 	}
// 	// // 	// },
// 	// // },
//
// 	extraReducers: builder => {
// 		builder
// 			.addCase(getMovies.pending, state => {
// 				state.isLoading = true;
// 				state.error = null;
// 			})
// 			.addCase(getMovies.fulfilled, state => {
// 				state.isLoading = false;
// 			})
// 			.addCase(getMovies.rejected, (state, action) => {
// 				state.error = action.payload;
// 				state.isLoading = false;
// 			})
// 			.addCase(getAffiche.pending, state => {
// 				state.isLoading = true;
// 				state.error = null;
// 			})
// 			.addCase(getAffiche.fulfilled, state => {
// 				state.isLoading = false;
// 			})
// 			.addCase(getAffiche.rejected, (state, action) => {
// 				state.error = action.payload;
// 				state.isLoading = false;
// 			});
// 	},
// });
