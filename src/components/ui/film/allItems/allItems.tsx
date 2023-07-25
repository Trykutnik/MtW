import { FC, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router';

import { getMovies } from '../../../../redux/reducers/moviesReducer';
import { StoreType, useAppDispatch } from '../../../../redux/store';
import { MovieDtoV13Extended, SliderProps } from '../../../shared/types';
import { FilmCover } from '../filmCover/filmCover';

import { Pagination } from './pagination';

export const AllItems: FC<SliderProps> = props => {
	const { array } = props;
	// const [currentArray, setCurrentArray] = useState<MovieDtoV13Extended[]>([]);
	const [currentPage, setCurrentPage] = useState<number>(1);

	const location = useLocation();
	const dispatch = useAppDispatch();
	const stateFromStore = useSelector((state: StoreType) => state.userState);
	const { pages } = stateFromStore;
	const locationPage = +location.pathname.slice(7);

	const setState = (page: number) => {
		setCurrentPage(page);
	};
	let currentArray = array?.filter(elem => elem.page === locationPage);

	if (array && locationPage === 0) {
		currentArray = array?.filter(elem => elem.page === 1);
	}

	console.log(locationPage);
	console.log(array);
	useEffect(() => {
		if (locationPage > 1) {
			dispatch(getMovies(locationPage));
			console.log('useEffect AllItems', array);
		}
	}, [currentPage]);

	// if (array) {
	// 	setCurrentArray(
	// 		array[0].filmsArray !== undefined ? array[0].filmsArray : [],
	// 	);
	// let currentArray;
	// if (
	// 	array &&
	// 	location.pathname.slice(1, 5) === 'film' &&
	// 	locationPage === 0
	// ) {
	// 	setCurrentArray(array[0].filmsArray);
	// 	console.log('voshel 1');
	// }
	// if (array && location.pathname.slice(1, 8) === 'affiche') {
	// 	setCurrentArray(array[0].filmsArray);
	// 	// currentArray = array[0].filmsArray;
	// 	// console.log('voshel 2');
	// }
	// if (array && location.pathname.slice(1, 5) === 'film' && locationPage > 0) {
	// 	setCurrentArray(array[locationPage - 1].filmsArray);
	// 	// currentArray = array[locationPage - 1].filmsArray;
	// 	console.log('voshel 3');
	// }
	// console.log(typeof locationPage);
	// console.log(locationPage);
	// console.log(array);
	// console.log(location);

	// console.log(currentArray);

	return (
		<article className={'article'}>
			<div className={'wrap-container'}>
				{currentArray?.map(elem => (
					<FilmCover key={elem.id} movie={elem} />
				))}
			</div>
			<div>
				{currentArray ? (
					<Pagination
						page={currentPage}
						lastPage={pages.movies}
						setCurrentPage={setState}
					/>
				) : null}
			</div>
		</article>
	);
};
