import React from 'react'
const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))


// Company component
const AddCompany  = React.lazy(() => import('./views/pages/Companys/addCompany'));
const ListCompany  = React.lazy(() => import('./views/pages/Companys/listComponys'));
const UpdateCompany  = React.lazy(() => import('./views/pages/Companys/updateCompany'));

// Event component
const AddEvent  = React.lazy(() => import('./views/pages/Events/addEvent'));
const ListEvent  = React.lazy(() => import('./views/pages/Events/listEvent'));
const UpdateEvent  = React.lazy(() => import('./views/pages/Events/updateEvent'));


// tag component
const AddTag  = React.lazy(() => import('./views/pages/tags/addTags'));
const ListTag  = React.lazy(() => import('./views/pages/tags/listTags'));
const UpdateTag = React.lazy(() => import('./views/pages/tags/updateTag'));







const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
  
  { path: '/addCompany', name: 'Companys', element: AddCompany },
  { path: '/listCompanys', name: 'Companys', element: ListCompany },
  { path: '/UpdateCompany/:id', name: 'Company', element: UpdateCompany },


  { path: '/AddEvent', name: 'event', element: AddEvent },
  { path: '/listEvent', name: 'event', element: ListEvent },
  { path: '/UpdateEvent', name: 'event', element: UpdateEvent },



  { path: '/AddTags', name: 'Tag', element: AddTag },
  { path: '/listTag', name: 'Tag', element: ListTag },
  { path: '/listTag/:id', name: 'Tag', element: UpdateTag },

 
]

export default routes