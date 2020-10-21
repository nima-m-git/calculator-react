import React from 'react';
import { add, subtract, multiply, divide } from './operations';

const CALC_OPERATIONS = {
  '+': add,
  '-': subtract,
  'X': multiply,
  '/': divide,
}

class Calculator extends React.Component {
  constructor(props) {
    super(props);
    this.initialState = {
      total: null,
      new: 0,
      operator: null,
    }
    this.state = this.initialState;
    this.operate = this.operate.bind(this);
  }

  operate({val, type,}){
    // always add num to new
    if (type === 'num') {
      let newNum = String(this.state.new) + val;
      // validated number check, no multi decimal
      this.setState({
        new: (isNaN(newNum)) ? this.state.new : newNum,
      })
    }

    if (type === 'oper') {
      // operater after total but no new, just replaces/adds operator
      if (!!this.state.total && !this.state.new) {
        this.setState({
          operator: val,
        })
      }
      if (!!this.state.new) {
        // oper after new but no total, pushes new to total and adds oper
        if (!this.state.total && !this.state.operator) {
          this.setState({
            total: this.state.new,
            new: 0,
            operator: val,
          })
        }
        // post equal, total from before, new num before new oper -> replace tot
        if (!!this.state.total && !this.state.operator) {
          this.setState({
            total: this.state.new,
            new: 0,
            operator: val,
          })
        }
        // oper after new and total and oper, total from operation, new reset and oper replace
        if (!!this.state.total && !!this.state.operator) {
          this.setState({
            total: CALC_OPERATIONS[this.state.operator](this.state.total, this.state.new),
            new: 0,
            operator: val,
          })
        }
      }
    }

    if (type === 'equals' && !!this.state.new && !!this.state.total) {
      if (!!this.state.operator) {
        this.setState({
          total: CALC_OPERATIONS[this.state.operator](this.state.total, this.state.new),
          new: 0,
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
    { val: '.', type: 'num'},
    { val: 'X', type: 'oper'},
    { val: '/', type: 'oper'},
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


const Screen = (props) => {
  return(
    <div>

    </div>
  )
}

export default Calculator;
