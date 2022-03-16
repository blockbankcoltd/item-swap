import React, { useEffect, useState } from "react";
import Layout from "../../layout";
import NFTTokenIds from "../../components/NFTTokenIds";
import { useMoralis } from "react-moralis";

const App = () => {
    console.log('useMoralis', useMoralis());
    return (
        <Layout>
            <section className="flat-title-page inner">
                <div className="overlay"></div>
                <div className="themesflat-container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="page-title-heading mg-bt-12">
                                <h1 className="heading text-center">Explore 1</h1>
                            </div>
                            <div className="breadcrumbs style2">
                                <ul>
                                    <li><Link to="/">Home</Link></li>
                                    <li><Link to="#">Explore</Link></li>
                                    <li>Explore 1</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <NFTTokenIds />
        </Layout>
    );
}

export default App;