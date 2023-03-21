import React, { useContext, useState } from "react";
import "./TitleHeader.css";
import Maplogo from "../../images/NAMap.png";
import scalelogo from "../../images/scale.png";
import { AppContext } from "../pages/DiseaseApp";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
export default function TitleHeader() {
  const {
    choosenState,
    choosenStateTitle,
    USMainMap,
    setUSMainMap,
    setDiseaseType,
    compareStates,
    setCompareStates,
    theme,
    setTheme,
  } = useContext(AppContext);

  const [isOn, setIsOn] = useState(false);

  const toggleSwitch = () => {
    theme === "Dark" ? setTheme("Light") : setTheme("Dark");
    setIsOn(!isOn);
  };

  const spring = {
    type: "spring",
    stiffness: 700,
    damping: 30,
  };

  function handleMapView() {
    if (choosenState || compareStates) {
      setUSMainMap(true);
      setCompareStates(false);
    } else setUSMainMap(false);
  }

  function handleCompare() {
    setCompareStates(true);
    setUSMainMap(false);
  }
  function handleDiseaseSelection(e) {
    setDiseaseType(e.target.value);
  }

  return (
    <nav id="header-container" theme-value={theme}>
      <Link to={"/"}>
        <header id="home" theme-value={theme}>
          Home
        </header>
      </Link>
      <h1 theme-value={theme}>Infectious Disease Risk Predictor </h1>
      <div id="nav-items" theme-value={theme}>
        <img className="logo" src={Maplogo} onClick={handleMapView}></img>
        <img className="logo" src={scalelogo} onClick={handleCompare}></img>
        <span className="col-sm-2">
          <select
            id="diseases"
            theme-value={theme}
            onChange={handleDiseaseSelection}
          >
            <option value="">Choose Disease Type</option>
            <option value="Covid">Covid</option>
            <option value="Measles">Measles</option>
            <option value="Malaria">Malaria</option>
            <option value="Mumps">Mumps</option>
            <option value="Pneumoccal Diseases">Pneumoccal Diseases</option>
            <option value="Syphilis">Syphilis</option>
            <option value="Tuberculosis">Tuberculosis</option>
          </select>
        </span>
        <div className="switch" data-is-on={isOn} onClick={toggleSwitch}>
          <motion.div className="handle" layout transition={spring} />
        </div>
        <p theme-value={theme}>{theme} Mode</p>
      </div>
    </nav>
  );
}
