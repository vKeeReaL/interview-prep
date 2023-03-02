import React, { useRef, useState } from "react";

const SortedArray = () => {
  const [arrayOfNumbers, setArrayOfNumbers] = useState([]);
  const inputRef = useRef(null);

  const handleSubmit = (e) => {

    if (e.target.localName === "button") {

      const isAscending = e.target.id === "ascending";
      setArrayOfNumbers(
        inputRef.current.value
          .trim()
          .split(",")
          .sort((a, b) => (isAscending ? a - b : b - a))
      );
      inputRef.current.value = null;
    }
  };

  return (
    <div>
      <h2>{arrayOfNumbers.join(',')}</h2>
      <form onClick={handleSubmit}>
        <input placeholder="Type numbers separated by comma" ref={inputRef} />
        <button type="button" id="ascending">
          Sort by ascending
        </button>
        <button type="button" id="descending">
          Sort by descending
        </button>
      </form>
    </div>
  );
};

export default SortedArray;
