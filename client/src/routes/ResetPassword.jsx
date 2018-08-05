import React from "react";
import { SendEmail, SendToken } from "../components/ResetPassword";

const ResetPassword = ({ match: { params }, history }) => {
  if (params.token) {
    return <SendToken token={params.token} history={history} />;
  }

  return <SendEmail />;
};

export default ResetPassword;
