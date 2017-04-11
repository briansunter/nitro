import React, {Component } from "react";
import {Provider} from "react-redux";
import { View, Text } from "react-native";
import {applyMiddleware,createStore,Reducer} from "redux";
import { ActionsObservable,createEpicMiddleware, combineEpics, Epic } from 'redux-observable';

import * as Rx from "rxjs/Rx";
import "rxjs"
import Button from "react-native-button";

type Increment = {
    type: 'Increment'
};

type IncrementF= {
    type: 'IncrementF'
};

type CounterActions =  Increment | IncrementF;

interface CounterState {
    count: number;
}
const counterEpic: Epic<CounterActions, CounterState> = (action$, store) =>
    action$.ofType('Increment').map<Increment,IncrementF>(action => ({type: 'IncrementF'}));

const epicMiddleware = createEpicMiddleware(counterEpic)

const counterReducer:Reducer<CounterState> = (state:CounterState,action:CounterActions) => {
  return {count: state.count++};
}

const store = createStore(counterReducer,{count: 0},applyMiddleware(epicMiddleware))

interface Props {
  nums: number;
  max?: number;
  message?: string | number;
  alert?: string | number;
}

interface State {
  counter: number;
}

interface Foo {};

export default class HelloWorld  extends Component<Foo,Foo> {
  static defaultProps = {}
  render() {
    return (<View>
      <Provider store={store}>
      <Counter nums={2}/>
      </Provider>

      <Text> "Hello FUCK"</Text></View>)
  }
}

class Counter extends Component<Props, State> {
  static defaultProps = {
    message: "Press here",
    alert: "Hello world!",
  };

  state = {
    counter: 0,
  };

  onPress = () => {
    const counter = this.state.counter + 1;
    if (counter < this.props.max) {
      return this.setState({ counter });
    }
    // Alert after re-rendering
    return this.setState({ counter: 0 }, () => alert(this.props.alert));
  }

  render() {
    const { message } = this.props;
    const { counter } = this.state;

    return (
      <View>
      <Button onPress={this.onPress}>
      {message} ({counter})
      </Button>
      </View>
    );
  }
}
