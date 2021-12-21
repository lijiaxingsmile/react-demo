import { Menu } from 'antd';
import { createFromIconfontCN } from '@ant-design/icons';
import { useLocation, useNavigate } from 'react-router-dom';
import { routes, IconFontUrl } from '../../config';

// icon font 图标
const IconFont = createFromIconfontCN({
	scriptUrl: IconFontUrl,
});

const renderMenu = list => {
	if (!list || !list.length) return null;
	return list.map(menu => {
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

const MenuJsx = renderMenu(routes.filter(menu => menu && menu.name));

export default function NavMenu() {
	const { pathname } = useLocation();
	const navigate = useNavigate();

	const onClickNavMenu = ({ keyPath }) => {
		let path = [...keyPath];
		path = path.reverse().join('/');

		if (pathname === path) return;

		navigate(path);
	};

	return (
		<Menu theme='dark' mode='inline' onClick={onClickNavMenu}>
			{MenuJsx}
		</Menu>
	);
}

// export default function NavMenu() {
//   return <div>菜单</div>;
// }
