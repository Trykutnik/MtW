import styled from 'styled-components';

import { Colors } from '../../../shared/colors';

export const StyledInformationText = styled.p`
	text-align: end;
	overflow: hidden;
	white-space: nowrap;
	text-overflow: ellipsis;

	@media screen and (max-width: 480px) {
		width: 100%;
		text-align: center;
	}
`;
