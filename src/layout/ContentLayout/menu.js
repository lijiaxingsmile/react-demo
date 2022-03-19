import { Menu } from 'antd';
import { createFromIconfontCN } from '@ant-design/icons';
import { useLocation, useNavigate } from 'react-router-dom';
import { IconFontUrl, IconSize } from '../../config';

import { useAuth } from '../../context';
import { useMemo } from 'react';

// icon font 图标
const IconFont = createFromIconfontCN({
	scriptUrl: IconFontUrl,
	extraCommonProps: {
		style: {
			fontSize: IconSize,
		},
	},
});

const renderMenu = (list) => {
	if (!list || !list.length) return null;
	return list.map((menu) => {
		if (!menu) return null;
		const { name, children, path, icon } = menu;
		const ICON = icon ? <IconFont type={icon} /> : '';

		if (children && Array.isArray(children)) {
			return (
				<Menu.SubMenu icon={ICON} title={name} key={path}>
					{renderMenu(children)}
				</Menu.SubMenu>
			);
		}

		return (
			<Menu.Item key={path} icon={ICON}>
				{name}
			</Menu.Item>
		);
	});
};

export default function NavMenu() {
	const { pathname } = useLocation();
	const navigate = useNavigate();
	const { permissionRoutes } = useAuth();

	const onClickNavMenu = ({ keyPath }) => {
		let path = [...keyPath];
		path = path.reverse().join('/');

		if (pathname === path) return;

		navigate(path);
	};

	const MenuJsx = useMemo(() => {
		const menuRoutes = permissionRoutes ?? [];
		console.log('渲染有权限的菜单:', menuRoutes);
		return renderMenu(menuRoutes.filter((menu) => menu && menu.name));
	}, [permissionRoutes]);

	return (
		<Menu theme="light" mode="inline" onClick={onClickNavMenu}>
			{MenuJsx}
		</Menu>
	);
}

// export default function NavMenu() {
//   return <div>菜单</div>;
// }
