import React, { useState, useEffect } from "react";
import { withUserPhoto } from "../HOCs/withUserPhoto";
import ShowPhoto from "../ShowPhoto/ShowPhoto";

const isObject = (data) => typeof data === "object" && data !== null;
const UserWithPhoto = withUserPhoto(ShowPhoto);

const RecursiveUsers = ({ data }) => {
  if (!isObject(data)) {
    return <>{data}</>;
  } else {
    const pairs = Object.entries(data);
    return (
      <div>
        {pairs.map(([key, value]) => (
          <React.Fragment key={key}>
            {key === "id" && (
              <div>
                <UserWithPhoto id={value} lorem={"asd"} />
              </div>
            )}
            <li>
              <b>{key}</b>:&nbsp;
              {isObject(value) ? (
                <ul>
                  <RecursiveUsers data={value} />
                </ul>
              ) : (
                <RecursiveUsers data={value} />
              )}
            </li>
          </React.Fragment>
        ))}
      </div>
    );
  }
};

const Users = () => {
  const [users, setUsers] = useState([]);
  const [isFeatureEnabled, setIsFeatureEnabled] = useState(false);

  async function fetchUsers() {
    return fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .catch((e) => console.warn(e));
  }

  useEffect(() => {
    const random = Math.random() * 10;
    if (random < 5) {
      setIsFeatureEnabled(true);
    }
    fetchUsers().then((users) => setUsers(users));
  }, []);

  return (
    <>
      <h3>{isFeatureEnabled ? "Enabled" : "Disabled"}</h3>
      {users.length > 0 &&
        users.map((user, index) => <RecursiveUsers key={index} data={user} />)}
    </>
  );
};

export default React.memo(Users);
