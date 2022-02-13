import React, { useState, useCallback } from 'react';
import { Route, Routes } from 'react-router-dom';

import { ContentLayout, PublicLayout, UserLayout } from '../layout';
import { routes as routesConfig } from '../config';
import { useAsyncEffect } from '../hooks';

const getLayout = (name) => {
	switch (name) {
		case 'PublicLayout':
			return PublicLayout;
		case 'ContentLayout':
			return ContentLayout;
		case 'UserLayout':
			return UserLayout;
		default:
			return React.Fragment;
	}
};

export default function AuthRoutes() {
	const requestRoutes = useCallback(() => Promise.resolve(routesConfig), []);
	const [routesJSX, setRoutesJSX] = useState();

	// 路由列表
	const renderRoutes = useCallback((list, needLayout = true) => {
		if (!list || !list.length) return null;

		return list.map((route) => {
			const { children, layout, component: C, path } = route;
			let Layout = getLayout(layout);

			if (children && Array.isArray(children)) {
				return (
					<Route path={path} key={path} element={<Layout component={C} />}>
						{renderRoutes(children, false)}
					</Route>
				);
			}

			let Component;
			if (needLayout) {
				Component = <Layout component={C} />;
			} else {
				Component = <C />;
			}

			return <Route key={path} path={path} element={Component} />;
		});
	}, []);

	// 从服务端获取路由数据
	useAsyncEffect(async (isCanceled) => {
		const routes = await requestRoutes();

		if (isCanceled()) return;
		const result = renderRoutes(routes);
		setRoutesJSX(result);
	}, []);

	return <Routes>{routesJSX}</Routes>;
}
