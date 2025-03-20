import styles from "./TaskContent.module.css";

export default function TaskContent() {
  return (
    <div className={styles.mainContainer}>
      <div className={styles.contentContainer}>
        <h1 className={styles.h1}></h1>
      </div>
      <div className={styles.contentContainer}></div>
      <div className={styles.contentContainer}></div>
      <div className={styles.contentContainer}></div>
    </div>
  );
}
