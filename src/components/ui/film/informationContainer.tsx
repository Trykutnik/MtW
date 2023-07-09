import { FC } from 'react';

import { InformationContainerProps } from '../../shared/types';

import { StyledInformationContainer } from './styled/StyledInformationContainer';
import { StyledInformationText } from './styled/StyledInformationText';

export const InformationContainer: FC<InformationContainerProps> = props => {
	const { title, content, additionalContent } = props;
	return (
		<StyledInformationContainer>
			<p>{title + ':'}</p>
			<StyledInformationText>
				{additionalContent
					? `${content}${additionalContent}`
					: content ?? 'Нет данных'}
			</StyledInformationText>
		</StyledInformationContainer>
	);
};
