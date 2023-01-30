import React from 'react'
const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))


// Company component
const AddCompany  = React.lazy(() => import('./views/pages/Companys/addCompany'));
const ListCompany  = React.lazy(() => import('./views/pages/Companys/listComponys'));

const AddEvent  = React.lazy(() => import('./views/pages/Events/addEvent'));
const ListEvent  = React.lazy(() => import('./views/pages/Events/listEvent'));


const AddTag  = React.lazy(() => import('./views/pages/tags/addTags'));





const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
  
  { path: '/addCompany', name: 'Companys', element: AddCompany },
  { path: '/listCompanys', name: 'listComponys', element: ListCompany },

  { path: '/AddEvent', name: 'Event', element: AddEvent },
  { path: '/listEvent', name: 'listEvent', element: ListEvent },


  { path: '/AddTags', name: 'Tag', element: AddTag },




 
]

export default routes