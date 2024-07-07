import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [display, setDisplay] = useState('');
  const [history, setHistory] = useState([]);
  const [showHistory, setShowHistory] = useState(false);

  useEffect(() => {
    const handleKeyPress = (event) => {
      const key = event.key;

      if (key === 'Enter') {
        calculator();
      } else if (key === 'Backspace') {
        setDisplay(display.slice(0, -1));
      } else if (/[\d+\-*/.%]/.test(key)) {
        appendToDisplay(key);
      }
    };

    window.addEventListener('keydown', handleKeyPress);

    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [display]);

  const appendToDisplay = (input) => {
    setDisplay((prevDisplay) => prevDisplay + input);
  };

  const clearDisplay = () => {
    setDisplay('');
  };

  const calculator = () => {
    try {
      const result = eval(display).toString();
      setHistory([...history, `${display} = ${result}`]);
      setDisplay(result);
    } catch (error) {
      setDisplay('Error');
    }
  };

  const signChange = () => {
    setDisplay((prevDisplay) =>
      prevDisplay.charAt(0) === '-' ? prevDisplay.slice(1) : '-' + prevDisplay
    );
  };

  const percentage = () => {
    try {
      const result = (parseFloat(display) / 100).toString();
      setHistory([...history, `${display} = ${result}`]);
      setDisplay(result);
    } catch (error) {
      setDisplay('Error');
    }
  };

  const toggleHistory = () => {
    setShowHistory(!showHistory);
  };

  const showHistoryInDisplay = (entry) => {
    const [expression] = entry.split(' = ');
    setDisplay(expression);
    setShowHistory(false);
  };

  return (
    <div className='App'>
      <div className="container">
        <div className="theme">
          <button id="history" onClick={toggleHistory}></button>
          <p>{showHistory ? 'Hide' : 'Show'}</p>
          <div className="title">Calculator</div>
          <div className="themebtn">
            <div className="modechange"></div>
          </div>
        </div>
        <div className="header">
          <input id="display" value={display} readOnly />
          {showHistory && (
            <div id="showhistory">
              {history.map((entry, index) => (
                <div key={index} onClick={() => showHistoryInDisplay(entry)} className="history-entry">
                  {entry}
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="keyboard">
          <div className="button">
            <button className='btn' onClick={clearDisplay}>AC</button>
            <button className='btn' onClick={signChange}>+/-</button>
            <button className='btn' onClick={percentage}>%</button>
            <button className='btn colorpic' onClick={() => appendToDisplay('/')}>/</button>
            <button className='btn' onClick={() => appendToDisplay('7')}>7</button>
            <button className='btn' onClick={() => appendToDisplay('8')}>8</button>
            <button className='btn' onClick={() => appendToDisplay('9')}>9</button>
            <button className='btn colorpic' onClick={() => appendToDisplay('*')}>*</button>
            <button className='btn' onClick={() => appendToDisplay('4')}>4</button>
            <button className='btn' onClick={() => appendToDisplay('5')}>5</button>
            <button className='btn' onClick={() => appendToDisplay('6')}>6</button>
            <button className='btn colorpic' onClick={() => appendToDisplay('-')}>-</button>
            <button className='btn' onClick={() => appendToDisplay('1')}>1</button>
            <button className='btn' onClick={() => appendToDisplay('2')}>2</button>
            <button className='btn' onClick={() => appendToDisplay('3')}>3</button>
            <button className='btn colorpic' onClick={() => appendToDisplay('+')}>+</button>
            <button className='btn' onClick={() => appendToDisplay('0')}>0</button>
            <button className='btn' onClick={() => appendToDisplay('.')}>.</button>
            <button className='btn equel' onClick={calculator}>=</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
