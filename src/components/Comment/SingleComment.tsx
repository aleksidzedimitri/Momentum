import React, { useState } from "react";
import styles from "./SingleComment.module.css";

const BASE_URL = "https://momentum.redberryinternship.ge/api";
const BEARER_TOKEN = "9e6bd89f-e7c3-4357-a63d-38a1d49630b4";

interface CommentProps {
  comment: {
    id: number;
    text: string;
    task_id: number;
    parent_id: number | null;
    author_avatar: string;
    author_nickname: string;
    sub_comments?: CommentProps["comment"][];
  };
  taskId: number;
}

const SingleComment: React.FC<CommentProps> = ({ comment, taskId }) => {
  const [reply, setReply] = useState("");
  const [showReplyInput, setShowReplyInput] = useState(false);
  const [loading, setLoading] = useState(false);
  const [subComments, setSubComments] = useState<CommentProps["comment"][]>(
    comment.sub_comments || []
  );

  const handleReplySubmit = async () => {
    if (reply.trim() === "") return;

    setLoading(true);
    try {
      const response = await fetch(`${BASE_URL}/tasks/${taskId}/comments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${BEARER_TOKEN}`,
        },
        body: JSON.stringify({
          text: reply,
          task_id: taskId,
          parent_id: comment.id,
        }),
      });

      if (!response.ok) throw new Error("Failed to post reply");

      const newSubComment = await response.json();
      setSubComments((prev) => [...prev, newSubComment]);
      setReply("");
      setShowReplyInput(false);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`${styles.comment} ${comment.parent_id ? styles.reply : ""}`}
    >
      <img src={comment.author_avatar} alt="avatar" className={styles.avatar} />
      <div className={styles.commentContent}>
        <h3 className={styles.nickname}>{comment.author_nickname}</h3>
        <p className={styles.commentText}>{comment.text}</p>

        {comment.parent_id === null && (
          <div className={styles.replyButtonContainer}>
            <img
              src="/assets/images/Reply.svg"
              alt="Reply Icon"
              className={styles.replyIcon}
            />
            <button
              className={styles.replyButton}
              onClick={() => setShowReplyInput(!showReplyInput)}
            >
              უპასუხე
            </button>
          </div>
        )}

        {showReplyInput && (
          <div className={styles.replyContainer}>
            <textarea
              className={styles.replyInput}
              placeholder="დაწერეთ პასუხი"
              value={reply}
              onChange={(e) => setReply(e.target.value)}
            />
            <button
              onClick={handleReplySubmit}
              disabled={loading}
              className={styles.replySubmit}
            >
              {loading ? "Loading..." : "დააკომენტარე"}
            </button>
          </div>
        )}

        {subComments.map((subComment) => (
          <SingleComment
            key={subComment.id}
            comment={subComment}
            taskId={taskId}
          />
        ))}
      </div>
    </div>
  );
};

export default SingleComment;
