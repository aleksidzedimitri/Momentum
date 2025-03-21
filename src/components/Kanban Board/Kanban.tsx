import React, { useEffect, useState, useContext } from "react";
import styles from "./Kanban.module.css";
import { StoreContext } from "../../store/ContextProvider";
import SingleTask, { TaskCard } from "../tasksContent/SingleTask";

const statusToColumnTitle: Record<string, string> = {
  Todo: "დასაწყები",
  "In Progress": "პროგრესში",
  "Ready for Testing": "მზად ტესტირებისთვის",
  Done: "დასრულებული",
};

const DEFAULT_COLUMN_ORDER = [
  "დასაწყები",
  "პროგრესში",
  "მზად ტესტირებისთვის",
  "დასრულებული",
];

const headerColors: Record<string, string> = {
  დასაწყები: "#F7BC30",
  პროგრესში: "#FB5607",
  "მზად ტესტირებისთვის": "#FF006E",
  დასრულებული: "#3A86FF",
};

interface Column {
  id: string;
  title: string;
  tasks: TaskCard[];
}

const TaskBoard: React.FC = () => {
  const [boardData, setBoardData] = useState<{ columns: Column[] }>({
    columns: [],
  });
  const { statuses, tasks, fetchTasks, filters } = useContext(StoreContext);

  // Fetch tasks on component mount
  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  // Process tasks, filter, group by status, and update boardData
  useEffect(() => {
    if (!tasks.length) return;

    const filteredTasks = tasks.filter((task) => {
      return (
        (filters.departments.length === 0 ||
          filters.departments.includes(task.department.name)) &&
        (filters.priorities.length === 0 ||
          filters.priorities.includes(task.priority.name)) &&
        (filters.employeeId === null || task.employee.id === filters.employeeId)
      );
    });
    // Map through statuses to apply titles to columns
    const columns: Column[] = statuses.map((status) => ({
      id: String(status.id),
      title: statusToColumnTitle[status.name] || status.name,
      tasks: [],
    }));

    // Sort columns based on default order
    columns.sort(
      (a, b) =>
        DEFAULT_COLUMN_ORDER.indexOf(a.title) -
        DEFAULT_COLUMN_ORDER.indexOf(b.title)
    );

    // Assign each task to its corresponding column
    filteredTasks.forEach((task) => {
      const columnTitle =
        statusToColumnTitle[task.status.name] || task.status.name;
      const colIndex = columns.findIndex((col) => col.title === columnTitle);

      const taskCard: TaskCard = {
        id: String(task.id),
        name: task.name,
        description: task.description,
        priorityName: task.priority?.name || "No Priority",
        priorityIcon: task.priority?.icon,
        departmentName: task.department?.name || "No Department",
        dueDate: task.due_date,
        avatar: task.employee?.avatar || null,
        commentCount: task.total_comments || 0,
      };

      if (colIndex !== -1) {
        columns[colIndex].tasks.push(taskCard);
      } else {
        console.warn(`Unmatched status: ${task.status.name}`);
      }
    });

    setBoardData({ columns });
  }, [tasks, statuses, filters]);

  return (
    <div className={styles.board}>
      {boardData.columns.map((col) => {
        const headerColor = headerColors[col.title] || "#f7bc30";
        return (
          <div key={col.id} className={styles.column}>
            <div
              className={styles.header}
              style={{ backgroundColor: headerColor }}
            >
              <h3 className={styles.columnTitle}>{col.title}</h3>
            </div>
            <div className={styles.taskList}>
              {col.tasks.map((task) => (
                <SingleTask
                  key={task.id}
                  task={task}
                  headerColor={headerColor}
                />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default TaskBoard;
