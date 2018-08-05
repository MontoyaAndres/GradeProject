import React from "react";
import Button from "@material-ui/core/Button";

const Error404 = () => (
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
    <h1 style={{ color: "white", fontSize: 60 }}>Página no encontrada</h1>
    <Button style={{ color: "#BDBDBD", fontSize: 30 }} href="/">
      Regresar a inicio
    </Button>
  </div>
);

export default Error404;
