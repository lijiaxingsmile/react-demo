import { useAuth } from 'context';

import PublicHeader from 'components/PublicHeader';

export default function PublicLayout({ component: Component }) {
	const user = useAuth();

	return (
		<div className="publice-layout bg-blue-200 ">
			<div className="public-layout-header">
				<PublicHeader user={user} />
			</div>
			<div className="public-layout-content pl-6 pr-6 ">
				<Component />
			</div>
			<div className="public-layout-footer"></div>
		</div>
	);
}
