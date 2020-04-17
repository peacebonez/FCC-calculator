import React from "react";
import ReactDOM from "react-dom";
import "./index.css";

const operators = [".", "+", "-", "*", "/"];

class App extends React.Component {
  state = {
    input: "",
    output: "",
    started: false,
    isMaxed: false,
    inputArr: [],
  };

  handleClick = (e) => {
    const { input, output, isMaxed } = this.state;
    if (e.target.innerText === "AC") {
      this.handleClear();
    }
    if (isMaxed) return;

    // clears the input once user enters a number after an operator
    this.handleDecimal(e.target.innerText);
    if (operators.includes(input)) this.clearInput();
    //HANDLE THE NUMBERS
    if (!isNaN(e.target.innerText)) {
      let num = e.target.innerText;
      this.handleNumber(num);

      //HANDLE THE OPERATORS
    } else if (operators.includes(e.target.innerText)) {
      let operator = e.target.innerText;
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
      () => (document.querySelector("#decimal").disabled = false)
    );
  };

  clearInput = () => {
    this.setState({ input: "" });
  };

  handleNumber(num) {
    const { input } = this.state;
    this.setState((prevState) => ({
      input: prevState.input.concat(num),
      output: prevState.output.concat(num),
      started: true,
    }));
  }

  handleZero = () => {
    const { input, output } = this.state;
    if (input === "0") {
      this.setState((prevState) => ({
        output: prevState.output,
      }));
    }
  };

  handleDecimal = (num) => {
    this.state.inputArr.push(num);
    console.log(this.state.inputArr);
    if (this.state.inputArr.includes(".")) {
      document.querySelector("#decimal").disabled = true;
    }
  };

  handleOperator(operator) {
    const { input, output, inputArr } = this.state;
    if (
      operators.includes(inputArr[inputArr.length - 1]) &&
      operators.includes(input)
    ) {
      console.error("double");
      this.setState({ output, input });
      return;
    }
    this.setState((prevState) => ({
      input: operator,
      output: prevState.output.concat(operator),
      started: true,
    }));
  }

  handleMax = () => {
    this.setState({ input: "DIGIT MAX", output: "", isMaxed: true });
  };

  //when pressing equal
  handleEvaluation = () => {
    this.setState({ input: eval(this.state.output), output: "" });
  };

  render() {
    const { input, output, started, inputArr } = this.state;
    console.log("INPUT:", input);
    console.log("OUTPUT:", output);
    console.log("LASTCLICKED:", inputArr[inputArr.length - 1]);
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
