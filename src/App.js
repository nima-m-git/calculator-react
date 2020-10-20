import React from 'react';
import { add, subtract, multiply, divide } from 'operations.js';

class Calculator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      total: null,
      new: 0,
      operation: null,
    }
    this.operate = this.operate.bind(this)
  }

  operate(btn){
    if (btn.type === 'num') {
      this.setState({
        new: this.state.new.concat(btn.val)
      })
    }
    if (btn.type === 'oper') {
      if (!this.state.operation)
      if (!this.state.total) {
        this.setState({
          total: this.state.new,
          new: 0,
          operation: btn.fnc
        })
      }
    }
  }


  render() {
    return (
      <div>
        <Screen />
        <Buttons operate={this.operate}/>
      </div>
    )
  }
}


const Buttons = (props) => {
  const buttons = [
    { val: 0, type: 'num'},
    { val: 1, type: 'num'},
    { val: 2, type: 'num'},
    { val: 3, type: 'num'},
    { val: 4, type: 'num'},
    { val: 5, type: 'num'},
    { val: 6, type: 'num'},
    { val: 7, type: 'num'},
    { val: 8, type: 'num'},
    { val: 9, type: 'num'},
    { val: 'X', type: 'oper', fnc: multiply},
    { val: '/', type: 'oper', fnc: divide},
    { val: '+', type: 'oper', fnc: add},
    { val: '-', type: 'oper', fnc: subtract},
    { val: '=', type: 'equal'},
    { val: 'AC', type: 'clear'}
  ]

  return (
    buttons.map((btn) => 
      <li key={btn.val}>
        <button onClick={() => props.operate(btn)}>{btn.val}</button>
      </li>
    )
  )
}


const Screen = (props) => {
  return(
    <div></div>
  )
}

export default Calculator;
