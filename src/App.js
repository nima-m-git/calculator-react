import React from 'react';
import { add, subtract, multiply, divide } from './operations';

const CALC_OPERATIONS = {
  '+': add,
  '-': subtract,
  '×': multiply,
  '÷': divide,
}


const operationReducer = (state, action) => {
  let {val, type} = action;

  switch (type) {
    case 'num':
      let currentNum = (String(state.current) === '0' && val !== '.') ? val : String(state.current) + val; // sub zero except if decimal added
      return {
        ...state,
        total: (state.operator) ? state.total : null, //remove total if no oper
        current: (isNaN(currentNum)) ? state.current : currentNum,  // validated number check, no multi decimal
      }
    case 'oper':
      // operater after total but no current, just replaces/adds operator
      if (state.total && !state.current) {
        return {
          ...state,
          operator: val,
        }
      } 
      if (state.current) {
        // oper after current but no total, pushes current to total and adds oper
        if (!state.total && !state.operator) {
          return {
            ...state,
            total: state.current,
            current: 0,
            operator: val,
          }
        // post equal, total from before, current num before current oper -> replace tot
        } else if (state.total && !state.operator) {
          return {
            ...state,
            total: state.current,
            current: 0,
            operator: val,
          }
          // oper after current and total and oper, total from operation, current reset and oper replace
        } else if (state.total && state.operator) {
          return {
            ...state,
            total: CALC_OPERATIONS[state.operator](state.total, state.current),
            current: 0,
            operator: val,
          }
        } 
      }
      return state
      
    case 'equals':
      if (state.current && state.total) {
        if (state.operator) {
          return {
            ...state,
            total: CALC_OPERATIONS[state.operator](state.total, state.current),
            current: 0,
            operator: null,
          }
        } else {
          return {
            ...state,
            total: null,
          }
        }
      }
      return {
        state
      }
  
    case 'clear': 
      return {
        //SUB initialState
        total: null,
        current: 0,
        operator: null,
      }

    default:
      return state;
  }
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
    this.buttonPress = this.buttonPress.bind(this);
  }

  
  buttonPress({val, type,}) {
    const action = {
      type,
      val,
    };
    const newState = operationReducer(this.state, action);
    this.setState(newState);
  }


  render() {
    return (
      <div>
        <Screen vals={this.state}/>
        <Buttons operate={this.buttonPress}/>
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
