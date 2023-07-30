import React from 'react';
import styled from 'styled-components';

import { Colors } from '../../../shared/colors';

interface StyledLabelProps {
	focus: boolean;
	children: React.JSX.Element[];
}

export const StyledLabel = styled.label<StyledLabelProps>`
	display: flex;
	gap: 5px;
	align-items: center;

	width: 100%;
	padding: 0 5px;

	border: 1px solid $richBlack;
	border-radius: 1rem;
	background-color: $whiteColor;
	overflow: hidden;

	outline: ${({ focus }) =>
		focus ? `3px solid ${Colors.PRUSSIAN_BLUE}` : null};

	//outline: 3px solid $prussianBlue;
`;
