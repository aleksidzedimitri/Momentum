import { useEffect, useContext, useState } from "react";
import styles from "./Modal.module.css";
import { StoreContext } from "../../store/ContextProvider";
import { FaTrashAlt } from "react-icons/fa";
import CustomSelect, { CustomSelectItem } from "../Dropdown/CustomSelect";

const BASE_URL = "https://momentum.redberryinternship.ge/api";
const BEARER_TOKEN = "9e6bd89f-e7c3-4357-a63d-38a1d49630b4";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Modal({ isOpen, onClose }: ModalProps) {
  const { departments, fetchEmployees } = useContext(StoreContext);

  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [nameValid, setNameValid] = useState(false);
  const [surnameValid, setSurnameValid] = useState(false);
  const [imageError, setImageError] = useState<string | null>(null);

  const nameRegex = /^[\u10A0-\u10FFa-zA-Z]{2,255}$/;

  const validateName = (value: string) => {
    setNameValid(nameRegex.test(value));
  };

  const validateSurname = (value: string) => {
    setSurnameValid(nameRegex.test(value));
  };
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      if (!file.type.startsWith("image/")) {
        setImageError("ფაილი უნდა იყოს გამოსახულება.");
        return;
      } else if (file.size > 600 * 1024) {
        setImageError("სურათის ზომა არ უნდა აღემატებოდეს 600KB-ს.");
        return;
      }

      setImageError(null);
      setImageFile(file);
      setProfileImage(URL.createObjectURL(file));
    }
  };

  const removeImage = () => {
    setProfileImage(null);
    setImageFile(null);
    setImageError(null);
  };

  const isFormValid =
    nameValid &&
    surnameValid &&
    name.trim() !== "" &&
    surname.trim() !== "" &&
    selectedDepartment !== "" &&
    imageFile !== null &&
    !imageError;

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };
    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
    }
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.SyntheticEvent<EventTarget>) => {
    e.preventDefault();
    if (!isFormValid) return;

    setLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append("name", name);
    formData.append("surname", surname);
    formData.append("avatar", imageFile as Blob);
    formData.append("department_id", selectedDepartment);

    try {
      const response = await fetch(`${BASE_URL}/employees`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${BEARER_TOKEN}`,
          Accept: "application/json",
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to create employee");
      }

      fetchEmployees();

      onClose();
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "შეცდომა მოხდა. სცადეთ თავიდან."
      );
    } finally {
      setLoading(false);
    }
  };
  const departmentOptions: CustomSelectItem[] = departments.map(
    (department) => ({
      value: department.id,
      label: department.name,
    })
  );
  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeButton} onClick={onClose}>
          ✖
        </button>
        <h2>თანამშრომლის დამატება</h2>

        <div className={styles.formContainer}>
          {/* Full Name Inputs */}
          <div className={styles.fullName}>
            <div>
              <label htmlFor="name">სახელი*</label>
              <input
                type="text"
                name="name"
                className={styles.input}
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  validateName(e.target.value);
                }}
                required
              />
              <p className={nameValid ? styles.valid : styles.invalid}>
                მინიმუმ 2 სიმბოლო
              </p>
              <p className={nameValid ? styles.valid : styles.invalid}>
                მაქსიმუმ 255 სიმბოლო
              </p>
            </div>
            <div>
              <label htmlFor="surname">გვარი*</label>
              <input
                type="text"
                name="surname"
                className={styles.input}
                value={surname}
                onChange={(e) => {
                  setSurname(e.target.value);
                  validateSurname(e.target.value);
                }}
                required
              />
              <p className={surnameValid ? styles.valid : styles.invalid}>
                მინიმუმ 2 სიმბოლო
              </p>
              <p className={surnameValid ? styles.valid : styles.invalid}>
                მაქსიმუმ 255 სიმბოლო
              </p>
            </div>
          </div>

          {/* Profile Image Upload */}
          <div className={styles.avatar}>
            <label htmlFor="avatar">ავატარი*</label>
            {profileImage ? (
              <div className={styles.imagePreview}>
                <img src={profileImage} alt="Uploaded Preview" />
                <button className={styles.deleteButton} onClick={removeImage}>
                  <FaTrashAlt />
                </button>
              </div>
            ) : (
              <label className={styles.imageUpload}>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className={styles.imageInput}
                />
              </label>
            )}
            {imageError && <p className={styles.errorMessage}>{imageError}</p>}
          </div>

          {/* Department Select */}
          <div className={styles.department}>
            <CustomSelect
              label="დეპარტამენტი*"
              options={departmentOptions}
              value={selectedDepartment ? Number(selectedDepartment) : null}
              onChange={(val) => setSelectedDepartment(val?.toString() ?? "")}
              isSearchable={false}
              width="384px"
              height="42x"
            />
          </div>
        </div>
        {error && <p className={styles.errorMessage}>{error}</p>}
        {/* Buttons */}
        <div className={styles.buttonContainer}>
          <button
            className={styles.cancelButton}
            onClick={onClose}
            disabled={loading}
          >
            გაუქმება
          </button>
          <button
            className={styles.submitButton}
            onClick={handleSubmit}
            disabled={!isFormValid || loading}
          >
            {loading ? "იტვირთება..." : "დაამატე თანამშრომელი"}
          </button>
        </div>
      </div>
    </div>
  );
}
