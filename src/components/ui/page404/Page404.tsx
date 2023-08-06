import { Link } from 'react-router-dom';

export const Page404 = () => {
	return (
		<Link to='/' className='link'>
			<p>Такой страницы не существует</p>
		</Link>
	);
};
