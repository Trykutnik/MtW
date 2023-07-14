import { FC } from 'react';

import { ComponentMovieProps } from '../../shared/types';

import './filmCover.scss';

export const FilmCover: FC<ComponentMovieProps> = props => {
	const { movie } = props;
	return (
		<div className={'film-cover'}>
			<div className={'film-cover__img-container'}>
				<img
					src={movie.poster?.previewUrl}
					alt={`${movie.name} image`}
					className={'film-cover__img'}
				/>
				<span className={'film-cover__rating'}>
					{movie.rating?.kp?.toFixed(1)}
				</span>
			</div>
			<p>
				{movie.genres
					? movie.genres
							.reduce((acc, elem) => acc + elem.name + ', ', '')
							.slice(0, -2)
					: null}
			</p>
		</div>
	);
};
