import Link from 'next/link';
import { Menu, Icon } from "semantic-ui-react";

export default ({ currentUser }) => {
  const links = [
    !currentUser && { label: 'Sign Up', href: '/auth/signup' },
    !currentUser && { label: 'Sign In', href: '/auth/signin' },
    currentUser && { label: 'Sell Foods', href: '/foods/new' },
    currentUser && { label: 'My Orders', href: '/orders' },
    currentUser && { label: 'Sign Out', href: '/auth/signout' }
  ]
    .filter(linkConfig => linkConfig)
    .map(({ label, href }) => {
      return (
        <Menu.Item key={href} className="nav-item">
          <Link href={href}>
            <a className="nav-link">{label}</a>
          </Link>
        </Menu.Item>
      );
    });

  return (
    <Menu stackable widths={5}>
    <Menu.Item>
      <Icon loading color='green' name='circle notch' size="large" name = 'leaf'/>
    </Menu.Item>
    <Menu.Item>
    <Link href="/">
            <a className="nav-link">Ayzeys Delivery</a>
          </Link>
      </Menu.Item>    
     {links}
    </Menu>

  );
};
