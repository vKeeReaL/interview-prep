import React, { useEffect, useState, Fragment } from "react";
import "./FetchTodos.scss";
import { getIssue, statuses, getSubtasks, updateStatus } from "./api";

const SubTasks = ({ subtasks, isShowed = false }) => {
  return (
    isShowed &&
    (!!subtasks.length ? (
      <dl className="subtasks">
        {subtasks.map((subtask) => {
          const { id, title, description } = subtask;
          return (
            <Fragment key={id}>
              <dt className="subtasks__title">{title}</dt>
              <dd className="subtasks__description">{description}</dd>
            </Fragment>
          );
        })}
      </dl>
    ) : (
      <dl>Loading</dl>
    ))
  );
};

const FetchTodos = () => {
  const [currentStatus, setCurrentStatus] = useState("");
  const [issue, setIssue] = useState({});
  const [isLoading, setLoading] = useState(false);
  const [subtasks, setSubtasks] = useState([]);
  const [isSubtasksShowed, setSubtasksShowed] = useState(false);
  const { title, status } = issue || {};
  // UI
  const linkClassName = isSubtasksShowed
    ? "subtask__link subtask__link--showed"
    : "subtask__link";

  function setData(issue) {
    const { status } = issue || {};
    setIssue(issue);
    setCurrentStatus(status);
  }

  const handleChange = async (e) => {
    const status = e.target.value;
    try {
      setLoading(true);
      await updateStatus();
      setData({ ...issue, status });
      setLoading(false);
    } catch (e) {
      console.log("Error:", e);
    }
  };

  const handleClick = async (e) => {
    e.preventDefault();
    setSubtasksShowed(!isSubtasksShowed);
    const subtasks = await getSubtasks();
    setSubtasks(subtasks);
  };

  useEffect(() => {
    getIssue().then((data) => setData(data, data?.status));
  }, []);

  return (
    <div className="todos">
      <section>
        <h1>{title}</h1>
        <div className="subtask__status">
          <b>Status:</b> {isLoading ? "loading" : status}
        </div>
        <a className={linkClassName} onClick={handleClick}>
          Show subtasks:
        </a>
        <SubTasks subtasks={subtasks} isShowed={isSubtasksShowed} />
      </section>
      <select
        disabled={isLoading}
        value={currentStatus}
        onChange={handleChange}
      >
        {statuses.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default FetchTodos;
