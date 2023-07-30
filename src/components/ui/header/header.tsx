import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { Outlet } from 'react-router';
import { NavLink } from 'react-router-dom';
import { debounce } from 'ts-debounce';
import { useDebounce, useDebouncedCallback } from 'use-debounce';
import { log } from 'util';

import {
	addToSearch,
	findFilm,
	getAffiche,
	getMovies,
} from '../../../redux/reducers/moviesReducer';
import { StoreType, useAppDispatch } from '../../../redux/store';
import noImage from '../noImage.jpg';

import logo from './icons/logo.svg';
import searchIcon from './icons/search.svg';
import { SearchContainer } from './search/searchContainer';
import { StyledLabel } from './styled/LabelStyled';
import { ThemeSwitcher } from './ThemeSwitcher';

import './header.scss';
import './themeButton.scss';

export const Header = () => {
	const dispatch = useAppDispatch();
	const stateFromStore = useSelector((state: StoreType) => state.userState);
	const { searchValues } = stateFromStore;
	const [labelFocus, setLabelFocus] = useState<boolean>(false);
	const [inputValue, setInputValue] = useState<string>('');

	const inputRef = useRef<HTMLInputElement>(null);

	useEffect(() => {
		if (inputValue === '') {
			debounceOnChangeEmpty();
			// dispatch(addToSearch([]));
			// dispatch(findFilm(inputValue));
			// debounce(() => dispatch(findFilm(inputValue)), 1000);
		}
	}, [inputValue]);
	// useEffect(() => console.log(searchValues));
	const debounceOnChange = useDebouncedCallback(
		() => dispatch(findFilm(inputValue)),
		1000,
	);
	const debounceOnChangeEmpty = useDebouncedCallback(
		() => dispatch(addToSearch([])),
		1000,
	);
	const setFocus = () => {
		setLabelFocus(true);
	};
	const setBlur = () => {
		setLabelFocus(false);
	};
	const handleChangeValue = (event: React.ChangeEvent<HTMLInputElement>) => {
		setInputValue(event.target.value);
		if (event.target.value !== '') {
			console.log('Popal if');
			console.log(event.target.value);
			return debounceOnChange();
		}
	};

	return (
		<>
			<article className={'header'}>
				<div className={'header__container article'}>
					<NavLink
						to='/'
						className={({ isActive }) =>
							isActive ? 'link-active navlink' : 'navlink'
						}
					>
						<div className={'header__logo-container'}>
							<img
								src={logo}
								alt='Logo'
								className={'header__logo'}
							/>
						</div>
					</NavLink>
					{/*<NavLink*/}
					{/*	to='/signUp'*/}
					{/*	className={({ isActive }) =>*/}
					{/*		isActive ? 'link-active navlink' : 'navlink'*/}
					{/*	}*/}
					{/*>*/}
					{/*	<p>SignUp</p>*/}
					{/*</NavLink>*/}
					{/*<NavLink*/}
					{/*	to='/users'*/}
					{/*	className={({ isActive }) =>*/}
					{/*		isActive ? 'link-active navlink' : 'navlink'*/}
					{/*	}*/}
					{/*>*/}
					{/*	<p>Users</p>*/}
					{/*</NavLink>*/}
					<nav className='header__menu'>
						<NavLink
							to='/films'
							className={({ isActive }) =>
								isActive ? 'link-active navlink' : 'navlink'
							}
						>
							<p>Фильмы</p>
						</NavLink>
						<NavLink
							to='/affiche'
							className={({ isActive }) =>
								isActive ? 'link-active navlink' : 'navlink'
							}
						>
							<p>Сегодня в кино</p>
						</NavLink>
					</nav>
					{/*<div>*/}
					<form action='' method='get' className={'header__form'}>
						<StyledLabel
							htmlFor={'headerSearch'}
							className={'header__input-container'}
							// focus={
							// 	inputRef.current && inputRef.current.
							// 		? true
							// 		: false
							// }
							focus={labelFocus}
						>
							<input
								ref={inputRef}
								id={'headerSearch'}
								type='text'
								placeholder={'Фильмы, сериалы, мультфильмы'}
								className={'header__input'}
								value={inputValue}
								onChange={handleChangeValue}
								onFocus={setFocus}
								onBlur={setBlur}
							/>
							<button className={'header__input-button'}>
								<img
									src={searchIcon}
									alt='search icon'
									className={'header__input-button-img'}
								/>
							</button>
						</StyledLabel>
						<aside>
							{searchValues && searchValues.length ? (
								<div className={'header__search'}>
									{searchValues?.map((elem, index) => {
										if (index <= 6)
											return (
												<SearchContainer
													key={elem.id}
													movie={elem}
												/>
											);
									})}
								</div>
							) : null}
						</aside>
					</form>

					{/*</div>*/}
					<ThemeSwitcher />
				</div>
			</article>

			<Outlet />
		</>
	);
};
