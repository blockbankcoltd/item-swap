import React, { useState } from "react";

function InchModal({ open, onClose, setToken, tokenList }) {
  if (!open) return null;

  const [tokenSearchKeyword, setTokenSearchKeyword] = useState(null);

  return (
    <div style={{ overflow: "auto", height: "500px" }}>
      <div className="widget-subcribe m-3">
        <div className="form-subcribe">
          <input
            type="text"
            placeholder="Search name or paste address"
            onChange={(e) => setTokenSearchKeyword(e.target.value)}
            value={tokenSearchKeyword}
          />
        </div>
      </div>
      {!tokenList
        ? null
        : Object.keys(tokenList).map((token, index) =>
            !tokenSearchKeyword ? (
              <div
                style={{
                  padding: "5px 20px",
                  display: "flex",
                  alignItems: "center",
                  cursor: "pointer",
                }}
                onClick={() => {
                  setToken(tokenList[token]);
                  onClose();
                }}
                key={index}
              >
                <img
                  style={{
                    height: "32px",
                    width: "32px",
                    marginRight: "20px",
                  }}
                  src={tokenList[token].logoURI}
                  alt="noLogo"
                />
                <div>
                  <h4 style={{ color: "var(--primary-color2)" }}>
                    {tokenList[token].name}
                  </h4>
                  <span
                    style={{
                      fontWeight: "600",
                      fontSize: "15px",
                      lineHeight: "14px",
                      color: "var(--primary-color2)",
                    }}
                  >
                    {tokenList[token].symbol}
                  </span>
                </div>
              </div>
            ) : tokenList[token].name
                .toLowerCase()
                .includes(tokenSearchKeyword.toLowerCase()) ||
              tokenList[token].symbol
                .toLowerCase()
                .includes(tokenSearchKeyword.toLowerCase()) ||
              tokenList[token].address
                .toLowerCase()
                .includes(tokenSearchKeyword.toLowerCase()) ? (
              <div
                style={{
                  padding: "5px 20px",
                  display: "flex",
                  alignItems: "center",
                  cursor: "pointer",
                }}
                onClick={() => {
                  setToken(tokenList[token]);
                  onClose();
                }}
                key={index}
              >
                <img
                  style={{
                    height: "32px",
                    width: "32px",
                    marginRight: "20px",
                  }}
                  src={tokenList[token].logoURI}
                  alt="noLogo"
                />
                <div>
                  <h4 style={{ color: "var(--primary-color2)" }}>
                    {tokenList[token].name}
                  </h4>
                  <span
                    style={{
                      fontWeight: "600",
                      fontSize: "15px",
                      lineHeight: "14px",
                      color: "var(--primary-color2)",
                    }}
                  >
                    {tokenList[token].symbol}
                  </span>
                </div>
              </div>
            ) : (
              <></>
            ),
          )}
    </div>
  );
}

export default InchModal;
