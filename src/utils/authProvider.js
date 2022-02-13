const isAutoLogin = () => {
	const remember = window.localStorage.getItem('remember');
	return remember === 'true';
};

export const authProviderLogin = async (data) => {
	const { token, remember, expire } = data;

	localStorage.setItem('remember', remember);
	const storage = remember ? window.localStorage : window.sessionStorage;
	storage.setItem('token', token);
	storage.setItem('expire', expire);

	return token;
};

export const authProviderLoginout = async () => {
	const storage = isAutoLogin() ? window.localStorage : window.sessionStorage;
	storage.removeItem('token');
	storage.removeItem('remember');
};

export const authProviderToken = async () => {
	const storage = isAutoLogin() ? window.localStorage : window.sessionStorage;
	return storage.getItem('token');
};
