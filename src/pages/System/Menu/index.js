import { useState } from 'react';
import { Button, Space, Spin, Drawer } from 'antd';
import { useQuery } from 'react-query';
import { useRequest } from 'utils';
import { api_menus } from 'config/http';
import SystemMenuList from './List';
import SystemMenuForm from './Form';

function SystemMenu() {
	const request = useRequest();

	const [drawerOpen, setDrawerOpen] = useState(false);

	const { data: menus = [], isLoading } = useQuery('menus', request(api_menus));

	console.log('menus render:', menus);

	const onAddMenu = () => {
		setDrawerOpen(true);
	};

	return (
		<Spin spinning={isLoading}>
			<Space size="large" className="mb-2">
				<Button type="primary" onClick={onAddMenu}>
					添加菜单
				</Button>
				<Button type="primary">批量删除</Button>
			</Space>
			<SystemMenuList list={menus} />
			<Drawer
				visible={drawerOpen}
				onClose={() => setDrawerOpen(false)}
				title="菜单"
				placement="right"
				width={500}
			>
				<SystemMenuForm />
			</Drawer>
		</Spin>
	);
}

SystemMenu.whyDidYouRender = true;

export default SystemMenu;
