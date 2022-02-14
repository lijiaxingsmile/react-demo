import UserMenu from 'components/UserMenu';
import { useDevice } from 'context';
import LogoImg from 'assets/logo.png';

export default function ContentHeader({ ToggleEle }) {
	const device = useDevice();

	const onReloadPage = () => {
		window.location.reload();
	};

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
					<img
						src={LogoImg}
						alt="logo"
						className="cursor-pointer"
						style={{ width: 24 }}
						onClick={onReloadPage}
					/>
				)}
				<span
					className={device.isMobile ? 'text-lg' : 'text-2xl'}
					onClick={device.isMobile ? onReloadPage : null}
				>
					热火
				</span>
			</div>
			<UserMenu />
		</div>
	);
}
