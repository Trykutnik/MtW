import styled from 'styled-components';

import { Theme, ThemeType } from '../../../../themes/ThemeProvider';
import { Colors } from '../../../shared/colors';

interface UserDataStyledProps {
	currentThemeType: ThemeType;
	currentTheme: Theme;
}

export const UserDataStyled = styled.button<UserDataStyledProps>`
	padding: 2px;

	display: flex;
	justify-content: center;
	align-items: center;

	color: ${Colors.GREEN};
	font-weight: 700;

	border: 2px solid ${Colors.GREEN};
	border-radius: 0.3rem;
	box-shadow: ${({ currentThemeType }) =>
		currentThemeType === 'light'
			? `0 2px 5px ${Colors.SHADOW}`
			: `0 2px 1px ${Colors.LIGHT_SHADOW}`};

	background-color: ${({ currentThemeType }) =>
		currentThemeType === 'light' ? Colors.WHITE : Colors.DARKER_GRAY};
`;
