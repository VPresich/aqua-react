import { lazy } from "react";
import { Route, Routes } from "react-router-dom";
import { SharedLayout } from "./SharedLayout/SharedLayout";
const HomePage = lazy(() => import("../pages/HomePage/HomePage"));
const SignInPage = lazy(() => import("../pages/SignInPage/SignInPage"));
const EmailVerifyPage = lazy(() =>
  import("../pages/EmailVerifyPage/EmailVerifyPage")
);
const SignUpPage = lazy(() => import("../pages/SignUpPage/SignUpPage"));
const TrackerPage = lazy(() => import("../pages/TrackerPage/TrackerPage"));
const NotFoundPage = lazy(() => import("../pages/NotFoundPage/NotFoundPage"));
const ResetPasswordPage = lazy(() =>
  import("../pages/ResetPasswordPage/ResetPasswordPage")
);
const ConfirmGoogleAuth = lazy(() =>
  import("../pages/ConfirmGoogleAuth/ConfirmGoogleAuth")
);

export default function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<SharedLayout />}>
          <Route index element={<HomePage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/verify/:verifyToken" element={<EmailVerifyPage />} />
          <Route path="/signin" element={<SignInPage />} />
          <Route path="/tracker" element={<TrackerPage />} />
          <Route path="/reset-pwd" element={<ResetPasswordPage />} />
          <Route path="/confirm-google-auth" element={<ConfirmGoogleAuth />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </div>
  );
}
