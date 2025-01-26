import { useTranslation } from "react-i18next";
import css from "./Logo.module.css";

const Logo = () => {
  const { t } = useTranslation();
  return <p className={css.logo}>{t("logo.logo")}</p>;
};

export default Logo;
