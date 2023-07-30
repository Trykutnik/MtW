import { FC, useRef } from 'react';
import { NavLink } from 'react-router-dom';

import { PaginationProps } from '../../../shared/types';

import './pagination.scss';

export const Pagination: FC<PaginationProps> = props => {
	const { lastPage, setCurrentPage, page } = props;
	const pagesArr = [];
	const PRef = useRef<HTMLParagraphElement>(null);
	for (let i = 1; i <= lastPage; i++) {
		pagesArr.push(i);
	}
	// console.log(PRef);
	// console.log(pagesArr);
	console.log(page);
	if (lastPage > 5) {
		return (
			<div className={'pagination'}>
				{page > 2 ? (
					<NavLink to={`/films/1`} onClick={() => setCurrentPage(1)}>
						<p>1</p>
					</NavLink>
				) : null}
				{page > 5 ? <p>...</p> : null}
				{page === 5 ? (
					<NavLink to={`/films/2`} onClick={() => setCurrentPage(2)}>
						<p>2</p>
					</NavLink>
				) : null}
				{page >= 3 ? (
					<NavLink
						to={`/films/${page - 2}`}
						onClick={() => setCurrentPage(page - 2)}
					>
						<p>{page - 2}</p>
					</NavLink>
				) : null}
				{page === 1 ? null : (
					<NavLink
						to={`/films/${page - 1}`}
						onClick={() => setCurrentPage(page - 1)}
					>
						<p>{page - 1}</p>
					</NavLink>
				)}
				<NavLink
					to={`/films/${page}`}
					onClick={() => setCurrentPage(page)}
				>
					<p>{page}</p>
				</NavLink>
				{page < lastPage - 1 ? (
					<NavLink
						to={`/films/${page + 1}`}
						onClick={() => setCurrentPage(page + 1)}
					>
						<p>{page + 1}</p>
					</NavLink>
				) : null}
				{page < lastPage - 2 ? (
					<NavLink
						to={`/films/${page + 2}`}
						onClick={() => setCurrentPage(page + 2)}
					>
						<p>{page + 2}</p>
					</NavLink>
				) : null}
				{page < lastPage - 3 ? (
					<NavLink
						to={`/films/${page + 3}`}
						onClick={() => setCurrentPage(page + 3)}
					>
						<p>{page + 3}</p>
					</NavLink>
				) : null}
				{page < lastPage - 5 ? <p>...</p> : null}
				{page === lastPage - 5 ? (
					<NavLink
						to={`/films/${page + 4}`}
						onClick={() => setCurrentPage(page + 4)}
					>
						<p>{page + 4}</p>
					</NavLink>
				) : null}
				{page !== lastPage ? (
					<NavLink
						to={`/films/${lastPage}`}
						onClick={() => setCurrentPage(lastPage)}
					>
						<p>{lastPage}</p>
					</NavLink>
				) : null}
			</div>
		);
	} else if (lastPage <= 5) {
		return (
			<div className={'pagination'}>
				<div>
					{pagesArr.map(elem => (
						<NavLink
							key={elem}
							to={`/films/${elem}`}
							onClick={() => setCurrentPage(elem)}
						>
							<p>{elem}</p>
						</NavLink>
					))}
				</div>
			</div>
		);
	} else {
		return null;
	}
};
