import DocumentTitle from "../../components/DocumentTitle";
import { Page } from "../../components/Page/Page";
import SignupForm from "../../components/SignupForm/SignupForm";
import AdvantagesSection from "../../components/AdvantagesSection/AdvantagesSection";
import css from "./SignUpPage.module.css";

export default function SignUpPage() {
  return (
    <>
      <DocumentTitle>SignUp Page</DocumentTitle>
      <Page>
        <div className={css.container}>
          <SignupForm />
          <AdvantagesSection />
        </div>
      </Page>
    </>
  );
}
