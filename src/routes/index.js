import React, { useState, useCallback, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';

import { ContentLayout, PublicLayout, UserLayout } from '../layout';
import { routes, Exceptions } from '../config';

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

	// 注册路由
	useEffect(() => {
		const result = renderRoutes(routes);
		setRoutesJSX(result);
	}, [renderRoutes]);

	return (
		<Routes>
			{routesJSX}
			<Route path="*" element={Exceptions.NotFound.component} />
		</Routes>
	);
}
