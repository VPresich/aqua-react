import DocumentTitle from "../../components/DocumentTitle";
import { Page } from "../../components/Page/Page";
import AdvantagesSection from "../../components/AdvantagesSection/AdvantagesSection";
import ResetPasswordForm from "../../components/ResetPasswordForm/ResetPasswordForm";
import css from "./ResetPasswordPage.module.css";

export default function ResetPasswordPage() {
  return (
    <>
      <DocumentTitle>Reset Password Page</DocumentTitle>
      <Page>
        <div className={css.container}>
          <ResetPasswordForm />
          <AdvantagesSection />
        </div>
      </Page>
    </>
  );
}
