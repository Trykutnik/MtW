import React from 'react';
import styled from 'styled-components';

import { Colors } from '../../../shared/colors';

interface StyledInputProps {
	active: boolean;
}

export const StyledInput = styled.input<StyledInputProps>`
	@media (max-width: 770px) {
		width: 100%;
		height: 50px;
		padding-left: 2rem;
		padding-right: 2rem;
		// display: ${({ active }) => (active ? `block` : 'none')};
		//
		// position: absolute;
		// top: 0;
		// left: 0;
		// z-index: 1;
		//
		// background-color: ${Colors.RICH_BLACK};
		border: none;
		outline: none;
	}
`;
