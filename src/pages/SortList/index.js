import { useEffect, useLayoutEffect, useState } from 'react';
import { Table, Tag, Space, Button } from 'antd';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
// fake data generator

const columnsTitle = [
	{
		id: 1,
		title: 'Name',
	},
	{
		id: 2,
		title: 'Age',
	},
	{
		id: 3,
		title: 'Address',
	},
	{
		id: 4,
		title: 'Tags',
	},
	{
		id: 5,
		title: 'Action',
	},
];

const getItems = () =>
	columnsTitle.map((item) => ({
		id: `item-${item.id}`,
		content: item.title,
	}));

// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
	const result = Array.from(list);
	const [removed] = result.splice(startIndex, 1);
	result.splice(endIndex, 0, removed);

	return result;
};

const getListStyle = (isDraggingOver) => ({
	background: isDraggingOver ? 'lightblue' : 'lightgrey',
	display: 'flex',
	width: '500px',
	overflow: 'auto',
});

const data = [
	{
		key: '1',
		name: 'John Brown',
		age: 32,
		address: 'New York No. 1 Lake Park',
		tags: ['nice', 'developer'],
	},
	{
		key: '2',
		name: 'Jim Green',
		age: 42,
		address: 'London No. 1 Lake Park',
		tags: ['loser'],
	},
	{
		key: '3',
		name: 'Joe Black',
		age: 32,
		address: 'Sidney No. 1 Lake Park',
		tags: ['cool', 'teacher'],
	},
];

const SortTitle = ({ title }) => {
	return <th className="ant-table-cell">{title}</th>;
};

const TableHeader = (props) => {
	console.log('TableHeader props:', props);
	const [items, setItems] = useState(() => getItems());
	const [trWidthList, setTrWidthList] = useState([]);

	const onDragEnd = (result) => {
		if (!result.destination) {
			return;
		}
		const reOrderItems = reorder(
			items,
			result.source.index,
			result.destination.index,
		);
		setItems(reOrderItems);
	};

	useLayoutEffect(() => {
		const firstTr = document.querySelector('.ant-table-row-level-0');
		console.log('dom:', firstTr);

		const trList = firstTr.querySelectorAll('.ant-table-cell');
		const widthList = Array.from(trList).map((v) => {
			console.log(v.getClientRects()[0].width);
			return v.getClientRects()[0].width;
		});
		setTrWidthList(widthList);
	}, []);

	const getItemStyle = (isDragging, draggableStyle, index) => ({
		// some basic styles to make the items look a bit nicer
		userSelect: 'none',

		// margin: `0 ${grid}px 0 0`,
		// width: trWidthList[index],

		// change background colour if dragging
		background: isDragging ? 'lightgreen' : 'grey',

		// styles we need to apply on draggables
		...draggableStyle,
	});

	return (
		<DragDropContext onDragEnd={onDragEnd}>
			<Droppable droppableId="droppable" direction="horizontal">
				{(provided, snapshot) => (
					<thead
						className="ant-table-custom-thead ant-table-thead"
						ref={provided.innerRef}
						style={getListStyle(snapshot.isDraggingOver)}
						{...provided.droppableProps}
					>
						{items.map((item, index) => (
							<Draggable key={item.id} draggableId={item.id} index={index}>
								{(provided, snapshot) => (
									<tr
										ref={provided.innerRef}
										{...provided.draggableProps}
										{...provided.dragHandleProps}
										style={getItemStyle(
											snapshot.isDragging,
											provided.draggableProps.style,
										)}
									>
										<SortTitle title={item.content} />
									</tr>
								)}
							</Draggable>
						))}
						{provided.placeholder}
					</thead>
				)}
			</Droppable>
		</DragDropContext>
	);
};

// sortOrder, sortColumn, filters;
export default function SortList() {
	const columns = [
		{
			// title: <SortTitle title="Name" />,
			dataIndex: 'name',
			width: 100,
			key: 'name',
			render: (text) => (
				<span className="text-blue-500 cursor-pointer">{text}</span>
			),
		},
		{
			// title: <SortTitle title="Age" />,
			dataIndex: 'age',
			key: 'age',
		},
		{
			// title: <SortTitle title="Address" />,
			dataIndex: 'address',
			key: 'address',
		},
		{
			// title: <SortTitle title="Tags" />,
			key: 'tags',
			dataIndex: 'tags',
			render: (tags) => (
				<>
					{tags.map((tag) => {
						let color = tag.length > 5 ? 'geekblue' : 'green';
						if (tag === 'loser') {
							color = 'volcano';
						}
						return (
							<Tag color={color} key={tag}>
								{tag.toUpperCase()}
							</Tag>
						);
					})}
				</>
			),
		},
		{
			// title: <SortTitle title="Action" />,
			key: 'action',
			render: (text, record) => (
				<Space size="middle">
					<span className="text-blue-500 cursor-pointer">
						Invite {record.name}
					</span>
					<span className="text-blue-500 cursor-pointer">Delete</span>
				</Space>
			),
		},
	];

	const onHeaderRow = (columns, index) => {
		console.log('onHeaderRow:', columns, index);
	};

	return (
		<div>
			<Space className="space-x-4 mb-2">
				<Button type="primary">保存</Button>
				<Button type="primary">重置</Button>
			</Space>
			<Table
				onHeaderRow={onHeaderRow}
				components={{
					header: {
						// row: TableHeader,
						wrapper: TableHeader,
					},
				}}
				dataSource={data}
				columns={columns}
			/>
		</div>
	);
}
