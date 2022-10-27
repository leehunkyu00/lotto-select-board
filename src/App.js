import {useState, useEffect, useMemo, useRef} from 'react';
import logo from './logo.svg';
import historyData from './history';
import './App.css';

const MAX_NUMBER = 45;
const SELECT_NUMBER_COUNT = 6;

function App() {
  const [historyNumber, setHistoryNumber] = useState([]);
  const [selectNumber, setSelectNumber] = useState([]);
  const [board, setBoard] = useState(undefined);
  const boardRef = useRef(null);

  useEffect(() => {
    let tmp= [];
    for(let i = 1; i <= MAX_NUMBER; i++) {
      tmp.push(
        <button
          key={i}
          value={i}
          style={{
            // background: selectNumber.includes(i) == true ? "green" : "gray",
            background: "gray",
            color: "white",
            fontWeight: "bold",
            textAlign: "center",
            width: '10vw',
            height: '13vh',
            fontSize: 30,
          }}
          onClick={() =>
            setSelectNumber((prev) => {
              if (prev.includes(i)) {
                return prev.filter((val) => val != i);
              } else {
                if (prev.length >= SELECT_NUMBER_COUNT) {
                  return prev;
                }
                return [...prev, i];
              }
            })
          }
        >
          {i}
        </button>
      );
    }

    setBoard(tmp)
  }, [])

  useEffect(() => {
    if (boardRef.current) {
      for (const item of boardRef.current.children) {
        if (selectNumber.includes(Number(item.value))) {
          item.style.backgroundColor = "green";
        } else {
          item.style.backgroundColor = "gray";
        }
      }
    }
  }, [selectNumber]);

  function checkHadWin(arr) {
    const sortedStr = arr.sort().toString();
    for (let i = 0; i < historyData.length; i++) {
      if (historyData[i].slice(0, -1).sort().toString() == sortedStr) {
        return true;
      }
    }

    return false;
  }

  return (
    <div className="App">
      <div style={{ fontSize: 20, fontWeight: "bold", margin: 10 }}>
        로또번호 좀 골라줘
      </div>
      <div
        style={{
          height: 20,
          padding: 5,
          border: "1px solid black",
          marginBottom: 10,
          fontSize: 20,
        }}
      >
        {selectNumber.join(", ")}
      </div>
      <div ref={boardRef} id="board">
        {board}
      </div>
      <div>
        <button
          className={
            selectNumber.length == SELECT_NUMBER_COUNT ? "okButton" : ""
          }
          style={{
            margin: 10,
            width: 300,
            height: 70,
            color: "white",
            fontSize: 30,
          }}
          disabled={selectNumber.length != SELECT_NUMBER_COUNT}
          onClick={() => {
            if (checkHadWin(selectNumber)) {
              alert("아쉽지만 이미 당첨된 번호입니다.");
            } else {
              setHistoryNumber((prev) => [...prev, selectNumber]);
            }

            setSelectNumber([]);
          }}
        >
          저장
        </button>
      </div>
      <div style={{ fontWeight: "bold" }}>
        {historyNumber.map((val, idx) => (
          <div key={idx}>
            {val.sort().join(", ")}
            <br />
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
