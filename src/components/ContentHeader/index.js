import UserMenu from 'components/UserMenu';

export default function ContentHeader() {
	return (
		<div className="flex items-center justify-between h-full ">
			<div className="text-2xl flex items-center ">后台管理系统</div>
			<UserMenu />
		</div>
	);
}
