import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { MoralisProvider } from "react-moralis";
import "./index.css";
import { Provider } from "react-redux";
import { configureStore } from "./redux/storeInitial";
import { MoralisDappProvider } from "./providers/MoralisDappProvider/MoralisDappProvider";

const APP_ID =
  process.env.REACT_APP_MORALIS_APPLICATION_ID ||
  "k4GVITLUsGexx9lCKJcO1ioJaXwdCIUKuQCb57sp";
const SERVER_URL =
  process.env.REACT_APP_MORALIS_SERVER_URL ||
  "https://y6tqolkxe9bh.usemoralis.com:2053/server";

const Application = () => {
  return (
    <Provider store={configureStore()}>
      <MoralisProvider appId={APP_ID} serverUrl={SERVER_URL}>
        <MoralisDappProvider>
          <App isServerInfo />
        </MoralisDappProvider>
      </MoralisProvider>
    </Provider>
  );
};

ReactDOM.render(
  // <React.StrictMode>
  <Application />,
  // </React.StrictMode>,
  document.getElementById("root")
);
