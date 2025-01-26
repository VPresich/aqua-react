import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { getUsersCount } from "../../redux/user/userOps.js";
import { selectUsersCount } from "../../redux/user/selectors.js";
import photo1 from "../../assets/images/first_user.webp";
import photo2 from "../../assets/images/second_user.webp";
import photo3 from "../../assets/images/third_user.webp";
import styles from "./Customers.module.css";

const Customers = () => {
  const usersCounter = useSelector(selectUsersCount);
  const dispatch = useDispatch();
  const { t } = useTranslation();

  useEffect(() => {
    if (usersCounter === null) {
      dispatch(getUsersCount());
    }
  }, [dispatch, usersCounter]);

  return (
    <>
      <ul className={styles.userCountList}>
        <li className={styles.userCountItem}>
          <img src={photo1} alt="user" />
        </li>
        <li className={styles.userCountItem}>
          <img src={photo2} alt="user" />
        </li>
        <li className={styles.userCountItem}>
          <img src={photo3} alt="user" />
        </li>
      </ul>
      <div className={styles.numberCustomers}>+{usersCounter}</div>

      <p className={styles.userCountText}>
        {t("advantagesSection.our")}
        <span className={styles.userTextColor}>
          {t("advantagesSection.happy")}
        </span>
        {t("advantagesSection.customers")}
      </p>
    </>
  );
};

export default Customers;
