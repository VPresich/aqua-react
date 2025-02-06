import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import DocumentTitle from "../../components/DocumentTitle";
import { Page } from "../../components/Page/Page";
import SignupForm from "../../components/SignupForm/SignupForm";
import { signUp, signIn } from "../../redux/user/userOps";
import { errNotify, successNotify } from "../../helpers/notification";
import AdvantagesSection from "../../components/AdvantagesSection/AdvantagesSection";
import css from "./SignUpPage.module.css";

export default function SignUpPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSignup = async (values) => {
    try {
      await dispatch(signUp(values)).unwrap();
      successNotify("Registration is successful!");
      try {
        await dispatch(signIn(values)).unwrap();
        successNotify("Sign in successful!");
        navigate("/tracker");
      } catch (error) {
        errNotify("Sign in failed. Please try again." + error?.message);
        navigate("/signin");
      }
    } catch (error) {
      errNotify("Sign up failed. Please try again.");
      throw new Error("Registration failed: " + error?.message);
    }
  };

  return (
    <>
      <DocumentTitle>SignUp Page</DocumentTitle>
      <Page>
        <div className={css.container}>
          <SignupForm handleSignup={handleSignup} />
          <AdvantagesSection />
        </div>
      </Page>
    </>
  );
}
