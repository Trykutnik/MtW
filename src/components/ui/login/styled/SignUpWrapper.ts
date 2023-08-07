import styled from 'styled-components';

import { Theme, ThemeType } from '../../../../themes/ThemeProvider';
import { Colors } from '../../../shared/colors';

interface SignUpWrapperProps {
	currentThemeType: ThemeType;
	currentTheme: Theme;
}

export const SignUpWrapper = styled.div<SignUpWrapperProps>`
	margin: 9rem auto 3rem;
	padding: 1.1rem;
	max-width: 38rem;

	font-weight: 700;
	color: ${({ currentTheme }) => currentTheme?.text};

	overflow: hidden;
	background-color: ${({ currentTheme }) => currentTheme?.background};
	box-shadow: ${({ currentThemeType }) =>
		currentThemeType === 'light'
			? `0 1rem 2.8rem 1rem ${Colors.SHADOW}`
			: `0 1rem 2.8rem 1rem ${Colors.LIGHT_SHADOW}`};
	border-radius: 1.9rem;
`;
