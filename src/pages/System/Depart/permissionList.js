import { useState } from 'react';
import { Button, Tree, Input } from 'antd';

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
export default function DepartPermission({ selectKey }) {
	const [permissionList, setPermissionList] = useState([]);
	const [departPermission, setDepartPermission] = useState([]);
	const [selectPermission, setSelectPermission] = useState();

	const requetPermissionList = async () => {
		console.log('获取权限列表');
		await awaitTimeout(1000);
		return mockTreeData;
	};

	// 获取部门信息
	const requetDepartPermission = async (departId) => {
		console.log('获取部门权限');
		await awaitTimeout(1000);
		return mockTreeData;
	};

	// 勾选节点
	const onCheck = (checkedKeys) => {
		setDepartPermission(checkedKeys);
	};

	const onSelect = (keys) => {
		setSelectPermission(keys[0]);
	};

	// 加载所有的权限列表
	useAsyncEffect(async (cancel) => {
		const data = await requetPermissionList(selectKey);
		if (cancel()) return;
		setPermissionList(data);
	}, []);

	// 加载部门权限
	useAsyncEffect(
		async (cancel) => {
			const data = await requetDepartPermission(selectKey);
			if (cancel()) return;
			setDepartPermission(data);
		},
		[selectKey],
	);

	return (
		<div className="depart-list">
			<div className="depart-list-content mt-4">
				<Input.Search placeholder="请输入菜单名称" />
				<Tree
					checkable
					checkedKeys={departPermission}
					fieldNames={treeDataMap}
					onSelect={onSelect}
					onCheck={onCheck}
					treeData={permissionList}
				/>
			</div>
			<div className="depart-list-footer flex justify-end">
				<Button type="primary">保存</Button>
			</div>
		</div>
	);
}
