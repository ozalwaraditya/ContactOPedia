import { useEffect, useState } from "react";
import attachImg from "../images/attack.png";
import defendImg from "../images/defend.png";

function Counter() {
  const [count, setCount] = useState(0);
  const [status, setStatus] = useState("");
  const [newStatus, setNewStatus] = useState("");

  function updateStatus(score) {
    if (score >= 20) {
      setStatus("You Won!");
    } else if (score <= -20) {
      setStatus("You Lost!");
    }
  }

  function increase() {
    const newScore = count + 5;
    setCount(newScore);
    updateStatus(newScore);
  }

  function decrease() {
    const newScore = count - 5;
    setCount(newScore);
    updateStatus(newScore);
  }

  useEffect(() => {
    if (count <= -25) {
      setNewStatus("Lose");
    }
    if (count >= 30) {
      setNewStatus("Won");
    }
  }, [count]);

  return (
    <div style={{ textAlign: "center", padding: "20px", color: "white" }}>
      <h1 style={{ marginBottom: "10px" }}>Game Score: {count}</h1>
      <p>You win +5 and lose -5</p>

      {/* <h3>
        Game status : <span>{status}</span>
      </h3> */}

      {/* Conditional Rendering */}
      {status.length > 0 && (
        <h3>
          Conditional Game status : <span>{status}</span>
        </h3>
      )}

      {newStatus.length > 0 && (
        <h3>
          UseEffect status - Game status : <span>{newStatus}</span>
        </h3>
      )}

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "20px",
          marginTop: "20px",
        }}
      >
        <img
          src={attachImg}
          onClick={increase}
          style={{
            width: "130px",
            cursor: "pointer",
            border: "2px solid green",
            borderRadius: "10px",
            padding: "10px",
            transition: "0.2s",
          }}
          onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
          onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
          alt="attack"
        />

        <img
          src={defendImg}
          onClick={decrease}
          style={{
            width: "130px",
            cursor: "pointer",
            border: "2px solid red",
            borderRadius: "10px",
            padding: "10px",
            transition: "0.2s",
          }}
          onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
          onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
          alt="defend"
        />
      </div>

      <div
        style={{
          marginTop: "20px",
          display: "flex",
          justifyContent: "center",
          gap: "10px",
        }}
      >
        <button
          style={{ padding: "8px 14px" }}
          onClick={() => {
            const playMode = Math.round(Math.random());
            playMode === 0 ? increase() : decrease();
          }}
          className="btn btn-success"
        >
          Random play
        </button>

        <button
          style={{ padding: "8px 14px" }}
          onClick={() => {
            setCount(0);
            setStatus("");
            setNewStatus("");
          }}
          className="btn btn-danger"
        >
          Reset
        </button>
      </div>
    </div>
  );
}

export default Counter;
