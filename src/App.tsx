import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import { Slider } from './components/shared/slider/slider';
import { Header } from './components/ui/header/header';
import { getMovies } from './redux/reducers/moviesReducer';
import { StoreType, useAppDispatch } from './redux/store';

import './App.scss';

function App() {
	const stateFromStore = useSelector((state: StoreType) => state.userState);
	const dispatch = useAppDispatch();

	useEffect(() => {
		// dispatch(fetchUsers())
		dispatch(getMovies());
		// console.log(getMovies());
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
						{/*<Route index element={<Login />} />*/}
						{/*<Route path='signUp' element={<SignUp />} />*/}
						{/*} />*/}
					</Route>
					{/*<Route path='*' element={<Page404 />} />*/}
				</Routes>
			</Router>
			<Slider />
			<pre>
				{stateFromStore.movies?.length && stateFromStore.movies[0].name}
			</pre>
		</>
	);
}

export default App;
