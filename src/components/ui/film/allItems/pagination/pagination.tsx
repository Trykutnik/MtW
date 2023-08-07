import { FC, useContext } from 'react';
import { NavLink } from 'react-router-dom';

import { ThemeContext } from '../../../../../themes/ThemeProvider';
import { PaginationProps } from '../../../../shared/types';

import { StyledPage } from './styled/StyledPage';

import './pagination.scss';

export const Pagination: FC<PaginationProps> = props => {
	const { lastPage, setCurrentPage, page, arrayType } = props;
	const pagesArr = [];
	const { themeType } = useContext(ThemeContext);

	for (let i = 1; i <= lastPage; i++) {
		pagesArr.push(i);
	}
	console.log(page);
	if (lastPage > 5) {
		return (
			<div className={'pagination'}>
				{page > 2 ? (
					<NavLink
						to={`/${arrayType}/1`}
						onClick={() => setCurrentPage(1)}
						className={({ isActive }) =>
							isActive ? 'link-active navlink' : 'navlink'
						}
					>
						<StyledPage theme={themeType}>1</StyledPage>
					</NavLink>
				) : null}
				{page > 5 ? (
					<StyledPage theme={themeType}>...</StyledPage>
				) : null}
				{page === 5 ? (
					<NavLink
						to={`/${arrayType}/2`}
						onClick={() => setCurrentPage(2)}
					>
						<StyledPage theme={themeType}>2</StyledPage>
					</NavLink>
				) : null}
				{page > 3 ? (
					<NavLink
						to={`/${arrayType}/${page - 2}`}
						onClick={() => setCurrentPage(page - 2)}
					>
						<StyledPage theme={themeType}>{page - 2}</StyledPage>
					</NavLink>
				) : null}
				{page === 1 ? null : (
					<NavLink
						to={`/${arrayType}/${page - 1}`}
						onClick={() => setCurrentPage(page - 1)}
					>
						<StyledPage theme={themeType}>{page - 1}</StyledPage>
					</NavLink>
				)}
				<NavLink
					to={`/${arrayType}/${page}`}
					onClick={() => setCurrentPage(page)}
					className={({ isActive }) =>
						isActive ? 'link-active navlink' : 'navlink'
					}
				>
					<StyledPage theme={themeType}>{page}</StyledPage>
				</NavLink>
				{page < lastPage - 1 ? (
					<NavLink
						to={`/${arrayType}/${page + 1}`}
						onClick={() => setCurrentPage(page + 1)}
					>
						<StyledPage theme={themeType}>{page + 1}</StyledPage>
					</NavLink>
				) : null}
				{page < lastPage - 2 ? (
					<NavLink
						to={`/${arrayType}/${page + 2}`}
						onClick={() => setCurrentPage(page + 2)}
					>
						<StyledPage theme={themeType}>{page + 2}</StyledPage>
					</NavLink>
				) : null}
				{page < lastPage - 3 ? (
					<NavLink
						to={`/${arrayType}/${page + 3}`}
						onClick={() => setCurrentPage(page + 3)}
					>
						<StyledPage theme={themeType}>{page + 3}</StyledPage>
					</NavLink>
				) : null}
				{page < lastPage - 5 ? (
					<StyledPage theme={themeType}>...</StyledPage>
				) : null}
				{page === lastPage - 5 ? (
					<NavLink
						to={`/${arrayType}/${page + 4}`}
						onClick={() => setCurrentPage(page + 4)}
						className={({ isActive }) =>
							isActive ? 'link-active navlink' : 'navlink'
						}
					>
						<StyledPage theme={themeType}>{page + 4}</StyledPage>
					</NavLink>
				) : null}
				{page !== lastPage ? (
					<NavLink
						to={`/${arrayType}/${lastPage}`}
						onClick={() => setCurrentPage(lastPage)}
						className={({ isActive }) =>
							isActive ? 'link-active navlink' : 'navlink'
						}
					>
						<StyledPage theme={themeType}>{lastPage}</StyledPage>
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
							to={`/${arrayType}/${elem}`}
							onClick={() => setCurrentPage(elem)}
						>
							<StyledPage theme={themeType}>{elem}</StyledPage>
						</NavLink>
					))}
				</div>
			</div>
		);
	} else {
		return null;
	}
};
