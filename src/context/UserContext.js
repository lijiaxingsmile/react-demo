import React, { useCallback, useContext, useEffect, useMemo } from 'react';
import {
	authProviderLogin,
	authProviderLoginout,
	authProviderToken,
	request,
} from 'utils';
import { api_user } from 'config/http';

const UserContext = React.createContext();

export const UserContextProvider = ({ children }) => {
	const [user, setUser] = React.useState();
	const [permission, setPermission] = React.useState();
	const [token, setToken] = React.useState();

	// 登录之后记录是否自动登录,以便于在没有登录时自动登录
	const login = useCallback(async (data) => {
		const authToken = await authProviderLogin(data);
		setToken(authToken);
	}, []);

	const loginOut = useCallback(async () => {
		await authProviderLoginout();
		setUser();
		setToken();
	}, []);

	const logined = useMemo(() => {
		return !!token;
	}, [token]);

	const getUser = useCallback(async () => {
		if (!token) return;
		let response = {};
		try {
			response =
				(await request(api_user, {
					method: 'GET',
					token,
				})) || {};
		} catch (error) {}
		const { data = {} } = response;
		setUser(data.user);
		setPermission(data.permission);
	}, [token]);

	// 自动登录逻辑
	useEffect(() => {
		const token = authProviderToken();
		if (!token) return;
		setToken(token);
		getUser();
	}, [getUser]);

	return (
		<>
			<UserContext.Provider
				value={{
					user,
					permission,
					token,
					login,
					loginOut,
					logined,
				}}
			>
				{children}
			</UserContext.Provider>
		</>
	);
};

export const useAuth = () => {
	const auth = useContext(UserContext);
	return auth;
};
