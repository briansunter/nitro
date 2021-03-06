import "rxjs"
import React, {Component } from "react";
import {connect,StatelessComponent, Provider} from "react-redux";
import {View, Text} from "react-native";
import {applyMiddleware,createStore,Reducer} from "redux";
import {ActionsObservable,createEpicMiddleware, combineEpics, Epic } from 'redux-observable';

import Button from "react-native-button";

type Increment = {
  type: 'Increment'
};

type Decrement= {
  type: 'Decrement'
};

type CounterActions =  Increment | Decrement;

interface CounterState {
  count: number;
}

const counterEpic: Epic<CounterActions, CounterState> = (action$, store) =>
action$.ofType('Increment')
.delay(2000)
.map<Increment,Decrement>(action => ({type: 'Decrement'}));


interface Props {
  nums: number;
  onClick: any;
}

class Counter extends Component<Props, {}> {
  render() {
    const {nums, onClick} = this.props;
    return (
      <View>
      <Button onPress={onClick}>
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
  onClick: () => {
    dispatch({ type: 'Increment'});
  }
});

const counterReducer:Reducer<CounterState> = (state:CounterState, action:CounterActions) => {
  switch (action.type){
    case "Increment":
    return {count: state.count + 1};
    case "Decrement":
    return {count: state.count - 1};
    default:
    return state;
  }
};

  const epicMiddleware = createEpicMiddleware(counterEpic);
  const store = createStore(counterReducer,{count: 667},applyMiddleware(epicMiddleware))

  const CounterR = connect<{},Props,{}> (mapStateToProps,mapDispatchToProps)(Counter);

  export default class RootContainer extends Component<{},{}> {
    render() {
      return (
        <Provider store={store}>
        <View>
        <Text>"Counter"</Text>
        <CounterR />
        </View>
        </Provider>
      )
    }
  }
