import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const SidebarAdminPortal = [

  {
    title: 'Dashboard',
    path: '/dashboard',
    icon: <FontAwesomeIcon icon="fa-solid fa-gear" />,
    cName: 'nav-text'
  },

  {
    title: 'Products',
    path: '/dashboard/product',
    icon: <FontAwesomeIcon icon="fa-solid fa-barcode" />,
    cName: 'nav-text'
  },

  {
    title: 'Orders',
    path: '/dashboard/orders',
    icon: <FontAwesomeIcon icon="fa-solid fa-basket-shopping" />,
    cName: 'nav-text'
  }

]
