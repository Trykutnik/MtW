import styled from 'styled-components';

import { ThemeType } from '../../../../themes/ThemeProvider';
import { Colors } from '../../colors';

interface CircleProps {
	theme: ThemeType;
}

export const Circle = styled.span<CircleProps>`
	background-color: ${({ theme }) =>
		theme === 'light' ? Colors.PRUSSIAN_BLUE : Colors.WHITE};
`;
