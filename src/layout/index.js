import React, { Component, Fragment } from "react";

import Header from "./header";
import Footer from "./footer";

class ProductLayout extends Component {
    render() {
        return (
            <div>
                <Header />
                {this.props.children}
                <Footer />
            </div>
        );
    }
}
export default ProductLayout;
