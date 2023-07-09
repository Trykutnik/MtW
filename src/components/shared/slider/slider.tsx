import { FC } from 'react';
import Carousel from 'react-elastic-carousel';
import { useSelector } from 'react-redux';

import { StoreType, useAppDispatch } from '../../../redux/store';
import noImage from '../noImage.jpg';

import Item from './Item';

import './slider.scss';

interface ReactElasticCarouselProps {
	children: HTMLElement;
	itemsToShow: number;
}

export const Slider = () => {
	const stateFromStore = useSelector((state: StoreType) => state.userState);
	const { movies } = stateFromStore;

	return (
		<>
			{movies && movies.length > 0 ? (
				<Carousel itemsToShow={3} isRTL={false}>
					{movies.map((elem, index) => {
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
						<img src={noImage} alt='noImage' />
					</Item>
				</Carousel>
			) : null}
		</>
	);
};
