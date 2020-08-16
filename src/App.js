import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { Nav, Navbar, NavItem } from "react-bootstrap";
import "./App.css";
import Routes from "./Routes";
import { LinkContainer } from "react-router-bootstrap";
import { AppContext } from "./libs/contextLib";
import { Auth } from "aws-amplify";
import ProductList from './components/ProductList';
import Details from './components/Details';
import Cart from './components/Cart';
import Default from './components/Default';
import styled from 'styled-components';
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
    const history = useHistory();
    const [isAuthenticating, setIsAuthenticating] = useState(true);
    const [isAuthenticated, userHasAuthenticated] = useState(false);
    

    useEffect(() => {
        onLoad();
    }, []);

    async function onLoad() {
        try {
            await Auth.currentSession();
            userHasAuthenticated(true);
            const user_atributes = Auth.currentUserInfo();

        }
        catch (e) {
            if (e !== 'No current user') {
                alert(e);
            }
        }

        setIsAuthenticating(false);
    }
    async function handleLogout() {
        await Auth.signOut();

        userHasAuthenticated(false);
        history.push("/"); // ir à página inicial após dar logout
    }
    return (
        !isAuthenticating &&
        <div className="App container">
            <Navbar fluid collapseOnSelect>
                <Navbar.Header>
                    <Navbar.Brand>
                        <Link to="/">Inicio</Link>
                    </Navbar.Brand>
                    <Navbar.Brand>
                        <Link to="/carrinho">Carrinho</Link>
                    </Navbar.Brand>
                    <Navbar.Toggle />

                </Navbar.Header>
                <Navbar.Collapse>
                    <Nav pullRight>
                        {isAuthenticated
                            ? <NavItem onClick={handleLogout}>Logout</NavItem>

                            : <>
                                <LinkContainer to="/cadastro">
                                    <NavItem>Signup</NavItem>
                                </LinkContainer>
                                <LinkContainer to="/login">
                                    <NavItem>Login</NavItem>
                                </LinkContainer>

                            </>
                        }
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
            <AppContext.Provider
                value={{ isAuthenticated, userHasAuthenticated }}
            >
                <Routes />
            </AppContext.Provider>
        </div>
    );
}
export default App;
