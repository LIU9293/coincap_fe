import React from 'react';
import ChartBlock from 'components/ChartBlock';
import ChartBlockContainer from 'components/ChartBlockContainer';
import { connect } from 'react-redux';
import { CoinHistoryActions } from 'appRedux/coinHistory';
import ReactEcharts from 'echarts-for-react';
import { range } from 'ramda';
import numeral from 'numeral';
import moment from 'moment';

const RANDOM_COLORS = [
  '#ff6b6b',
  '#f06595',
  '#cc5de8',
  '#845ef7',
  '#5c7cfa',
  '#339af0',
  '#22b8cf',
  '#20c997',
  '#51cf66',
  '#94d82d',
  '#fcc419',
  '#ff922b',
];

class CoinHistory extends React.PureComponent {
  componentDidMount() {
    this.props.setCoinPage(this.props.page);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.page !== this.props.page) {
      this.getCoinHistory(nextProps.page);
    }
  }

  getCoinHistory = page => {
    this.props.setCoinPage(page);
  };

  getOption = coinData => {
    const { historyList } = this.props;
    const currentData = historyList.find(
      item => item[0].coinCode === coinData.coinCode
    );

    if (!currentData) {
      return {
        title: {
          text: coinData.coinName,
        },
        xAxis: {
          type: 'category',
        },
        yAxis: {
          type: 'value',
        },
        series: [],
      };
    }

    return {
      title: {
        text: coinData.coinName,
      },
      tooltip: {
        trigger: 'axis',
      },
      grid: {
        left: '3%',
        right: '3%',
        bottom: '3%',
        containLabel: true,
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        axisTick: {
          show: false,
        },
        axisLine: {
          lineStyle: {
            color: '#f8f9fa',
          },
        },
        data: currentData.map(i =>
          moment(i.recordDate, 'MMM DD, YYYY').format('L')
        ),
      },
      yAxis: [
        {
          type: 'value',
          minInterval: 1,
          inverse: true,
          min: this.getRankMin(currentData),
          max: this.getRankMax(currentData),
          axisTick: {
            show: false,
          },
          axisLine: {
            lineStyle: {
              color: '#f8f9fa',
            },
          },
          splitLine: {
            show: false,
          },
          axisLabel: {
            color: '#f8f9fa',
          },
        },
        {
          type: 'value',
          min: function(value) {
            return value.min - (value.max - value.min) * 0.1;
          },
          max: function(value) {
            return value.max * 1.8;
          },

          axisTick: {
            show: false,
          },
          axisLine: {
            lineStyle: {
              color: '#f8f9fa',
            },
          },
          axisLabel: {
            formatter: function(item) {
              return numeral(item).format('($0a)');
            },
            color: '#f8f9fa',
          },
          splitLine: {
            show: false,
          },
        },
      ],
      series: [
        {
          name: 'Rank',
          type: 'line',
          step: 'end',
          yAxisIndex: 0,
          data: currentData.map(i => i.coinRank),
          lineStyle: {
            normal: {
              color: '#f1f3f5',
            },
          },
        },
        {
          name: 'Market Cap',
          yAxisIndex: 1,
          type: 'line',
          smooth: true,
          areaStyle: {
            normal: {
              color: '#f1f3f5',
            },
          },
          data: currentData.map(i => i.marketCap),
          lineStyle: {
            normal: {
              color: '#f1f3f5',
            },
          },
        },
      ],
      visualMap: [
        {
          show: false,
          type: 'continuous',
          seriesIndex: 1,
          min: 0,
          max: 400,
        },
      ],
    };
  };

  getRankMax = dataList => {
    const ranks = dataList.map(item => item.coinRank);
    const realMax = Math.max(...ranks);
    if (realMax > 10) {
      return realMax + 5;
    }
    return 15;
  };

  getRankMin = dataList => {
    const ranks = dataList.map(item => item.coinRank);
    const realMin = Math.min(...ranks);
    if (realMin > 10) {
      return realMin - 5;
    }
    return 1;
  };

  getYAxis = dataList => {
    const ranks = dataList.map(item => item.coinRank);
    const realMin = Math.min(...ranks);
    const realMax = Math.max(...ranks);
    if (realMax === realMin && realMax === 1) {
      return [1, 2, 3, 4, 5];
    }
    return range(realMin, realMax);
  };

  render() {
    const { coinList } = this.props;
    return (
      <ChartBlockContainer>
        {coinList.map((coinData, index) => {
          return (
            <ChartBlock
              backgroundColor={RANDOM_COLORS[index]}
              key={coinData.coinCode}
            >
              <ReactEcharts
                style={{ height: '390px', padding: '10px' }}
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
  const page = ownProps.match.params.page || 1;
  return {
    page,
    historyList: state.coinHistory.historyList,
    coinList: state.coinList.list.slice((page - 1) * 9, 9),
  };
};

const mapDispatchToProps = dispatch => ({
  setCoinPage: page => dispatch(CoinHistoryActions.setCoinPage(page)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CoinHistory);
