import React, { useEffect, useState } from "react";
import "./Users.css";
import axios from "axios";

const Users = () => {
  const [usersList, setUsersList] = useState([]);
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [username, setUsername] = useState("");
  const [contentMessage, setContentMessage] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:5000/users")
      .then((res) => {
        setUsersList(res.data?.data);
      })
      .catch((err) => {
        console.log("Error while getting users", err);
        setContentMessage(err?.response?.data?.message);
      });
  }, []);

  const createUser = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:5000/users", {
        name,
        age,
        username,
      });
      // Clear the input field
      setName("");
      setAge("");
      setUsername("");

      // Update data instantly
      setUsersList([
        ...usersList,
        {
          name,
          age,
          username,
        },
      ]);
    } catch (err) {
      console.error(err);
    }
  };

  const deleteUser = async (userId) => {
    if(!userId) {
      return;
    }
    try {
      const res = await axios.delete(`http://localhost:5000/users/${userId}`);
      if (res) {
        setUsersList(usersList.filter((user) => user._id !== userId));
      }
    } catch (err) {
      console.error("Error deleting user", err);
    }
  };

  return (
    <div className="container">
      <div className="userDisplay">
        {usersList.length === 0 ? (
          <div>{contentMessage}</div>
        ) : (
          usersList.map((user) => (
            <div key={user._id} className="userContainer">
              <div>Name: {user.name}</div>
              <div>Age: {user.age}</div>
              <div>Username: {user.username}</div>
              <button onClick={() => deleteUser(user._id)}>Delete User</button>
            </div>
          ))
        )}
      </div>

      <div className="form">
        <label>Name:</label>
        <input
          type="text"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <label>Age:</label>
        <input
          type="number"
          placeholder="Enter your age"
          value={age}
          onChange={(e) => setAge(e.target.value)}
        />
        <label>Username:</label>
        <input
          type="text"
          placeholder="Enter your username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <button type="submit" onClick={createUser}>
          Create user
        </button>
      </div>
    </div>
  );
};

export default Users;
