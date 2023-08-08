import styled from 'styled-components';

import { ThemeType } from '../../../themes/ThemeProvider';
import { Colors } from '../colors';

interface ContainerSharedProps {
	theme: ThemeType;
	// currentTheme: Theme;
}

export const ContainerShared = styled.div<ContainerSharedProps>`
	color: ${({ theme }) =>
		theme === 'light' ? Colors.RICH_BLACK : Colors.WHITE};
`;
