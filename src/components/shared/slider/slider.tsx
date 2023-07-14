import { FC } from 'react';
import Carousel from 'react-elastic-carousel';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

import { StoreType, useAppDispatch } from '../../../redux/store';
import { writeSectionName } from '../../hooks/writeSectionName';
import noImage from '../noImage.jpg';
import { DataProps } from '../types';

import Item from './Item';

import './slider.scss';

interface ReactElasticCarouselProps {
	children: HTMLElement;
	itemsToShow: number;
}

export const Slider: FC<DataProps> = props => {
	const { array, arrayType } = props;

	return (
		<>
			{array && array.length > 0 ? (
				<Carousel itemsToShow={5} isRTL={false}>
					{array.map((elem, index) => {
						return (
							<Item key={elem.id}>
								<img
									src={
										elem.poster
											? elem.poster.previewUrl
											: noImage
									}
									alt={elem.name}
								/>
							</Item>
						);
					})}
					<Item>
						<NavLink
							to='/affiche'
							className={({ isActive }) =>
								isActive ? 'link-active navlink' : 'navlink'
							}
						>
							<p>{writeSectionName(arrayType)}</p>
							<p>
								{arrayType === 'film'
									? 'Все фильмы'
									: arrayType === 'affiche'
									? 'Аффиша'
									: arrayType === 'tv-series'
									? 'Все сериалы'
									: 'null'}
							</p>
						</NavLink>
						{/*	<img src={noImage} alt='noImage' />*/}
					</Item>
				</Carousel>
			) : null}
		</>
	);
};
