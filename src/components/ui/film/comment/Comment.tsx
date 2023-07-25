import { FC } from 'react';
import { Link } from 'react-router-dom';

import { CommentProps } from '../../../shared/types';

import './comment.scss';

export const Comment: FC<CommentProps> = props => {
	const { comment } = props;
	return (
		<div className={'comment'}>
			<p className={'comment__title'}>{comment.title}</p>
			<p className={'comment__review'}>{comment.review}</p>
		</div>
	);
};
