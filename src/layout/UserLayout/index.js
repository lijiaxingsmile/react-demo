import React, { useEffect } from 'react';
import { useAuth } from 'context';
import { baseRouteMap } from 'config';
import { useNavigate } from 'react-router-dom';

export default function UserLayout({ component: Component }) {
	const auth = useAuth();
	const navigate = useNavigate();

	// 处于登陆状态,跳转到设定首页
	useEffect(() => {
		const [dashboardPath] = baseRouteMap.dashboard;
		if (auth.logined) {
			navigate(dashboardPath, { replace: true });
		}
	}, [auth.logined, navigate]);

	return (
		<div className="user-layout overflow-hidden" style={{ height: '100vh' }}>
			<Component />
		</div>
	);
}
