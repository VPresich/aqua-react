import * as Yup from "yup";

export const signupFormSchema = (t) =>
  Yup.object({
    email: Yup.string()
      .email(t("signUpPage.emailSpanError"))
      .matches(
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        t("validation.emailValid")
      )
      .min(5, t("validation.emailShort"))
      .max(50, t("validation.emailLong"))
      .required(t("validation.emailRequired")),

    password: Yup.string()
      .min(8, t("signUpPage.passwordSpanError"))
      .max(50, t("validation.passwordLong"))
      .matches(/[a-zA-Z]/, t("validation.passwordContainsLetter"))
      .matches(/\d/, t("validation.passwordContainsNumber"))
      .required(t("validation.passwordRequired")),

    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], t("validation.passwordMatch"))
      .required(t("validation.passwordRepeat")),
  });
