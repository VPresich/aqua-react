import { useSelector } from "react-redux";
import { selectCurrentDay } from "../../redux/water/selectors";
import WaterCardList from "../WarterCardList/WaterCardList";
import CreateWaterBtn from "../CreateWaterBtn/CreateWarterBtn";
import { useTranslation } from "react-i18next";
import css from "./DailyInfo.module.css";

const DailyInfo = () => {
  const currentDay = useSelector(selectCurrentDay);
  const { t } = useTranslation();
  const [day, month] = currentDay?.split(" ") || [];
  const translatedMonth = month ? t(`ChooseDate.${month.toLowerCase()}`) : "";

  const displayDay =
    currentDay === "Today"
      ? t("ChooseDate.today")
      : currentDay && day && translatedMonth
      ? `${day} ${translatedMonth}`
      : "";

  return (
    <div className={css.container}>
      <div className={css.dayContainer}>
        <p className={css.day}>{displayDay}</p>
        <div>
          <CreateWaterBtn />
        </div>
      </div>
      <WaterCardList />
    </div>
  );
};

export default DailyInfo;
