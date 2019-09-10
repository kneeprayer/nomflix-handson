/* eslint-disable prettier/prettier */
/* eslint-disable react/jsx-key */
/* eslint-disable no-console */
/* eslint-disable react/prop-types */

import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { tvApi } from "../api";

const Seasson = styled.ul`
  display: flex;
`;

const Container = styled.div`
  width: 300px;
  min-height: 450px;
  justify-content: center;
  background-image: url(${props => props.path});
  background-repeat: no-repeat;
  background-position: center top;
  margin: 20px 0;
  &:hover > span {
    font-size: 20px;
    color: white;
  }
`;

const Title = styled.h1`
  text-align: center;
  width: 300px;
  font-size: 18px;
  color: red;
`;

const Overview = styled.p`
  color: grey;
  width: 300px;
  margin-top: 50px;
  font-size: 14px;
  text-align: justify;
  vertical-align: text-bottom;
`;

const SeasonInfo = ({ name, path, overview }) => (
  <li>
    <Container path={path ? `https://image.tmdb.org/t/p/w300${path}` : require("../assets/noPosterSmall.jpg")}>
      <Title>{name}</Title>
      <Overview>{overview}</Overview>
    </Container>
  </li>
);

const Seasons = ({ match }) => {
  const [seasons, setSeasons] = useState(null);
  const parsedId = parseInt(match.params.id);

  useEffect(() => {
    const callApi = async () => {
      try {
        const { data } = await tvApi.showDetail(parsedId);
        setSeasons(data.seasons);
      } catch (e) {
        console.log(e);
      }
    };
    callApi();
  }, []);

  return (
    <div>
      <Seasson>
        {seasons &&
          seasons.map(item => <SeasonInfo name={item.name} path={item.poster_path} overview={item.overview} />)}
      </Seasson>
    </div>
  );
};

Seasons.propTypes = {
  name: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
  overview: PropTypes.string.isRequired
};

export default Seasons;
