import { useSelector, useDispatch } from "react-redux";
import { setWaterDate, setCalendarMonth } from "../../redux/water/waterSlice";
import { selectCalendarMonth } from "../../redux/water/selectors";
import { isToday } from "../../helpers/isToday";
import { isActiveDate } from "../../helpers/isActiveDate";
import { normalizeDate } from "../../helpers/normalizeDate";
import css from "./CalendarItem.module.css";

const CalendarItem = ({ availability = 0, day, currentDate }) => {
  const dispatch = useDispatch();
  const calrndarDate = useSelector(selectCalendarMonth);
  const isActive = isActiveDate(currentDate, calrndarDate);

  const normalizedAvailability = Math.min(Math.round(availability), 100);
  const isFutureDate = normalizeDate(currentDate) > normalizeDate(new Date());

  const handleClick = () => {
    const date = new Date(currentDate);
    const dateISO = date.toISOString();
    dispatch(setWaterDate(dateISO));
    dispatch(setCalendarMonth(dateISO));
  };

  const buttonStyle = {
    backgroundColor: isActive
      ? "var(--color-darkblue)"
      : normalizedAvailability === 100
      ? "var(--color-white)"
      : "var(--color-darkblue-translucent)",

    color: isActive
      ? "var(--color-lightgreen)"
      : normalizedAvailability === 100
      ? "var(--color-black)"
      : "var(--color-black)",

    border: isToday(currentDate)
      ? "2px solid var(--color-border-today)"
      : "none",
  };

  return (
    <div className={css.itemBox}>
      <button
        onClick={handleClick}
        className={css.buttonDay}
        style={buttonStyle}
        disabled={isFutureDate}
      >
        {day}
      </button>
      <span className={css.infoText}>{normalizedAvailability}%</span>
    </div>
  );
};

export default CalendarItem;
