import { useEffect, useState } from "react";
import { Menu, Dropdown, Button } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { AvaxLogo, PolygonLogo, BSCLogo, ETHLogo } from "./Logos";
import { useChain, useMoralis } from "react-moralis";

const styles = {
  item: {
    display: "flex",
    alignItems: "center",
    height: "42px",
    fontWeight: "500",
    fontFamily: "Roboto, sans-serif",
    fontSize: "14px",
    padding: "23px 10px",
  },
  button: {
    border: "2px solid rgb(231, 234, 243)",
    borderRadius: "30px",
    background: "transparent",
    color: "#fff",
  },
};

const menuItems = [
  {
    key: "0x1",
    value: "Ethereum",
    icon: <ETHLogo />,
  },
  // {
  //   key: "0x539",
  //   value: "Local Chain",
  //   icon: <ETHLogo />,
  // },
  // {
  //   key: "0x3",
  //   value: "Ropsten Testnet",
  //   icon: <ETHLogo />,
  // },
  {
    key: "0x4",
    value: "Rinkeby Testnet",
    icon: <ETHLogo />,
  },
  // {
  //   key: "0x2a",
  //   value: "Kovan Testnet",
  //   icon: <ETHLogo />,
  // },
  // {
  //   key: "0x5",
  //   value: "Goerli Testnet",
  //   icon: <ETHLogo />,
  // },
  {
    key: "0x38",
    value: "Binance",
    icon: <BSCLogo />,
  },
  {
    key: "0x61",
    value: "Smart Chain Testnet",
    icon: <BSCLogo />,
  },
  // {
  //   key: "0x89",
  //   value: "Polygon",
  //   icon: <PolygonLogo />,
  // },
  // {
  //   key: "0x13881",
  //   value: "Mumbai",
  //   icon: <PolygonLogo />,
  // },
  // {
  //   key: "0xa86a",
  //   value: "Avalanche",
  //   icon: <AvaxLogo />,
  // },
  // {
  //   key: "0xa869",
  //   value: "Avalanche Testnet",
  //   icon: <AvaxLogo />,
  // },
];

function Chains() {
  const { switchNetwork, chainId, chain } = useChain();
  const { isAuthenticated } = useMoralis();
  const [selected, setSelected] = useState({});

  useEffect(() => {
    if (!chainId) return null;
    const newSelected = menuItems.find((item) => item.key === chainId);
    setSelected(newSelected);
  }, [chainId]);

  const handleMenuClick = (e) => {
    console.log("switch to: ", e.key);
    switchNetwork(e.key);
  };

  const menu = (
    <Menu onClick={handleMenuClick}>
      {menuItems.map((item) => (
        <Menu.Item key={item.key} icon={item.icon} style={styles.item}>
          <span style={{ marginLeft: "5px" }}>{item.value}</span>
        </Menu.Item>
      ))}
    </Menu>
  );

  if (!chainId || !isAuthenticated) return null;

  return (
    <div className="">
      <Dropdown overlay={menu} trigger={["click"]}>
        <Button
          key={selected?.key}
          icon={selected?.icon}
          style={{ ...styles.button, ...styles.item }}
        >
          <span
            className="d-none d-md-inline-block"
            style={{ marginLeft: "5px" }}
          >
            {selected?.value}
          </span>
          <DownOutlined className="d-none d-md-inline-block" />
        </Button>
      </Dropdown>
    </div>
  );
}

export default Chains;
