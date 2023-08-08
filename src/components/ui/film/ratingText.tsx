import { FC } from 'react';

import { RatingTextProps } from '../../shared/types';

import { StyledText } from './styled/StyledText';

export const RatingText: FC<RatingTextProps> = props => {
	const { array, critic, text } = props;
	return (
		<StyledText>
			{array?.rating !== undefined && array?.rating[critic]
				? `${text}: ${array?.rating[critic]?.toFixed(1)}`
				: null}
		</StyledText>
	);
};
