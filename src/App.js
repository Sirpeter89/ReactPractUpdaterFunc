import { useState, useEffect, useRef } from "react";
import "./styles.css";

export default function App() {
  const [count, setCount] = useState(0);
  const [userData, setUserData] = useState([]);
  const userString = useRef("");
  //https://randomuser.me/api
  async function fetchUsers() {
    let data = await fetch("https://randomuser.me/api");
    let response = await data.json();
    setUserData(response.results);
  }

  async function fetchMoreUsers(pageNum) {
    let data = await fetch(`https://randomuser.me/api?page=${pageNum}`);
    let res = await data.json();
    setUserData((userData) => {
      return [...userData, res.results[0]];
    });
  }

  let userList = userData.map((person, index) => (
    <div key={index}>
      <img src={person.picture.large} alt="person"></img>
      <p>
        {person.name.first} {person.name.last}
      </p>
    </div>
  ));

  useEffect(() => {
    fetchUsers();
  }, []);

  userString.current = JSON.stringify(userData, null, 2);

  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <h2>Start editing to see some magic happen!</h2>
      <p>{count}</p>
      <button onClick={() => setCount(count + 1)}>Increase</button>
      <button onClick={() => fetchMoreUsers(2)}>Append more users</button>
      {userList}
      {/* <pre style={{textAlign:"start"}}>
        {userString.current}
      </pre> */}
    </div>
  );
}
