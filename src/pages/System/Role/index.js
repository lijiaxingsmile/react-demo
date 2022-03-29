import { useState, useCallback } from 'react';
import { Modal, Space, Button, Spin, message } from 'antd';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { useRequest, requestDataFn } from 'utils';
import { api_roles, api_role } from 'config/http';
import RoleList from './list';
import RoleForm from './form';

export default function Role() {
	const [roleId, setRoleId] = useState();
	const [disabled, setDisabled] = useState(false);
	const [formVisible, setFormVisible] = useState(false);

	const [selectedRowKeys, setSelectedRowKeys] = useState([]);

	const queryClient = useQueryClient();
	const request = useRequest();
	const rolesRequest = useQuery('roles', () =>
		request(api_roles, { dataFn: requestDataFn }),
	);
	const deleteMutate = useMutation(
		'roles',
		(id) =>
			request(api_roles, {
				dataFn: requestDataFn,
				params: { id },
				method: 'delete',
			}),
		{
			onSuccess() {
				queryClient.invalidateQueries('roles');
				setSelectedRowKeys([]);
				message.success('删除成功');
			},
		},
	);

	const onDetail = useCallback((record) => {
		setRoleId(record.id);
		setDisabled(true);
		setFormVisible(true);
	}, []);

	const onEdit = useCallback((record) => {
		setRoleId(record.id);
		setDisabled(false);
		setFormVisible(true);
	}, []);

	const onDelete = useCallback(
		(record) => {
			if (!record.id) return;
			deleteMutate.mutate(record.id);
		},
		[deleteMutate],
	);

	const onUser = useCallback((record) => {
		console.log('用户:', record);
	}, []);

	const onAddRole = () => {
		setRoleId(null);
		setDisabled(false);
		setFormVisible(true);
	};

	const onBatchDelete = () => {
		if (!selectedRowKeys.length) return;
		const ids = selectedRowKeys.join(',');
		deleteMutate.mutate(ids);
	};

	const listActionProps = {
		onSelectChange: setSelectedRowKeys,
		onDelete: onDelete,
		onDetail: onDetail,
		onEdit: onEdit,
		onUser: onUser,
	};

	const formActionProps = {
		onSuccess: () => {
			setFormVisible(false);
		},
	};

	return (
		<div className="role-container">
			<Spin spinning={rolesRequest.isLoading}>
				<Space size="large" className="mb-2">
					<Button type="primary" onClick={onAddRole}>
						添加角色
					</Button>
					{selectedRowKeys.length > 0 && (
						<Button danger onClick={onBatchDelete}>
							批量删除
						</Button>
					)}
				</Space>
				<RoleList list={rolesRequest.data} {...listActionProps} />
			</Spin>
			<Modal
				title="用户信息"
				visible={formVisible}
				footer={null}
				onCancel={() => setFormVisible(false)}
			>
				<RoleForm disabled={disabled} id={roleId} {...formActionProps} />
			</Modal>
		</div>
	);
}
