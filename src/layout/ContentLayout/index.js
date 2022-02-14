import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons';
import { Layout, Drawer } from 'antd';
import { useToggle } from 'react-use';
import Menu from './menu';
import ContentHeader from 'components/ContentHeader';
import { useAuth, useDevice } from 'context';
import './index.css';
import { baseRouteMap } from 'config';

export default function ContentLayout({ component: Component }) {
	const auth = useAuth();
	const device = useDevice();
	const navigate = useNavigate();
	const [collapsed, toggleCollapsed] = useToggle(false);

	const toggleComponent = React.createElement(
		collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
		{
			className: 'trigger',
			onClick: toggleCollapsed,
		},
	);

	// 如果未登录,则跳转到登录页面
	useEffect(() => {
		if (!auth.logined) {
			navigate(baseRouteMap.login[0]);
		}
	}, [auth.logined, navigate]);

	return (
		<Layout className="content-layout-container">
			<Layout.Header
				className={'content-layout-header ' + device.deviceType}
				style={{ height: 48 }}
			>
				<ContentHeader ToggleEle={toggleComponent} />
			</Layout.Header>

			<Layout className="content-layout-content-container">
				{device.isPC ? (
					<Layout.Sider
						className="content-layout-slider"
						trigger={toggleComponent}
						collapsible
						theme="light"
					>
						<Menu />
					</Layout.Sider>
				) : (
					<Drawer
						title="菜单"
						placement="left"
						width={200}
						closable={false}
						bodyStyle={{ padding: 0 }}
						onClose={toggleCollapsed}
						visible={collapsed}
					>
						<Layout.Sider
							className="content-layout-slider"
							collapsible={false}
							theme="light"
							width={200}
						>
							<Menu />
						</Layout.Sider>
					</Drawer>
				)}

				<Layout.Content
					className={'content-layout-content ' + device.deviceType}
				>
					<Component />
				</Layout.Content>
			</Layout>
		</Layout>
	);
}
