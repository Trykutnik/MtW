import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import { AllItems } from './components/ui/film/allItems/allItems';
import { Film } from './components/ui/film/film';
import { Header } from './components/ui/header/header';
import { MainPage } from './components/ui/mainPage/mainPage';
import { Page404 } from './components/ui/page404/Page404';
import {
	getAffiche,
	getMovies,
	getTvSeries,
} from './redux/reducers/moviesReducer';
import { StoreType, useAppDispatch } from './redux/store';

import './App.scss';

function App() {
	const stateFromStore = useSelector((state: StoreType) => state.userState);
	const { movies, affiche, tvSeries } = stateFromStore;
	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(getMovies(1));
		dispatch(getAffiche());
		dispatch(getTvSeries(1));
	}, []);

	console.log(movies);
	console.log(window.innerWidth);
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
						<Route path='film' element={<Film />} />
						<Route
							path='films'
							element={<AllItems array={movies} />}
						/>
						<Route
							path='films/:page'
							element={<AllItems array={movies} />}
						/>
						<Route path='film/:id' element={<Film />} />
						<Route
							path='affiche'
							element={<AllItems array={affiche} />}
						/>
						<Route
							path='tv-series'
							element={<AllItems array={tvSeries} />}
						/>
						<Route
							path='tv-series/:page'
							element={<AllItems array={tvSeries} />}
						/>
					</Route>
					<Route path='*' element={<Page404 />} />
				</Routes>
			</Router>
		</>
	);
}

export default App;
