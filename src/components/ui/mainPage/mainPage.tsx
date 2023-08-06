import { useSelector } from 'react-redux';

import { StoreType } from '../../../redux/store';
import { Slider } from '../../shared/slider/slider';

import './mainPage.scss';
export const MainPage = () => {
	const stateFromStore = useSelector((state: StoreType) => state.userState);
	const { movies, affiche } = stateFromStore;

	console.log('MainPage', movies, affiche);
	return (
		<article className={'main-page article'}>
			<h3 className={'main-page__heading'}>Кино</h3>

			<Slider
				array={movies?.filter(elem => elem.page === 1)}
				arrayType={'films'}
			/>

			<h3 className={'main-page__heading'}>Сейчас в кино</h3>
			<Slider array={affiche} arrayType={'affiche'} />
			<h3 className={'main-page__heading'}>Сериалы</h3>

			<Slider
				array={movies?.filter(elem => elem.page === 1)}
				arrayType={'films'}
			/>
		</article>
	);
};
