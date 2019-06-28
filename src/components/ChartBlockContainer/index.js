import styled from 'styled-components';

const ChartBlockContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-around;
  overflow-x: hidden;
  padding: 15px 8px;

  @media (max-width: 700px) {
    padding: 5px;
  }
`;

export default ChartBlockContainer;
