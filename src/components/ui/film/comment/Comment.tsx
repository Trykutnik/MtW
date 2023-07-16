import { FC } from 'react';

import { CommentProps } from '../../../shared/types';

export const Comment: FC<CommentProps> = props => {
	const { comment } = props;
	return (
		<div>
			<p>{comment.title}</p>
			<p>{comment.review}</p>
		</div>
	);
};
