import { FC } from 'react';

import { CommentProps } from '../../../shared/types';

import './comment.scss';

export const Comment: FC<CommentProps> = props => {
	const { comment, filmName } = props;
	return (
		<div className={'comment'}>
			<p className={'comment__title'}>
				{comment.title ? comment.title : filmName}
			</p>
			<p className={'comment__review'}>{comment.review}</p>
		</div>
	);
};
