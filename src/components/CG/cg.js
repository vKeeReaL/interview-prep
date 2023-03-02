import { useEffect, useState } from "react";
export default function CG() {
  const [no0fChocolates, setChocolates] = useState(1); // Please don't change this line
  const [chocolatePrice, setChocolatePrice] = useState(1); // Please don't change this line
  const addChocolates = function () {
    setChocolatePrice((num2) => num2 + 1);
  };
  useEffect(() => {
    setChocolates(1);
    setChocolatePrice(1);
  });
  return (
    <div className="my-app">
      <h1>Chocolates = {no0fChocolates}</h1>
      <h2>Price = {chocolatePrice}</h2>
      <button onClick={addChocolates}>Add More Chocolates</button>
    </div>
  );
}
