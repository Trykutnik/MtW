import { useContext, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router';
import { Review } from '@openmoviedb/kinopoiskdev_client';
import { htmlToText } from 'html-to-text';

import { getComments } from '../../../redux/reducers/moviesReducer';
import { StoreType, useAppDispatch } from '../../../redux/store';
import { ThemeContext } from '../../../themes/ThemeProvider';
import { ContainerShared } from '../../shared/styled/ContainerShared';
import { MovieDtoV13Extended } from '../../shared/types';

import { Comment } from './comment/Comment';
import { NewComment } from './comment/NewComment';
import { StyledPoster } from './styled/StyledPoster';
import { InformationContainer } from './informationContainer';
import { InformationFromArrayContainer } from './informationFromArrayContainer';
import { RatingText } from './ratingText';

import './film.scss';
import './comment/comment.scss';

export const Film = () => {
	const stateFromStore = useSelector((state: StoreType) => state.userState);
	const { movies, affiche, tvSeries } = stateFromStore;
	const { themeType } = useContext(ThemeContext);
	const dispatch = useAppDispatch();
	const location = useLocation();
	let movie: MovieDtoV13Extended | undefined;
	let convertedToText;

	switch (location.state.myType) {
		case 'films':
			movie = movies?.filter(elem => elem.id === location.state.id)[0];
			console.log('location.state.myType === films', movie);
			break;
		case 'affiche':
			movie = affiche?.filter(elem => elem.id === location.state.id)[0];
			console.log('location.state.myType === affiche', movie);
			break;
		case 'tv-series':
			movie = tvSeries?.filter(elem => elem.id === location.state.id)[0];
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
				<ContainerShared theme={themeType} className={'film__wrapper'}>
					<h2 className={'film__name'}>
						{movie.name ? movie.name : movie.alternativeName}
					</h2>
					<div className={'film__container'}>
						<div className={'film__cover-container'}>
							<StyledPoster
								src={movie?.poster?.url}
								alt={movie?.name}
							/>
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
							{movie.facts ? (
								<div className={'film__facts'}>
									<h4 className={'film__h4'}>
										Факты о фильме
									</h4>
									{movie.facts.map((elem, index) => {
										if (index <= 5) {
											convertedToText = htmlToText(
												elem.value,
												{},
											);
											return (
												<p
													key={index}
													className={'comment'}
												>
													{convertedToText}
												</p>
											);
										}
									})}
								</div>
							) : null}
						</div>
					</div>
					<h4 className={'film__h4'}>Рецензии пользователей</h4>
					<NewComment id={movie.id} />
					<div>
						{movie.comments
							? movie.comments.map((elem: Review) => (
									<Comment
										key={elem.id}
										comment={elem}
										filmName={
											movie?.name
												? movie.name
												: movie?.alternativeName
												? movie?.alternativeName
												: 'Неизвестно'
										}
									/>
							  ))
							: null}
					</div>
				</ContainerShared>
			) : null}
		</article>
	);
};
