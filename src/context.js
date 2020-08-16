import React, { Component } from 'react'
import { Produtos_Estoque, DetailProduct } from './estoque';

const ProductContext = React.createContext();



class ProductProvider extends Component {
    state = {
        products: Produtos_Estoque,
        detailProduct: DetailProduct
    }
    handleDetail = () => {
        console.log('hello from detail');
    }
    addToCart = () => {
        console.log('hello from addtocart');
    }
    render() {
        return (
            <ProductContext.Provider
                value={{
                ...this.state,
                handleDetail: this.handleDetail,
                addToCart: this.addToCart
            }}>
                {this.props.children}
            </ProductContext.Provider>
            
            )
    }
}


const ProductConsumer = ProductContext.Consumer;

export { ProductProvider, ProductConsumer };