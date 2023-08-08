import { FC } from 'react';
import { useNavigate } from 'react-router-dom';

import { addOneFilm } from '../../../../redux/reducers/moviesReducer';
import { useAppDispatch } from '../../../../redux/store';
import noImage from '../../../shared/images/noImage.jpg';
import { ComponentMovieProps, MyType } from '../../../shared/types';

import './searchContainer.scss';
export const SearchContainer: FC<ComponentMovieProps> = props => {
	const { movie, blurSearch } = props;
	const navigate = useNavigate();
	const dispatch = useAppDispatch();

	let dispatchType: MyType = 'films';

	const navigateToFilm = () => {
		if (movie.ticketsOnSale) {
			dispatchType = 'affiche';
		}

		dispatch(addOneFilm({ film: movie, type: dispatchType }));
		navigate(`/film/${movie.id}`, { state: movie });
		if (blurSearch) {
			blurSearch();
		}
	};

	return (
		<div className={'search'} onClick={navigateToFilm}>
			<div className={'search__img-container'}>
				<img
					src={
						movie.poster?.previewUrl
							? movie.poster?.previewUrl
							: noImage
					}
					alt={`${movie.name} image`}
					className={'search__img'}
				/>
			</div>
			<div className={'search__data-container'}>
				<p>{movie.name}</p>
				<div className={'search__year-and-rating-container'}>
					<p>{movie.rating?.kp ? movie.rating?.kp : null}</p>
					<p>{movie.year ? movie.year : null}</p>
				</div>
			</div>
		</div>
	);
};
