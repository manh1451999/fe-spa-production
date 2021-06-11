import React from 'react';
import {
    BrowserRouter as Router,

    Route, Switch
} from "react-router-dom";
import Bill from './Bill/Bill';
import Category from './Category/Category';
import ContainerTest from './Layout/ContainerTest';
import LayoutAdmin from './Layout/LayoutAdmin';
import Order from './Order/Order';
import ServicesAdmin from './ServicesAdmin/ServicesAdmin';
import User from './User/User';
import Product from './Product/Product';
import Statistical from "./Statistical/Statistical";


const AdminIndex = () => {
    return (
        <Router>
            <LayoutAdmin>
                <Switch>
                    <Route exact path='/admin/home'>
                        <Product />
                    </Route>

                    <Route exact path='/admin/category'>
                        <Category />
                    </Route>

                    <Route exact path='/admin/order'>
                        <Order />
                    </Route>

                    <Route exact path='/admin/user'>
                        <User />
                    </Route>

                    <Route exact path='/admin/bill'>
                        <Bill />
                    </Route>

                    <Route exact path='/admin/services'>
                        <ServicesAdmin />
                    </Route>

                    <Route exact path='/admin/product'>
                        <Product />
                    </Route>

                    <Route exact path='/admin/statistical'>
                        <Statistical />
                    </Route>

                </Switch>

            </LayoutAdmin>
        </Router>
    );
};

export default AdminIndex;