import React from 'react';
import styled from 'styled-components';

import Up from 'icons/chevrons-up.svg';
import Down from 'icons/chevrons-down.svg';

const Img = styled.img`
  height: 12px;
  width: 12px;
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
  color: ${props => props.color};
`;

function ChangeFigure({ change }) {
  if (change > 0) {
    return (
      <Row color={'#37b24d'}>
        <Img src={Down} />
        {`-${change}`}
      </Row>
    );
  }

  if (change < 0) {
    return (
      <Row color={'#f03e3e'}>
        <Img src={Up} />
        {`+${Math.abs(change)}`}
      </Row>
    );
  }

  return '0';
}

function Change({ change, day }) {
  return (
    <Row style={{ margin: '10px 15px', fontWeight: 'bold' }}>
      <div style={{ width: 220 }}>{`${day} days ranking change:`}</div>
      <ChangeFigure change={change} />
    </Row>
  );
}

export default Change;
