import styled from 'styled-components';

import { Colors } from '../../../../shared/colors';

interface StyledSpanProps {
	rating: number;
}

export const StyledSpan = styled.span<StyledSpanProps>`
	position: absolute;
	left: 0;
	bottom: 0;
	padding: 0.2rem 0.7rem;

	font-size: xx-large;

	border-radius: 0.6rem;
	color: ${({ rating }) => (rating > 9 ? Colors.RICH_BLACK : Colors.WHITE)};
	background-color: ${({ rating }) =>
		rating > 9 ? Colors.GOLD : rating > 7.5 ? Colors.RED : Colors.CERULEAN};

	@media (max-width: 770px) {
		// width: 100%;
		// height: 50px;
		// padding-left: 2rem;
		// padding-right: 2rem;
		// // display: ${({ rating }) => (rating ? `block` : 'none')};
		// //
		// // position: absolute;
		// // top: 0;
		// // left: 0;
		// // z-index: 1;
		// //
		// // background-color: ${Colors.RICH_BLACK};
		// border: none;
		// outline: none;
	}
`;
