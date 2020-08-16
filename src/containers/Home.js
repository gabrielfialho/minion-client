import React, { useState, useEffect } from "react";
import { PageHeader, ListGroup, ListGroupItem } from "react-bootstrap";
import { useAppContext } from "../libs/contextLib";
import { onError } from "../libs/errorLib";
import "./Home.css";
import { API } from "aws-amplify";
import ProductList from "../components/ProductList";
import { Auth } from "aws-amplify";


export default function Home() {

    return (

        <div className="Home">
            <ProductList/>
        </div>
    );
}