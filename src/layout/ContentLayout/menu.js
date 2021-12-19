import { Menu } from "antd";
import routes from "../../config/routes";

const renderMenu = (list) => {
  if (!list || !list.length) return null;
  return list.map((menu) => {
    if (!menu) return null;
    const { name, children, path } = menu;

    if (children && Array.isArray(children)) {
      return (
        <Menu.SubMenu title={name} key={path}>
          {renderMenu(children)}
        </Menu.SubMenu>
      );
    }

    return <Menu.Item key={path}>{name}</Menu.Item>;
  });
};

const MenuJsx = renderMenu(routes.filter((menu) => menu && menu.name));

export default function NavMenu() {
  return <Menu theme="dark">{MenuJsx}</Menu>;
}

// export default function NavMenu() {
//   return <div>菜单</div>;
// }
