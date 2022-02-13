import { useCallback, useMemo } from 'react';
import { Button, Divider, Space, Table, Dropdown, Menu } from 'antd';

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

export default function SystemMenu() {
	// 编辑
	const onEditRecord = (record) => {
		console.log('edit:', record);
	};

	// 添加下级
	const onAddChildren = (record) => {
		console.log('onAddChildren');
	};

	// 详情
	const onDetail = (record) => {
		console.log('onDetail');
	};

	// 删除
	const onRemove = (record) => {
		console.log('onAddChildren');
	};

	// 批量删除
	const onBathRemove = (record) => {
		console.log('onAddChildren');
	};

	// 更多
	const onMoreMenuClick = useCallback((e, record) => {
		const key = e.key;
		switch (key) {
			case 'detail':
				return onDetail(record);
			case 'remove':
				return onRemove(record);
			case 'addChildren':
				return onAddChildren(record);
			default:
				break;
		}
	}, []);

	const menuMore = useCallback(
		(record) => {
			return (
				<Menu onClick={(e) => onMoreMenuClick(e, record)}>
					<Menu.Item key="detail">
						<Button type="link">详情</Button>
					</Menu.Item>
					<Menu.Item key="addChildren">
						<Button type="link">添加下级</Button>
					</Menu.Item>
					<Menu.Item key="remove">
						<Button type="link">删除</Button>
					</Menu.Item>
				</Menu>
			);
		},
		[onMoreMenuClick],
	);

	const columns = useMemo(() => {
		const columnAction = [
			{
				title: '操作',
				key: 'action',
				width: 80,
				align: 'center',
				render: (_, record) => {
					return (
						<Space split={<Divider type="vertical" />}>
							<Button type="link" onClick={() => onEditRecord(record)}>
								编辑
							</Button>
							<Dropdown overlay={() => menuMore(record)}>
								<Button type="link">更多</Button>
							</Dropdown>
						</Space>
					);
				},
			},
		];

		return commonColumns
			.map((v) => ({ ...v, align: 'center' }))
			.concat(columnAction);
	}, [menuMore]);

	return (
		<div>
			<Space size="large">
				<Button type="primary">添加菜单</Button>
				<Button type="primary">批量删除</Button>
			</Space>
			<Table columns={columns} dataSource={mockDataSource} rowKey="sort" />
		</div>
	);
}
