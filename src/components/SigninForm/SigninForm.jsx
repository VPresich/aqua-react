import { useForm, FormProvider, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Input from "../Input/Input";
import FormFooter from "../FormFooter/FormFooter";
import GoogleButton from "../GoogleButton/GoogleButton";
import { signinFormSchema } from "../../helpers/formsValidation/siginFormSchema";
import { useTranslation } from "react-i18next";
import { errNotify } from "../../helpers/notification";
import css from "./SigninForm.module.css";

export default function SigninForm({ handleSignin }) {
  const { t } = useTranslation();

  const methods = useForm({
    resolver: yupResolver(signinFormSchema(t)),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { handleSubmit } = methods;

  const onSubmit = async (values) => {
    try {
      await handleSignin(values);
    } catch (error) {
      errNotify(error.message);
    }
  };

  return (
    <FormProvider {...methods}>
      <div className={css.container}>
        <form onSubmit={handleSubmit(onSubmit)} className={css.form}>
          <h2 className={CSSFontFaceRule.title}>{t("signInPage.signIn")}</h2>

          <div className={css.inputs}>
            <Controller
              name="email"
              control={methods.control}
              render={({ field }) => (
                <Input
                  {...field}
                  label={t("signInPage.email")}
                  placeholder={t("signInPage.emailPlaceholder")}
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
                  label={t("signInPage.password")}
                  placeholder={t("signInPage.passwordPlaceholder")}
                  type="password"
                  autoComplete="new-password"
                  isLarge={true}
                />
              )}
            />
          </div>
          <div className={css.buttons}>
            <button type="submit" className={css.button}>
              {t("signInPage.signIn")}
            </button>
            <GoogleButton text={t("googleButton.googleInBtn")} />

            <FormFooter
              text={t("signInPage.dontAccount")}
              linkText={t("signInPage.signUp")}
              linkHref="/signup"
            />
            <FormFooter
              text={t("signInPage.forgotPassword")}
              linkText={t("signInPage.reset")}
              linkHref="/password/reset"
            />
          </div>
        </form>
      </div>
    </FormProvider>
  );
}
