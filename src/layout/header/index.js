import React, { Component } from "react";
import {
  Navbar,
  Nav,
  NavbarBrand,
  NavbarToggler,
  NavItem,
  NavLink,
  Container,
  Collapse,
} from "reactstrap";
import { Link } from "react-router-dom";
import logolight from "../../assets/images/logo.svg";
import Account from "../../components/Account";
import Chains from "../../components/Chains";

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.toggle = this.toggle.bind(this);
  }

  toggle = () => {
    this.setState({ isOpenMenu: !this.state.isOpenMenu });
  };

  render() {
    return (
      <React.Fragment>
        <div className="align-items-center topHeader d-flex justify-content-center bg-info">
          <div
            className="border p-2 border-white bg-white my-5"
            style={{ borderRadius: "80px" }}
          >
            <p className="h6 mb-0 text-wrap">
              <span className="font-weight-bold">PHISHING WARNING:</span> Please
              make sure you are visiting https://itemswap - check the URL
              carefully
            </p>
          </div>
        </div>
        <Navbar
          expand="lg"
          fixed={this.props.top === true ? "top" : ""}
          className={this.props.navClass + " navbar-custom sticky sticky-dark"}
          id="navbar"
        >
          <Container>
            <NavbarBrand
              className="navbar-brand logo d-flex col-3"
              style={{ color: "#000000", fontWeight: "600", fontSize: "19px" }}
              href="/"
            >
              <img src={logolight} alt="" height="30" /> Item
              <span style={{ color: "#0BBCD5" }}>Swap</span>
            </NavbarBrand>
            <NavbarToggler onClick={this.toggle}>
              <i className="mdi mdi-menu"></i>
            </NavbarToggler>
            <Collapse
              id="navbarCollapse"
              isOpen={this.state.isOpenMenu}
              className=" navbar-collapse col-9"
            >
              <Nav
                className="navbar-nav ml-auto navbar-center nav col-4"
                id="navbar-navlist"
              >
                {this.props.navItems.map((item, key) => (
                  <NavItem
                    key={key}
                    className={
                      item.navheading === "Market"
                        ? "active font-weight-bold"
                        : ""
                    }
                  >
                    <NavLink
                      className={
                        item.navheading === "Market"
                          ? "active font-weight-bold"
                          : ""
                      }
                      href={item.idnm}
                    >
                      {item.navheading}
                    </NavLink>
                  </NavItem>
                ))}
              </Nav>

              <ul className="navbar-nav navbar-center">
                <li className="nav-item d-inline-block d-lg-none">
                  <Link to="/SignUp" className="nav-link">
                    Connect Wallet
                  </Link>
                </li>
              </ul>
              <div className="navbar-button d-none d-lg-flex justify-content-end col-8">
                <Account />
                <Chains />
              </div>
            </Collapse>
          </Container>
        </Navbar>
      </React.Fragment>
    );
  }
}
// }
export default Header;
