import { useForm, FormProvider, Controller } from "react-hook-form";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import Input from "../Input/Input";
import FormFooter from "../FormFooter/FormFooter";
import { resetPasswordFormSchema } from "../../helpers/formsValidation/resetPasswordFormSchema,js";
import { useTranslation } from "react-i18next";
import { errNotify, successNotify } from "../../helpers/notification";
import { useDispatch } from "react-redux";
import { resetPassword } from "../../redux/user/userOps.js";
import css from "./ResetPasswordForm.module.css";

export default function ResetPasswordForm() {
  const [isPwdChanged, setIsPwdChanged] = useState(false);
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { token } = useParams();
  const methods = useForm({
    resolver: yupResolver(resetPasswordFormSchema(t)),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const { handleSubmit, reset } = methods;

  const onSubmit = async (data) => {
    dispatch(
      resetPassword({
        password: data.password,
        token,
      })
    )
      .unwrap()
      .then(() => {
        reset();
        if (import.meta.env.VITE_DEVELOPED_MODE === "true") {
          successNotify("Password reset successful.");
        }
        setIsPwdChanged(true);
      })
      .catch(() => {
        errNotify("Failed password changed");
      });
  };

  return (
    <FormProvider {...methods}>
      <div className={css.container}>
        <form onSubmit={handleSubmit(onSubmit)} className={css.form}>
          <h2 className={css.title}>{t("resetPage.title")}</h2>
          {isPwdChanged ? (
            <h2 className={css.subTitle}>{t("resetPage.successMessage")}</h2>
          ) : (
            <>
              <Controller
                name="password"
                control={methods.control}
                render={({ field }) => (
                  <Input
                    {...field}
                    label={t("resetPage.password")}
                    placeholder={t("resetPage.passwordPlaceholder")}
                    type="password"
                    autoComplete="new-password"
                    isLarge
                  />
                )}
              />
              <Controller
                name="confirmPassword"
                control={methods.control}
                render={({ field }) => (
                  <Input
                    {...field}
                    label={t("resetPage.repeatPassword")}
                    placeholder={t("resetPage.repeatPasswordPlaceholder")}
                    type="password"
                    autoComplete="new-password"
                    isLarge
                  />
                )}
              />
              <div className={css.buttons}>
                <button type="submit" className={css.button}>
                  {t("resetPage.button")}
                </button>
              </div>
            </>
          )}
          <FormFooter
            text={
              isPwdChanged
                ? t("resetPage.textGotoSingin")
                : t("resetPage.textRememberOldPassword")
            }
            linkText={t("resetPage.signIn")}
            linkHref="/signin"
          />
        </form>
      </div>
    </FormProvider>
  );
}
