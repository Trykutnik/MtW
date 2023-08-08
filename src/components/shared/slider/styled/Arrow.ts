import styled from 'styled-components';

import { ThemeType } from '../../../../themes/ThemeProvider';
import { Colors } from '../../colors';

interface ArrowProps {
	theme: ThemeType;
}

export const Arrow = styled.span<ArrowProps>`
	background-color: ${({ theme }) =>
		theme === 'light' ? Colors.WHITE : Colors.PRUSSIAN_BLUE};
	&:after,
	&:before {
		content: '';
		position: absolute;
		right: -7px;

		width: 34px;
		height: 8px;
		background-color: ${({ theme }) =>
			theme === 'light' ? Colors.WHITE : Colors.PRUSSIAN_BLUE};
	}
	&:after {
		bottom: 10px;
		rotate: 45deg;
	}

	&:before {
		bottom: -10px;
		rotate: -45deg;
	}
`;
