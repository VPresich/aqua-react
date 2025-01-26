import DocumentTitle from "../../components/DocumentTitle";
import { Page } from "../../components/Page/Page";
import WelcomeSection from "../../components/WelcomeSection/WelcomeSection";
import AdvantagesSection from "../../components/AdvantagesSection/AdvantagesSection";
import css from "./HomePage.module.css";
export default function HomePage() {
  return (
    <>
      <DocumentTitle>Home Page</DocumentTitle>
      <Page>
        <div className={css.container}>
          <WelcomeSection />
          <AdvantagesSection />
        </div>
      </Page>
    </>
  );
}
