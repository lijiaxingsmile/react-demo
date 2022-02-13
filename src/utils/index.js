export * from './useRequest';
export * from './useAsyncEffect';
export * from './authProvider';

export const cleanObject = (obj) => {
	if (typeof obj !== 'object') return obj;

	const newObj = {};
	Object.entries(obj).forEach(([key, value]) => {
		if (value !== undefined && value !== null) {
			newObj[key] = typeof value === 'object' ? cleanObject(value) : value;
		}
	});
	return newObj;
};
