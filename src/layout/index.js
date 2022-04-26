import React, { Component, Fragment } from "react";

import Header from "./header";
import Footer from "./footer";
import { withRouter } from "react-router-dom";

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
export default withRouter(ProductLayout);
