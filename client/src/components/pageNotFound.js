import React from "react";
import { Link } from "react-router-dom";
import { Default } from "./styles/default";

const PageNotFound = () => {
  return (
    <Default>
      <h1>Извините, такой страницы не существует!</h1>
      <p>
        Попробуйте <Link to={"/explore"}>найти</Link> что-нибудь еще
      </p>
    </Default>
  );
};

export default PageNotFound;
