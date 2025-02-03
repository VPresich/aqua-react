import { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import clsx from "clsx";
import {
  selectIsLoggedIn,
  selectUserName,
  selectUserAvatarURL,
} from "../../redux/user/selectors";
import { errNotify, successNotify } from "../../helpers/notification";
import {
  updateUser,
  signOut,
  fetchCurrentUser,
} from "../../redux/user/userOps";
import iconsPath from "../../assets/icons/sprite.svg";
import UserIconElem from "../UserIconElem/UserIconElem";
import UserImageElem from "../UserImageElem/UserImageElem";
import Modal from "../Modal/Modal";
import UserSettingsForm from "../UserSettingsForm/UserSettingsForm";
import LogoutApprove from "../LogoutApprove/LogoutApprove";
import { useTranslation } from "react-i18next";
import css from "./UserBar.module.css";

const truncateName = (name) => {
  if (!name) return "";
  return name?.length > 10 ? `${name.slice(0, 10)}...` : name;
};

export default function UserBar() {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const userName = useSelector(selectUserName);
  const userAvatarURL = useSelector(selectUserAvatarURL);
  const { t } = useTranslation();

  const [showPopover, setShowPopover] = useState(false);
  const [showUserForm, setShowUserForm] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const popoverRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popoverRef.current && !popoverRef.current.contains(event.target)) {
        setShowPopover(false);
      }
    };

    if (showPopover) {
      document.addEventListener("click", handleClickOutside);
    } else {
      document.removeEventListener("click", handleClickOutside);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [showPopover]);

  if (!isLoggedIn) return null;

  const togglePopover = (event) => {
    event.stopPropagation();
    setShowPopover((prev) => !prev);
  };

  const handleSettingsButton = () => {
    if (isLoggedIn) {
      dispatch(fetchCurrentUser())
        .unwrap()
        .then(() => {
          successNotify(t("toast.fetchUserSuccess"));
          setShowPopover(false);
          setShowUserForm(true);
        })
        .catch(() => {
          errNotify(t("toast.fetchUserError"));
        });
    }
  };

  const handleUserForm = (data) => {
    console.log("data", data);

    dispatch(updateUser(data))
      .unwrap()
      .then(() => {
        successNotify("toast.settingsUpdateSuccess");
        setShowUserForm(false);
      })
      .catch(() => {
        errNotify("toast.settingsUpdateError");
      });
  };

  const handleLogoutButton = () => {
    setShowPopover(false);
    setShowLogoutModal(true);
  };

  const handleLogoutApprove = () => {
    dispatch(signOut())
      .unwrap()
      .then(() => {
        successNotify("toast.logoutSuccess");
      })
      .catch(() => {
        errNotify("toast.logoutError");
      })
      .finally(() => {
        setShowLogoutModal(false);
      });
  };

  return (
    <div className={css.userBarContainer}>
      <button
        className={clsx(css.userBarBtn, showPopover && css.open)}
        onClick={togglePopover}
      >
        <span className={css.contentBtn}>
          <span className={css.userName}>{truncateName(userName)}</span>
          {userAvatarURL ? (
            <UserImageElem
              imgUrl={userAvatarURL}
              altText={userName}
              isSmall={true}
            />
          ) : (
            <UserIconElem isSmall={true} />
          )}
          <span className={css.iconChevronContainer}>
            <svg className={css.iconChevron}>
              <use href={`${iconsPath}#icon-chevron-down`} />
            </svg>
          </span>
        </span>
      </button>

      {showPopover && (
        <div ref={popoverRef} className={css.popover}>
          <button
            onClick={handleSettingsButton}
            className={clsx(css.popoverItem, showUserForm && css.active)}
          >
            <svg className={css.icon} width="16" height="16">
              <use href={`${iconsPath}#icon-settings`} />
            </svg>
            <span>{t("Userbar.setting")}</span>
          </button>
          <button
            onClick={handleLogoutButton}
            className={clsx(css.popoverItem, showLogoutModal && css.active)}
          >
            <svg className={css.icon}>
              <use href={`${iconsPath}#icon-log-out`} />
            </svg>
            <span>{t("Userbar.logOut")}</span>
          </button>
        </div>
      )}

      {showUserForm && (
        <Modal
          onClose={() => setShowUserForm(false)}
          isUserForm={true}
          className={css.modal}
        >
          <UserSettingsForm handleUserSave={handleUserForm} />
        </Modal>
      )}
      {showLogoutModal && (
        <Modal onClose={() => setShowLogoutModal(false)}>
          <LogoutApprove
            onCancel={() => setShowLogoutModal(false)}
            onApprove={handleLogoutApprove}
          />
        </Modal>
      )}
    </div>
  );
}
