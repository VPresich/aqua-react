import DocumentTitle from "../../components/DocumentTitle";
import { Page } from "../../components/Page/Page";
import WaterMainInfo from "../../components/WaterMainInfo/WaterMainInfo";
import WaterDetailedInfo from "../../components/WaterDetailedInfo/WaterDetailedInfo";
import css from "./TrackerPage.module.css";

export default function TrackerPage() {
  return (
    <>
      <DocumentTitle>Aqua Tracker Page</DocumentTitle>
      <Page>
        <div className={css.container}>
          <WaterMainInfo />
          <WaterDetailedInfo />
        </div>
      </Page>
    </>
  );
}
