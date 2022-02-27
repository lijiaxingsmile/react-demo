import { useState, useRef, useEffect, useReducer } from 'react';
import { Button, Space, Spin, Drawer, message, Modal } from 'antd';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { useRequest, requestDataFn, stateReducer } from 'utils';
import { api_menus, api_menu } from 'config/http';
import SystemMenuList from './List';
import SystemMenuForm from './Form';

function SystemMenu() {
	const request = useRequest();

	const queryClient = useQueryClient();
	const [drawerOpen, setDrawerOpen] = useState(false);
	const [selectedRowKeys, setSelectedRowKeys] = useState([]);

	const { data: menus = [], isLoading } = useQuery('menus', () =>
		request(api_menus, { dataFn: requestDataFn }),
	);

	const createMenu = useMutation(
		'menu',
		(data) =>
			request(api_menu, {
				method: 'POST',
				data,
			}),
		{
			onSuccess() {
				message.success('添加成功');
				closeDrawer();
				queryClient.invalidateQueries('menus');
				setSelectedRowKeys([]);
			},
		},
	);
	const updateMenu = useMutation(
		'menu',
		(data) =>
			request(api_menu, {
				method: 'PUT',
				data,
			}),
		{
			onSuccess() {
				message.success('更新成功');
				queryClient.invalidateQueries('menus');
			},
		},
	);
	const deleteMenu = useMutation(
		'menu',
		(ids) =>
			request(api_menus, {
				method: 'DELETE',
				params: {
					ids: ids.join(','),
				},
			}),
		{
			onSuccess() {
				message.success('删除成功');
				queryClient.invalidateQueries('menus');
				setSelectedRowKeys([]);
			},
		},
	);

	const formRef = useRef();

	const [formDataProps, setFormDataProps] = useReducer(stateReducer, {});

	useEffect(() => {
		setFormDataProps({ menus });
	}, [menus]);

	const onAddMenu = () => {
		setDrawerOpen(true);
		setFormDataProps({ id: null, parentID: 0 });
	};

	const closeDrawer = () => {
		setDrawerOpen(false);
	};

	const onSubmit = async () => {
		let values = {};
		try {
			values = (await formRef.current.validateFields()) ?? {};
			values.id = formDataProps.id;
		} catch (error) {
			console.error(error);
			return message.error('请检查表单');
		}

		console.log('onSubmit:', values);
		if (formDataProps.id) {
			updateMenu.mutate(values);
			queryClient.invalidateQueries(['menu', formDataProps.id]);
		} else {
			createMenu.mutate(values);
		}
		setDrawerOpen(false);
	};

	const onBatchDelete = () => {
		Modal.confirm({
			title: '确定',
			content: `是否删除${selectedRowKeys.length}条记录?`,
			onOk: () => {
				deleteMenu.mutate(selectedRowKeys);
				queryClient.invalidateQueries('menu');
			},
		});
	};

	const listActionProps = {
		onEdit(id, parentID) {
			setFormDataProps({ id, parentID });
			setDrawerOpen(true);
		},
		onAddChildren(id) {
			setFormDataProps({ id: null, parentID: id });
			setDrawerOpen(true);
		},
		onDelete(id) {
			console.log('onDelete:', id);
			deleteMenu.mutate([id]);
		},
		onDetail(id, parentID) {
			setFormDataProps({ id, disabled: true, parentID });
			setDrawerOpen(true);
		},
		onSelectChange: setSelectedRowKeys,
	};

	const footerElement = (
		<div className="flex justify-end space-x-4">
			<Button onClick={closeDrawer}>取消</Button>
			{!formDataProps.disabled && (
				<Button type="primary" onClick={onSubmit}>
					确定
				</Button>
			)}
		</div>
	);

	return (
		<Spin spinning={isLoading}>
			<Space size="large" className="mb-2">
				<Button type="primary" onClick={onAddMenu}>
					添加菜单
				</Button>
				{selectedRowKeys.length > 0 && (
					<Button danger onClick={onBatchDelete}>
						批量删除
					</Button>
				)}
			</Space>
			<SystemMenuList list={menus} {...listActionProps} />
			<Drawer
				visible={drawerOpen}
				onClose={closeDrawer}
				title="菜单"
				placement="right"
				width={560}
				closable={false}
				footer={footerElement}
			>
				<SystemMenuForm ref={formRef} {...formDataProps} />
			</Drawer>
		</Spin>
	);
}

export default SystemMenu;
