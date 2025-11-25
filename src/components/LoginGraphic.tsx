import React from "react";
import Frame7 from "@/assets/svgs/Frame7.svg?react";
import { S } from "@/styles/Login.styles";

const LoginGraphic: React.FC = () => {
  return (
    <div className={S.graphicContainer}>
      <Frame7 className={S.graphicSvg} />
      <p className={S.graphicText}>You can make anything by writing</p>
    </div>
  );
};

export default LoginGraphic;
