import React, { StrictMode } from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { MoralisProvider } from "react-moralis";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
import ScrollToTop from "./views/component/ScrollToTop";
import { BrowserRouter } from "react-router-dom";
import { MoralisDappProvider } from "./providers/MoralisDappProvider/MoralisDappProvider";
import { configureStore } from "./redux/storeInitial";
import { Provider } from "react-redux";

const APP_ID = process.env.REACT_APP_MORALIS_APPLICATION_ID;
const SERVER_URL = process.env.REACT_APP_MORALIS_SERVER_URL;

const Application = () => {
  return (
    <BrowserRouter>
      <Provider store={configureStore()}>
        <MoralisProvider appId={APP_ID} serverUrl={SERVER_URL}>
          <MoralisDappProvider>
            <ScrollToTop />
            <App isServerInfo />
          </MoralisDappProvider>
        </MoralisProvider>
      </Provider>
    </BrowserRouter>
  );
};

ReactDOM.render(
  <StrictMode>
    <Application />
  </StrictMode>,
  document.getElementById("root"),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register();
