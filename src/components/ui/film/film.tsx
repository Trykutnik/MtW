import { useSelector } from 'react-redux';

import { StoreType } from '../../../redux/store';

import { RatingText } from './styled/ratingText';
import { StyledPoster } from './styled/StyledPoster';
import { InformationContainer } from './informationContainer';
import { InformationFromArrayContainer } from './informationFromArrayContainer';

import './film.scss';

export const Film = () => {
	const stateFromStore = useSelector((state: StoreType) => state.userState);
	const { movies } = stateFromStore;
	const movie = movies && movies.length > 0 ? movies[8] : null;
	return (
		<article className={'film'}>
			{movie ? (
				<div className={'film__wrapper'}>
					<h4>{movie?.name}</h4>
					<div className={'film__container'}>
						<div className={'film__cover-container'}>
							<div>
								<StyledPoster
									src={movie?.poster?.url}
									alt={movie?.name}
								/>
								{/*<img*/}
								{/*	src={movie?.poster?.previewUrl}*/}
								{/*	alt={movie?.name}*/}
								{/*/>*/}
							</div>
						</div>
						<div className={'film__information-container'}>
							<div className={'film__rating-container'}>
								<RatingText
									array={movie}
									critic={'kp'}
									text={'Рейтинг КП'}
								/>
								<RatingText
									array={movie}
									critic={'imdb'}
									text={'Рейтинг IMDB'}
								/>
								<RatingText
									array={movie}
									critic={'filmCritics'}
									text={'Рейтинг критиков'}
								/>

								{/*<p>*/}
								{/*	{movie?.rating?.filmCritics &&*/}
								{/*	movie?.rating?.filmCritics !== 0*/}
								{/*		? movie?.rating?.filmCritics*/}
								{/*		: null}*/}
								{/*</p>*/}
								{/*<p>{movie?.rating?.kp}</p>*/}
								{/*<p>*/}
								{/*	{movie?.rating?.imdb &&*/}
								{/*	movie.rating.imdb !== 0*/}
								{/*		? movie.rating.imdb*/}
								{/*		: null}*/}
								{/*</p>*/}
							</div>
							{movie?.alternativeName ? (
								<InformationContainer
									title={'Оригинальное название'}
									content={movie?.alternativeName}
								/>
							) : null}
							<InformationContainer
								title={'Год'}
								content={movie?.year}
							/>
							<InformationContainer
								title={'Продолжительность'}
								content={movie?.movieLength}
								additionalContent={' мин'}
							/>
							<InformationFromArrayContainer
								title={'Жанры'}
								array={movie}
								additionalParms={'genre'}
							/>
							<InformationFromArrayContainer
								title={'Актёры'}
								array={movie}
								additionalParms={'person'}
							/>
							<InformationContainer
								title={'Возрастной рейтинг'}
								content={movie?.ageRating}
								additionalContent={'+'}
							/>
							<p>{movie.description}</p>
						</div>
					</div>
				</div>
			) : null}
		</article>
	);
};
