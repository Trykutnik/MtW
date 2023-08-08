import React, { useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { Outlet } from 'react-router';
import { NavLink } from 'react-router-dom';
import { useDebouncedCallback } from 'use-debounce';

import { findFilm } from '../../../redux/reducers/moviesReducer';
import { StoreType, useAppDispatch } from '../../../redux/store';

import logo from './icons/logo.svg';
import profileIcon from './icons/Profile.svg';
import searchIcon from './icons/search.svg';
import { SearchContainer } from './search/searchContainer';
import { StyledDiv } from './styled/StyledDiv';
import { StyledInput } from './styled/StyledInput';
import { StyledLabel } from './styled/StyledLabel';
import { ThemeSwitcher } from './ThemeSwitcher';

import './header.scss';
import './themeButton.scss';

export const Header = () => {
	const dispatch = useAppDispatch();
	const stateFromStore = useSelector((state: StoreType) => state.userState);
	const { searchValues } = stateFromStore;
	const [labelFocus, setLabelFocus] = useState<boolean>(false);
	const [inputValue, setInputValue] = useState<string>('');
	const [showInput, setShowInput] = useState<boolean>(false);

	const inputRef = useRef<HTMLInputElement>(null);
	const debounceOnChange = useDebouncedCallback(
		() => dispatch(findFilm(inputValue)),
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
			return debounceOnChange();
		}
	};
	const handleSearchButton = (event: React.MouseEvent<HTMLButtonElement>) => {
		event.preventDefault();
		setShowInput(true);
	};
	const handleCross = (event: React.MouseEvent<HTMLButtonElement>) => {
		event.preventDefault();
		setShowInput(false);
	};

	const setState = () => {
		setShowInput(false);
	};

	return (
		<>
			<article className={'header'}>
				<StyledDiv show={showInput} className={'header__search-mobile'}>
					<StyledInput
						active={showInput}
						ref={inputRef}
						id={'headerSearch'}
						type={'text'}
						value={inputValue}
						onChange={handleChangeValue}
						placeholder={'Фильмы, сериалы, мультфильмы'}
					/>
					{searchValues && searchValues.length ? (
						<div className={'header__search'}>
							{searchValues && searchValues.length
								? searchValues?.map((elem, index) => {
										if (index <= 9)
											return (
												<SearchContainer
													key={elem.id}
													movie={elem}
													blurSearch={setState}
												/>
											);
								  })
								: null}
						</div>
					) : (
						<div></div>
					)}

					<button
						className={'header__cross-container'}
						onClick={handleCross}
					>
						<span className={'header__cross'}></span>
					</button>
				</StyledDiv>

				<div className={'header__container article'}>
					<input
						id='burger'
						className='burger__checkbox'
						type='checkbox'
					/>
					<label className='burger__checkbox-label' htmlFor='burger'>
						<span className='burger__checkbox-label-line'></span>
					</label>
					<NavLink
						to='/'
						className={({ isActive }) =>
							isActive
								? 'link-active navlink navlink-main'
								: 'navlink navlink-main'
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
					<div className={'header__menu-container'}>
						<nav className='header__menu'>
							<NavLink
								to='/films'
								className={({ isActive }) =>
									isActive
										? 'link-active navlink navlink-main'
										: 'navlink navlink-main'
								}
							>
								<p>Фильмы</p>
							</NavLink>
							<NavLink
								to='/affiche'
								className={({ isActive }) =>
									isActive
										? 'link-active navlink navlink-main'
										: 'navlink navlink-main'
								}
							>
								<p>Сегодня в кино</p>
							</NavLink>
							<NavLink
								to='/tv-series'
								className={({ isActive }) =>
									isActive
										? 'link-active navlink navlink-main'
										: 'navlink navlink-main'
								}
							>
								<p>Сериалы</p>
							</NavLink>
						</nav>
						<form action='' method='get' className={'header__form'}>
							<StyledLabel
								htmlFor={'headerSearch'}
								className={'header__input-container'}
								focus={labelFocus}
							>
								<input
									ref={inputRef}
									id={'headerSearch'}
									type={'text'}
									placeholder={'Фильмы, сериалы, мультфильмы'}
									className={'header__input'}
									value={inputValue}
									onChange={handleChangeValue}
									onFocus={setFocus}
									onBlur={setBlur}
									autoComplete={'off'}
								/>
								<button
									className={'header__input-button'}
									onClick={handleSearchButton}
								>
									<img
										src={searchIcon}
										alt='search icon'
										className={'header__input-button-img'}
									/>
								</button>
							</StyledLabel>
							<aside
								style={{
									visibility: labelFocus
										? 'visible'
										: 'hidden',
									transition: '120ms',
								}}
							>
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
					</div>
					{/*</div>*/}
					<NavLink
						to='/login'
						className={({ isActive }) =>
							isActive ? 'link-active navlink' : 'navlink'
						}
					>
						<div className='header__profile-container'>
							<img
								className='header__profile-img'
								src={profileIcon}
								alt='profile'
							/>
						</div>
					</NavLink>
					<ThemeSwitcher />
				</div>
			</article>
			<Outlet />
			<article className={'footer'}>
				<h1 className={'footer__text'}>&copy; 2023 MtW</h1>
			</article>
		</>
	);
};
