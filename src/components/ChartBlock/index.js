import React from 'react';
import styled from 'styled-components';

const Tilt = styled.div`
  display: flex;
  flex: 1;
  min-width: 33%;

  @media (max-width: 700px) {
    min-width: 100%;
  }
`;

const GalleryItem = styled.div`
  display: flex;
  height: 350px;
  min-width: 25%;
  flex-direction: column;
  margin: 5px;
  flex: 1 1 0%;
  border-radius: 14px;
  background-color: ${props => props.backgroundColor};
`;

const ChartBlock = ({ children, backgroundColor }) => (
  <Tilt>
    <GalleryItem backgroundColor={backgroundColor}>{children}</GalleryItem>
  </Tilt>
);

export default ChartBlock;
