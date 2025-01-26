import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import css from "./WelcomeSection.module.css";

const WelcomeSection = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleTryTrackerClick = () => {
    navigate("/signup");
  };

  const handleSignInClick = () => {
    navigate("/signin");
  };

  return (
    <div className={css.section}>
      <div className={css.container}>
        <p className={css.subtitle}>{t("welcomeSection.mainText")}</p>
        <h1 className={css.title}>{t("welcomeSection.title")}</h1>
        <div className={css.buttons}>
          <button className={css.tryTracker} onClick={handleTryTrackerClick}>
            {t("welcomeSection.tryTracker")}
          </button>
          <button className={css.signIn} onClick={handleSignInClick}>
            {t("welcomeSection.signIn")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default WelcomeSection;
