import React from 'react';
import CoinHistory from 'containers/CoinHistory';
import Pager from 'components/Pager';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Row = styled.div`
  margin: 20px auto 40px;
  display: flex;
  flex-direction: row;
  width: 250px;
  justify-content: space-between;
  align-items: center;
`;

class CoinRankCompare extends React.Component {
  render() {
    const page = parseInt(this.props.match.params.page, 10) || 1;
    return (
      <div>
        <CoinHistory page={page} />
        <Row>
          {page > 1 && (
            <Link to={`/rank/${page - 1}`}>
              <Pager>上一页</Pager>
            </Link>
          )}
          <Link to={`/rank/${page + 1}`}>
            <Pager>下一页</Pager>
          </Link>
        </Row>
      </div>
    );
  }
}

export default CoinRankCompare;
