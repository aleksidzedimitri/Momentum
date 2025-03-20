import { useState } from "react";
import styles from "./Navbar.module.css";
import Modal from "../Modal/Modal";
import { Link } from "react-router";

export default function Navbar() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className={styles.navbar}>
      <Link to="/">
        <span className={styles.logoSpan}>
          Momentum
          <img
            src="/assets/images/Hourglass.png"
            alt="logo"
            className={styles.logo}
          />
        </span>
      </Link>

      <div className={styles.buttons}>
        <button
          className={styles.createButton}
          onClick={() => setIsModalOpen(true)}
        >
          თანამშრომლის შექმნა
        </button>
        <Link to="/add-task">
          {" "}
          <button className={styles.addButton}>+ შექმენი ახალი დავალება</button>
        </Link>
      </div>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}
