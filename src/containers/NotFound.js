import React from "react";
import "./NotFound.css";
import MinionsWorking from "./images/MinionsWorking.jpg";

export default function NotFound() {
    return (
        <div className="NotFound">
            <h3>A pagina nao foi encontrada</h3>
            <img src={MinionsWorking} className="MinionsWorking" />
        </div>
    );
}