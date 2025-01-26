import * as Yup from "yup";

export const signinFormSchema = (t) =>
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

    password: Yup.string()
      .min(8, t("signInPage.passwordSpanError"))
      .max(50, t("validation.passwordLong"))
      .required(t("validation.passwordRequired")),
  });

//   export const signinFormSchema = (t) =>
//     Yup.object().shape({
//       email: Yup.string()
//         .email("Invalid email address")
//         .matches(
//           /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
//           "Email must be a valid address"
//         )
//         .min(5, "Email is too short")
//         .max(50, "Email is too long")
//         .required("Email is required"),
//       password: Yup.string()
//         .min(8, "Password is too short")
//         .max(50, "Password is too long")
//         .required("Password is required"),
//     });
