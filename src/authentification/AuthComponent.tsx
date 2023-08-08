import React, { FC } from 'react';
import { Navigate, useParams } from 'react-router-dom';

import { useAuth } from './authProvider';

interface AuthComponentProps {
	children: React.ReactElement;
}

export const AuthComponent: FC<AuthComponentProps> = ({ children }) => {
	const params = useParams();
	const auth = useAuth();

	if (!auth.user) {
		return (
			<Navigate
				to='/'
				state={params.id ? `/users/${params.id}` : '/cards'}
				replace={true}
			/>
		);
	}

	return children;
};
