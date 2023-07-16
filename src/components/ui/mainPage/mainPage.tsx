import { useSelector } from 'react-redux';

import { StoreType } from '../../../redux/store';
import { Slider } from '../../shared/slider/slider';

export const MainPage = () => {
	const stateFromStore = useSelector((state: StoreType) => state.userState);
	const { movies, affiche } = stateFromStore;
	return (
		<article className={'main-page article'}>
			<p>Кино</p>
			<Slider array={movies} arrayType={'films'} />
			<p>Сейчас в кино</p>
			<Slider array={affiche} arrayType={'affiche'} />
		</article>
	);
};
