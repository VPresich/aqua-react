// import { useTranslation } from "react-i18next";
// import { useDispatch } from "react-redux";
// import { useState } from "react";
// import { useForm } from "react-hook-form";
// import { yupResolver } from "@hookform/resolvers/yup";
// import * as Yup from "yup";
// import InputField from "../InputField/InputField";
// import PasswordField from "../PasswordField/PasswordField";
// import FormFooter from "../FormFooter/FormFooter";
// import GoogleButton from "../GoogleButton/GoogleButton";
// import { signIn } from "../../redux/user/userOps";

// import s from "./SigninForm.module.css";
// export default function SigninForm() {
//   const dispatch = useDispatch();
//   const { t } = useTranslation();
//   const [serverError, setServerError] = useState("");
//   const validationSchema = createValidationSchema(t);
//   const {
//     register,
//     handleSubmit,
//     reset,
//     formState: { errors },
//   } = useForm({
//     resolver: yupResolver(validationSchema),
//   });

//   const onSubmit = async (data) => {
//     try {
//       await dispatch(signIn(data)).unwrap();
//       reset();
//       setServerError("");
//     } catch (error) {
//       console.error("Sign in error:", error);
//       setServerError(
//         error.message ||
//           "Please check your password and account name and try again."
//       );
//     }
//   };

//   return (
//     <div className={s.SignInContainer}>
//       <form className={s.form} onSubmit={handleSubmit(onSubmit)} noValidate>
//         <h2 className={s.signInTitle}>{t("signInPage.signIn")}</h2>
//         <InputField
//           id="email"
//           label={t("signInPage.email")}
//           type="email"
//           placeholder={t("signInPage.emailPlaceholder")}
//           error={errors.email?.message}
//           register={register("email")}
//         />
//         <PasswordField
//           id="password"
//           label={t("signInPage.password")}
//           placeholder={t("signInPage.passwordPlaceholder")}
//           error={errors.password?.message}
//           register={register("password")}
//         />
//         {serverError && <p className={s.error}>{serverError}</p>}
//         <button type="submit" className={s.button}>
//           {t("signInPage.signIn")}
//         </button>
//         <GoogleButton />
//         <FormFooter
//           text={t("signInPage.dontAccount")}
//           linkText={t("signInPage.signUp")}
//           linkHref="/signup"
//         />
//         <FormFooter
//           text={t("signInPage.forgotPassword")}
//           linkText={t("signInPage.renew")}
//           linkHref="/reset-pwd"
//         />
//       </form>
//     </div>
//   );
// }

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
          </div>
        </form>
      </div>
    </FormProvider>
  );
}
