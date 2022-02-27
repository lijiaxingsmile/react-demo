import { useCallback, useMemo, useState } from 'react';
import { Table, Alert } from 'antd';

export default function StandardTable({
	rowSelection: rowSelectionType = 'checkbox',
	rowIndex: rowIndexProps = true,
	onSelectChange = () => {},
	columns: columnsProps,
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

	const columns = useMemo(() => {
		return [...rowIndex, ...columnsProps].map((v) => ({
			...v,
			align: 'center',
		}));
	}, [columnsProps, rowIndex]);

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
