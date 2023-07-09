import {
	MovieDtoV13,
	MovieQueryBuilder,
	SORT_TYPE,
	SPECIAL_VALUE,
} from '@openmoviedb/kinopoiskdev_client';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { query } from 'express';

import { kp } from '../../api/apiData';
// import { MovieProps } from '../../shared/types';
// import Api from 'API/axiosConfig';

// import { UserInterfaceWithComments, UserType } from '../../components/shared/types';

const initialState: initialStateProps = {
	movies: [],
	isLoading: false,
	error: null,
};

interface initialStateProps {
	movies: MovieDtoV13[] | undefined;
	isLoading: boolean;
	error: string | null | unknown;
}
//
// interface ChangeNameProps {
// 	userName: string | null;
// 	userIndex: number | null;
// }
//
// interface AddCommentProps {
// 	userId: number;
// 	userComments: Array<string | null>;
// }

export const getMovies = createAsyncThunk<void, void>(
	'movies/getMovies',
	async (_, { rejectWithValue, dispatch }) => {
		const queryBuilder = new MovieQueryBuilder();

		const query = queryBuilder
			.select(['id', 'name', 'rating', 'poster', 'year', 'logo'])
			.filterRange('year', [2020, 2023])
			.filterRange('rating.kp', [7.5, 10])
			.filterExact('poster.url', SPECIAL_VALUE.NOT_NULL)
			.sort('rating.kp', SORT_TYPE.DESC)
			.paginate(1, 10)
			.build();

		const { data, error, message } = await kp.movie.getByFilters(query);

		if (data) {
			const { docs, page, limit } = data;
			console.log(`Страница ${page} из ${limit}`);
			console.log(docs);
			dispatch(addToMovies(data.docs));
		}

		// Если будет ошибка, то выведем ее в консоль
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
		addToMovies: (state, action: PayloadAction<Array<MovieDtoV13>>) => {
			state.movies = action.payload;
		},
	},
	// 	changeLoading: (state, action: PayloadAction<boolean>) => {
	// 		state.isLoading = action.payload;
	// 	},
	// 	changeName: (state, action: PayloadAction<ChangeNameProps>) => {
	// 		if (action.payload.userName) {
	// 			if (
	// 				action.payload.userIndex === 0 ||
	// 				action.payload.userIndex
	// 			) {
	// 				state.users[action.payload.userIndex].name =
	// 					action.payload.userName;
	// 			}
	// 		}
	// 	},
	// 	addComment: (state, action: PayloadAction<AddCommentProps>) => {
	// 		state.users.filter(
	// 			elem => elem.id === action.payload.userId,
	// 		)[0].comments = action.payload.userComments;
	// 	},
	// },

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
			});
	},
});

export const { addToMovies } = moviesSlice.actions;

export const usersReducer = moviesSlice.reducer;
