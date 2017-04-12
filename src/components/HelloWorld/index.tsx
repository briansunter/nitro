import React, { Component } from "react";
import {connect,StatelessComponent, Provider} from "react-redux";
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

const epicMiddleware = createEpicMiddleware(counterEpic);

const counterReducer:Reducer<CounterState> = (state:CounterState,action:CounterActions) => {
  return {count: state.count + 1};
}

const store = createStore(counterReducer,{count: 667},applyMiddleware(epicMiddleware))

interface Props {
  nums: number;
  onClick1: any;
  max?: number;
  message?: string | number;
  alert?: string | number;
}

interface State {
  counter: number;
}

interface Foo {};

class Counter extends Component<Props, {}> {
  render() {
    const { nums, onClick1} = this.props;
    return (
      <View>
      <Button onPress={() => onClick1()}>
      ({nums})
      </Button>
      </View>
    );
  }
}

const mapStateToProps = (state: any, ownProp? :any):any=> ({
    nums: state.count
});

const mapDispatchToProps = (dispatch: any):any=> ({
    onClick1: () => {
        dispatch({ type: 'Increment'});
    }
});

const Counter1 = connect<{},Props,{}> (mapStateToProps,mapDispatchToProps)(Counter);


export default class HelloWorld extends Component<Foo,Foo> {
  render() {
    return (
      <View>
      <Provider store={store}>
      <Counter1 />
      </Provider>
      <Text> "Hello FUCK"</Text></View>)
  }
}
