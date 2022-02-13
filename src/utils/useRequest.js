import { baseURL, responseErrorCodeMap } from 'config/http';
import { Modal } from 'antd';
import { cleanObject } from 'utils';
import { useCallback } from 'react';
import { useAuth } from 'context';
import { authProviderLoginout } from './authProvider';

// 发送请求以及封装
export const request = async (url, options) => {
	const config = {
		method: 'GET',
		...options,
	};
	config.url = baseURL + url;

	// 将params 传递到URL中
	if (config.params) {
		const params = cleanObject(config.params);
		config.url += '?' + new URLSearchParams(params).toString();
		delete config.params;
	}

	// 如果是POST,将data传递到fetch的body中
	if (config.method.toUpperCase() === 'POST' && config.data) {
		const data = cleanObject(config.data);
		config.body = JSON.stringify(data);
		delete config.data;
	}

	config.headers = {
		'Content-Type': 'application/json',
		...config.headers,
	};

	// 添加token处理
	if (config.token) {
		config.headers.Authorization = `Bearer ${config.token}`;
		delete config.token;
	}

	try {
		const response = await fetch(config.url, config);
		let data = {};
		if (response.ok) {
			data = (await response.json()) || {};
			if (data.success || data.code === 200) {
				return data;
			}
		}

		console.log('response:', response);

		const errorMessage =
			responseErrorCodeMap[response.status] ??
			data.message ??
			responseErrorCodeMap.default;

		if (response.status === 401) {
			await authProviderLoginout();
			window.location.reload();
		}
		throw new Error(errorMessage);
	} catch (error) {
		console.log('catch error:', error);
		const message = error.message || responseErrorCodeMap.default;
		Modal.error({
			title: '错误',
			centered: true,
			content: message,
		});
		throw new Error(message);
	}
};

export function useRequest() {
	const auth = useAuth();
	return useCallback(
		(url, data) => request(url, { ...data, token: auth.token }),
		[auth],
	);
}
