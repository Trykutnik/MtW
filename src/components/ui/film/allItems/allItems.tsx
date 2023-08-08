import { FC, useContext, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router';

import {
	getMovies,
	getTvSeries,
} from '../../../../redux/reducers/moviesReducer';
import { StoreType, useAppDispatch } from '../../../../redux/store';
import { ThemeContext } from '../../../../themes/ThemeProvider';
import { ContainerShared } from '../../../shared/styled/ContainerShared';
import { SliderProps } from '../../../shared/types';
import { FilmCover } from '../filmCover/filmCover';

import { Pagination } from './pagination/pagination';

import './allItems.scss';

export const AllItems: FC<SliderProps> = props => {
	const { array } = props;
	const { themeType } = useContext(ThemeContext);
	const [currentPage, setCurrentPage] = useState<number>(1);
	const location = useLocation();
	const dispatch = useAppDispatch();
	const stateFromStore = useSelector((state: StoreType) => state.userState);
	const { pages } = stateFromStore;
	let locationPage = 0;

	const arrayType = array ? array[0]?.myType : 'films';
	if (arrayType === 'films') {
		locationPage = +location.pathname.slice(7);
	} else if (arrayType === 'tv-series') {
		locationPage = +location.pathname.slice(11);
	} else {
		locationPage = -1;
	}

	const setState = (page: number) => {
		setCurrentPage(page);
	};

	let currentArray = array
		? array?.filter(elem => elem.page === locationPage)
		: [];

	if (array && locationPage === 0) {
		currentArray = array?.filter(elem => elem.page === 1);
	}

	if (array && locationPage === -1) {
		currentArray = array;
	}

	useEffect(() => {
		if (
			locationPage > 1 &&
			!array?.find(elem => elem.page === currentPage)
		) {
			if (arrayType === 'tv-series') {
				dispatch(getTvSeries(locationPage));
			} else {
				dispatch(getMovies(locationPage));
			}
		}
	}, [currentPage]);

	return (
		<article className={'article'}>
			<ContainerShared theme={themeType} className={'wrap-container'}>
				{currentArray?.map(elem => (
					<FilmCover key={elem.id} movie={elem} />
				))}
			</ContainerShared>
			<div>
				{currentArray && location.pathname !== '/affiche' ? (
					<Pagination
						page={currentPage}
						lastPage={
							arrayType === 'tv-series'
								? pages.tvSeries
								: pages.movies
						}
						arrayType={arrayType ? arrayType : 'films'}
						setCurrentPage={setState}
					/>
				) : null}
			</div>
		</article>
	);
};
