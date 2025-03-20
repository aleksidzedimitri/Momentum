import KanbanBoard from "../components/Kanban Board/Kanban";
import NavigationLayout from "../components/layout/Layout";
import TaskFilter from "../components/taskFilter/TaskFilter";
import styles from "./TaskPage.module.css";
// import { useStatusesServiceGetStatuses } from "../../openapi/queries";

export default function Taskpage() {
  // const { data } = useStatusesServiceGetStatuses({
  //   accept: "application/json",
  // });
  // console.log(data);

  return (
    <>
      <NavigationLayout>
        <div className={styles.content}>
          <h1 className={styles.h1}>დავალებების გვერდი</h1>
          <TaskFilter />
          <KanbanBoard/>
        </div>
      </NavigationLayout>
      ;
    </>
  );
}
