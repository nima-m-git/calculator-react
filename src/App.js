import React from 'react';
import './App.scss';

import { add, subtract, multiply, divide } from './operations';
import BUTTONS from './buttons';

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
      <div class='calculator'>
        <Screen vals={this.state}/>
        <Buttons operate={this.buttonPress}/>
      </div>
    )
  }
}


const Buttons = (props) => {
  return (
    <ul className='buttons'>
      {BUTTONS.map((btn) => 
        <li key={btn.val}>
          <button onClick={() => props.operate(btn)}>{btn.val}</button>
        </li>
      )}
    </ul>
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
    <div className='screen'>
      <div className='output'>
        {screen}
      </div>
    </div>
  )
}

export default Calculator;
