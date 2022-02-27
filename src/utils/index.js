export * from './useRequest';
export * from './useAsyncEffect';
export * from './authProvider';

export const cleanObject = (obj) => {
	if (typeof obj !== 'object') return obj;

	const newObj = {};
	Object.entries(obj).forEach(([key, value]) => {
		if (value !== undefined && value !== null) {
			const realValue = typeof value === 'string' ? value.trim() : value;
			newObj[key] =
				typeof value === 'object' && !Array.isArray(value)
					? cleanObject(value)
					: realValue;
		}
	});
	return newObj;
};

export const formLayout = {
	labelCol: {
		xs: { span: 24 },
		sm: { span: 8 },
	},
	wrapperCol: {
		xs: { span: 24 },
		sm: { span: 16 },
	},
};

export const tailLayout = {
	wrapperCol: {
		xs: { span: 24, offset: 0 },
		sm: { span: 16, offset: 8 },
	},
};

export const formSingleLFixedayout = {
	labelCol: {
		span: 5,
	},
	wrapperCol: {
		span: 17,
	},
};

export const stateReducer = (state, newState) => {
	return { ...state, ...newState };
};
