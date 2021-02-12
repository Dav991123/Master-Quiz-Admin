import React, { Suspense } from 'react';
import DefaultRoutes from '../../routing/DefaultRoutes';
import Header from '../components/header';
import { withRouter } from 'react-router-dom';

const App = (props) => {

    return (
        <>
            <Header />

            <div style={{marginTop: '100px'}}>
                <Suspense fallback={<p>Loading...</p>}>
                    <DefaultRoutes {...props}/>
                </Suspense>
            </div>
    
        </>
    )
};

export default withRouter(App);
