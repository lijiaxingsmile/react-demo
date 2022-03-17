import UserMenu from 'components/UserMenu';
import { useDevice } from 'context';
import LogoImg from 'assets/logo.png';
import { Link } from 'react-router-dom';
import { baseRouteMap } from 'config';

export default function ContentHeader({ ToggleEle }) {
	const device = useDevice();

	return (
		<div className="flex items-center justify-between h-full ">
			<div
				className={
					'flex items-center h-full ' + (device.isPC ? 'space-x-4' : '')
				}
			>
				{device.isMobile ? (
					ToggleEle
				) : (
					<img src={LogoImg} alt="logo" style={{ width: 24 }} />
				)}
				<Link
					className={'text-white ' + (device.isMobile ? 'text-lg' : 'text-2xl')}
					to={baseRouteMap.index[0]}
				>
					热火
				</Link>
			</div>
			<UserMenu />
		</div>
	);
}
