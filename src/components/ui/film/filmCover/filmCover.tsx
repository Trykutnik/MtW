import { FC } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { ComponentMovieProps } from '../../../shared/types';

import './filmCover.scss';

export const FilmCover: FC<ComponentMovieProps> = props => {
	const { movie } = props;
	const navigate = useNavigate();

	const navigateToFilm = () => {
		navigate(`/film/${movie.id}`, { state: movie });
	};
	return (
		<div className={'film-cover'}>
			<div
				className={'film-cover__img-container'}
				onClick={navigateToFilm}
			>
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
