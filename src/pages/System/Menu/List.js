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

export default function SystemMenuList({ list }) {
	// 编辑
	const onEditRecord = useCallback((record) => {
		console.log('edit:', record);
	}, []);

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
	}, [menuMore, onEditRecord]);

	return <Table columns={columns} dataSource={list} rowKey="id" />;
}

SystemMenuList.whyDidYouRender = true;
