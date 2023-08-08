import { useContext } from 'react';

import { ThemeContext } from '../../../themes/ThemeProvider';

import { ErrorStyled } from './styled/ErrorStyled';

export const ErrorInput = () => {
	const { themeType, stylesForTheme } = useContext(ThemeContext);

	return (
		<ErrorStyled
			currentThemeType={themeType}
			currentTheme={stylesForTheme}
			className='error-input'
		>
			Wrong data
		</ErrorStyled>
	);
};
