import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilSpeedometer,
  cilStar,
} from '@coreui/icons'

//  CNavGroup, 
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'

const _nav = [
  {
    component: CNavItem,
    name: 'Dashboard',
    to: '/admin/dashboard',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
  },
  {
    component: CNavTitle,
    name: 'Menu',
  },
  {
    component: CNavGroup,
    name: 'Company',
    icon: <CIcon icon={cilStar} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'add New Company',
        to: '/admin/addcompany',
      },
      {
        component: CNavItem,
        name: 'List Of company',
        to: '/admin/listCompanys',
      },
    ],
  },
  {
    component: CNavGroup,
    name: 'Event',
    icon: <CIcon icon={cilStar} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'add New Event',
        to: '/admin/addEvent',
        icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
      },
      {
        component: CNavItem,
        name: 'List Of Event',
        to: '/admin/listEvent',
      },
    ],
  },
  {
    component: CNavGroup,
    name: 'Tag',
    icon: <CIcon icon={cilStar} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'add New Tag',
        to: '/admin/addTags',
        icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
      },
      {
        component: CNavItem,
        name: 'List Of Tag',
        to: '/admin/listTag', 
        icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
      },
    ],
  },
]

export default _nav