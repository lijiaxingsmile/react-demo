import { Form, Input, Button, message, Spin } from 'antd';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { formSingleLFixedayout, requestDataFn, useRequest } from 'utils';
import { api_role } from 'config/http';

export default function RoleForm({ disabled, id, onSuccess }) {
	const [formRef] = Form.useForm();

	const request = useRequest();
	const queryCLient = useQueryClient();

	const makeMutaion = ({ type, data }) => {
		console.log('type:', type, data);
		const validType = ['create', 'update'];
		if (!validType.includes(type)) {
			throw new Error('type must be create or update');
		}
		return request(api_role, {
			data,
			method: type === 'create' ? 'post' : 'put',
			dataFn: requestDataFn,
		});
	};

	const mutation = useMutation(['role', id], makeMutaion, {
		onSuccess: () => {
			queryCLient.invalidateQueries('roles');
			queryCLient.invalidateQueries(['role', id]);
			message.success('操作成功');
			typeof onSuccess === 'function' && onSuccess();
		},
	});

	const { isLoading } = useQuery(['role', id], () => {
		console.log('id:', id);
		if (!id) {
			formRef.resetFields();
			return;
		}
		return request(api_role, { dataFn: requestDataFn, params: { id } }).then(
			(data) => {
				console.log('data:', data);
				formRef.setFieldsValue(data);
				return data;
			},
		);
	});

	const onSubmit = (values) => {
		console.log('onSubmit:', values);

		if (!values.id) {
			mutation.mutate({ type: 'create', data: values });
		} else {
			mutation.mutate({ type: 'update', data: values });
		}
	};

	return (
		<div className="role-form-container">
			<Spin spinning={isLoading}>
				<Form
					form={formRef}
					onFinish={onSubmit}
					{...formSingleLFixedayout.formItem}
				>
					<Form.Item label="ID" name="id" hidden>
						<Input />
					</Form.Item>
					<Form.Item label="角色名称" name="name">
						<Input disabled={disabled} placeholder="请输入角色名称" />
					</Form.Item>
					<Form.Item label="角色编码" name="code">
						<Input disabled={disabled} placeholder="请输入角色编码" />
					</Form.Item>
					<Form.Item {...formSingleLFixedayout.action}>
						<Button
							loading={isLoading}
							disabled={disabled}
							type="primary"
							htmlType="submit"
						>
							保存
						</Button>
					</Form.Item>
				</Form>
			</Spin>
		</div>
	);
}
