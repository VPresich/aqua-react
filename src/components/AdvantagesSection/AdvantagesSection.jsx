import css from "./AdvantagesSection.module.css";
import Customers from "../Customers/Customers.jsx";
import { useTranslation } from "react-i18next";

const AdvantagesSection = () => {
  const { t } = useTranslation();
  return (
    <div className={css.section}>
      <div className={css.userCount}>
        <Customers />
      </div>

      <div className={css.group}>
        <ul className={css.list}>
          <li className={css.habit}>
            <div className={css.ellipse}></div>
            <p className={css.habit_1}>{t("advantagesSection.habit")}</p>
          </li>
          <li className={css.habit}>
            <p className={css.habit_2}>{t("advantagesSection.statistics")}</p>
          </li>
          <li className={css.habit}>
            <p className={css.habit_3}>{t("advantagesSection.setting")}</p>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default AdvantagesSection;
