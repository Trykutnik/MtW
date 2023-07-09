import { Outlet } from 'react-router';

import './header.scss';

export const Header = () => {
	return (
		<>
			<article className={'header'}>
				<p>MtW</p>
				<input type='text' />
				<button>Login</button>
			</article>
			<Outlet />
		</>
	);
};
