import { useForm, FormProvider, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Input from "../Input/Input";
import FormFooter from "../FormFooter/FormFooter";
import GoogleButton from "../GoogleButton/GoogleButton";
import { signupFormSchema } from "../../helpers/formsValidation/signUpFormSchema";
import { useTranslation } from "react-i18next";
import { errNotify } from "../../helpers/notification";
import css from "./SignupForm.module.css";

export default function SignupForm({ handleSignup }) {
  const { t } = useTranslation();

  const methods = useForm({
    resolver: yupResolver(signupFormSchema(t)),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const { handleSubmit } = methods;

  const onSubmit = async (values) => {
    const filteredValues = { ...values };
    delete filteredValues.confirmPassword;
    try {
      await handleSignup(filteredValues);
    } catch (error) {
      errNotify(error.message);
    }
  };

  return (
    <FormProvider {...methods}>
      <div className={css.container}>
        <form onSubmit={handleSubmit(onSubmit)} className={css.form}>
          <h2 className={CSSFontFaceRule.title}>Sign Up</h2>

          <div className={css.inputs}>
            <Controller
              name="email"
              control={methods.control}
              render={({ field }) => (
                <Input
                  {...field}
                  label={t("signUpPage.email")}
                  placeholder={t("signUpPage.emailPlaceholder")}
                  type="text"
                  autoComplete="email"
                  isLarge={true}
                />
              )}
            />
            <Controller
              name="password"
              control={methods.control}
              render={({ field }) => (
                <Input
                  {...field}
                  label={t("signUpPage.password")}
                  placeholder={t("signUpPage.passwordPlaceholder")}
                  type="password"
                  autoComplete="new-password"
                  isLarge={true}
                />
              )}
            />
            <Controller
              name="confirmPassword"
              control={methods.control}
              render={({ field }) => (
                <Input
                  {...field}
                  label={t("signUpPage.repeatPassword")}
                  placeholder={t("signUpPage.repeatPassword")}
                  type="password"
                  autoComplete="new-password"
                  isLarge={true}
                />
              )}
            />
          </div>
          <div className={css.buttons}>
            <button type="submit" className={css.button}>
              {t("signUpPage.signUp")}
            </button>
            <GoogleButton text="googleButton.googleUpBtn" />

            <FormFooter
              text={t("signUpPage.textAlready")}
              linkText={t("signUpPage.signIn")}
              linkHref="/signin"
            />
          </div>
        </form>
      </div>
    </FormProvider>
  );
}
