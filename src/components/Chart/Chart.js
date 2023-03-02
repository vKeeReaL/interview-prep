import React, { useEffect, useState } from "react";
import "./Chart.scss";
import { getData } from "./data";

const Candle = (props) => {
  const { order, candle, index, data } = props;
  const orderArray = data.map((value, index) => {
    return order === "Ascending" || order === "Descending"
      ? value.ticketCount
      : index;
  });

  const { id, name, ticketCount, colour } = candle;
  const title = `${name} ${ticketCount}`;
  return (
    <div
      className="candle"
      key={id}
      title={title}
      style={{
        backgroundColor: colour,
        height: ticketCount * 5,
        order: orderArray[index],
      }}
    ></div>
  );
};

export const Chart = () => {
  const orders = ["None", "Ascending", "Descending"];
  const [data, setData] = useState([]);
  const [order, setOrder] = useState(orders[0]);

  const UIChartClass =
    order === "Descending" ? "chart chart--reversed" : "chart";

  const handleChange = (e) => {
    const order = e.target.value;
    setOrder(order);
    if (order === "None") getData().then((data) => setData(data));
  };

  useEffect(() => {
    getData().then((data) => setData(data));
  }, []);

  return (
    <section>
      <select value={order} onChange={handleChange}>
        {orders.map((option) => (
          <option value={option} key={option}>
            {option}
          </option>
        ))}
      </select>
      <div className={UIChartClass}>
        {data.map((candle, index) => (
          <Candle
            key={candle.id}
            candle={candle}
            index={index}
            order={order}
            data={data}
          />
        ))}
      </div>
    </section>
  );
};
