import { Review } from '@openmoviedb/kinopoiskdev_client';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import {
	afficheQueryBuilder,
	commentQueryBuilder,
	currentYear,
	findFilmQueryBuilder,
	kp,
	movieQueryBuilder,
	tvSeriesQueryBuilder,
} from '../../api/apiData';
import {
	AddNewCommentProps,
	AddOneFilmProps,
	addPagesProps,
	MovieDtoV13Extended,
	MoviesProps,
	MyType,
} from '../../components/shared/types';

const initialState: initialStateProps = {
	movies: [],
	affiche: [],
	tvSeries: [],
	pages: { movies: 0, tvSeries: 0 },
	isLoading: false,
	error: null,
};

interface initialStateProps {
	movies: MovieDtoV13Extended[] | undefined;
	affiche: MovieDtoV13Extended[] | undefined;
	tvSeries: MovieDtoV13Extended[] | undefined;
	searchValues?: MovieDtoV13Extended[] | undefined;
	pages: PagesProps;
	isLoading: boolean;
	error: string | null | unknown;
}

interface PagesProps {
	movies: number;
	tvSeries: number;
}

export const getMovies = createAsyncThunk<void, number>(
	'movies/getMovies',
	async (currentPage, { rejectWithValue, dispatch }) => {
		const { data, error, message } = await kp.movie.getByFilters(
			movieQueryBuilder(currentPage),
		);

		if (data) {
			const { docs, page, pages } = data;
			console.log(`Страница ${page} из ${pages} фильмы`);
			console.log(docs);
			dispatch(
				addToMovies({
					filmsArray: docs,
					page: currentPage,
					type: 'films',
				}),
			);
			dispatch(addPages({ arrayType: 'films', lastPage: pages }));
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
			const { docs, page, pages } = data;
			console.log(`Страница ${page} из ${pages} аффиша`);
			console.log(docs);

			dispatch(addToAffiche(docs));
			dispatch(addType('affiche'));
		}

		if (error) {
			console.log(error, message);
			rejectWithValue(error);
		}
	},
);

export const getTvSeries = createAsyncThunk<void, number>(
	'movies/getTvSeries',
	async (currentPage, { rejectWithValue, dispatch }) => {
		const { data, error, message } = await kp.movie.getByFilters(
			tvSeriesQueryBuilder(currentPage),
		);
		if (data) {
			const { docs, page, pages } = data;
			console.log(`Страница ${page} из ${pages} сериалы`);
			console.log(docs);
			console.log('DATA', data);
			dispatch(
				addToTvSeries({
					filmsArray: docs,
					page: currentPage,
					type: 'tv-series',
				}),
			);
			dispatch(addPages({ arrayType: 'tv-series', lastPage: pages }));
		}

		// Если будет ошибка, то выведем ее в консоль
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
		addToTvSeries: (state, action: PayloadAction<MoviesProps>) => {
			if (state.tvSeries) {
				action.payload.filmsArray?.forEach(elem => {
					elem.page = action.payload.page;
					return (elem.myType = action.payload.type);
				});
				state.tvSeries.push(...(action.payload.filmsArray || []));
			}
		},
		addToSearch: (
			state,
			action: PayloadAction<Array<MovieDtoV13Extended>>,
		) => {
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
							state.affiche.push(action.payload.film);
						}
						break;
					case 'tv-series':
						if (
							state.tvSeries &&
							!state.tvSeries.filter(
								elem => elem.id === action.payload.film.id,
							).length
						) {
							state.tvSeries.push(action.payload.film);
						}
						break;
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
							state.movies.push(currentFilm);
						}
				}
			}
		},
		addType: (state, action: PayloadAction<MyType>) => {
			if (state.movies && action.payload === 'films') {
				state.movies.forEach(elem => (elem.myType = action.payload));
			}
			if (state.affiche && action.payload === 'affiche') {
				state.affiche.forEach(elem => (elem.myType = action.payload));
			}
			if (state.tvSeries && action.payload === 'tv-series') {
				state.tvSeries.forEach(elem => (elem.myType = action.payload));
			}
		},
		addPages: (state, action: PayloadAction<addPagesProps>) => {
			if (action.payload.arrayType === 'films') {
				state.pages.movies = action.payload.lastPage;
			}
			if (action.payload.arrayType === 'tv-series') {
				state.pages.tvSeries = action.payload.lastPage;
			}
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
	addToTvSeries,
} = moviesSlice.actions;

export const usersReducer = moviesSlice.reducer;
