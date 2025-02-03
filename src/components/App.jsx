import { lazy } from "react";
import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { useDispatch } from "react-redux";
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
import { RestrictedRoute } from "./RestrictedRoute";
import { PrivateRoute } from "./PrivateRoute";

import { fetchCurrentUser } from "../redux/user/userOps";
import { errNotify, successNotify } from "../helpers/notification";

export default function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCurrentUser())
      .unwrap()
      .then(() => {
        successNotify("Ok");
      })
      .catch((error) => {
        errNotify(error.message);
      });
  }, [dispatch]);

  return (
    <div>
      <Routes>
        <Route path="/" element={<SharedLayout />}>
          <Route
            index
            element={
              <RestrictedRoute redirectTo="/tracker" component={<HomePage />} />
            }
          />
          <Route
            path="/signup"
            element={
              <RestrictedRoute
                redirectTo="/tracker"
                component={<SignUpPage />}
              />
            }
          />
          <Route
            path="/signin"
            element={
              <RestrictedRoute
                redirectTo="/tracker"
                component={<SignInPage />}
              />
            }
          />
          <Route
            path="/password/reset/:token"
            element={
              <RestrictedRoute
                redirectTo="/tracker"
                component={<ResetPasswordPage />}
              />
            }
          />
          <Route
            path="/password/reset"
            element={
              <RestrictedRoute
                redirectTo="/signin"
                component={<EmailVerifyPage />}
              />
            }
          />
          <Route
            path="/tracker"
            element={
              <PrivateRoute redirectTo="/signin" component={<TrackerPage />} />
            }
          />
          <Route path="/confirm-google-auth" element={<ConfirmGoogleAuth />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </div>
  );
}
