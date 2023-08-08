import React, { useContext } from 'react';

import { ThemeContext } from '../../../themes/ThemeProvider';

export const ThemeSwitcher = () => {
	const { toggleTheme } = useContext(ThemeContext);

	return (
		<div className='theme-switcher'>
			<label className='theme-switcher__label'>
				<input
					className='theme-switcher__checkbox'
					type='checkbox'
					onClick={toggleTheme}
				/>
				<span className='theme-switcher__slider'></span>
			</label>
		</div>
	);
};
