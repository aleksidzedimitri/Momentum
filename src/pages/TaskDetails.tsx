import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import NavigationLayout from "../components/layout/Layout";
import styles from "./TaskDetails.module.css";
import {
  departmentMapping,
  departmentColors,
  priorityColors,
  departmentMappingDetails,
} from "../utility/utility";
import CustomSelect from "../components/Dropdown/CustomSelect";
import { StoreContext } from "../store/ContextProvider";
import Comments from "../components/Comment/Comments";

interface TaskDetailData {
  id: number;
  name: string;
  description: string;
  due_date: string;
  status: {
    id: number;
    name: string;
  };
  priority: {
    id: number;
    name: string;
    icon: string;
  };
  department: {
    id: number;
    name: string;
  };
  employee: {
    id: number;
    name: string;
    surname: string;
    avatar: string;
    department_id: number;
  };
  total_comments?: number;
}

export default function TaskDetail() {
  const { id } = useParams<{ id: string }>(); // Get task id from URL params
  const { statuses, fetchStatuses, fetchTasks } = useContext(StoreContext);
  const [status, setStatus] = useState<number | null>(null);
  const [task, setTask] = useState<TaskDetailData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { employees } = useContext(StoreContext);
  console.log(employees);
  const BEARER_TOKEN = "9e6bd89f-e7c3-4357-a63d-38a1d49630b4";
  const BASE_URL = "https://momentum.redberryinternship.ge/api";

  // Fetch statuses on mount
  useEffect(() => {
    fetchStatuses();
  }, [fetchStatuses]);

  // Fetch task details based on id param
  useEffect(() => {
    const fetchTask = async () => {
      try {
        const response = await fetch(`${BASE_URL}/tasks/${id}`, {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${BEARER_TOKEN}`,
          },
        });
        if (!response.ok) {
          throw new Error("Failed to fetch task details");
        }
        const data = await response.json();
        setTask(data);
        setStatus(data.status.id);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setLoading(false);
      }
    };

    fetchTask();
  }, [id]);

  // Display loading, error, or "no task" messages as needed
  if (loading) return <div>Loading task details...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!task) return <div>No task found</div>;

  // Format department name using mapping or fallback
  const formatDepartmentName = (deptName?: string): string => {
    return departmentMapping[deptName || ""] || deptName || "Unknown";
  };

  // Determine background colors based on mappings
  const deptBgColor = departmentColors[task.department?.name] || "#000";
  const priorityColor = priorityColors[task.priority.name] || "#000";

  // Prepare status options for the CustomSelect component
  const statusOptions = statuses.map((s) => ({
    value: s.id,
    label: s.name,
    avatar: s.icon,
  }));

  // Update task status via PUT request and refresh tasks
  const updateTaskStatus = async (newStatus: number | null) => {
    if (newStatus === null) return;

    try {
      const response = await fetch(`${BASE_URL}/tasks/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${BEARER_TOKEN}`,
        },
        body: JSON.stringify({ status_id: newStatus }),
      });

      if (!response.ok) {
        throw new Error("Failed to update task status");
      }

      setStatus(newStatus);
      console.log("Task status updated successfully!");

      fetchTasks();
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  return (
    <NavigationLayout>
      <div className={styles.mainContainer}>
        <div className={styles.detailsPage}>
          <div className={styles.taskHeader}>
            <div className={styles.taskHeaderContent}>
              <div className={styles.taskHeaderTop}>
                <div
                  className={styles.priorityName}
                  style={{ border: `0.5px solid ${priorityColor}` }}
                >
                  {task.priority.icon && (
                    <img
                      src={task.priority.icon}
                      alt={task.priority.name}
                      className={styles.priorityIcon}
                    />
                  )}
                  <span style={{ color: priorityColor }}>
                    {task.priority.name}
                  </span>
                </div>
                <span
                  className={styles.departmentName}
                  style={{ backgroundColor: deptBgColor }}
                >
                  {formatDepartmentName(task.department.name)}
                </span>
              </div>
              <h1 className={styles.taskTitle}>{task.name}</h1>
            </div>
            <p className={styles.taskDescription}>{task.description}</p>
          </div>

          <div className={styles.detailsWrapper}>
            <h2 className={styles.detailsHeader}>დავალების დეტალები</h2>
            <div className={styles.details}>
              <div className={styles.spanContainer}>
                <span className={styles.span}>
                  <img
                    src="/assets/images/pie-chart.svg"
                    alt="pie"
                    className={styles.icon}
                  />
                  სტატუსი
                </span>
                <div className={styles.selectWrapper}>
                  <CustomSelect
                    label=""
                    options={statusOptions}
                    value={status}
                    onChange={updateTaskStatus}
                    isSearchable={false}
                    width="259px"
                    height="45px"
                  />
                </div>
              </div>
              <div className={styles.spanContainer}>
                <span className={styles.span}>
                  <img
                    src="/assets/images/user.svg"
                    alt="pie"
                    className={styles.icon}
                  />
                  თანამშრომელი
                </span>

                <div className={styles.employeeCard}>
                  <div className={styles.employeeDepartment}>
                    {departmentMappingDetails[task.department.name] ||
                      task.department.name}
                  </div>
                  <div className={styles.avatarName}>
                    <img
                      src={task.employee.avatar}
                      alt="avatar"
                      className={styles.avatar}
                    />
                    {`${task.employee.name} ${task.employee.surname}`}
                  </div>
                </div>
              </div>
              <div className={styles.spanContainer}>
                <span className={styles.span}>
                  <img
                    src="/assets/images/calendar.svg"
                    alt="pie"
                    className={styles.icon}
                  />
                  დავალების ვადა
                </span>
                <div className={styles.date}>
                  {" "}
                  <p>{`ორშ - ${new Date(task.due_date).toLocaleDateString(
                    "en-GB"
                  )}`}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.commentSection}>
          <Comments taskId={task.id} />
        </div>
      </div>
    </NavigationLayout>
  );
}
