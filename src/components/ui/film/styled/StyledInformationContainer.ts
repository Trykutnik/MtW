import styled from 'styled-components';

import { Colors } from '../../../shared/colors';

export const StyledInformationContainer = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	gap: 0.7rem;

	height: 4rem;
	width: 100%;
	margin-top: 0.5rem;
	padding: 0.5rem;

	background-color: ${Colors.PRUSSIAN_BLUE};
	color: ${Colors.WHITE};
	border-radius: 0.5rem;
	box-shadow: 0 1rem 1.5rem 0.2rem ${Colors.RICH_BLACK};

	//font-size: 4em;
	object-fit: contain;
`;
