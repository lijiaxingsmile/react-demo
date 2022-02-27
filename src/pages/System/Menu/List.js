import { useCallback, useMemo } from 'react';
import { Button, Divider, Space, Dropdown, Menu, Popconfirm } from 'antd';
import StandardTable from 'components/StandardTable';

const commonColumns = [
	{
		title: '菜单名称',
		dataIndex: 'name',
		key: 'name',
	},
	{
		title: '菜单图标',
		dataIndex: 'icon',
		key: 'icon',
	},
	{
		title: '菜单路由',
		dataIndex: 'path',
		key: 'path',
	},
	{
		title: '排序值',
		dataIndex: 'sort',
		key: 'sort',
	},
];

export default function SystemMenuList({
	list,
	onSelectChange,
	onEdit,
	onAddChildren,
	onDelete,
	onDetail,
}) {
	// 更多
	const onMoreMenuClick = useCallback(
		(e, record) => {
			const key = e.key;
			switch (key) {
				case 'detail':
					return onDetail(record.id);
				case 'addChildren':
					return onAddChildren(record.id);
				default:
					break;
			}
		},
		[onDetail, onAddChildren],
	);

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
						<Popconfirm
							title="确定删除?"
							onConfirm={() => {
								console.log('确定删除');
								onDelete(record.id);
							}}
						>
							<Button type="link">删除</Button>
						</Popconfirm>
					</Menu.Item>
				</Menu>
			);
		},
		[onMoreMenuClick, onDelete],
	);

	const columns = useMemo(() => {
		const columnAction = [
			{
				title: '操作',
				key: 'action',
				width: 150,
				render: (_, record) => {
					return (
						<Space split={<Divider type="vertical" />}>
							<Button
								type="link"
								onClick={() => onEdit(record.id, record.parentId)}
							>
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

		return [...commonColumns, ...columnAction];
	}, [menuMore, onEdit]);

	return (
		<StandardTable
			rowIndex={false}
			columns={columns}
			dataSource={list}
			rowKey="id"
			onSelectChange={onSelectChange}
		/>
	);
}

SystemMenuList.whyDidYouRender = true;
