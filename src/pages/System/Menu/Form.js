import { useImperativeHandle, forwardRef, useEffect, useMemo } from 'react';
import {
	Form,
	Input,
	InputNumber,
	Radio,
	Spin,
	Switch,
	TreeSelect,
} from 'antd';
import { formSingleLFixedayout, useRequest, requestDataFn } from 'utils';
import { useQuery } from 'react-query';
import { api_menu } from 'config/http';

const formValidateRules = {
	type: [
		{
			required: true,
			message: '必填项',
		},
	],
	parentID: [
		{
			required: true,
			message: '必填项',
		},
	],
	name: [
		{
			required: true,
			message: '必填项',
		},
	],
	path: [
		{
			required: true,
			message: '必填项',
		},
	],
};

const formInitialValues = {
	sort: 1.0,
	showSideMenu: true,
	enabled: true,
	parentID: 0,
	type: 'topMenu',
};

function SystemMenuForm({ id, parentID, disabled, menus }, ref) {
	const [formRef] = Form.useForm();

	const request = useRequest();
	const { data, isLoading } = useQuery(
		['menu', id],
		() => request(api_menu, { params: { id }, dataFn: requestDataFn }),
		{
			enabled: !!id,
		},
	);

	useEffect(() => {
		if (!data) {
			formRef.setFieldsValue({
				...formInitialValues,
				parentID,
			});
			return;
		}
		formRef.setFieldsValue({
			...data,
			parentID,
		});
	}, [data, parentID, formRef]);

	useImperativeHandle(
		ref,
		() => ({
			validateFields: () => {
				return formRef.validateFields();
			},
			setFieldsValue: (values) => {
				formRef.setFieldsValue(values);
			},
			resetFields: () => {
				formRef.resetFields();
			},
		}),
		[formRef],
	);

	const menuTree = useMemo(() => {
		const topMenu = {
			children: null,
			id: 0,
			name: '顶级菜单',
			parentId: 0,
		};

		return [topMenu, ...menus];
	}, [menus]);

	return (
		<Spin spinning={isLoading}>
			<Form
				form={formRef}
				size="large"
				{...formSingleLFixedayout.formItem}
				initialValues={formInitialValues}
			>
				<Form.Item label="菜单类型" name="type" rules={formValidateRules.type}>
					<Radio.Group disabled={disabled}>
						<Radio value="topMenu">顶级菜单</Radio>
						<Radio value="childMenu">子菜单</Radio>
						<Radio value="button">按钮权限</Radio>
					</Radio.Group>
				</Form.Item>
				<Form.Item
					label="父级菜单"
					name="parentID"
					rules={formValidateRules.parentID}
				>
					<TreeSelect
						disabled={disabled}
						treeData={menuTree}
						fieldNames={{ label: 'name', value: 'id', children: 'children' }}
					/>
				</Form.Item>
				<Form.Item label="菜单名称" name="name" rules={formValidateRules.name}>
					<Input
						placeholder={disabled ? '' : '请输入菜单名称'}
						disabled={disabled}
					/>
				</Form.Item>
				<Form.Item label="菜单路径" name="path" rules={formValidateRules.path}>
					<Input
						placeholder={disabled ? '' : '请输入菜单路径'}
						disabled={disabled}
					/>
				</Form.Item>
				<Form.Item label="菜单图标" name="icon">
					<Input
						placeholder={disabled ? '' : '请输入菜单图标'}
						disabled={disabled}
					/>
				</Form.Item>
				<Form.Item label="排序值" name="sort">
					<InputNumber
						placeholder={disabled ? '' : '请输入排序值'}
						disabled={disabled}
						min={0}
						precision={2}
					/>
				</Form.Item>
				<Form.Item
					label="侧边菜单展示"
					name="showSideMenu"
					valuePropName="checked"
				>
					<Switch disabled={disabled} />
				</Form.Item>
				<Form.Item label="启用" name="enabled" valuePropName="checked">
					<Switch disabled={disabled} />
				</Form.Item>
			</Form>
		</Spin>
	);
}

export default forwardRef(SystemMenuForm);
