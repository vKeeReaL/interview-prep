import React, {useState} from "react";

const ShowPhoto = (props ) => {
  const {id} = props;
  const [isShowed, setIsShowed] = useState(false);
  const [url, setUrl] = useState("");
  const [isLoading, setLoading] = useState(false);

  const fetchPhoto = async (id) => {
    try {
      const res = await fetch(
        `https://jsonplaceholder.typicode.com/photos/${id}`
      );
      return await res.json();
    } catch (e) {
      console.log(e);
    }
  };

  const handleClick = () => {
    setLoading(true)
    fetchPhoto(id).then((data) => {
      setUrl(data?.url);
      setIsShowed(true)
      setLoading(false)
    });
  }

  return (
    <>
      {isLoading && <div>LOADING</div>}
      {isShowed ? (
        <img src={url} alt="" />
      ) : (
        <button onClick={handleClick}>Show Photo</button>
      )}
    </>
  );
};

export default React.memo(ShowPhoto);
