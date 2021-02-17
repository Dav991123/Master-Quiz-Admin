import React, { Suspense } from 'react';
import DefaultRoutes from '../../routing/DefaultRoutes';
import Header from '../components/global/header';
import { withRouter } from 'react-router-dom';

const App = (props) => {

    return (
        <>
            <Header />

            <div className="app_content">
                <Suspense fallback={<p>Loading...</p>}>
                    <DefaultRoutes {...props}/>
                </Suspense>
            </div>
    
        </>
    )
};

export default withRouter(App);
