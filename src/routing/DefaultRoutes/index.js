import React, { Suspense } from 'react';
import { Switch, Route, withRouter } from 'react-router-dom'
import rootRoutes from '../router';

const DefaultRoutes = props => {
    return (
        <>
            <Switch>
                {
                    rootRoutes.map(route => {
                        if (route.innerRoutes && route.innerRoutes.length) {
                            return route.innerRoutes.map(innerRoute => {
                                return (
                                    <Route
                                        // exact={route.exact}
                                        key={`${route.path}${innerRoute.path}`}
                                        path={`${route.path}${innerRoute.path}`}
                                        render={() => (
                                                <div>
                                                    <innerRoute.component {...props}/>
                                                </div>
                                            )
                                        }
                                    />
                                )
                            })
                        }
                        return (
                            <Route
                                // exact={route.exact}
                                key={route.path}
                                path={route.path}
                                render={() => <Suspense>
                                    <route.component {...props}/>
                                </Suspense>}
                            />
                        )
                    })
                }
            </Switch>
        </>
    )
};
export default withRouter(DefaultRoutes);