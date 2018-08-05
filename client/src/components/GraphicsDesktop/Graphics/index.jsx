import React from "react";

import Bar from "./Bar";
import Line from "./Line";
import Pie from "./Pie";
import Doughnut from "./Doughnut";

const index = ({ chartConfig, graphicBy, style }) => {
  if (style === "Bar") {
    return <Bar chartConfig={chartConfig} graphicBy={graphicBy} />;
  }

  if (style === "Line") {
    return <Line chartConfig={chartConfig} graphicBy={graphicBy} />;
  }

  if (style === "Pie") {
    return <Pie chartConfig={chartConfig} graphicBy={graphicBy} />;
  }

  if (style === "Doughnut") {
    return <Doughnut chartConfig={chartConfig} graphicBy={graphicBy} />;
  }
};

export default index;
