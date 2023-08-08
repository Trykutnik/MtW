import styled from 'styled-components';

import { Theme, ThemeType } from '../../../../themes/ThemeProvider';
import { Colors } from '../../../shared/colors';

interface LoginButtonProps {
	currentThemeType: ThemeType;
	currentTheme: Theme;
	special?: boolean;
	style?: 'contained' | 'outlined';
}

export const LoginSemiButton = styled.button<LoginButtonProps>`
	height: 2rem;
	padding: 0.3rem;

	display: flex;
	justify-content: center;
	align-items: center;

	color: ${({ currentTheme, special }) => !special && currentTheme?.text};
	font-weight: 700;

	border: none;
	background-color: ${({ currentTheme }) => currentTheme?.background};
	&:hover {
		opacity: 1;
		text-shadow: 1px 2px 2px ${Colors.EMERALD};
	}
`;
