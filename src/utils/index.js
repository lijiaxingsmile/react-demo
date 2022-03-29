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

// 固定每项一行展示
export const formSingleLFixedayout = {
	formItem: {
		labelCol: {
			span: 5,
		},
		wrapperCol: {
			span: 17,
		},
	},
	action: {
		wrapperCol: {
			offset: 5,
		},
	},
};

export const stateReducer = (state, newState) => {
	return { ...state, ...newState };
};

export const awaitTimeout = (ms) => {
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve();
		}, ms);
	});
};

export const sortFn = (sortKey = 'sort') => {
	return (a, b) => {
		if (a[sortKey] > b[sortKey]) {
			return 1;
		} else if (a[sortKey] < b[sortKey]) {
			return -1;
		} else {
			return 0;
		}
	};
};

export const defaultSort = sortFn('sort');
