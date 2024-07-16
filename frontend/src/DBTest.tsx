import { useState, useEffect } from "react"

const DBTest = () => {
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetch('/api')
      .then((res) => res.json())
      .then((data) => setMessage(data.message));
  },[])

  return (
    <div>
      <h1>フロントエンド</h1>
      <p>{ message }</p>
    </div>
  );
};

export default DBTest;
