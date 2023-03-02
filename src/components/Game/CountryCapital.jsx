import React, { useEffect, useState, useMemo } from "react";

const mockData = {
  Poland: "Warsaw",
  Germany: "Berlin",
  Azerbaijan: "Baku",
  "Papua New Guinea": "Port Moresby",
};

const CountryButton = (props) => {
  const { handleClick, title, answers } = props;
  const [isClicked, setClicked] = useState(false)

  function handleIsClicked() {
    handleClick(title)
    if (!isClicked)  {
      setClicked(true);
    }
  }

  console.log('isClicked',isClicked);

  const backgroundColor = useMemo(() => {
    if (answers.length < 2 && answers[0] === title) return "blue";
    if (answers.length > 1 && answers.includes(title)) return "red";
  }, [answers, isClicked]);

  return (
    <button onClick={handleIsClicked} key={title} style={{ backgroundColor }}>
      {title}
    </button>
  );
};

const CountryCapital = ({ data = mockData }) => {
  const [gameData, setGameData] = useState([]);
  const [answers, setAnswers] = useState([]);

  const dataRandomButtons = useMemo(
    () => gameData.flat().sort(() => Math.random() - 0.5),
    [gameData]
  );

  function checkAnswers() {
    const indexOfRightAnswer = gameData
      .map((pair) => pair.every((item) => answers.includes(item)))
      .findIndex((p) => p);

    if (indexOfRightAnswer >= 0) {
      const remainingData = gameData.filter(
        (i, index) => index !== indexOfRightAnswer
      );
      setGameData(remainingData);
    }
  }

  useEffect(() => {
    setGameData(Object.entries(data));
  }, [data]);

  useEffect(() => {
    checkAnswers();
  }, [answers]);

  function handleClick(answer) {
    setAnswers(answers.length < 2 ? [...answers, answer] : [answer]);
  }

  const styles = { display: "flex", gap: 5, justifyContent: "center" };

  return (
    <div style={styles}>
      {!gameData.length && <h1>Congratulations</h1>}
      {dataRandomButtons.map((button) => (
        <CountryButton
          key={button}
          title={button}
          answers={answers}
          handleClick={handleClick}
        />
      ))}
    </div>
  );
};

export default CountryCapital;
