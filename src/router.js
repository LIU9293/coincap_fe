import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';
import { CoinListActions } from 'appRedux/coinList';
import { connect } from 'react-redux';
import CoinHistory from 'containers/CoinHistory';

class AppRouter extends React.Component {
  componentWillMount() {
    this.props.getCoinList();
  }

  render() {
    return (
      <div id="app">
        <Router>
          <Switch>
            <Route
              exact
              path="/"
              component={() => <Redirect to={'/rank/1'} />}
            />
            <Route path="/rank/:page" component={CoinHistory} />
          </Switch>
        </Router>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  getCoinList: () => dispatch(CoinListActions.getCoinList()),
});

export default connect(null, mapDispatchToProps)(AppRouter);
