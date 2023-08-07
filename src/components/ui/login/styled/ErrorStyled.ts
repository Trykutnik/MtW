import styled from 'styled-components';

import { Theme, ThemeType } from '../../../../themes/ThemeProvider';
import { Colors } from '../../../shared/colors';

interface LoginButtonProps {
	currentThemeType?: ThemeType;
	currentTheme?: Theme;
}

export const ErrorStyled = styled.p<LoginButtonProps>`
	position: absolute;
	right: 0;
	top: 0;
	width: max-content;
	height: 1rem;
	z-index: 1;

	display: flex;
	align-items: center;
	font-size: 0.8rem;
	padding-left: 0.3rem;
	padding-right: 0.3rem;
	margin: 0;

	border-radius: 0.5rem;
	background-color: ${({ currentThemeType }) =>
		currentThemeType === 'light' ? Colors.ORANGE : Colors.RED};
`;
