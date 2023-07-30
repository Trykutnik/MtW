import { FC } from 'react';
import Carousel from 'react-elastic-carousel';
import { NavLink, useNavigate } from 'react-router-dom';

import { writeSectionName } from '../../hooks/writeSectionName';
import noImage from '../images/noImage.jpg';
import { MovieDtoV13Extended, SliderProps } from '../types';

import Item from './Item';

import './slider.scss';

interface ReactElasticCarouselProps {
	children: HTMLElement;
	itemsToShow: number;
}

export const Slider: FC<SliderProps> = props => {
	const { array, arrayType } = props;
	const navigate = useNavigate();
	// console.log(array);
	const navigateToFilm = (movie: MovieDtoV13Extended) => {
		navigate(`/film/${movie.id}`, { state: movie });
	};
	return (
		<>
			{array && array.length > 0 ? (
				<Carousel itemsToShow={7} isRTL={false} itemsToScroll={5}>
					{array.map((elem, index) => {
						return (
							<Item
								key={elem.id}
								onClick={() => navigateToFilm(elem)}
							>
								<div className={'slider__img-container'}>
									<img
										src={
											elem.poster
												? elem.poster.previewUrl
												: noImage
										}
										alt={elem.name}
										className={'slider__img'}
									/>
								</div>
								<div className={'slider__text-container'}>
									<p className={'slider__text'}>
										{elem.name}
									</p>
								</div>
							</Item>
						);
					})}
					<Item>
						<NavLink
							to={`/${arrayType}`}
							className={({ isActive }) =>
								isActive ? 'link-active navlink' : 'navlink'
							}
						>
							<p>{writeSectionName(arrayType)}</p>
						</NavLink>
						{/*<img src={noImage} alt='noImage' />*/}
					</Item>
				</Carousel>
			) : null}
		</>
	);
};
