import React, { useCallback, useContext, useEffect, useMemo } from 'react';
import {
	authProviderLogin,
	authProviderLoginout,
	authProviderToken,
	request,
} from 'utils';
import { api_user } from 'config/http';
import useMatchRoute from 'utils/useMatchRoute';
import { useNavigate, useLocation } from 'react-router-dom';
import {
	Exceptions,
	publicRoutes,
	userRoutes,
	ALL_PERMISSION,
} from '../config';

const UserContext = React.createContext();

export const UserContextProvider = ({ children }) => {
	const [user, setUser] = React.useState();
	const [permissionRoutes, setPermissionRoutes] = React.useState([]);
	const [permission, setPermission] = React.useState({});
	const [token, setToken] = React.useState();
	const navigate = useNavigate();
	const location = useLocation();

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
		setPermissionRoutes(data.permission ?? []);
	}, [token]);

	const allRoutes = useMemo(
		() => publicRoutes.concat(userRoutes, permissionRoutes),
		[permissionRoutes],
	);

	// 路由权限
	const matchRoute = useMatchRoute(location.pathname, allRoutes);

	// 页面首次加载获取用户和权限信息
	useEffect(() => {
		const token = authProviderToken();
		if (!token) return;
		setToken(token);
		getUser();
	}, [getUser]);

	// 路由鉴权以及获取权限信息
	useEffect(() => {
		if (!matchRoute) {
			!ALL_PERMISSION && navigate(Exceptions.PermissionError.path);
			return;
		}
		if (matchRoute.title) {
			document.title = matchRoute.title;
		}
		setPermission(matchRoute.permission);
	}, [matchRoute, navigate]);

	return (
		<>
			<UserContext.Provider
				value={{
					user,
					permissionRoutes,
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
