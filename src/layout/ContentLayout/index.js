import React from 'react';
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons';
import { Layout, Typography } from 'antd';
import { useToggle } from 'react-use';
import Menu from './menu';
import './index.css';

export default function ContentLayout({ component: Component }) {
	const [collapsed, toggleCollapsed] = useToggle(false);

	const toggleComponent = React.createElement(
		collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
		{
			className: 'trigger',
			onClick: toggleCollapsed,
		},
	);

	return (
		<Layout className="content-layout-container">
			<Layout.Sider
				className="content-layout-slider"
				trigger={toggleComponent}
				collapsible
			>
				<Menu />
			</Layout.Sider>
			<Layout className="content-layout-content-container">
				<Layout.Header className="content-layout-header">
					<Typography.Title>React Demos</Typography.Title>
				</Layout.Header>
				<Layout.Content className="content-layout-content">
					<Component />
				</Layout.Content>
			</Layout>
		</Layout>
	);
}
