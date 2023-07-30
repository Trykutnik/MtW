import { FC } from 'react';
import { useNavigate } from 'react-router-dom';

import {
	addOneFilm,
	addType,
	// addTypeToOneFilm,
} from '../../../../redux/reducers/moviesReducer';
import { useAppDispatch } from '../../../../redux/store';
// import noImage2 from '...'
// import noImage from ' /src/components/shared/images/noImage.jpg';
import noImage from '../../../shared/images/noImage.jpg';
import {
	ComponentMovieProps,
	MovieDtoV13Extended,
	MyType,
} from '../../../shared/types';

import './searchContainer.scss';
export const SearchContainer: FC<ComponentMovieProps> = props => {
	const { movie } = props;
	const navigate = useNavigate();
	const dispatch = useAppDispatch();

	let dispatchType: MyType = 'films';

	if (movie.ticketsOnSale) {
		dispatchType = 'affiche';
	}
	// if (movie.type === 'tv-series') {
	// 	dispatchType = 'tv-series';
	// }
	// const film = movie;
	// film.myType = dispatchType;
	const navigateToFilm = () => {
		console.log('Current search movie', movie);
		// navigate(-1);
		// dispatch(addTypeToOneFilm({ film: movie, type: dispatchType }));
		dispatch(addOneFilm({ film: movie, type: dispatchType }));
		navigate(`/film/${movie.id}`, { state: movie });
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
