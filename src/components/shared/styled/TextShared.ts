import styled from 'styled-components';

import { ThemeType } from '../../../themes/ThemeProvider';
import { Colors } from '../colors';

interface TextSharedProps {
	theme: ThemeType;
}

export const TextShared = styled.p<TextSharedProps>`
	color: ${({ theme }) =>
		theme === 'light' ? Colors.PRUSSIAN_BLUE : Colors.WHITE};
`;
