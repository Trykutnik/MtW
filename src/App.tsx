import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import { getRelatedByQueryBuilderMovies } from './api/apiData';
import { Slider } from './components/shared/slider/slider';
import { AllItems } from './components/ui/film/allItems';
import { Film } from './components/ui/film/film';
import { Header } from './components/ui/header/header';
import { MainPage } from './components/ui/mainPage/mainPage';
import { getAffiche, getMovies } from './redux/reducers/moviesReducer';
import { StoreType, useAppDispatch } from './redux/store';

import './App.scss';

function App() {
	const stateFromStore = useSelector((state: StoreType) => state.userState);
	const { movies, affiche } = stateFromStore;
	const dispatch = useAppDispatch();

	// const bootstrap = async () => {
	// 	await getRelatedByQueryBuilderMovies();
	// };

	useEffect(() => {
		dispatch(getMovies());
		dispatch(getAffiche());
		// bootstrap();
	}, []);

	return (
		<>
			<Router>
				<Routes>
					<Route
						path='/'
						element={
							<>
								<Header />
							</>
						}
					>
						<Route index element={<MainPage />} />
						{/*<Route path='film' element={<Film />} />*/}
						<Route
							path='films'
							element={<AllItems array={movies} />}
						/>
						<Route path='films/:id' element={<Film />} />
						<Route
							path='affiche'
							element={<AllItems array={affiche} />}
						/>
					</Route>
					{/*<Route path='*' element={<Page404 />} />*/}
				</Routes>
			</Router>
		</>
	);
}

export default App;
