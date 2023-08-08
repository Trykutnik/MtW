import { FC } from 'react';
import { useNavigate } from 'react-router-dom';

import { ComponentMovieProps } from '../../../shared/types';

import { StyledSpan } from './styled/StyledSpan';

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
				<StyledSpan
					rating={movie.rating?.kp ? movie.rating?.kp : 0}
					className={'film-cover__rating'}
				>
					{movie.rating?.kp && movie.rating?.kp > 0
						? movie.rating?.kp?.toFixed(1)
						: 'Нет оценок'}
				</StyledSpan>
			</div>
			<p>
				{movie.name
					? movie.name + ' ' + movie.year
					: movie.alternativeName + ' ' + movie.year}
			</p>
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
