import React, { useEffect, useState, useMemo } from "react";

const mockData = {
  Poland: "Warsaw",
  Germany: "Berlin",
  Azerbaijan: "Baku",
  "Papua New Guinea": "Port Moresby",
};

const Button = (props) => {
  const {
    handleClick,
    title,
    selectedCapital,
    selectedCountry,
    isWrongAnswer,
  } = props;
  const [backgroundColor, setBackgroundColor] = useState("");

  useEffect(() => {
    if (title === selectedCapital || title === selectedCountry)
      setBackgroundColor("blue");
    if (
      (title === selectedCapital && isWrongAnswer) ||
      (title === selectedCountry && isWrongAnswer)
    )
      setBackgroundColor("red");
  }, [selectedCapital, selectedCountry, isWrongAnswer]);

  return (
    <button onClick={handleClick} key={title} style={{ backgroundColor }}>
      {title}
    </button>
  );
};

const CountryCapitalGame = ({ data = mockData }) => {
  const [gameData, setGameData] = useState(data);
  const [selectedCountry, setCountry] = useState("");
  const [selectedCapital, setCapital] = useState("");

  const [isWrongAnswer, setWrongAnswer] = useState(false);

  const dataButtons = useMemo(
    () =>
      Object.entries(gameData)
        .flat()
        .sort(() => Math.random() - 0.5),
    [gameData]
  );

  function handleClick(e) {
    const currentName = e.target.textContent;
    Object.keys(gameData).includes(currentName)
      ? setCountry(currentName)
      : setCapital(currentName);
  }

  function checkAnswers() {
    const isCorrectAnswer = gameData[selectedCountry] === selectedCapital;
    if (isCorrectAnswer) {
      const mutatedData = { ...gameData };
      delete mutatedData[selectedCountry];
      setGameData(mutatedData);
    } else {
      if (selectedCountry.length && selectedCapital.length) {
        console.log(
          selectedCountry.length,
          selectedCapital.length,
          selectedCountry.length && selectedCapital.length
        );
        setWrongAnswer(true);
      }
    }
  }

  useEffect(() => {
    checkAnswers();
  }, [selectedCapital, selectedCountry]);

  return (
    <>
      {dataButtons.map((button) => (
        <Button
          title={button}
          handleClick={handleClick}
          selectedCountry={selectedCountry}
          selectedCapital={selectedCapital}
          isWrongAnswer={isWrongAnswer}
        />
      ))}
    </>
  );
};

export default CountryCapitalGame;
