import Carousel from 'react-elastic-carousel';
import { NavLink } from 'react-router-dom';

import { writeSectionName } from '../../hooks/writeSectionName';
import noImage from '../images/noImage.jpg';

import Item from './Item';

export const CarouselComponent = () => {
	return (
		<>
			{/*{array && array.length > 0 ? (*/}
			{/*	<Carousel itemsToShow={5} isRTL={false}>*/}
			{/*		{array.map((elem, index) => {*/}
			{/*			return (*/}
			{/*				<Item key={elem.id}>*/}
			{/*					<img*/}
			{/*						src={*/}
			{/*							elem.poster*/}
			{/*								? elem.poster.previewUrl*/}
			{/*								: noImage*/}
			{/*						}*/}
			{/*						alt={elem.name}*/}
			{/*					/>*/}
			{/*				</Item>*/}
			{/*			);*/}
			{/*		})}*/}
			{/*		<Item>*/}
			{/*			<NavLink*/}
			{/*				to='/affiche'*/}
			{/*				className={({ isActive }) =>*/}
			{/*					isActive ? 'link-active navlink' : 'navlink'*/}
			{/*				}*/}
			{/*			>*/}
			{/*				<p>{writeSectionName(arrayType)}</p>*/}
			{/*			</NavLink>*/}
			{/*			/!*	<img src={noImage} alt='noImage' />*!/*/}
			{/*		</Item>*/}
			{/*	</Carousel>*/}
			{/*) : null}*/}
		</>
	);
};
