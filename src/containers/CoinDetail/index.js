import React from 'react';
import { connect } from 'react-redux';
import { CoinDetailActions } from 'appRedux/coinDetail';
import ChartBlock from 'components/ChartBlock';
import Change from 'components/Change';
import ReactEcharts from 'echarts-for-react';
import { getOption } from 'utils/chart';
import { slugToName } from 'utils/name';

class CoinDetail extends React.PureComponent {
  componentDidMount() {
    const { coin, getCoinDetail } = this.props;
    getCoinDetail(coin);
  }

  getOption = () => {
    const { coinDetailData, coin, coinList } = this.props;

    const name = slugToName(coin);
    let code = name;
    if (coinList.length > 0) {
      const target = coinList.find(item => item.coinName === coin);
      code = target.coinCode;
    }
    return getOption(coinDetailData, code, name);
  };

  getChagne = day => {
    const { coinDetailData } = this.props;
    if (!coinDetailData || coinDetailData.length === 0) {
      return 0;
    }

    const lastRank = coinDetailData[coinDetailData.length - 1].coinRank;

    if (!coinDetailData[coinDetailData.length - day]) {
      return 0;
    }
    const targetDayRank = coinDetailData[coinDetailData.length - day].coinRank;
    return lastRank - targetDayRank;
  };

  render() {
    const { color } = this.props;
    return (
      <div>
        <ChartBlock backgroundColor={color}>
          <ReactEcharts
            style={{ height: '500px', padding: '10px' }}
            option={this.getOption()}
          />
        </ChartBlock>
        {[7, 30, 180].map(i => (
          <Change day={i} key={i} change={this.getChagne(i)} />
        ))}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  coinDetailData: state.coinDetail.data,
  color: state.coinDetail.color,
  coinList: state.coinList.list,
});

const mapDispatchToProps = dispatch => ({
  getCoinDetail: coinName => dispatch(CoinDetailActions.getData({ coinName })),
});

export default connect(mapStateToProps, mapDispatchToProps)(CoinDetail);
