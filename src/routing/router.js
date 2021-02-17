import React, {lazy} from 'react';
import { Redirect } from 'react-router-dom';
const Questions = lazy(() => import('../view/pages/questions'));
const CreateQuestion = lazy(() => import('../view/pages/create-question'));
const EditQuestion = lazy(() => import('../view/pages/edit-question'));

const rootRoutes = [
    { 
        path: '/questions',    
        component: Questions ,    
        exact: true,
    },

    { 
        path: '/create-question',    
        component: CreateQuestion ,    
        exact: true,
    },

    { 
        path: '/edit-question/:quizId',    
        component: EditQuestion ,    
        exact: true,
    },

    {    
        path: '/',    
        component: () => <Redirect to= '/questions'/>,    
        exact: true
    },

]
export const defaultPath = '/';
export default rootRoutes;