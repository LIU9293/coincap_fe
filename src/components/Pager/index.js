import styled from 'styled-components';

const Pager = styled.div`
  cursor: pointer;
  height: ${props => (props.small ? '40px' : '50px')};
  width: ${props => (props.small ? '100px' : '140px')};
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
