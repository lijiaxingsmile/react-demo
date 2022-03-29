import { useEffect, useState } from 'react';
import { Button, Tree, Input, Modal } from 'antd';

import { awaitTimeout, useAsyncEffect } from 'utils';

const treeDataMap = {
	title: 'title',
	key: 'id',
	children: 'children',
};

const mockTreeData = [
	{
		title: 'parent 1',
		key: '0-0',
		id: 1,
		children: [],
	},
	{
		title: 'parent 1-1',
		key: '0-0-1',
		id: 2,
		children: [
			{
				title: <span style={{ color: '#1890ff' }}>sss</span>,
				key: '0-0-1-0',
				id: 6,
			},
		],
	},
];

export default function DepartList({ onSelect = () => {} }) {
	const [treeData, setTreeData] = useState([]);
	const [checkedKeys, setCheckedKeys] = useState([]);

	const requetTreeData = async (parentId) => {
		console.log('获取部门列表:', parentId);
		await awaitTimeout(1000);
		return mockTreeData;
	};

	// 加载子节点
	const onLoadData = async ({ key }) => {
		console.log('onLoadData:', key);
		const data = await requetTreeData(key);
		setTreeData(data);
	};
	// 勾选节点
	const onCheck = (checkedKeys) => {
		setCheckedKeys(checkedKeys);
	};
	// 批量删除
	const onBatchDelete = () => {
		if (!checkedKeys.length) return;
		Modal.confirm({
			title: '确认',
			content: '确认删除吗？',
			onOk() {},
		});
	};

	// 加载所有的部门
	useAsyncEffect(async (cancel) => {
		const data = await requetTreeData(0);
		if (cancel()) return;
		setTreeData(data);
	}, []);

	return (
		<div className="depart-list">
			<div className="depart-list-header space-x-2">
				<Button type="primary">添加部门</Button>
				<Button type="primary">添加下级</Button>
				<Button type="primary" danger onClick={onBatchDelete}>
					批量删除
				</Button>
			</div>
			<div className="depart-list-content mt-12">
				<Input.Search placeholder="请输入部门名称" />
				<Tree
					checkable
					fieldNames={treeDataMap}
					onSelect={onSelect}
					onCheck={onCheck}
					treeData={treeData}
					loadData={onLoadData}
				/>
			</div>
		</div>
	);
}
