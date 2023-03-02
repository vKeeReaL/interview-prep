import React, { useEffect, useState } from "react";
import classNames from "classnames";
import { fetchData } from "./data";
import "./List.scss";

const ListItem = ({ item }) => {
  const { name, children } = item;
  const [isClicked, setIsClicked] = useState(true);
  const listClassName = [
    children?.length && "list__parent",
    isClicked && "list__parent--collapsed",
  ].filter((i) => i);

  const handleClick = (e) => {
    e.stopPropagation();
    setIsClicked(!isClicked);
  };
  return (
    <li onClick={handleClick} className={classNames(listClassName)}>
      {name}
      {isClicked && children && <RecursiveList data={children} />}
    </li>
  );
};

const RecursiveList = ({ data }) => {
  return (
    <ul className="list">
      {data.map((item) => (
        <ListItem item={item} key={item.id} />
      ))}
    </ul>
  );
};

const ListOfFolders = () => {
  const [listData, setListData] = useState([]);

  useEffect(() => {
    fetchData().then((data) => setListData(data));
  }, []);

  return <RecursiveList data={listData} />;
};

export default ListOfFolders;
