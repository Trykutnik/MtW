import { useRef, useState } from 'react';
import { Outlet } from 'react-router';
import { NavLink } from 'react-router-dom';

import noImage from '../noImage.jpg';

import logo from './icons/logo.svg';
import searchIcon from './icons/search.svg';
import { StyledLabel } from './styled/LabelStyled';
import { ThemeSwitcher } from './ThemeSwitcher';

import './header.scss';
import './themeButton.scss';

export const Header = () => {
	const [labelFocus, setLabelFocus] = useState<boolean>(false);
	// const labelFocus = useRef(false);
	const inputRef = useRef<HTMLInputElement>(null);

	const setFocus = () => {
		setLabelFocus(true);
		// labelFocus.current = true;
	};
	const setBlur = () => {
		setLabelFocus(false);
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
					{/*</div>*/}
					<ThemeSwitcher />
				</div>
			</article>

			<Outlet />
		</>
	);
};
