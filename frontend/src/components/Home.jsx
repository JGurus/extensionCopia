import React, { useEffect, useContext } from "react";
import "./Home.css";
import UserContext from "../context/auth/authContext";
const Home = (props) => {
  const { user } = useContext(UserContext);
  useEffect(() => {
    if (user) {
      props.history.push("/messages");
    }
  }, [user, props.history]);
  return (
    <div className="home">
      <h1>Vamo Copiando xD</h1>
    </div>
  );
};

export default Home;
