import React, { useContext, useEffect, useState } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';

import { useAuth } from '../../../authentification/authProvider';
import { ThemeContext } from '../../../themes/ThemeProvider';

import hidePasswordIcon from './icon/hidePassword.svg';
import showPasswordIcon from './icon/showPassword.svg';
import { LoginButton } from './styled/LoginButton';
import { LoginSemiButton } from './styled/LoginSemiButton';
import { LoginWrapper } from './styled/LoginWrapper';
import { ErrorInput } from './error';

import './login.scss';

const emailValidation = /^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/i;
export const passwordValidation =
	/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#?!@$%^&*-])[A-Za-z\d@$!%*?&]{8,}$/;

export const Login = (): React.ReactElement => {
	const [showPasswordValue, setShowPasswordValue] = useState<boolean>(true);
	const [email, setEmail] = useState<string>('');
	const [emailError, setEmailError] = useState<boolean>(false);
	const [password, setPassword] = useState<string>('');
	const [passwordError, setPasswordError] = useState<boolean>(false);
	const [login, setLogin] = useState<boolean>(false);
	const [confirm, setConfirm] = useState(false);
	const { themeType, stylesForTheme } = useContext(ThemeContext);
	const auth = useAuth();
	const navigate = useNavigate();
	const location = useLocation();

	useEffect(() => {
		if (!emailError && email && !passwordError && password) {
			setLogin(true);
		} else {
			setLogin(false);
		}
	}, [emailError, passwordError, email, password]);

	const showPassword = (event: any) => {
		const { target } = event;

		if (target.className === 'login__show-password-icon') {
			if (target.parentElement.nextSibling.type === 'text') {
				setShowPasswordValue(true);
				return (target.parentElement.nextSibling.type = 'password');
			} else {
				setShowPasswordValue(false);
				return (target.parentElement.nextSibling.type = 'text');
			}
		}
	};

	const handleChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
		switch (event.target.id) {
			case 'email':
				setEmail(event.target.value);
				break;
			case 'password':
				setPassword(event.target.value);
				break;
		}
	};

	const handleBlur = (event: React.ChangeEvent<HTMLInputElement>) => {
		switch (event.target.id) {
			case 'email':
				emailValidation.test(email)
					? setEmailError(false)
					: setEmailError(true);
				break;
			case 'password':
				passwordValidation.test(password)
					? setPasswordError(false)
					: setPasswordError(true);
				break;
		}
	};

	const handleSubmit = (event: React.FormEvent) => {
		event.preventDefault();

		auth.logIn(email);
		location.state
			? navigate(location.state, { replace: true })
			: navigate('/', { replace: true });

		return setConfirm(true);
	};

	return (
		<article className={'login__article'}>
			{location.state && (
				<p className='warning'>Вы должны залогиниться</p>
			)}
			<LoginWrapper
				className='login'
				currentThemeType={themeType}
				currentTheme={stylesForTheme}
			>
				<div className='login__container'>
					<div className='login__form_container'>
						<h2 className='login__h2'>
							Войдите или зарегистрируйтесь
						</h2>
						<form className='login__form' onSubmit={handleSubmit}>
							<label className='login__label' htmlFor='email'>
								email
								{emailError && <ErrorInput />}
							</label>
							<input
								type='text'
								name='email'
								id='email'
								value={email}
								onChange={handleChangeInput}
								onBlur={handleBlur}
								required
							/>
							<label
								className='login__label login__label-password'
								htmlFor='password'
							>
								password{' '}
								<img
									onClick={showPassword}
									className='login__show-password-icon'
									src={
										showPasswordValue
											? showPasswordIcon
											: hidePasswordIcon
									}
									alt='showPasswordIcon'
								/>
								{passwordError && <ErrorInput />}
							</label>
							<input
								type='password'
								name='password'
								id='password'
								value={password}
								onChange={handleChangeInput}
								onBlur={handleBlur}
								required
							/>
							{/*<div className='login__password-information-container'>*/}
							{/*	<label*/}
							{/*		className='login__remember-label'*/}
							{/*		htmlFor='rememberCheckbox'*/}
							{/*	>*/}
							{/*		<input*/}
							{/*			type='checkbox'*/}
							{/*			name='rememberCheckbox'*/}
							{/*			id='rememberCheckbox'*/}
							{/*		/>*/}
							{/*		Remember me?*/}
							{/*	</label>*/}
							{/*	<LoginSemiButton*/}
							{/*		currentThemeType={themeType}*/}
							{/*		currentTheme={stylesForTheme}*/}
							{/*		className='button pseudobutton login__recovery-password-button'*/}
							{/*	>*/}
							{/*		Forgot password?*/}
							{/*	</LoginSemiButton>*/}
							{/*</div>*/}
							<div className='login__button-container'>
								<div className='login__button-wrapper'>
									<LoginButton
										currentThemeType={themeType}
										currentTheme={stylesForTheme}
										borderStyle='contained'
										type='submit'
										id='loginButton'
										disabled={!login}
										className='login__button-login'
									>
										Вход
									</LoginButton>
								</div>
								{/*<div className='login__button-wrapper'>*/}
								{/*	<NavLink to='/signUp' className='link'>*/}
								{/*		<LoginButton*/}
								{/*			currentThemeType={themeType}*/}
								{/*			currentTheme={stylesForTheme}*/}
								{/*			borderStyle='outlined'*/}
								{/*			className='button login__button login__button-create'*/}
								{/*		>*/}
								{/*			create account*/}
								{/*		</LoginButton>*/}
								{/*	</NavLink>*/}
								{/*</div>*/}
							</div>
						</form>
					</div>
				</div>
			</LoginWrapper>
			<div className={'login__filler'}></div>
		</article>
	);
};
