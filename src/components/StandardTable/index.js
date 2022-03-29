import { useCallback, useMemo, useState } from 'react';
import { Table, Alert, Space, Divider, Button, Popconfirm } from 'antd';

import { defaultSort } from 'utils';

export default function StandardTable({
	rowSelection: rowSelectionType = 'checkbox',
	rowIndex: rowIndexProps = true,
	onSelectChange = () => {},
	columns: columnsProps = [],
	columnAction: columnActionProps,
	...props
}) {
	const [selectedRowKeys, setSelectedRowKeys] = useState([]);

	const rowSelection = useMemo(() => {
		if (!rowSelectionType) return;

		return {
			type: rowSelectionType,
			selectedRowKeys,
			onChange: (keys) => {
				onSelectChange(keys);
				setSelectedRowKeys(keys);
			},
		};
	}, [rowSelectionType, selectedRowKeys, onSelectChange]);

	const rowIndex = useMemo(() => {
		if (!rowIndexProps) return [];

		return [
			{
				title: '序号',
				dataIndex: 'index',
				key: 'index',
				render: (_, __, index) => {
					return index + 1;
				},
			},
		];
	}, [rowIndexProps]);

	// 操作列合并
	const columnAction = useMemo(() => {
		if (!columnActionProps) return [];

		if (typeof columnActionProps !== 'object') {
			throw new Error('table action must be an object');
		}

		// 可以赋默认值
		const realAction = columnActionProps;

		const validActions = Object.entries(realAction)
			.filter(([key, value]) => !!value && !['title', 'width'].includes(key))
			.map(([key, value], index) => ({
				key,
				...value,
				sort: value.sort ?? index,
			}));

		if (validActions.length === 0) return [];

		// 排序
		validActions.sort(defaultSort);
		console.log('validActions:', validActions);

		const action = [
			{
				title: realAction.title,
				key: 'action',
				width: realAction.width || validActions.length * 40,
				render: (_, record, index) => {
					return (
						<Space
							size="small"
							className="table-column-action"
							split={<Divider type="vertical" />}
						>
							{validActions.map(({ key, title, onClick, confirm, ...rest }) => {
								if (confirm) {
									return (
										<Popconfirm
											key={key}
											title={confirm}
											onConfirm={() => onClick(record, index)}
										>
											<Button type="link" {...rest}>
												{title}
											</Button>
										</Popconfirm>
									);
								}

								return (
									<Button
										key={key}
										type="link"
										{...rest}
										onClick={() => onClick(record, index)}
									>
										{title}
									</Button>
								);
							})}
						</Space>
					);
				},
			},
		];
		return action;
	}, [columnActionProps]);

	const columns = useMemo(() => {
		return [...rowIndex, ...columnsProps, ...columnAction].map((v) => ({
			...v,
			align: 'center',
		}));
	}, [columnsProps, rowIndex, columnAction]);

	const clearSelectedRowKeys = useCallback(() => {
		setSelectedRowKeys([]);
		onSelectChange([]);
	}, [onSelectChange]);

	return (
		<div className="table-container">
			<div className="table-header">
				<Alert
					style={{ paddingTop: 8, paddingBottom: 8 }}
					type="info"
					description={
						<div className="flex items-center space-x-4">
							<div className="space-x-1">
								<span>共</span>
								<strong className="text-blue-500">
									{props.dataSource?.length ?? 0}
								</strong>
								<span>条数据</span>
							</div>
							<div className="space-x-1">
								<span>已选择</span>
								<strong className="text-blue-500">
									{selectedRowKeys.length}
								</strong>
								<span>项</span>
							</div>
							<span
								className=" cursor-pointer text-blue-500 "
								onClick={clearSelectedRowKeys}
							>
								清空
							</span>
						</div>
					}
				/>
			</div>
			<Table rowSelection={rowSelection} columns={columns} {...props} />
		</div>
	);
}

StandardTable.whyDidYouRender = true;
