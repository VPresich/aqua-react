// import * as Yup from "yup";

// export const signupFormSchema = () =>
//   Yup.object().shape({
//     email: Yup.string()
//       .email("Invalid email address")
//       .matches(
//         /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
//         "Email must be a valid email address"
//       )
//       .min(5, "Email is too short (minimum 5 characters)")
//       .max(50, "Email is too long (maximum 50 characters)")
//       .required("Email is required"),
//     password: Yup.string()
//       .min(8, "Password is too short (minimum 8 characters)")
//       .max(50, "Password is too long (maximum 50 characters)")
//       .matches(/[a-zA-Z]/, "Password must contain at least one letter")
//       .matches(/\d/, "Password must contain at least one number")
//       .required("Password is required"),
//     confirmPassword: Yup.string()
//       .oneOf([Yup.ref("password"), null], "Passwords must match")
//       .required("Password confirmation is required"),
//   });

import * as Yup from "yup";

export const signupFormSchema = (t) =>
  Yup.object().shape({
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
