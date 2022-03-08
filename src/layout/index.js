import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import Header from "./header";
import Footer from "./footer";

class ProductLayout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      navItems: [
        { id: 3, idnm: "trade", navheading: "Trade" },
        { id: 1, idnm: "market", navheading: "Market" },
        { id: 2, idnm: "board", navheading: "Board" },
      ],
      pos: document.documentElement.scrollTop,
      imglight: false,
      navClass: "fixedTop",
      fixTop: true,
    };
  }
  componentDidMount() {
    window.addEventListener("scroll", this.scrollNavigation, true);
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.scrollNavigation, true);
  }

  scrollNavigation = () => {
    var scrollup = document.documentElement.scrollTop;
    if (scrollup > this.state.pos) {
      this.setState({ navClass: "nav-sticky", imglight: false });
    } else {
      this.setState({ navClass: "fixedTop", imglight: false });
    }
  };

  render() {
    return (
      <div>
        <Header
          navItems={this.state.navItems}
          navClass={this.state.navClass}
          imglight={this.state.imglight}
          top={this.state.fixTop}
        />
        {this.props.children}
        <Footer />
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return { ...state };
};
const mapActionToProps = {};

export default withRouter(
  connect(mapStateToProps, mapActionToProps)(ProductLayout)
);
