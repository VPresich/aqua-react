import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import Calendar from "../Calendar/Calendar";
import CalendarPagination from "../CalendarPagination/CalendarPagination";
import { selectCalendarMonth } from "../../redux/water/selectors";
import { getMonthWater } from "../../redux/water/waterOps";
import { errNotify, successNotify } from "../../helpers/notification";
import sprite from "../../assets/icons/sprite.svg";
import { setCalendarMonth } from "../../redux/water/waterSlice";
import { Chart } from "../Chart/Chart";
import css from "./MonthInfo.module.css";

const MonthInfo = () => {
  const currentMonth = useSelector(selectCalendarMonth);
  console.log("Current", currentMonth);
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const handleMonthChange = (newDate) => {
    dispatch(setCalendarMonth(new Date(newDate).toISOString()));
  };

  useEffect(() => {
    dispatch(getMonthWater(currentMonth))
      .unwrap()
      .then((data) => {
        console.log("dataMonth", data);
        successNotify(t("toast.fetchMonthDataSuccess"));
      })
      .catch((error) => {
        errNotify(t("toast.fetchMonthDataError"), { message: error.message });
      });
  }, [dispatch, currentMonth, t]);

  const [isActive, setIsActive] = useState(true);
  const handleToggle = () => {
    setIsActive(!isActive);
  };
  return (
    <div className={css.monthInfoSection}>
      <div className={css.monthPaginationBox}>
        {isActive ? (
          <h3 className={css.monthTitle}>{t("monthInfo.mouth")}</h3>
        ) : (
          <h3 className={css.monthTitle}>{t("monthInfo.statistics")}</h3>
        )}
        <div className={css.paginationWrapper}>
          <CalendarPagination onMonthChange={handleMonthChange} />
          <button className={css.iconStatistics} onClick={handleToggle}>
            <svg width={20} height={20}>
              <use xlinkHref={`${sprite}#icon-pie-chart-statistics`} />
            </svg>
          </button>
        </div>
      </div>
      {isActive ? <Calendar currentMonth={currentMonth} /> : <Chart />}
    </div>
  );
};

export default MonthInfo;
