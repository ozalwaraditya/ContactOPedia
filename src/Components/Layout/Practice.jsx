import { useState } from "react";

/* 
    React Best Practices (Simple)

    1. Avoid nested useState.
       - Keep state simple (no deep objects).

    2. Normal updates (count + 1) run only once:
           setCount(count + 1);
           setCount(count + 1);
       → Still increases only by 1.

    3. Use functional updates to increase multiple times:
           setCount(prev => prev + 1);
           setCount(prev => prev + 1);
       → Increases by 2.

    4. useEffect:
       - Runs when a variable changes.
       - Used for side effects (API call, logs, etc.).

    5. Conditional Rendering:
           { condition && <Component /> }
       - Renders only if condition is true.
*/

function Practice() {
  // Complex Object handling
  const [gameStatus, setGameStatus] = useState({
    count: 0,
    Status: "",
  });

  // onClick - logic - function
  function increase() {
    const newCount = gameStatus.count + 1;

    setGameStatus({
      ...gameStatus,
      count: newCount,
      Status: newCount >= 5 ? "Won" : newCount <= -5 ? "Lose" : "",
    });
  }

  function decrease() {
    const newCount = gameStatus.count - 1;

    setGameStatus({
      ...gameStatus,
      count: newCount,
      Status: newCount >= 5 ? "Won" : newCount <= -5 ? "Lose" : "",
    });
  }

  return (
    <div>
      <h1>Practice</h1>

      <div className="text-center">
        <h1>Game Status : {gameStatus.count}</h1>

        <button onClick={increase} className="mx-5">
          +1
        </button>
        <button onClick={decrease} className="mx-5">
          -1
        </button>

        {/* Conditional Rendering */}
        {gameStatus.Status && <h2 className="mt-3">{gameStatus.Status}</h2>}
      </div>
    </div>
  );
}

export default Practice;
