import React, {useState, useMemo, useEffect} from "react";

function GameButton (props) {
  const { handleClick, title, answers} = props;

  const backgroundColor = useMemo(() => {
    if (answers.length < 2 && answers[0] === title) return "blue";
    if (answers.length > 1 && answers.includes(title)) return "red";
  },[answers]);

  return <button
    key={title}
    style={{backgroundColor}}
    onClick={handleClick}>
    {title}
  </button>
}

export default function CountryCapitalGame({ data }) {
  const [gameData, setGameData] = useState(Object.entries(data));
  const [answers, setAnswers] = useState([])

  const dataRandomButtons = useMemo(()=>
      gameData.flat().sort(() => Math.random() - 0.5)
    ,[gameData]);

  function checkAnswers() {
    const indexOfRightAnswer = gameData
      .map((pair) => pair.every((item) => answers.includes(item)))
      .findIndex((p) => p);

    if (indexOfRightAnswer >= 0) {
      const remainingData = gameData.filter((i, index) =>
        index !== indexOfRightAnswer
      );
      setGameData(remainingData);
    }
  }

  useEffect(()=>{
    checkAnswers()
  },[answers])

  function handleClick(e) {
    const answer = e.target.textContent;
    setAnswers(answers.length < 2 ? [...answers, answer] : [answer])
  }

  return <div style={{display: 'flex', gap: 5}}>
    {!gameData.length && 'Congratulations'}
    {dataRandomButtons.map(button =>
      <GameButton
        onClick={handleClick}
        title={button}
        answers={answers}
      />
    ) }
  </div>;
}
