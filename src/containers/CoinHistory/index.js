import React from 'react';
import ChartBlock from 'components/ChartBlock';
import ChartBlockContainer from 'components/ChartBlockContainer';
import { connect } from 'react-redux';
import ReactEcharts from 'echarts-for-react';
import { getOption } from 'utils/chart';
import { slugToName } from 'utils/name';

import { CoinHistoryActions } from 'appRedux/coinHistory';
import { CoinDetailActions } from 'appRedux/coinDetail';

const RANDOM_COLORS = [
  '#4c6ef5',
  '#4c6ef5',
  '#4c6ef5',
  '#228be6',
  '#228be6',
  '#228be6',
  '#15aabf',
  '#15aabf',
  '#15aabf',
  '#12b886',
  '#20c997',
  '#38d9a9',
];

class CoinHistory extends React.PureComponent {
  componentDidMount() {
    this.props.setCoinPage(this.props.page);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.page !== this.props.page) {
      this.getCoinHistory(nextProps.page);
    }
    if (window) {
      window.scrollTo(0, 0);
    }
  }

  getCoinHistory = page => {
    this.props.setCoinPage(page);
  };

  getOption = coinData => {
    const { historyList } = this.props;
    const currentData = historyList.find(
      item => item[0].coinName === coinData.coinName
    );

    return getOption(
      currentData,
      coinData.coinCode,
      slugToName(coinData.coinName)
    );
  };

  onLinkClick = color => {
    this.props.clearDetail();
    this.props.setColor(color);
  };

  render() {
    const { coinList } = this.props;
    return (
      <ChartBlockContainer>
        {coinList.map((coinData, index) => {
          const color = RANDOM_COLORS[index];
          return (
            <ChartBlock
              backgroundColor={color}
              key={coinData.coinCode}
              link={`/${coinData.coinName}`}
              onLinkClick={() => this.onLinkClick(color)}
            >
              <ReactEcharts
                style={{ height: '350px', padding: '10px' }}
                option={this.getOption(coinData)}
              />
            </ChartBlock>
          );
        })}
      </ChartBlockContainer>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    historyList: state.coinHistory.historyList,
    coinList: state.coinList.list.slice(
      (ownProps.page - 1) * 9,
      ownProps.page * 9
    ),
  };
};

const mapDispatchToProps = dispatch => ({
  setCoinPage: page => dispatch(CoinHistoryActions.setCoinPage(page)),
  clearDetail: () => dispatch(CoinDetailActions.clearData()),
  setColor: color => dispatch(CoinDetailActions.setColor(color)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CoinHistory);
