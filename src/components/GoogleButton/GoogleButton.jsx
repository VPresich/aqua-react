import React from "react";
import { useDispatch } from "react-redux";

import { FcGoogle } from "react-icons/fc";
import { fetchOAuthUrl } from "../../redux/user/userOps";
import css from "./GoogleButton.module.css";
import { useTranslation } from "react-i18next";

export default function GoogleButton({ text = "googleButton.googleInBtn" }) {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const googleLoginClick = () => {
    dispatch(fetchOAuthUrl())
      .unwrap()
      .then((response) => {
        if (response.data.url) window.location.assign(response.data.url);
      })
      .catch((error) => {
        console.error("Failed to fetch OAuth URL:", error.message || error);
      });
  };

  return (
    <React.Fragment>
      <button type="button" onClick={googleLoginClick} className={css.button}>
        <FcGoogle className={css.icon} />
        <span className={css.text}>{t(text)}</span>
      </button>
    </React.Fragment>
  );
}
