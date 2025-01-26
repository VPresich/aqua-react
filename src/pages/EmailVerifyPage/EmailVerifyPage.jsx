import DocumentTitle from "../../components/DocumentTitle";
import { Page } from "../../components/Page/Page";
import EmailVerifyForm from "../../components/EmailVerifyForm/EmailVerifyForm";
import AdvantagesSection from "../../components/AdvantagesSection/AdvantagesSection";
import css from "./EmailVerifyPage.module.css";

export default function EmailVerifyPage() {
  return (
    <>
      <Page>
        <DocumentTitle>Email Verify Page</DocumentTitle>
        <div className={css.container}>
          <EmailVerifyForm />
          <AdvantagesSection />
        </div>
      </Page>
    </>
  );
}
