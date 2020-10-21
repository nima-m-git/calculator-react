import React from 'react';
import { add, subtract, multiply, divide } from './operations';

const CALC_OPERATIONS = {
  '+': add,
  '-': subtract,
  '×': multiply,
  '÷': divide,
}


class Calculator extends React.Component {
  constructor(props) {
    super(props);
    this.initialState = {
      total: null,
      current: 0,
      operator: null,
    }
    this.state = this.initialState;
    this.operate = this.operate.bind(this);
  }

  operate({val, type,}){
    // always add num to current
    if (type === 'num') {
      // sub zero except if decimal added
      let currentNum = (String(this.state.current) === '0' && val !== '.') ? val : String(this.state.current) + val;
      this.setState({
        total: (this.state.operator) ? this.state.total : null, //remove total if no oper
        current: (isNaN(currentNum)) ? this.state.current : currentNum,  // validated number check, no multi decimal
      })
    }

    if (type === 'oper') {
      // operater after total but no current, just replaces/adds operator
      if (!!this.state.total && !this.state.current) {
        this.setState({
          operator: val,
        })
      }
      if (!!this.state.current) {
        // oper after current but no total, pushes current to total and adds oper
        if (!this.state.total && !this.state.operator) {
          this.setState({
            total: this.state.current,
            current: 0,
            operator: val,
          })
        }
        // post equal, total from before, current num before current oper -> replace tot
        if (!!this.state.total && !this.state.operator) {
          this.setState({
            total: this.state.current,
            current: 0,
            operator: val,
          })
        }
        // oper after current and total and oper, total from operation, current reset and oper replace
        if (!!this.state.total && !!this.state.operator) {
          this.setState({
            total: CALC_OPERATIONS[this.state.operator](this.state.total, this.state.current),
            current: 0,
            operator: val,
          })
        }
      }
    }

    if (type === 'equals' && !!this.state.current && !!this.state.total) {
      if (!!this.state.operator) {
        this.setState({
          total: CALC_OPERATIONS[this.state.operator](this.state.total, this.state.current),
          current: 0,
          operator: null,
        })
      } else {
        this.setState({
          total: null,
        })
      }
    } 

    if (type === 'clear') {
      this.setState({
        ...this.initialState,
      })
    }
  }


  render() {
    return (
      <div>
        <Screen vals={this.state}/>
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
    { val: '.', type: 'num'},
    { val: '×', type: 'oper'},
    { val: '÷', type: 'oper'},
    { val: '+', type: 'oper'},
    { val: '-', type: 'oper'},
    { val: '=', type: 'equals'},
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


const Screen = ({vals}) => {
  let {total, current, operator} = vals;
  let screen = '';

  if (total) {
    screen += total;
    if (operator) {
      screen += operator;
      if (current) {
        screen += current;
      }
    }
  } else {
    screen += current;
    if (operator) {
      screen += operator;
    }
  }

  return(
    <div>
      {screen}
    </div>
  )
}

export default Calculator;
