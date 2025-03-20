import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./SingleTask.module.css";
import {
  departmentMapping,
  departmentColors,
  priorityColors,
} from "../../utility/utility";

export interface TaskCard {
  id: string;
  name: string;
  description: string;
  priorityName: string;
  priorityIcon?: string;
  departmentName: string;
  dueDate: string;
  avatar: string | null;
  commentCount: number;
}

interface SingleTaskProps {
  task: TaskCard;
  headerColor: string;
}

const formatDepartmentName = (deptName: string): string => {
  return departmentMapping[deptName] || deptName.split(" ")[0];
};

const SingleTask: React.FC<SingleTaskProps> = ({ task, headerColor }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/tasks/${task.id}`);
  };

  const deptBgColor = departmentColors[task.departmentName] || "#000";
  const priorityColor = priorityColors[task.priorityName] || "#000";

  return (
    <div
      className={styles.taskCard}
      style={{ borderColor: headerColor }}
      onClick={handleClick}
    >
      {/*priority , department label, and date */}
      <div className={styles.taskCardHeader}>
        <div className={styles.taskCardHeaderLeft}>
          <div
            className={styles.priorityName}
            style={{ border: `0.5px solid ${priorityColor}` }}
          >
            {task.priorityIcon && (
              <img
                src={task.priorityIcon}
                alt={task.priorityName}
                className={styles.priorityIcon}
              />
            )}
            <span style={{ color: priorityColor }}>{task.priorityName}</span>
          </div>
          <span
            className={styles.departmentName}
            style={{ backgroundColor: deptBgColor }}
          >
            {formatDepartmentName(task.departmentName)}
          </span>
        </div>
        <div className={styles.taskCardDate}>
          {new Date(task.dueDate).toLocaleDateString("en-GB")}
        </div>
      </div>

      {/* Content wrapper: task name and description */}
      <div className={styles.taskCardContent}>
        <div className={styles.taskCardName}>{task.name}</div>
        <div className={styles.taskCardDescription}>
          {" "}
          {task.description.length > 100
            ? `${task.description.substring(0, 100)}...`
            : task.description}
        </div>
      </div>

      {/* Footer: avatar and comment count */}
      <div className={styles.taskCardFooter}>
        <div className={styles.taskCardFooterLeft}>
          {task.avatar ? (
            <img
              src={task.avatar}
              alt="avatar"
              className={styles.taskCardAvatar}
            />
          ) : (
            <div className={styles.taskCardAvatar} />
          )}
        </div>
        <div className={styles.taskCardCommentCount}>
          <img
            src="/assets/images/comments.svg"
            alt="comment icon"
            className={styles.taskCardCommentIcon}
          />
          <span>{task.commentCount}</span>
        </div>
      </div>
    </div>
  );
};

export default SingleTask;
