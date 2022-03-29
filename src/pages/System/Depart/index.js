import { useState } from 'react';
import { Tabs } from 'antd';

import DepartList from './list';
import DepartForm from './form';
import PermissionList from './permissionList';

export default function Depart() {
	const [selectKey, setSelectKey] = useState();

	const onSelectKey = (keys) => {
		setSelectKey(keys[0]);
	};

	return (
		<div className="depart-page flex space-x-4 ">
			<div className="depart-list w-1/2">
				<DepartList onSelect={onSelectKey} />
			</div>
			<div className="depart-info w-1/2 ">
				<Tabs>
					<Tabs.TabPane tab="部门信息" key="1">
						<DepartForm selectKey={selectKey} />
					</Tabs.TabPane>
					<Tabs.TabPane tab="部门权限" key="2">
						<PermissionList selectKey={selectKey} />
					</Tabs.TabPane>
				</Tabs>
			</div>
		</div>
	);
}
