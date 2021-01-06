import React, {lazy} from 'react';
import { Redirect } from 'react-router-dom';
const Courses = lazy(() => import('../view/pages/questions'));

const rootRoutes = [
    { 
        path: '/courses',    
        component: Courses ,    
        exact: true,
    },

    {    
        path: '/',    
        component: () => <Redirect to= '/courses'/>,    
        exact: true
    },

]
export const defaultPath = '/';
export default rootRoutes;