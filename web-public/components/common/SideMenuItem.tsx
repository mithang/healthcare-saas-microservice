import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import _ from 'lodash';
import Flaticon from './Flaticon';

interface SubNavItem {
  route: string;
  title: string;
}

interface MenuItem {
  route: string;
  title: string;
  subNav?: SubNavItem[];
}

interface SideMenuItemProps {
  item: MenuItem;
}

export const SideMenuItem: React.FC<SideMenuItemProps> = ({ item }) => {
  const location = useLocation();
  const [isDropdown, setIsDropdown] = useState<boolean>(false);

  return (
    <div className="sidemenu-item">
      <Link
        to={item.route}
        onClick={() => setIsDropdown(!isDropdown)}
        className={`sidemenu-link${location.pathname === item.route ? ' active' : ''}`}
      >
        {item.title}
        {item.subNav && <Flaticon icon='down-arrow' />}
      </Link>
      {item.subNav && (
        <div className={`sidemenu-sub${isDropdown ? ' expanded' : ''}`}>
          {_.map(item.subNav, (subItem, i) => (
            <Link
              to={subItem.route}
              key={i}
              className="sidemenu-link"
            >
              {subItem.title}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default SideMenuItem;