import { Outlet } from 'react-router';
import { NavLink } from 'react-router-dom';

import noImage from '../noImage.jpg';

import logo from './icons/logo.svg';
import { ThemeSwitcher } from './ThemeSwitcher';

import './header.scss';
import './themeButton.scss';

export const Header = () => {
	return (
		<>
			<article className={'header'}>
				{/*<p>MtW</p>*/}
				<nav className='header__menu'>
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
					<NavLink
						to='/film'
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
				<input type='text' />
				<button>Login</button>
				<ThemeSwitcher />
			</article>

			<Outlet />
		</>
	);
};
