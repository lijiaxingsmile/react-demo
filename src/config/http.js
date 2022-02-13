export const baseURL = '/api/v1';

export const responseErrorCodeMap = {
	401: '登录已过期，请重新登录',
	403: '没有权限',
	404: '没有找到资源',
	500: '服务器错误',
	504: '网络超时',
	default: '未知错误',
};

// api 地址

export const api_login = '/login';

export const api_user = '/auth/user';
