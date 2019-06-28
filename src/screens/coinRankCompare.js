import React from 'react';
import CoinHistory from 'containers/CoinHistory';
import Pager from 'components/Pager';
import Title from 'components/Title';
import Description from 'components/Description';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';

import Left from 'icons/arrow-left.svg';
import Right from 'icons/arrow-right.svg';

const Row = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const Img = styled.img`
  height: 16px;
  width: 16px;
`;

function Pagination({ page, showText, small, style }) {
  return (
    <Row style={style}>
      {page > 1 && (
        <Link to={`/rank/${page - 1}`} style={{ marginRight: 20 }}>
          <Pager small={small}>
            <Img src={Left} />
            {showText && <span style={{ marginLeft: 5 }}>Previous</span>}
          </Pager>
        </Link>
      )}
      <Link to={`/rank/${page + 1}`}>
        <Pager small={small}>
          {showText && <span style={{ marginRight: 5 }}>Next</span>}{' '}
          <Img src={Right} />
        </Pager>
      </Link>
    </Row>
  );
}

class CoinRankCompare extends React.Component {
  render() {
    const page = parseInt(this.props.match.params.page, 10) || 1;
    return (
      <div style={{ padding: '20px 0 50px' }}>
        <Helmet>
          <title>
            {`CoinRankingTrend | Compare ranking trend between cryptocurrencies`}
          </title>
          <meta
            name="description"
            content={`Compare ranking trend between cryptocurrencies, find the next rocket coin`}
          />
        </Helmet>
        <Row>
          <Title style={{ marginRight: 20 }}>Crypto Ranking Trend</Title>
          <Pagination page={page} small />
        </Row>
        <Description>1 month ranking and market cap trend</Description>
        <CoinHistory page={page} />
        <Pagination showText page={page} style={{ paddingLeft: 20 }} />
      </div>
    );
  }
}

export default CoinRankCompare;
