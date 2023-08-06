import {
	MovieDocsResponseDtoV13,
	MovieQueryBuilder,
	Review,
	ReviewQueryBuilder,
	SORT_TYPE,
	SPECIAL_VALUE,
} from '@openmoviedb/kinopoiskdev_client';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import {
	afficheQueryBuilder,
	commentQueryBuilder,
	currentYear,
	findFilmQueryBuilder,
	kp,
	movieQueryBuilder,
} from '../../api/apiData';
import {
	AddNewCommentProps,
	AddOneFilmProps,
	MovieDtoV13Extended,
	MoviesProps,
	MyType,
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
	searchValues?: MovieDtoV13Extended[] | undefined;
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
		const { data, error, message } = await kp.movie.getByFilters(
			movieQueryBuilder(currentPage),
		);

		if (data) {
			const { docs, page, limit } = data;
			console.log(`Страница ${page} из ${limit}`);
			console.log(docs);
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
		const { data, error, message } = await kp.movie.getByFilters(
			afficheQueryBuilder(),
		);

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
	async (currentMovieId, { rejectWithValue, dispatch }) => {
		const { data, error, message } = await kp.review.getByFilters(
			commentQueryBuilder(currentMovieId),
		);

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

export const findFilm = createAsyncThunk<void, string>(
	'movies/findFilm',
	async (filmName, { rejectWithValue, dispatch }) => {
		if (filmName === '') {
			dispatch(addToSearch([]));
		} else {
			const { data, error, message } = await kp.movie.getByFilters(
				findFilmQueryBuilder(filmName),
			);

			if (data) {
				const { docs, page, limit } = data;
				console.log(`Страница ${page} из ${limit}`);
				console.log('SEARCH', docs);
				dispatch(addToSearch(docs));
			}

			// Если будет ошибка, то выведем ее в консоль
			if (error) {
				console.log(error, message);
				rejectWithValue(error);
			}
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
		},
		addToAffiche: (
			state,
			action: PayloadAction<Array<MovieDtoV13Extended>>,
		) => {
			state.affiche = action.payload;
		},
		addToSearch: (
			state,
			action: PayloadAction<Array<MovieDtoV13Extended>>,
		) => {
			// state.searchValues.forEach(elem => elem.myType)
			action.payload.forEach(elem => {
				if (
					elem.ticketsOnSale &&
					elem.year &&
					elem.year >= currentYear
				) {
					elem.myType = 'affiche';
				} else {
					elem.myType = 'films';
				}
			});
			state.searchValues = action.payload;
		},
		addOneFilm: (state, action: PayloadAction<AddOneFilmProps>) => {
			if (state.searchValues) {
				const currentFilm = state.searchValues.filter(
					elem => elem.id === action.payload.film.id,
				)[0];
				currentFilm.myType = action.payload.type;
				switch (action.payload.type) {
					case 'affiche':
						if (
							state.affiche &&
							!state.affiche.filter(
								elem => elem.id === action.payload.film.id,
							).length
						) {
							// action.payload.film.myType = 'affiche';
							state.affiche.push(action.payload.film);
						}
						break;
					// case 'tv-series':
					// 	if (state.tv-series) state.tv-series.push(action.payload.film);
					// 	break;
					default:
						if (
							state.movies &&
							!state.movies.filter(
								elem => elem.id === action.payload.film.id,
							).length &&
							state.affiche &&
							!state.affiche.filter(
								elem => elem.id === action.payload.film.id,
							).length
						) {
							// currentFilm.myType = 'films';
							// action.payload.film.myType = 'films';
							state.movies.push(currentFilm);
						}
				}
			}
		},
		// addTypeToOneFilm: (state, action: PayloadAction<AddOneFilmProps>) => {
		// 	if (state.searchValues) {
		// 		state.searchValues.filter(
		// 			elem => (elem.id = action.payload.film.id),
		// 		)[0].myType = action.payload.type;
		// 		// .forEach(elem => (elem.myType = action.payload));
		// 	}
		// },
		addType: (state, action: PayloadAction<MyType>) => {
			if (state.movies && action.payload === 'films') {
				state.movies.forEach(elem => (elem.myType = action.payload));
			}
			if (state.affiche && action.payload === 'affiche') {
				state.affiche.forEach(elem => (elem.myType = action.payload));
			}
		},
		// addPageToMovies: (state, action: PayloadAction<number>) => {
		// 	if (state.movies) {
		// 		state.movies.forEach(elem => (elem.page = action.payload));
		// 	}
		// 	if (state.affiche) {
		// 		state.affiche.forEach(elem => (elem.page = action.payload));
		// 	}
		// },
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
		addNewComment: (state, action: PayloadAction<AddNewCommentProps>) => {
			// state.pages.movies = action.payload;
			const obj = {
				title: action.payload.title,
				review: action.payload.review,
				userRating: 0,
			};
			if (state.movies) {
				const currentFilm = state.movies.filter(
					elem => elem.id === action.payload.filmId,
				)[0];
				if (currentFilm) {
					if (currentFilm.comments && currentFilm.comments.length) {
						currentFilm.comments.unshift(obj);
					} else {
						currentFilm.comments = [obj];
					}
				}
			}
			if (state.affiche) {
				const currentFilm = state.affiche.filter(
					elem => elem.id === action.payload.filmId,
				)[0];
				if (currentFilm) {
					if (currentFilm.comments && currentFilm.comments.length) {
						currentFilm.comments.unshift(obj);
					} else {
						currentFilm.comments = [obj];
					}
				}
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
			})
			.addCase(findFilm.pending, state => {
				state.isLoading = true;
				state.error = null;
			})
			.addCase(findFilm.fulfilled, state => {
				state.isLoading = false;
			})
			.addCase(findFilm.rejected, (state, action) => {
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
	addToSearch,
	addOneFilm,
	addNewComment,
} = moviesSlice.actions;

export const usersReducer = moviesSlice.reducer;
