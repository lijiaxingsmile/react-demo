import { Button, Form, Input } from 'antd';
import { formSingleLFixedayout, useAsyncEffect, awaitTimeout } from 'utils';

export default function DepartForm({ selectKey }) {
	const [formRef] = Form.useForm();

	const requestDepartData = async (id) => {
		await awaitTimeout(1000);
	};

	const onSubmit = (values) => {
		console.log('values', values);
	};

	useAsyncEffect(
		async (cancel) => {
			const data = await requestDepartData;
			if (cancel()) return;
			formRef.setFieldsValue(data);
		},
		[selectKey],
	);

	if (!selectKey) return null;
	return (
		<div className="depart-form">
			<Form
				form={formRef}
				onFinish={onSubmit}
				{...formSingleLFixedayout.formItem}
			>
				<Form.Item label="上级部门" name="parentId">
					<Input placeholder="请输入部门编码" />
				</Form.Item>
				<Form.Item label="部门名称" name="name">
					<Input placeholder="请输入部门名称" />
				</Form.Item>
				<Form.Item label="部门编码" name="orgCode">
					<Input placeholder="请输入部门编码" />
				</Form.Item>
				<Form.Item {...formSingleLFixedayout.action}>
					<Button type="primary" htmlType="submit">
						保存
					</Button>
				</Form.Item>
			</Form>
		</div>
	);
}
