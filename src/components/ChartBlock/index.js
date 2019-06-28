import React from 'react';
import styled from 'styled-components';
import Arrow from 'icons/arrow-up-right.svg';
import { Link } from 'react-router-dom';

const Tilt = styled.div`
  display: flex;
  flex: 1;
  min-width: 33%;
  position: relative;

  @media (max-width: 700px) {
    min-width: 100%;
  }
`;

const GalleryItem = styled.div`
  display: flex;
  height: 350px;
  min-width: 25%;
  flex-direction: column;
  margin: 15px;
  flex: 1 1 0%;
  border-radius: 0px;
  background-color: ${props => props.backgroundColor};
`;

const LinkButton = styled.img`
  position: absolute;
  right: 20px;
  top: 20px;
  width: 30px;
  height: 30px;
  color: white;
`;

const ChartBlock = ({ children, link, onLinkClick, backgroundColor }) => (
  <Tilt>
    <GalleryItem backgroundColor={backgroundColor}>{children}</GalleryItem>
    {link && (
      <Link to={link}>
        <LinkButton src={Arrow} onClick={onLinkClick} />
      </Link>
    )}
  </Tilt>
);

export default ChartBlock;
