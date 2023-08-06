import React from 'react';
import styled from 'styled-components';

import { Colors } from '../../../shared/colors';

interface StyledDivProps {
	show: boolean;
	children: React.JSX.Element[];
}

export const StyledDiv = styled.div<StyledDivProps>`
	@media (max-width: 770px) {
		width: 100%;
		height: 100vh;
		display: ${({ show }) => (show ? `block` : 'none')};

		position: absolute;
		top: 0;
		left: 0;
		z-index: 2;

		background-color: ${Colors.RICH_BLACK};
		border: none;
		outline: none;
	}
`;
