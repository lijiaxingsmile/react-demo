import { Link } from 'react-router-dom';
import { baseRouteMap } from 'config';
import UserMenu from 'components/UserMenu';
import { useMemo } from 'react';

export default function PublicHeader({ user }) {
	const layoutLeft = useMemo(() => {
		if (user.logined) {
			return (
				<Link to={baseRouteMap.dashboard[0]} className="text-lg">
					首页
				</Link>
			);
		}

		return (
			<span to={baseRouteMap.login[0]} className="text-lg">
				热火开发框架
			</span>
		);
	}, [user.logined]);

	const layoutRight = useMemo(() => {
		if (user.logined) {
			return <UserMenu />;
		}

		return (
			<Link to={baseRouteMap.login[0]} className="text-lg">
				登录
			</Link>
		);
	}, [user.logined]);

	return (
		<div className="flex align-middle bg-red-200 justify-between h-10 pl-12 pr-12 ">
			<div className="header-left">{layoutLeft}</div>
			<div className="header-right">{layoutRight}</div>
		</div>
	);
}
