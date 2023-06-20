import { Fragment, useState } from "react";

import BurgerMenu from "./burger-menu";

import "./Navigation.scss";

const Navigation = () => {
  const [isActive, setIsActive] = useState(false);

  const handleToggleNavigation = () => {
    setIsActive((prevStatus) => !prevStatus);
  };

  return (
    <Fragment>
      <BurgerMenu onClick={handleToggleNavigation} />
      <nav
        onClick={handleToggleNavigation}
        className={`navigation ${isActive ? "navigation--active" : ""}`}
      >
        <ul className="navigation__list">
          <li className="navigation__item">
            <a>About.me</a>
          </li>
          <li className="navigation__item">
            <a>Project.file</a>
          </li>
          <li className="navigation__item">
            <a>Journal.dev</a>
          </li>
        </ul>
      </nav>
    </Fragment>
  );
};

export default Navigation;