import { FC } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { addOneFilm } from '../../../../redux/reducers/moviesReducer';
import { StoreType, useAppDispatch } from '../../../../redux/store';
// import noImage2 from '...'
// import noImage from ' /src/components/shared/images/noImage.jpg';
import noImage from '../../../shared/images/noImage.jpg';
import { ComponentMovieProps, MyType } from '../../../shared/types';

import './searchContainer.scss';
export const SearchContainer: FC<ComponentMovieProps> = props => {
	const { movie, blurSearch } = props;
	const stateFromStore = useSelector((state: StoreType) => state.userState);
	const { searchValues } = stateFromStore;
	const navigate = useNavigate();
	const dispatch = useAppDispatch();

	let dispatchType: MyType = 'films';

	// if (movie.type === 'tv-series') {
	// 	dispatchType = 'tv-series';
	// }
	// const film = movie;
	// film.myType = dispatchType;
	const navigateToFilm = () => {
		if (movie.ticketsOnSale) {
			dispatchType = 'affiche';
		}
		// const navigateState = searchValues?.filter(
		// 	elem => elem.id === movie.id,
		// )[0];
		console.log('movie.tichetsOnSale ===', movie.ticketsOnSale);
		console.log(dispatchType);
		console.log('Current search movie', movie);
		// navigate(-1);
		// dispatch(addTypeToOneFilm({ film: movie, type: dispatchType }));
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
