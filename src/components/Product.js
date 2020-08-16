import React, { Component } from 'react'
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { ProductConsumer } from "../context";
import { API, Auth } from "aws-amplify";
import emailjs from 'emailjs-com';

export default class Product extends Component {
	render() {
		const { id, title, img, price, inCart } = this.props.product;

		return (
			<ProductWrapper className="col-9 mx-auto col-md-6 col-lg-3 my-3">
				<div className="card">
					<div className="img-container p-5" onClick={() => {
						console.log('clicou')
					}}
					>
						<Link to="/details">
							<img src={img} alt="product" className="card-img-top"/>
						</Link>
						<button
							className="cart-btn"
							disabled={inCart ? true : false}
							onClick={() => {
								Auth.currentUserInfo().then((userInfo) => {
									const { attributes = {} } = userInfo;
									
									API.post("encomendas", "/encomendas", {
										body: {

											produto: title,
											quantidade: "1",
											cliente: attributes.name + " " + attributes.family_name,
											endereco: attributes.address + " " + attributes.zoneinfo + " " + attributes.locale


										}
									})
									emailjs.send("gmail", "template_A9uLiBNt", { "reply_to": "", "cc": " thiago@bgcbrasil.com.br", "from_name": "Gabriel Fialho", "to_name": attributes.name, "produto": title, "endereco": attributes.address + " " + attributes.zoneinfo + " " + attributes.locale }, "user_BzaZZSG5IEEAwZ4Xnvsl5")
									alert("Parabens, voce encomendou um produto!");
								})
			
							
							
						}}
						>
							
							{inCart ? (
								<p className="text-capitalize mb-0" disabled>
									{""}
									No Carrinho
								</p>
							) : (
									<p className="text-capitalize mb-0" disabled>
										{""}
									Reservar
									</p>
								)}

							</button>
					</div>
					<div className="card-footer d-flex justify-content-between">
						<p className="align-self-center mb-0">
							{title}
						</p>
					
					<h5 className="font-italic mb-0">
						<span className="mr-1">R$</span>
						{price}
						</h5>
					</div>
				</div>
			</ProductWrapper>

		);
	}


}


const ProductWrapper = styled.div`
&:hover {
.card {
box-shadow: 2px 2px 5px 0px rgba(0, 0, 0, 0.2);
}
}
`