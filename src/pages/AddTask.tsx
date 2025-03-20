import NavigationLayout from "../components/layout/Layout";
import TaskForm from "../components/tasksContent/TaskForm";
import styles from "./AddTask.module.css";

export default function AddTask() {
  return (
    <NavigationLayout>
      <h1 className={styles.header}>შექმენი ახალი დავალება</h1>
      <div className={styles.taskForm}>
        <TaskForm />
      </div>
    </NavigationLayout>
  );
}
