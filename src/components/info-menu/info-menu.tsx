import * as React from "react";

const ACTIVE_CLASS = "movie-nav__item--active";

interface Props {
  onMenuItemClick: (name: string) => void,
  menuNames: string[],
  activeItemName: string,
}

function InfoMenu(props: Props) {
  const {menuNames, onMenuItemClick, activeItemName} = props;

  return (
    <nav className="movie-nav movie-card__nav">
      <ul className="movie-nav__list">
        {menuNames.map((name) => {
          return (
            <li className={`movie-nav__item ${activeItemName === name ? ACTIVE_CLASS : ""}`}
                key={name}
            >
              <a href="#" className="movie-nav__link"
                 onClick={(evt) => {
                   evt.preventDefault();
                   onMenuItemClick(name);
                 }}
              >{name}</a>
            </li>
          )
        })}
      </ul>
    </nav>
  );
}

export default InfoMenu;
