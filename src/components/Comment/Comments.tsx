import React, { useState, useEffect } from "react";
import SingleComment from "./SingleComment";
import styles from "./Comments.module.css";

const BASE_URL = "https://momentum.redberryinternship.ge/api";
const BEARER_TOKEN = "9e6bd89f-e7c3-4357-a63d-38a1d49630b4";

interface Comment {
  id: number;
  text: string;
  task_id: number;
  parent_id: number | null;
  author_avatar: string;
  author_nickname: string;
  sub_comments?: Comment[];
}

const Comments: React.FC<{ taskId: number }> = ({ taskId }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState("");
  const [loading, setLoading] = useState(false);

  // useEffect for fetching comments
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await fetch(`${BASE_URL}/tasks/${taskId}/comments`, {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${BEARER_TOKEN}`,
          },
        });
        if (!response.ok) throw new Error("Failed to fetch comments");
        const data = await response.json();
        setComments(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchComments();
  }, [taskId]);

  // handle new comment submission
  const handleSubmit = async () => {
    if (newComment.trim() === "") return;
    setLoading(true);
    try {
      const response = await fetch(`${BASE_URL}/tasks/${taskId}/comments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${BEARER_TOKEN}`,
        },
        body: JSON.stringify({
          text: newComment,
          task_id: taskId,
          parent_id: null,
        }),
      });
      if (!response.ok) throw new Error("Failed to post comment");
      const newCommentData: Comment = await response.json();
      setComments((prev) => [newCommentData, ...prev]);
      setNewComment("");
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.commentSection}>
      {/* comment input */}
      <div className={styles.commentInputContainer}>
        <textarea
          className={styles.textarea}
          placeholder="დაწერეთ კომენტარი"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
        <button
          onClick={handleSubmit}
          disabled={loading}
          className={styles.submitButton}
        >
          {loading ? "Loading..." : "დააკომენტარე"}
        </button>
      </div>

      {/* comment header */}
      <div className={styles.commentHeader}>
        <h3>კომენტარები</h3>
        <span className={styles.commentCount}>{comments.length}</span>
      </div>

      {/* comment list */}
      <div className={styles.commentList}>
        {comments.map((comment) => (
          <SingleComment key={comment.id} comment={comment} taskId={taskId} />
        ))}
      </div>
    </div>
  );
};

export default Comments;
