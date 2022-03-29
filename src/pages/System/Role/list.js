import { useMemo } from 'react';
import { Button } from 'antd';
import StandardTable from 'components/StandardTable';

export default function RoleList({
	onUser,
	onEdit,
	onDetail,
	onDelete,
	onSelectChange,
	list,
}) {
	const columns = useMemo(
		() => [
			{
				title: '角色名称',
				dataIndex: 'name',
				render(text, record) {
					return (
						<Button type="link" onClick={() => onDetail(record)}>
							{text}
						</Button>
					);
				},
			},
			{
				title: '角色编码',
				dataIndex: 'code',
			},
		],
		[onDetail],
	);

	const columnAction = useMemo(
		() => ({
			detail: false,
			user: {
				title: '用户',
				onClick: onUser,
				sort: 0,
			},
			edit: {
				title: '编辑',
				onClick: onEdit,
				sort: 1,
			},
			delete: {
				title: '删除',
				onClick: onDelete,
				confirm: '确认删除吗❓',
				sort: 2,
			},
		}),
		[onUser, onEdit, onDelete],
	);

	return (
		<div className="role-list-container">
			<StandardTable
				dataSource={list}
				columns={columns}
				columnAction={columnAction}
				onSelectChange={onSelectChange}
				rowKey="id"
			/>
		</div>
	);
}
