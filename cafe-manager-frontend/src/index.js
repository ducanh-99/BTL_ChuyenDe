import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import './assets/css/client.css';
import 'antd/dist/antd.css';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import rootReducer from './redux/reducers/index';
import thunk from 'redux-thunk';
import {Layout} from "antd";
import AppHeader from "./components/Common/Header";
import AppFooter from "./components/Common/Footer";
import Home from "./components/Home";
import Menu from "./components/Menu";
import MenuList from "./components/Menu/MenuList";
import MenuDetail from "./components/Menu/MenuDetail";
import OrderTable from "./components/OrderTable";
import * as links from "./links";
const { Header, Content, Footer } = Layout;
const store = createStore(rootReducer, applyMiddleware(thunk));

ReactDOM.render(
    <Provider store={store}>
        <Suspense fallback={<div>Loading...</div>}>
            <Router>
                {/*<App />*/}
                <Layout className="mainLayout">
                    <Header>
                        <AppHeader/>
                    </Header>
                    <Content>
                        <Switch>
                            <Route path={links.DAT_BAN}>
                                <OrderTable />
                            </Route>
                            <Route path={links.THUC_DON__CHI_TIET}>
                                <MenuDetail />
                            </Route>
                            <Route path={links.THUC_DON__DANH_SACH}>
                                <MenuList />
                            </Route>
                            <Route path={links.THUC_DON__LOAI}>
                                <Menu />
                            </Route>
                            <Route path={links.TRANG_CHU}>
                                <Home />
                            </Route>
                        </Switch>
                    </Content>
                    <Footer>
                        <AppFooter/>
                    </Footer>
                </Layout>
            </Router>
        </Suspense>
    </Provider>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
