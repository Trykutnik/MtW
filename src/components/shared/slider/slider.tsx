import { FC, useContext } from 'react';
import Carousel from 'react-elastic-carousel';
import { Link, useNavigate } from 'react-router-dom';

import { ThemeContext } from '../../../themes/ThemeProvider';
import { writeSectionName } from '../../hooks/writeSectionName';
import noImage from '../images/noImage.jpg';
import { TextShared } from '../styled/TextShared';
import { MovieDtoV13Extended, SliderProps } from '../types';
import { windowWidth } from '../variables';

import { Arrow } from './styled/Arrow';
import { Circle } from './styled/Cirlcle';
import Item from './Item';

import './slider.scss';

export const Slider: FC<SliderProps> = props => {
	const { array, arrayType } = props;
	const { themeType } = useContext(ThemeContext);

	const navigate = useNavigate();
	const navigateToFilm = (movie: MovieDtoV13Extended) => {
		navigate(`/film/${movie.id}`, { state: movie });
	};

	return (
		<>
			{array && array.length > 0 ? (
				<Carousel
					itemsToShow={
						windowWidth >= 1440 ? 7 : windowWidth >= 800 ? 5 : 3
					}
					isRTL={false}
					itemsToScroll={5}
				>
					{array.map(elem => {
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
										{elem.name
											? elem.name
											: elem.alternativeName}
									</p>
								</div>
							</Item>
						);
					})}
					<Item>
						<Link to={`/${arrayType}`} className={'slider__link'}>
							<Circle
								theme={themeType}
								className={'slider__link-circle'}
							>
								<Arrow
									theme={themeType}
									className={'slider__link-line'}
								></Arrow>
							</Circle>
							<TextShared
								theme={themeType}
								className={'slider__link-text'}
							>
								{writeSectionName(arrayType)}
							</TextShared>
						</Link>
						{/*<img src={noImage} alt='noImage' />*/}
					</Item>
				</Carousel>
			) : null}
		</>
	);
};
