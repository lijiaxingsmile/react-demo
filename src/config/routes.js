import Dashboard from '../pages/Dashboard';
import Animate from '../pages/Animate';
import Spring from '../pages/Animate/Spring';
import Anime from '../pages/Animate/Anime';
import Css from '../pages/Css';

import System from '../pages/System';
import SystemMenu from '../pages/System/Menu';
import SystemDict from '../pages/System/Dict';
import SystemDepart from '../pages/System/Depart';

import SystemRole from '../pages/System/Role';

import SortList from '../pages/SortList';

import Index from '../pages/Index';
import Login from '../pages/Login';
import Exception from 'pages/Exception';

// 无需登录就可访问的,PublicLayout
// 只有未登录才可访问的, UserLayout
// 只有登陆后才可访问的,ContentLayout

// title:document.title

// name:menu.name, 为空不出现在导航菜单
// icon: 菜单ICON, 只有menu.name有值才渲染

// path:path,写/代表绝对路径需要拼接父路径, 不写/表示相对路径,前面会自动拼接父级path
// component: 渲染组件. 嵌套路由如果写component,则内部必须要有一个<Outlet />来渲染子组件
// layout: 布局组件, 写为字符串避免互相引用,,嵌套路由只在父级组件写,子组件的 Layout 不生效 ,

export const publicRoutes = [
	{
		title: '首页',
		path: '/',
		component: Index,
		layout: 'PublicLayout',
	},
	{
		title: '异常',
		path: '/exception/:code',
		component: Exception,
		layout: 'PublicLayout',
	},
];
export const userRoutes = [
	{
		title: '登录',
		path: '/login',
		component: Login,
		layout: 'UserLayout',
	},
];
const authRoutes = [
	{
		title: '系统首页',
		name: '主页',
		icon: 'icondashboard',
		path: '/dashboard',
		component: Dashboard,
		layout: 'ContentLayout',
	},
	{
		title: '动画',
		name: '动画',
		icon: 'iconHdonghua-xiangxiahuaru',
		path: '/animate',
		layout: 'ContentLayout',
		component: Animate,
		children: [
			{
				title: 'Spring',
				name: 'Spring',
				path: 'spring',
				component: Spring,
			},
			{
				title: 'Anime',
				name: 'Anime',
				path: 'anime',
				component: Anime,
			},
		],
	},
	{
		title: 'CSS',
		name: 'CSS',
		path: '/css',
		layout: 'ContentLayout',
		component: Css,
	},
	{
		title: '系统管理',
		name: '系统管理',
		icon: 'iconHdonghua-xiangxiahuaru',
		path: '/system',
		layout: 'ContentLayout',
		component: System,
		children: [
			{
				title: '部门管理',
				name: '部门管理',
				path: 'depart',
				component: SystemDepart,
			},
			{
				title: '角色管理',
				name: '角色管理',
				path: 'role',
				component: SystemRole,
			},
			{
				title: '菜单设置',
				name: '菜单设置',
				path: 'menu',
				component: SystemMenu,
			},
			{
				title: '字典设置',
				name: '字典设置',
				path: 'dict',
				component: SystemDict,
			},
		],
	},
	{
		title: '列表排序',
		name: '列表排序',
		path: '/sortList',
		layout: 'ContentLayout',
		component: SortList,
	},
];

export const Exceptions = {
	NotFound: {
		path: '/exception/404',
		component: <Exception code="404" />,
	},
	PermissionError: {
		path: '/exception/404',
		component: <Exception code="404" />,
	},
};

export const routes = publicRoutes.concat(userRoutes, authRoutes);

export const baseRouteMap = {
	index: ['/'],
	login: ['/login'],
	dashboard: ['/dashboard'],
};
