import styled from 'styled-components';

import { ThemeType } from '../../../../../../themes/ThemeProvider';
import { Colors } from '../../../../../shared/colors';

interface StyledPageProps {
	theme: ThemeType;
}

export const StyledPage = styled.p<StyledPageProps>`
	color: ${({ theme }) =>
		theme === 'light' ? Colors.PRUSSIAN_BLUE : Colors.WHITE};

	@media screen and (max-width: 770px) {
		font-size: 20px;
	}
`;
