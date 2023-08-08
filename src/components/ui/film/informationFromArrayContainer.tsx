import { FC } from 'react';

import { InformationFromArrayContainerProps } from '../../shared/types';

import { StyledInformationContainer } from './styled/StyledInformationContainer';
import { StyledInformationText } from './styled/StyledInformationText';

export const InformationFromArrayContainer: FC<
	InformationFromArrayContainerProps
> = props => {
	const { title, array, additionalParms } = props;
	return (
		<StyledInformationContainer className={'film__information'}>
			<p>{title + ':'}</p>
			<StyledInformationText className={'film__information-data'}>
				{additionalParms === 'person'
					? array.persons
							?.reduce((acc, elem) => {
								if (elem.name) {
									return acc + elem.name + ', ';
								} else {
									return acc + elem.enName + ', ';
								}
							}, '')
							.slice(0, -2)
					: array.genres
					? array.genres

							.reduce((acc, elem) => acc + elem.name + ', ', '')
							.slice(0, -2)
					: null}
			</StyledInformationText>
		</StyledInformationContainer>
	);
};
