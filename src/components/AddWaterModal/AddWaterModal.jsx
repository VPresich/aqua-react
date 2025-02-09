import Modal from "../Modal/Modal";
import { useDispatch, useSelector } from "react-redux";
import { selectWaterDate } from "../../redux/water/selectors";
import { WaterModal } from "../WaterModal/WaterModal";
import { replaceTimeInDate } from "../../helpers/replaceTimeInDate";
import { addWater } from "../../redux/water/waterOps";
import { errNotify, successNotify } from "../../helpers/notification";
import { useTranslation } from "react-i18next";

export default function AddWaterModal({ onClose }) {
  const dispatch = useDispatch();
  const currentDate = useSelector(selectWaterDate);
  const { t } = useTranslation();

  const onSubmitForm = (values) => {
    const date = replaceTimeInDate(currentDate, values.time);
    dispatch(addWater({ date, volume: values.inputField }))
      .unwrap()
      .then(() => {
        if (import.meta.env.VITE_DEVELOPED_MODE === "true") {
          successNotify(t("toast.addWaterSuccess"));
        }
        onClose();
      })
      .catch(() => {
        console.log = () => {};
        errNotify(t("toast.addWaterError"));
      });
  };

  return (
    <div>
      <Modal onClose={onClose}>
        <WaterModal
          title={t("modals.addEdit.btn")}
          subtitle={t("modals.addEdit.choose")}
          onSave={onSubmitForm}
        />
      </Modal>
    </div>
  );
}
