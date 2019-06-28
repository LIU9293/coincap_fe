import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import CoinDetail from 'containers/CoinDetail';
import Title from 'components/Title';
import Description from 'components/Description';
import { slugToName } from 'utils/name';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';

import Back from 'icons/arrow-left.svg';
import Home from 'icons/home.svg';

const Icon = styled.img.attrs({ alt: 'icon' })`
  height: 30px;
  width: 30px;
  margin: 0 10px;
`;

const IconArea = styled.div`
  display: flex;
  flex-direction: row;
  margin: 20px 0 0 10px;
`;

class CoinRank extends React.PureComponent {
  render() {
    const { coin } = this.props.match.params;
    const { coinList } = this.props;
    const index = coinList.findIndex(i => i.coinName === coin);
    const page = parseInt(index / 9, 10) + 1;
    return (
      <div>
        <Helmet>
          <title>
            {`${slugToName(coin)} Ranking Trend | CoinRankingTrend`}
          </title>
          <meta
            name="description"
            content={`Ranking trend of ${slugToName(
              coin
            )}, find the next rocket coin`}
          />
        </Helmet>
        <IconArea>
          <Link to={`/`}>
            <Icon src={Home} />
          </Link>
          <Link to={`/rank/${page}`}>
            <Icon src={Back} />
          </Link>
        </IconArea>
        <Title style={{ marginTop: '20px' }}>
          {`${slugToName(coin)} Trend`}
        </Title>
        <Description>{'6 month market cap and rank trend'}</Description>
        <CoinDetail coin={coin} />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  coinList: state.coinList.list,
});

export default connect(mapStateToProps)(CoinRank);
