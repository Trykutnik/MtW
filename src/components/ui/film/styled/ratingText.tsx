import { FC } from 'react';

import { RatingTextProps } from '../../../shared/types';

export const RatingText: FC<RatingTextProps> = props => {
	const { array, critic, text } = props;
	return (
		<p>
			{array?.rating !== undefined && array?.rating[critic]
				? `${text}: ${array?.rating[critic]?.toFixed(1)}`
				: null}
		</p>
	);
};
