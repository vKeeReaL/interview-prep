import React, { useEffect, useState, useCallback } from "react";
import "./Chart.scss";
import { getData } from "./data";

const Candle = ({ candle, heightCoefficient }) => {
  const { id, name, ticketCount, colour: backgroundColor } = candle;
  const title = `${name} ${ticketCount}`;
  const height = heightCoefficient * ticketCount;
  return (
    <div
      className="candle"
      key={id}
      title={title}
      style={{
        backgroundColor,
        height,
      }}
    />
  );
};

export const Chart = () => {
  const orders = ["None", "Ascending", "Descending"];
  const [order, setOrder] = useState(orders[0]);
  const [data, setData] = useState([]);
  // UI
  const chartHeight = 300;
  const heightCoefficient =
    chartHeight / Math.max(...data.map((i) => i.ticketCount));

  const handleChange = (e) => setOrder(e.target.value);

  const getSortedDate = useCallback(
    (order) => {
      return order === "None"
        ? data
        : [...data].sort((a, b) =>
            order === "Ascending"
              ? a.ticketCount - b.ticketCount
              : b.ticketCount - a.ticketCount
          );
    },
    [data]
  );

  useEffect(() => {
    getData().then((data) => {
      setData(data);
    });
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
      <div className="chart" style={{ height: chartHeight }}>
        {getSortedDate(order).map((candle) => (
          <Candle
            key={candle.id}
            candle={candle}
            heightCoefficient={heightCoefficient}
          />
        ))}
      </div>
    </section>
  );
};
