import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import DocumentTitle from "../../components/DocumentTitle";
import { Page } from "../../components/Page/Page";
import SigninForm from "../../components/SigninForm/SigninForm";
import AdvantagesSection from "../../components/AdvantagesSection/AdvantagesSection";
import { signIn } from "../../redux/user/userOps";
import { errNotify, successNotify } from "../../helpers/notification";
import css from "./SignInPage.module.css";

export default function SignInPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSignin = async (values) => {
    try {
      await dispatch(signIn(values)).unwrap();
      if (import.meta.env.VITE_DEVELOPED_MODE === "true") {
        successNotify("Sign in is successful!");
      }
      navigate("/tracker");
    } catch (error) {
      errNotify("Sign in failed. Please try again.");
      throw new Error("Sign in failed: " + error.message);
    }
  };

  return (
    <>
      <DocumentTitle>SignIn Page</DocumentTitle>
      <Page>
        <div className={css.container}>
          <SigninForm handleSignin={handleSignin} />
          <AdvantagesSection />
        </div>
      </Page>
    </>
  );
}
