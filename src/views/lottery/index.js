import React from 'react'
import Layout from "../../layout";
import { Link } from "react-router-dom";

function Lottery() {
    return (
        <Layout>
            <section className="flat-title-page inner">
                <div className="overlay"></div>
                <div className="themesflat-container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="page-title-heading mg-bt-12">
                                <h3 className="heading text-center">The ItemSwap Lottery</h3>
                                <h1 className="heading text-center">$500</h1>
                                <h3 className="heading text-center">in prizes!</h3>
                                <h1 className="heading text-center">
                                    <div className='sc-button header-slider style style-1 rocket fl-button pri-1'>Buy Ticket</div>
                                </h1>
                            </div>
                            <div className="page-title-heading mg-bt-12">
                                <h2 className="heading text-center">Get your tickets now!</h2>
                                <h3 className="heading text-center">3H until the draw</h3>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            ;
        </Layout>
    )
}

export default Lottery