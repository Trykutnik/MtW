import { FC } from 'react';

// import noImage2 from '...'
// import noImage from ' /src/components/shared/images/noImage.jpg';
import noImage from '../../../shared/images/noImage.jpg';
import {
	ComponentMovieProps,
	MovieDtoV13Extended,
} from '../../../shared/types';

import './searchContainer.scss';
export const SearchContainer: FC<ComponentMovieProps> = props => {
	const { movie } = props;
	return (
		<div className={'search'}>
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
