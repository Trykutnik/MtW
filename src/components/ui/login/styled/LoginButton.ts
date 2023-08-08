import styled from 'styled-components';

import { Theme, ThemeType } from '../../../../themes/ThemeProvider';
import { Colors } from '../../../shared/colors';

interface LoginButtonProps {
	currentThemeType: ThemeType;
	currentTheme: Theme;
	borderStyle?: 'contained' | 'outlined';
}

export const LoginButton = styled.button<LoginButtonProps>`
	width: 100%;
	height: 100%;
	display: flex;
	justify-content: center;
	align-items: center;

	color: ${({ borderStyle }) =>
		borderStyle === 'contained' ? Colors.WHITE : Colors.PRUSSIAN_BLUE};
	font-weight: 700;

	border: ${({ borderStyle }) =>
		borderStyle === 'outlined'
			? `2px solid ${Colors.PRUSSIAN_BLUE}`
			: 'none'};
	border-radius: 0.3rem;
	overflow: hidden;
	box-shadow: ${({ currentThemeType }) =>
		currentThemeType === 'light'
			? `0 2px 5px ${Colors.SHADOW}`
			: `0 2px 5px ${Colors.LIGHT_SHADOW}`};

	background-color: ${({ borderStyle, currentThemeType }) =>
		borderStyle === 'outlined' && currentThemeType === 'light'
			? Colors.WHITE
			: borderStyle === 'outlined' && currentThemeType === 'dark'
			? Colors.CERULEAN
			: Colors.PRUSSIAN_BLUE};

	transition: all 0.2s ease-out;

	&:hover {
		opacity: 1;
		box-shadow: none;
		transform: scale(0.98);
		background-blend-mode: multiply;
		background-color: ${Colors.CERULEAN};
	}
`;
