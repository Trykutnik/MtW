import { FC, useRef } from 'react';

import { addNewComment } from '../../../../redux/reducers/moviesReducer';
import { useAppDispatch } from '../../../../redux/store';
import { NewCommentProps } from '../../../shared/types';

import './NewComment.scss';

export const NewComment: FC<NewCommentProps> = props => {
	const { id } = props;
	const dispatch = useAppDispatch();
	const headerRef = useRef<HTMLInputElement>(null);
	const reviewRef = useRef<HTMLTextAreaElement>(null);

	const handeleAddComment = () => {
		if (
			headerRef.current &&
			headerRef.current.value &&
			reviewRef.current &&
			reviewRef.current.value
		) {
			console.log(headerRef.current);
			dispatch(
				addNewComment({
					filmId: id,
					title: headerRef.current.value,
					review: reviewRef.current.value,
				}),
			);
			headerRef.current.value = '';
			reviewRef.current.value = '';
		}
	};
	// console.log(headerRef.current.value);
	return (
		<form action={'post'} className={'new-comment'}>
			<input
				ref={headerRef}
				type={'text'}
				placeholder={'Заголовок'}
				required
				className={'new-comment__comment-header'}
			/>
			<textarea
				ref={reviewRef}
				name={'comment-text'}
				id={'comment-text'}
				cols={80}
				rows={14}
				placeholder={'Текст'}
				required
				className={'new-comment__comment-text'}
			></textarea>
			<button
				type={'submit'}
				onClick={handeleAddComment}
				className={'new-comment__button'}
			>
				Опубликовать рецензию
			</button>
		</form>
	);
};
