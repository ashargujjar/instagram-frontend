import React from "react";
import google from "../../asssets/google play.png";
import microsoft from "../../asssets/microsoft.png";
export default function Getaap() {
  return (
    <div className="get-apps">
      <img className="get-apps-image" src={google} alt="Google Play" />
      <img className="get-apps-image" src={microsoft} alt="Microsoft Store" />
    </div>
  );
}
