import { Form, Input, Button, Checkbox } from 'antd';
import { api_login } from 'config/http';
import { useRequest } from 'utils';
import { useAuth } from 'context';
import React from 'react';

import { useMutation } from 'react-query';

export default function Login() {
	const requestClient = useRequest();

	const [remember, setRemember] = React.useState(false);

	const auth = useAuth();

	const login = useMutation(
		(data) =>
			requestClient(api_login, {
				method: 'POST',
				data,
			}),
		{
			onSuccess: (response) => {
				console.log('登录成功', response);
				auth.login({ ...response.data, remember });
			},
		},
	);

	// useQuery('ping', requestClient('/ping'));

	return (
		<div className="login-container h-full bg-sky-300 p-8 ">
			<div className="login-content w-80 mt-52 ml-auto bg-white bg-opacity-90 p-8 ">
				<div className="login-title text-center text-2xl font-bold ">登录</div>
				<div className="login-form p-8">
					<Form onFinish={login.mutate}>
						<Form.Item name="username">
							<Input placeholder="请输入用户名" />
						</Form.Item>
						<Form.Item name="password">
							<Input type="password" placeholder="请输入密码" />
						</Form.Item>
						<Form.Item>
							<Button
								type="primary"
								block
								htmlType="submit"
								loading={login.isLoading}
							>
								登录
							</Button>
						</Form.Item>
						<Form.Item>
							<Checkbox
								checked={remember}
								onChange={(e) => setRemember(e.target.checked)}
							>
								自动登录
							</Checkbox>
						</Form.Item>
					</Form>
				</div>
			</div>
		</div>
	);
}
