import { FC } from 'react';

import { DataProps } from '../../shared/types';

import { FilmCover } from './filmCover';

export const AllItems: FC<DataProps> = props => {
	const { array } = props;
	return (
		<article className={'article'}>
			<div className={'wrap-container'}>
				{array?.map(elem => (
					<FilmCover key={elem.id} movie={elem} />
				))}
			</div>
		</article>
	);
};
