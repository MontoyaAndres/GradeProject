import React from "react";

const NoInternet = () => (
  <div
    style={{
      position: "fixed",
      background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
      width: "100%",
      height: "100%",
      left: 0,
      top: 0,
      textAlign: "center"
    }}
  >
    <h1 style={{ color: "white", fontSize: 80 }}>¡No hay internet!</h1>
    <h1 style={{ color: "#BDBDBD", fontSize: 40 }}>
      Espera hasta que llegue, la página automaticamente se cargará
    </h1>
  </div>
);

export default NoInternet;
