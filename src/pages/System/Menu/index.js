import { useMemo } from 'react';
import { Button, Divider, Space, Table } from 'antd';

const commonColumns = [
	{
		title: '菜单名称',
		dataIndex: 'name',
		key: 'name',
		width: 100,
	},
	{
		title: '菜单图标',
		dataIndex: 'icon',
		key: 'icon',
		width: 100,
	},
	{
		title: '菜单组件',
		dataIndex: 'component',
		key: 'component',
		width: 200,
	},
	{
		title: '菜单路由',
		dataIndex: 'path',
		key: 'path',
		width: 200,
	},
	{
		title: '菜单Layout',
		dataIndex: 'layout',
		key: 'layout',
		width: 80,
	},
	{
		title: '排序值',
		dataIndex: 'sort',
		key: 'sort',
		width: 50,
	},
];

const mockDataSource = [
	{
		name: '主页',
		path: '/index',
		layout: 'PublicLayout',
		component: 'pages/Index',
		icon: '',
		sort: 1,
	},
	{
		name: '登录页',
		path: '/login',
		layout: 'UserLayout',
		component: 'pages/Login',
		icon: '',
		sort: 2,
	},
	// 系统内菜单
	{
		name: '首页',
		path: '/dashboard',
		layout: 'ContentLayout',
		component: 'pages/Dashboard',
		icon: 'icondashboard',
		sort: 3,
	},
	{
		name: '动画',
		path: '/animate',
		layout: 'ContentLayout',
		component: 'pages/Animate',
		icon: '',
		sort: 4,
		children: [
			{
				name: 'Spring',
				path: 'spring',
				layout: 'ContentLayout',
				component: 'pages/Animate/Spring',
				icon: '',
				sort: 4.1,
			},
			{
				name: 'Anime',
				path: 'anime',
				layout: 'ContentLayout',
				component: 'pages/Animate/Anime',
				icon: '',
				sort: 4.2,
			},
		],
	},
];

export default function Menu() {
	const onEditRecord = (record) => {
		console.log('edit:', record);
	};

	const columns = useMemo(() => {
		const columnAction = [
			{
				title: '操作',
				key: 'action',
				width: 60,
				align: 'center',
				render: (_, record) => {
					return (
						<Space>
							<Button type="link" onClick={() => onEditRecord(record)}>
								编辑
							</Button>
							<Divider type="vertical" />
							<Button type="link">更多</Button>
						</Space>
					);
				},
			},
		];

		return commonColumns
			.map((v) => ({ ...v, align: 'center' }))
			.concat(columnAction);
	}, []);

	return (
		<div>
			<Button type="primary" className="mb-2">
				添加菜单
			</Button>
			<Table columns={columns} dataSource={mockDataSource} rowKey="sort" />
		</div>
	);
}
