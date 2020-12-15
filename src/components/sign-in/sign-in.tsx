import * as React from "react";
import { Link } from "react-router-dom";
import { AppRoute } from "../../constants";
import {createRef} from "react";

interface Props {
  login: ({email, password}: {email: string, password: string}) => void,
}

function SignIn(props: Props) {
  const {login} = props;

  const email = createRef<HTMLInputElement>();
  const password = createRef<HTMLInputElement>();

  function handleSubmit(evt) {
    evt.preventDefault();

    console.log("yoyo", {
      email: email.current.value,
      password: password.current.value,
    });
    login({
      email: email.current.value,
      password: password.current.value,
    });
  }

  return (
    <div className="user-page">
      <header className="page-header user-page__head">
        <div className="logo">
          <Link href="main.html" className="logo__link"
                to={AppRoute.MAIN}
          >
            <span className="logo__letter logo__letter--1">W</span>
            <span className="logo__letter logo__letter--2">T</span>
            <span className="logo__letter logo__letter--3">W</span>
          </Link>
        </div>

        <h1 className="page-title user-page__title">Sign in</h1>
      </header>

      <div className="sign-in user-page__content">
        <form action="#" className="sign-in__form"
              onSubmit={handleSubmit}
        >
          <div className="sign-in__fields">
            <div className="sign-in__field">
              <input className="sign-in__input" type="email" placeholder="Email address" name="user-email" id="user-email"
                     ref={email}
              />
              <label className="sign-in__label visually-hidden" htmlFor="user-email">Email address</label>
            </div>
            <div className="sign-in__field">
              <input className="sign-in__input" type="password" placeholder="Password" name="user-password" id="user-password"
                     ref={password}
              />
              <label className="sign-in__label visually-hidden" htmlFor="user-password">Password</label>
            </div>
          </div>
          <div className="sign-in__submit">
            <button className="sign-in__btn" type="submit"

            >Sign in</button>
          </div>
        </form>
      </div>

      <footer className="page-footer">
        <div className="logo">
          <Link href="main.html" className="logo__link logo__link--light"
                to={AppRoute.MAIN}
          >
            <span className="logo__letter logo__letter--1">W</span>
            <span className="logo__letter logo__letter--2">T</span>
            <span className="logo__letter logo__letter--3">W</span>
          </Link>
        </div>

        <div className="copyright">
          <p>© 2019 What to watch Ltd.</p>
        </div>
      </footer>
    </div>
  )
}

export default SignIn;
