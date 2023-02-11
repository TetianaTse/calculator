import './App.css';
import { useState, useEffect } from 'react';
import Button from './Components/Button';
import { NumericFormat } from 'react-number-format';

function App() {
  const [previousValue, setPreviousValue] = useState("");
  const [currentValue, setCurrentValue] = useState("");
  const [sing, setSing] = useState(null);
  const [input, setInput] = useState("0");
  const [total, setTotal] = useState(false);

  const clear = () => {
    setPreviousValue("");
    setCurrentValue("");
    setInput("0");
  }

  const backspace = () => {
    setCurrentValue(currentValue.slice(0, currentValue.length - 1));
  }

  const inputNum = (event) => {
    if (currentValue.includes(".") && event.target.value === ".") return;

    if (total) {
      setPreviousValue("");
    }

    currentValue
      ? setCurrentValue((pre) => pre + event.target.value)
      : setCurrentValue(event.target.value);
    setTotal(false);
  }
  useEffect(() => {
    setInput(currentValue);
  }, [currentValue]);

  useEffect(() => {
    setInput("0");
  }, []);

  const operator = (event) => {
    setTotal(false);
    setSing(event.target.value);
    if (currentValue === "") return;
    if (previousValue !== "") {
      equal();
    } else {
      setPreviousValue(currentValue);
      setCurrentValue("");
    }
  }

  const minusPlus = () => {
    if (currentValue.charAt(0) === "-") {
      setCurrentValue(currentValue.substring(1));
    } else {
      setCurrentValue("-" + currentValue);
    }
  }

  const persent = () => {
    previousValue
      ? setCurrentValue(String((parseFloat(currentValue) / 100) * previousValue))
      : setCurrentValue(String(parseFloat(currentValue) / 100));
  }

  const sqrt = () => {
    previousValue
      ? setCurrentValue(String(Math.sqrt(previousValue)))
      : setCurrentValue(String(Math.sqrt(currentValue)));
  }

  const pow = () => {
    previousValue
    ? setCurrentValue(String(Math.pow(previousValue, 2)))
    : setCurrentValue(String(Math.pow(currentValue, 2)));
  }

  const fraction = () => {
    previousValue
    ? setCurrentValue(String(1/previousValue))
    : setCurrentValue(String(1/currentValue));
  }

  const equal = (event) => {
    if (event?.target.value === "=") {
      setTotal(true);
    }
    let result;
    switch (sing) {
      case "/":
        result = String(parseFloat(previousValue) / parseFloat(currentValue));
        break;
      case "+":
        result = String(parseFloat(previousValue) + parseFloat(currentValue));
        break;
      case "*":
        result = String(parseFloat(previousValue) * parseFloat(currentValue));
        break;
      case "-":
        result = String(parseFloat(previousValue) - parseFloat(currentValue));
        break;
      default:
        return;
    }
    setInput("");
    setPreviousValue(result);
    setCurrentValue("");
  }

  return ( 
    <div className="App">
       <div className="input_block">
          <div className="result_block">
            <div>{input !== "" || input === "0" ? 
            (<NumericFormat value={input} displayType={"text"} thousandSeparator={true}/>) : 
            (<NumericFormat value={previousValue} displayType={"text"} thousandSeparator={true}/>)}
            </div>
          </div>
       </div>
       <div className="btn_block">
            <Button value="Clear" id="btn_clear" className="btn mod_color" callback={clear}/>
            <Button value="C" id="btn_c" className="btn" callback={backspace}/>
            <Button value="%" id="btn_percent" className="btn" callback={persent}/>
            <Button value="1/x" id="btn_fraction" className="btn" callback={fraction}/>
            <Button value="x²" id="btn_degree" className="btn" callback={pow}/>
            <Button value="√x" id="btn_square_root" className="btn" callback={sqrt}/>
            <Button value="/" id="btn_division" className="btn" callback={operator}/>
            <Button value="7" id="btn_7" className="btn" callback={inputNum}/>
            <Button value="8" id="btn_8" className="btn" callback={inputNum}/>
            <Button value="9" id="btn_9" className="btn" callback={inputNum}/>
            <Button value="*" id="btn_multiplication" className="btn" callback={operator}/>
            <Button value="4" id="btn_4" className="btn" callback={inputNum}/>
            <Button value="5" id="btn_5" className="btn" callback={inputNum}/>
            <Button value="6" id="btn_6" className="btn" callback={inputNum}/>
            <Button value="-" id="btn_minus" className="btn" callback={operator}/>
            <Button value="1" id="btn_1" className="btn" callback={inputNum}/>
            <Button value="2" id="btn_2" className="btn" callback={inputNum}/>
            <Button value="3" id="btn_3" className="btn" callback={inputNum}/>
            <Button value="+" id="btn_plus" className="btn" callback={operator}/>
            <Button value="+/-" id="btn_znak" className="btn" callback={minusPlus}/>
            <Button value="0" id="btn_0" className="btn" callback={inputNum}/>
            <Button value="." id="btn_dot" className="btn" callback={inputNum}/>
            <Button value="=" id="btn_result" className="btn mod_color" callback={equal}/>
       </div>
     </div>
   );
}

export default App;



 
  
     