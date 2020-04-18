import React from "react";
import ReactDOM from "react-dom";
import "./index.css";

const operators = ["-", "+", "*", "/"];

class App extends React.Component {
  state = {
    input: "",
    output: "",
    started: false,
    isMaxed: false,
    inputArr: [],
  };

  handleClick = (e) => {
    const { input, output, isMaxed, inputArr } = this.state;
    let button = e.target.innerText;
    inputArr.push(button);
    console.log("INPUTARR:", inputArr);
    console.log("LASTCLICKED:", inputArr[inputArr.length - 1]);
    if (button === "AC") {
      this.handleClear();
    }
    if (isMaxed) return;
    if (button === "=") this.handleEvaluation();

    // clears the input once user enters a number after an operator
    if (button === ".") this.handleDecimal(button);
    if (operators.includes(input)) this.clearInput();
    console.log("BUTTON PRESSED", button);
    if (operators.includes(inputArr[inputArr.length - 1]) && button === ".") {
      console.error("Need a zero here boss!");
    }

    //HANDLE THE NUMBERS
    if (!isNaN(button)) {
      let num = button;
      console.log("inputArr", inputArr);
      console.log(num);
      if (output === "0") {
        this.handleClear();
      }
      if (inputArr.includes("=")) {
        this.handleClear();
      }
      this.handleNumber(num);

      //HANDLE THE OPERATORS
    } else if (operators.includes(e.target.innerText)) {
      let operator = button;
      if (inputArr.includes("=")) {
        this.setState((prevState) => ({
          output: prevState.input + input,
        }));
      }
      this.handleOperator(operator);
    }

    if (input.length >= 24 || output.length >= 24) {
      this.handleMax();
      return;
    }
  };

  handleClear = () => {
    this.setState(
      {
        started: false,
        input: "",
        output: "",
        isMaxed: false,
        inputArr: [],
      },
      () => this.resetDisabled()
    );
  };

  resetDisabled = () => {
    document.querySelector("#add").disabled = false;
    document.querySelector("#multiply").disabled = false;
    document.querySelector("#divide").disabled = false;
    document.querySelector("#decimal").disabled = false;
  };

  clearInput = () => {
    this.setState({ input: "" });
  };

  handleNumber(num) {
    const { input, output } = this.state;
    this.setState((prevState) => ({
      input: prevState.input + num,
      output: prevState.output + num,
      started: true,
    }));
  }

  handleZero = () => {
    const { input, output, inputArr } = this.state;
    if (inputArr === ["0"]) {
      console.error("ZERO TROUBLES");
      return this.handleClear();
    }
  };

  handleDecimal = (num) => {
    const { input, inputArr } = this.state;

    if (operators.includes(inputArr[inputArr.length - 1])) {
      console.error("Decimal follows an operator!");
    }

    if (inputArr.includes(".")) {
      document.querySelector("#decimal").disabled = true;
    }
    if (inputArr.length === 1) {
      num = "0" + num;
    }
    this.setState((prevState) => ({
      input: prevState.input.concat(num),
      output: prevState.output.concat(num),
      started: true,
    }));
  };

  handleOperator = (operator) => {
    const { input, output, inputArr, started } = this.state;

    if (
      operators.includes(inputArr[inputArr.length - 1]) &&
      operators.includes(input)
    ) {
      console.error("double");
      this.setState({ output, input });
      return;
    }
    if (!started) {
      document.querySelector("#add").disabled = true;
      document.querySelector("#multiply").disabled = true;
      document.querySelector("#divide").disabled = true;
    }
    this.setState(
      (prevState) => ({
        input: operator,
        output: prevState.output + operator,
        inputArr: [],
        started: true,
      }),
      () => this.resetDisabled()
    );
  };

  handleMax = () => {
    this.setState({ input: "DIGIT MAX", output: "", isMaxed: true });
  };

  //when pressing equal
  handleEvaluation = () => {
    let evaluation = eval(this.state.output);
    this.setState({
      input: evaluation,
      output: this.state.output + "=" + evaluation,
    });
  };

  render() {
    const { input, output, started, inputArr } = this.state;
    console.log("INPUT:", input);
    console.log("OUTPUT:", output);

    return (
      <div id="wrapper">
        <Display input={input} output={output} started={started} />
        <BtnsContainer onClick={(e) => this.handleClick(e)} />
      </div>
    );
  }
}

class Display extends React.Component {
  state = {};
  render() {
    const { started, input, output } = this.props;
    return (
      <div id="display">
        <div id="display-sm">{started ? output : ""}</div>
        <div id="display-lg">{started ? input : 0}</div>
      </div>
    );
  }
}

class BtnsContainer extends React.Component {
  state = {};
  render() {
    return (
      <div id="btnsContainer">
        <Button id="clear" content={"AC"} onClick={this.props.onClick} />
        <Button id="divide" content={"/"} onClick={this.props.onClick} />
        <Button id="multiply" content={"*"} onClick={this.props.onClick} />
        <Button id="seven" content={7} onClick={this.props.onClick} />
        <Button id="eight" content={8} onClick={this.props.onClick} />
        <Button id="nine" content={9} onClick={this.props.onClick} />
        <Button id="subtract" content={"-"} onClick={this.props.onClick} />
        <Button id="four" content={4} onClick={this.props.onClick} />
        <Button id="five" content={5} onClick={this.props.onClick} />
        <Button id="six" content={6} onClick={this.props.onClick} />
        <Button id="add" content={"+"} onClick={this.props.onClick} />
        <Button id="one" content={1} onClick={this.props.onClick} />
        <Button id="two" content={2} onClick={this.props.onClick} />
        <Button id="three" content={3} onClick={this.props.onClick} />
        <Button id="equals" content={"="} onClick={this.props.onClick} />
        <Button id="zero" content={0} onClick={this.props.onClick} />
        <Button id="decimal" content={"."} onClick={this.props.onClick} />
      </div>
    );
  }
}

const Button = ({ id, content, onClick }) => {
  return (
    <button id={id} className="btn" onClick={onClick}>
      {content}
    </button>
  );
};

// parseInt(document.querySelector("#zero").innerText);

ReactDOM.render(<App />, document.querySelector("#root"));
