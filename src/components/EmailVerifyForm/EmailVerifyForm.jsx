import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useForm, FormProvider, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { emailVerifyFormSchema } from "../../helpers/formsValidation/emailVerivyFormSchema";
import FormFooter from "../FormFooter/FormFooter";
import Input from "../Input/Input";
import { sendResetEmail } from "../../redux/user/userOps";
import { selectUserEmail } from "../../redux/user/selectors";
import { errNotify, successNotify } from "../../helpers/notification";

import css from "./EmailVerifyForm.module.css";

export default function EmailVerifyForm() {
  const [isSendMail, setIsSendMail] = useState(false);
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();
  const userEmail = useSelector(selectUserEmail);

  const { t } = useTranslation();
  const validationSchema = emailVerifyFormSchema(t);

  const methods = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      email: userEmail || "",
    },
  });

  const { handleSubmit } = methods;

  const onSubmit = async (values) => {
    dispatch(sendResetEmail(values))
      .unwrap()
      .then(() => {
        setIsSendMail(true);
        setEmail(values.email);
        if (import.meta.env.VITE_DEVELOPED_MODE === "true") {
          successNotify("Success sending reset email");
        }
      })
      .catch((error) => {
        errNotify(`Error sending reset email ${error.message}`);
      });
  };

  return (
    <FormProvider {...methods}>
      <div className={css.container}>
        <form onSubmit={handleSubmit(onSubmit)} className={css.form}>
          <h2 className={css.title}>{t("forgotPage.title")}</h2>

          {!isSendMail ? (
            <>
              <Controller
                name="email"
                control={methods.control}
                render={({ field }) => (
                  <Input
                    {...field}
                    label={t("forgotPage.email")}
                    placeholder={t("forgotPage.emailPlaceholder")}
                    type="text"
                    autoComplete="email"
                    isLarge={true}
                  />
                )}
              />
              <div className={css.buttons}>
                <button type="submit" className={css.button}>
                  {t("forgotPage.button")}
                </button>
              </div>
            </>
          ) : (
            <>
              <h2 className={css.subTitle}>Check your email</h2>
              <p className={css.text}>
                We have sent instructions and a link to reset your password to{" "}
                <span className={css.email}>{email}</span>
              </p>
            </>
          )}

          <FormFooter
            text={t("forgotPage.textRememberOldPassword")}
            linkText={t("forgotPage.signIn")}
            linkHref="/signin"
          />
        </form>
      </div>
    </FormProvider>
  );
}
