import { FC } from 'react';
import { htmlToText } from 'html-to-text';

import { CommentProps } from '../../../shared/types';

import './comment.scss';

export const Comment: FC<CommentProps> = props => {
	const { comment, filmName } = props;
	const convertedToText = comment.review
		? htmlToText(comment.review, {})
		: 'Нет данных';

	return (
		<div className={'comment'}>
			<p className={'comment__title'}>
				{comment.title ? comment.title : filmName}
			</p>
			<p className={'comment__review'}>{convertedToText}</p>
		</div>
	);
};
