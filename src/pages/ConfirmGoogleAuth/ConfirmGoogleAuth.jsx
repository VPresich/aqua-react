import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import DocumentTitle from "../../components/DocumentTitle";
import { googleLogin } from "../../redux/user/userOps";
import { errNotify, successNotify } from "../../helpers/notification";
export default function ConfirmGoogleAuth() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const code = queryParams.get("code");
    if (code) {
      dispatch(googleLogin({ code }))
        .unwrap()
        .then(() => {
          successNotify("Google login successful");
          navigate("/tracker");
        })
        .catch((error) => {
          navigate("/signin");
          errNotify("Google login failed:", error.message || error);
        });
    } else {
      navigate("/signin");
    }
  }, [dispatch, navigate]);
  return (
    <>
      <DocumentTitle>Confirm Google Auth page</DocumentTitle>
    </>
  );
}
