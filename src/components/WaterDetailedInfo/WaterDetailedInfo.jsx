import DailyInfo from "../DailyInfo/DailyInfo";
import MonthInfo from "../MonthInfo/MonthInfo";
import UserPanel from "../UserPanel/UserPanel";
import css from "./WaterDetailedInfo.module.css";

const WaterDetailedInfo = () => {
  return (
    <div className={css.section}>
      <div className={css.container}>
        <UserPanel />
        <DailyInfo />
        <MonthInfo />
      </div>
    </div>
  );
};
export default WaterDetailedInfo;
