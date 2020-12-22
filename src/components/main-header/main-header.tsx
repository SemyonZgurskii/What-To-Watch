import * as React from "react";
import {Link, useLocation} from "react-router-dom";
import history from "../../history";
import {connect} from "react-redux";
import {AppRoute} from "../../constants";
import {AuthorizationStatus} from "../../reducer/user/user";
import {GlobalState, PropertiesType} from "../../types";
import {getAuthorizationStatus} from "../../reducer/user/selector";

interface Props {
  authorizationStatus: PropertiesType<typeof AuthorizationStatus>;
}

function MainHeader(props: Props) {
  const {authorizationStatus} = props;

  const location = useLocation();

  function renderLogoContent() {
    return (
      <>
        <span className="logo__letter logo__letter--1">W</span>
        <span className="logo__letter logo__letter--2">T</span>
        <span className="logo__letter logo__letter--3">W</span>
      </>
    )
  }

  function renderLogoLink(location, content) {
    if (location === AppRoute.MAIN) {
      return <a className="logo__link">{content()}</a>
    }

    return <Link to={AppRoute.MAIN} className="logo__link">{content()}</Link>
  }

  return (
    <header className="page-header movie-card__head">
      <div className="logo">
        {renderLogoLink(location.pathname, renderLogoContent)}
      </div>

      <div className="user-block">
          {authorizationStatus === AuthorizationStatus.AUTH &&
            <div className="user-block__avatar"
                 onClick={() => history.push(AppRoute.MY_LIST)}
            >
              <img src="img/avatar.jpg" alt="User avatar" width="63" height="63"/>
            </div>}
          {authorizationStatus === AuthorizationStatus.NO_AUTH &&
          <Link href="sign-in.html" className="user-block__link"
                to={AppRoute.SIGN_IN}
          >Sign in</Link>}
      </div>
    </header>
  )
}

function mapStateToProps(state: GlobalState) {
  return {
    authorizationStatus: getAuthorizationStatus(state),
  }
}

export default connect(mapStateToProps)(MainHeader);
