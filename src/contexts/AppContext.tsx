'use client';

import { usePathname, useRouter } from 'next/navigation';
import { Dispatch, SetStateAction, createContext, useContext, useEffect, useState } from 'react';

import AuthClient from '@/app/clients/AuthClient';
import HttpClient from '@/app/clients/HttpClient';
import { UserInfoOutput } from '@/types/auth.types';

type AppContextType = {
	states: {
		user: UserInfoOutput | null;
	};
	actions: {
		setUser: Dispatch<SetStateAction<UserInfoOutput | null>>;
	};
};

export const AppContext = createContext({} as AppContextType);

const AppProvider = ({ children }) => {
	const router = useRouter();
	const pathname = usePathname();

	const [user, setUser] = useState<UserInfoOutput | null>(null);

	useEffect(() => {
		if (pathname === '/auth/') {
			return;
		}

		HttpClient.call(router, AuthClient.fetchUserInfo()).then(res => {
			if (res.status !== 200) {
				throw 'cannot fetch user info';
			}

			setUser(res.data!!);
		});
	}, []);

	return (
		<AppContext.Provider
			value={{
				states: {
					user,
				},
				actions: {
					setUser,
				},
			}}
		>
			{children}
		</AppContext.Provider>
	);
};

export const useApp = () => useContext(AppContext);

export default AppProvider;
