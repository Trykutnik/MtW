import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router';
import { Review } from '@openmoviedb/kinopoiskdev_client';

import { getComments } from '../../../redux/reducers/moviesReducer';
import { StoreType, useAppDispatch } from '../../../redux/store';
import { MovieDtoV13Extended } from '../../shared/types';

import { Comment } from './comment/Comment';
import { NewComment } from './comment/NewComment';
import { StyledPoster } from './styled/StyledPoster';
import { InformationContainer } from './informationContainer';
import { InformationFromArrayContainer } from './informationFromArrayContainer';
import { RatingText } from './ratingText';

import './film.scss';

export const Film = () => {
	const stateFromStore = useSelector((state: StoreType) => state.userState);
	const { movies, affiche } = stateFromStore;
	const dispatch = useAppDispatch();

	const location = useLocation();
	let movie: MovieDtoV13Extended | undefined;
	console.log(location.state.myType);
	switch (location.state.myType) {
		case 'films':
			movie = movies?.filter(elem => elem.id === location.state.id)[0];
			console.log('location.state.myType === films', movie);
			break;
		case 'affiche':
			movie = affiche?.filter(elem => elem.id === location.state.id)[0];
			console.log('location.state.myType === affiche', movie);
			break;
		default:
			movie = movies?.filter(elem => elem.id === location.state.id)[0];
			console.log('location.state.myType === default(films)', movie);
	}

	console.log(location.state);
	console.log(location.state.myType);
	console.log(movies);
	console.log(affiche);
	// const movie = movies?.filter(elem => elem.id === location.state.id)[0];
	console.log(movie);
	// console.log(location.state);

	// const movie = location.state;

	useEffect(() => {
		if (movie && !movie.comments?.length) {
			dispatch(getComments(movie.id));
		}
		if (movie && movie.comments) console.log('Comments', movie.comments);
	}, []);

	return (
		<article className={'film article'}>
			{movie ? (
				<div className={'film__wrapper'}>
					{/*<div className={'film__background-text-container'}>*/}
					{/*	/!*<svg*!/*/}
					{/*	/!*	className={'film__background-text'}*!/*/}
					{/*	/!*	xmlns='http://www.w3.org/2000/svg'*!/*/}
					{/*	/!*	version='1.1'*!/*/}
					{/*	/!*	id='svgcontent'*!/*/}
					{/*	/!*>*!/*/}
					{/*	/!*	<text*!/*/}
					{/*	/!*		x={'0'}*!/*/}
					{/*	/!*		y={'150'}*!/*/}
					{/*	/!*		fill={'gray'}*!/*/}
					{/*	/!*		fontFamily={'Arial, sans-serif'}*!/*/}
					{/*	/!*		fontSize={'400px'}*!/*/}
					{/*	/!*	>*!/*/}
					{/*	/!*		{movie.name}*!/*/}
					{/*	/!*	</text>*!/*/}
					{/*	/!*	<text*!/*/}
					{/*	/!*		x={'0'}*!/*/}
					{/*	/!*		y={'800'}*!/*/}
					{/*	/!*		fill={'gray'}*!/*/}
					{/*	/!*		fontFamily={'Arial, sans-serif'}*!/*/}
					{/*	/!*		fontSize={'400px'}*!/*/}
					{/*	/!*	>*!/*/}
					{/*	/!*		{movie.name}*!/*/}
					{/*	/!*	</text>*!/*/}
					{/*	/!*</svg>*!/*/}
					{/*	<p className={'film__background-text'}>*/}
					{/*		{movie.name &&*/}
					{/*			`${movie?.name} ${movie?.name} ${movie?.name} ${movie?.name} ${movie?.name}`}*/}
					{/*	</p>*/}
					{/*</div>*/}
					<h2>{movie.name ? movie.name : movie.alternativeName}</h2>
					{/*<p>{movie?.id}</p>*/}
					<div className={'film__container'}>
						<div className={'film__cover-container'}>
							{/*<div>*/}
							<StyledPoster
								src={movie?.poster?.url}
								alt={movie?.name}
							/>
							{/*</div>*/}
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
							{movie?.movieLength ? (
								<InformationContainer
									title={'Продолжительность'}
									content={movie?.movieLength}
									additionalContent={' мин'}
								/>
							) : null}
							<InformationFromArrayContainer
								title={'Жанры'}
								array={movie}
								additionalParms={'genre'}
							/>
							{movie?.persons?.length ? (
								<InformationFromArrayContainer
									title={'Актёры'}
									array={movie}
									additionalParms={'person'}
								/>
							) : (
								<InformationContainer
									title={'Актёры'}
									content={'Нет данных'}
								/>
							)}
							{movie?.ageRating ? (
								<InformationContainer
									title={'Возрастной рейтинг'}
									content={movie?.ageRating}
									additionalContent={'+'}
								/>
							) : (
								<InformationContainer
									title={'Возрастной рейтинг'}
									content={'Без ограничений'}
								/>
							)}
							{movie.description ? (
								<p className={'film__description'}>
									{movie.description}
								</p>
							) : null}
						</div>
					</div>
					<h4 className={'film__reviews'}>Рецензии пользователей</h4>
					<NewComment id={movie.id} />
					<div>
						{movie.comments
							? movie.comments.map((elem: Review) => (
									<Comment key={elem.id} comment={elem} />
							  ))
							: null}
					</div>
				</div>
			) : null}
		</article>
	);
};
