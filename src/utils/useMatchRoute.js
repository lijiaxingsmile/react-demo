import { useMemo } from 'react';
import { matchPath } from 'react-router-dom';

// 递归查找路由, 返回匹配的路由
function findRoute(path, routes) {
	for (let i = 0; i < routes.length; i++) {
		const route = routes[i];
		const match = matchPath(route.path, path);
		if (match) {
			return route;
		}
		if (route.children) {
			return findRoute(path, route.children);
		}
	}
	return null;
}

export default function useMatchRoute(path, routes) {
	const matchRoute = useMemo(() => findRoute(path, routes), [path, routes]);
	return matchRoute;
}
