import React from "react";
import ReactDOM from "react-dom";
import "./index.css";

class App extends React.Component {
  state = {
    input: "",
    output: "",
    started: false,
    isMaxed: false,
    lastClicked: "",
  };

  handleClick = (e) => {
    const { input, output, isMaxed, lastClicked } = this.state;
    const operators = [".", "=", "+", "-", "*", "/"];
    if (e.target.innerText === "AC") {
      this.handleClear();
    }
    if (isMaxed) return;

    // clears the input once user enters a number after an operator
    if (operators.includes(input)) this.clearInput();

    //HANDLE THE NUMBERS

    if (!isNaN(e.target.innerText)) {
      this.handleNumber(e);

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
    this.setState({ started: false, input: "", output: "", isMaxed: false });
  };

  clearInput = () => {
    this.setState({ input: "" });
  };

  isNumberValid = (num) => {
    //use Regex, return bool
  };

  handleOperator(operator) {
    const { input, output, lastClicked } = this.state;
    if (input.includes("+") && lastClicked === "+") {
      console.log("double");
      this.setState({ output, input });
      return;
    }
    this.setState((prevState) => ({
      input: operator,
      output: prevState.output.concat(operator),
      started: true,
      lastClicked: operator,
    }));
  }

  handleOperatorFormat = () => {};

  handleNumber(e) {
    let num = e.target.innerText;
    this.setState((prevState) => ({
      input: prevState.input.concat(num),
      output: prevState.output.concat(num),
      started: true,
      lastClicked: num,
    }));
  }

  handleMax = () => {
    this.setState({ input: "DIGIT MAX", output: "", isMaxed: true });
  };

  //when pressing equal
  handleEvaluation = () => {};

  render() {
    const { input, output, started } = this.state;
    console.log(input);
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
