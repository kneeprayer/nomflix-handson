/* eslint-disable prettier/prettier */
/* eslint-disable react/jsx-key */
/* eslint-disable no-console */
/* eslint-disable react/prop-types */

import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { tvApi } from "../api";

const Container = styled.div`
  display: flex;
  width: 300px;
  min-height: 460px;
  justify-content: center;
  background-image: url(${props => props.path});
  background-repeat: no-repeat;
  background-position: center top;
  margin-bottom: 10px;
`;

const Title = styled.h1`
  font-size: 18px;
  color: red;
`;

const Overview = styled.span`
  margin-top 50px;
  font-size: 14px;
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
      <ul>
        {seasons &&
          seasons.map(item => <SeasonInfo name={item.name} path={item.poster_path} overview={item.overview} />)}
      </ul>
    </div>
  );
};

Seasons.propTypes = {
  name: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
  overview: PropTypes.string.isRequired
};

export default Seasons;
