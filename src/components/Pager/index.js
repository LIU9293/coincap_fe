import styled from 'styled-components';

const Pager = styled.div`
  cursor: pointer;
  height: 50px;
  width: 120px;
  border-radius: 8px;
  background-color: #dee2e6;
  color: #212529;
  display: flex;
  justify-content: center;
  align-items: center;
  text-decoration: none;

  &: hover {
    background-color: #ced4da;
  }
`;

export default Pager;
