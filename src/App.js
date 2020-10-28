import React from 'react';
import Login from './components/Login';
import './css/style.css';
import Menu from './template/menumobile';
import MenuLg from './template/menu';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Mercadoria from './components/mercadoria/mercadoria';
import { getMercadorias } from './Services';
import Vendas from './components/venda/Venda';
import Relatorio from './components/relatorio/Relatorio';

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
        this.abreMenu = this.abreMenu.bind(this);
        this.logout = this.logout.bind(this);
    }

    abreMenu() {
        const sidebar = document.querySelector("#sidebar-mobile");
        sidebar.classList.toggle("d-none")
    }

    logout() {
        sessionStorage.removeItem("token");
        window.location.reload();
    }

    render() {
        if (sessionStorage.getItem('token')) {
            return (
                <div className="container-fluid">
                    <div className="row">
                        <Menu abreMenu={this.abreMenu} logout={this.logout} />
                        <MenuLg logout={this.logout} />
                        <Router>
                            <Switch>
                                <Route exact path="/mercadorias"><Mercadoria getMercadorias={getMercadorias} /></Route>
                                <Route path="/vendas"><Vendas /></Route>
                                <Route path="/relatorios"><Relatorio /></Route>
                            </Switch>
                        </Router>
                    </div>
                    <div className="row">

                    </div>
                </div>
            )
        } else {
            return (
                <Login />
            )
        }
    }
}