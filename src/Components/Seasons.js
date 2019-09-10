/* eslint-disable react/jsx-key */
/* eslint-disable no-console */
/* eslint-disable react/prop-types */

import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { tvApi } from "../api";

const Container = styled.div`
  width: 300px;
  display: flex;
  justify-content: center;
  background-image: url(${props => props.path});
  margin-bottom: 500px;
`;

const Title = styled.h1`
  position: fixed;
  color: #ffffff;
  top: 5px;
`;

const Overview = styled.h1`
  position: fixed;
  color: #000000;
  justify-content: center;
  bottom: -5px;
`;

const SeasonInfo = ({ name, path, overview }) => (
  <Container path={path}>
    <Title>{name}</Title>
    <Overview>{overview}</Overview>
  </Container>
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
      {seasons &&
        seasons.map(item => (
          <SeasonInfo
            name={item.name}
            path={`//image.tmdb.org/t/p/w300/${item.poster_path}`}
            overview={item.overview}
          />
        ))}
    </div>
  );
};

Seasons.propTypes = {
  name: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
  overview: PropTypes.string.isRequired
};

export default Seasons;
