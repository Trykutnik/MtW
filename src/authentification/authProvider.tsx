import React, { createContext, FC, useContext, useState } from 'react';

interface AuthValueProps {
	user: string | null;
	logIn: (user: string, callback?: () => void) => void;
	logOut: (callback: () => void) => void;
}

interface AuthProviderProps {
	children: React.ReactNode;
}

export const AuthContext = createContext({} as AuthValueProps);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
	const [user, setUser] = useState<string | null>(null);

	const logIn = (newUser: string, callback?: () => void) => {
		setUser(newUser);
		if (callback) {
			callback();
		}
	};

	const logOut = (callback: () => void) => {
		setUser(null);
		callback();
	};

	const value = {
		user,
		logIn,
		logOut,
	};

	return (
		<AuthContext.Provider value={value}>{children}</AuthContext.Provider>
	);
};
