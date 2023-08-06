import styled from 'styled-components';

import { ThemeType } from '../../../themes/ThemeProvider';
import { Colors } from '../colors';

interface ArticleSharedProps {
	theme: ThemeType;
	// currentTheme: Theme;
}

export const ArticleShared = styled.article<ArticleSharedProps>`
	color: ${({ theme }) =>
		theme === 'light' ? Colors.RICH_BLACK : Colors.WHITE};
`;
