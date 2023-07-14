import React, { useState } from 'react';

import { Colors } from '../components/shared/colors';

export type ThemeType = 'light' | 'dark';

export interface Theme {
	body: Colors;
	text: Colors;
	toggleBorder: Colors;
	background: Colors;
	shadow: Colors;
	fontSize?: string;
}

export interface ThemeContextProps {
	themeType: ThemeType;
	stylesForTheme: Theme;
	toggleTheme: () => void;
}

export interface Props {
	children: React.ReactNode;
}

export const ThemeContext = React.createContext({} as ThemeContextProps);

export const Themes: Record<ThemeType, Theme> = {
	light: {
		body: Colors.WHITE,
		text: Colors.LIGHT_BLACK,
		toggleBorder: Colors.BLACK,
		background: Colors.LIGHT_GRAY,
		shadow: Colors.LIGHT_SHADOW,
	},
	dark: {
		body: Colors.LIGHT_BLACK,
		text: Colors.WHITE,
		toggleBorder: Colors.BLUE,
		background: Colors.DARK_GRAY,
		shadow: Colors.SHADOW,
	},
};

export const ThemeProvider: React.FC<Props> = ({ children }) => {
	const [theme, setTheme] = useState<ThemeType>('light');
	const toggleTheme = () => {
		setTheme(theme === 'light' ? 'dark' : 'light');
	};

	document.body.style.backgroundColor =
		theme === 'light' ? Colors.CLEAR_WHITE : '#292c31';

	return (
		<ThemeContext.Provider
			value={{
				themeType: theme,
				stylesForTheme: Themes[theme],
				toggleTheme,
			}}
		>
			{children}
		</ThemeContext.Provider>
	);
};
