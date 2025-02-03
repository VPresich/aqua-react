import * as Yup from "yup";

export const emailVerifyFormSchema = (t) =>
  Yup.object().shape({
    email: Yup.string()
      .email(t("signInPage.emailSpanError"))
      .matches(
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        t("validation.emailValid")
      )
      .min(5, t("validation.emailShort"))
      .max(50, t("validation.emailLong"))
      .required(t("validation.emailRequired")),
  });
