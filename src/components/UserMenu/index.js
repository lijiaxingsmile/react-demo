import defaultAvatar from '../../assets/avatar.png';

import { Avatar, Menu, Dropdown, Tooltip, Modal } from 'antd';
import { LoginOutlined } from '@ant-design/icons';

import { useAuth } from 'context';

export default function UserMenu() {
	const auth = useAuth();

	const userMenu = (
		<Menu>
			<Menu.Item key="userCenter">个人中心</Menu.Item>
			<Menu.Item key="userSetting">个人设置</Menu.Item>
		</Menu>
	);

	const onLoginOut = () => {
		Modal.confirm({
			title: '确认退出登录?',
			centered: true,
			onOk: auth.loginOut,
		});
	};

	return (
		<div className="user-menu-container h-full ">
			<div className="h-full flex items-center space-x-8">
				<Dropdown
					overlay={userMenu}
					placement="bottomCenter"
					className="cursor-pointer"
				>
					<div className="h-full flex items-center space-x-4">
						<Avatar src={defaultAvatar} />
						<span>{auth.user?.nickName ?? ''}</span>
					</div>
				</Dropdown>

				<Tooltip title="退出登录">
					<LoginOutlined className="cursor-pointer" onClick={onLoginOut} />
				</Tooltip>
			</div>
		</div>
	);
}
