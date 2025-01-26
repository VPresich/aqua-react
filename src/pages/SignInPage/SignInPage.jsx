import DocumentTitle from "../../components/DocumentTitle";
import { Page } from "../../components/Page/Page";
import SigninForm from "../../components/SigninForm/SigninForm";
import AdvantagesSection from "../../components/AdvantagesSection/AdvantagesSection";
import css from "./SignInPage.module.css";

export default function SignInPage() {
  return (
    <>
      <DocumentTitle>SignIn Page</DocumentTitle>
      <Page>
        <div className={css.container}>
          <SigninForm />
          <AdvantagesSection />
        </div>
      </Page>
    </>
  );
}
