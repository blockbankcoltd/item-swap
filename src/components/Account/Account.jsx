import { useMoralis, useMoralisQuery } from "react-moralis";
import { getEllipsisTxt } from "helpers/formatters";
import Blockie from "../Blockie";
import { Button, Card, Modal } from "antd";
import { useState, useEffect } from "react";
import Address from "../Address/Address";
import { SelectOutlined } from "@ant-design/icons";
import { getExplorer } from "helpers/networks";
import Text from "antd/lib/typography/Text";
import { connectors } from "./config";
import { Link, useLocation } from "react-router-dom";
// import { FaWallet } from "react-icons/fa";
const styles = {
  account: {
    height: "42px",
    padding: "0 15px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "fit-content",
    borderRadius: "12px",
    backgroundColor: "rgb(244, 244, 244)",
    cursor: "pointer",
  },
  text: {
    color: "#21BF96",
  },
  connector: {
    alignItems: "center",
    display: "flex",
    flexDirection: "column",
    height: "auto",
    justifyContent: "center",
    marginLeft: "auto",
    marginRight: "auto",
    padding: "20px 5px",
    cursor: "pointer",
  },
  icon: {
    alignSelf: "center",
    fill: "rgb(40, 13, 95)",
    flexShrink: "0",
    marginBottom: "8px",
    height: "30px",
  },
};

function Account() {
  const { authenticate, isAuthenticated, account, chainId, logout } =
    useMoralis();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isAuthModalVisible, setIsAuthModalVisible] = useState(false);
  // localStorage.setItem("iaAdminLoggedIn", false);

  const {
    data: adminWalletAddress,
    error,
    isLoading,
  } = useMoralisQuery(
    "Admin",
    (query) => {
      return query.descending("createdAt");
    },
    [account],
  );
  useEffect(() => {
    setTimeout(() => {
      if (account) {
        localStorage.setItem("account", account);
        console.log("hello", adminWalletAddress, account);
        if (
          adminWalletAddress &&
          adminWalletAddress[0] &&
          adminWalletAddress[0].attributes.walletAddress.toString() ==
            account.toString()
        ) {
          localStorage.setItem("isAdminLoggedIn", true);
        }
      } else {
        localStorage.setItem("isAdminLoggedIn", false);
      }
    }, 4000);
  }, [adminWalletAddress]);

  if (account) localStorage.setItem("walletAddress", account);
  if (!isAuthenticated || !account) {
    return (
      <>
        <div
          onClick={() => setIsAuthModalVisible(true)}
          className="sc-button header-slider style style-1 wallet fl-button pri-1 d-none d-md-inline-block"
        >
          <span>Wallet connect</span>
        </div>
        <div
          onClick={() => setIsAuthModalVisible(true)}
          className="sc-button header-slider style style-1 wallet d-md-none"
          style={{ border: 0, padding: 0 }}
        >
          <span className="wallet"></span>
        </div>
        <Modal
          visible={isAuthModalVisible}
          footer={null}
          onCancel={() => setIsAuthModalVisible(false)}
          bodyStyle={{
            padding: "15px",
            fontSize: "17px",
            fontWeight: "500",
          }}
          style={{ fontSize: "16px", fontWeight: "500" }}
          width="340px"
        >
          <div
            style={{
              padding: "10px",
              display: "flex",
              justifyContent: "center",
              fontWeight: "700",
              fontSize: "20px",
            }}
          >
            Connect Wallet
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}>
            {connectors.map(({ title, icon, connectorId }, key) => (
              <div
                style={styles.connector}
                key={key}
                onClick={async () => {
                  try {
                    await authenticate({ provider: connectorId });
                    window.localStorage.setItem("connectorId", connectorId);
                    setIsAuthModalVisible(false);
                  } catch (e) {
                    console.error(e);
                  }
                }}
              >
                <img src={icon} alt={title} style={styles.icon} />
                <Text style={{ fontSize: "14px" }}>{title}</Text>
              </div>
            ))}
          </div>
        </Modal>
      </>
    );
  }
  return (
    <>
      {/* <button
        onClick={async () => {
          try {
            console.log("change")
            await web3._provider.request({
              method: "wallet_switchEthereumChain",
              params: [{ chainId: "0x38" }],
            });
            console.log("changed")
          } catch (e) {
            console.error(e);
          }
        }}
      >
        Hi
      </button> */}
      <div className="d-none d-md-inline-block">
        <div
          className="sc-button header-slider style style-1 fl-button pri-1 d-flex align-items-center"
          onClick={() => setIsModalVisible(true)}
        >
          <span className="mr-2 custom">{getEllipsisTxt(account, 6)}</span>
          <Blockie currentWallet scale={3} />
        </div>
      </div>
      <div className="d-md-none">
        <div
          className="sc-button header-slider style style-1 fl-button pri-1 d-flex align-items-center"
          onClick={() => setIsModalVisible(true)}
          style={{ border: 0, padding: 0 }}
        >
          <Blockie currentWallet scale={3} />
        </div>
      </div>
      <Modal
        visible={isModalVisible}
        footer={null}
        onCancel={() => setIsModalVisible(false)}
        bodyStyle={{
          padding: "15px",
          fontSize: "17px",
          fontWeight: "500",
        }}
        style={{ fontSize: "16px", fontWeight: "500" }}
        width="400px"
      >
        <h5 style={{ color: "var(--primary-color2)" }}>Account</h5>
        <Card
          style={{
            marginTop: "10px",
            borderRadius: "1rem",
            background: "var(--primary-color)",
          }}
          bodyStyle={{ padding: "15px" }}
        >
          <Address
            avatar="left"
            size={6}
            copyable
            style={{ fontSize: "20px" }}
          />
          <div style={{ marginTop: "10px", padding: "0 10px" }}>
            <a
              href={`${getExplorer(chainId)}/address/${account}`}
              target="_blank"
              rel="noreferrer"
              style={{ color: "var(--primary-color2)" }}
            >
              <SelectOutlined style={{ marginRight: "5px" }} />
              View on Explorer
            </a>
          </div>
        </Card>
        <div
          style={{
            padding: "10px 0",
          }}
        >
          <Link to="/user" style={{ color: "#000 !important" }}>
            Profile
          </Link>
        </div>
        <Button
          size="large"
          type="primary"
          style={{
            width: "100%",
            marginTop: "10px",
            borderRadius: "0.5rem",
            fontSize: "16px",
            fontWeight: "500",
          }}
          onClick={async () => {
            await logout();
            window.localStorage.removeItem("connectorId");
            localStorage.setItem("isAdminLoggedIn", false);
            localStorage.setItem("account", null);
            setIsModalVisible(false);
          }}
        >
          Disconnect Wallet
        </Button>
      </Modal>
    </>
  );
}

export default Account;
