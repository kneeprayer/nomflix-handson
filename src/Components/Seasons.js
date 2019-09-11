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
  flex-wrap: wrap;
  align-items: strach;
`;

const Container = styled.div`
  width: 300px;
  min-height: 450px;
  justify-content: center;
  background-image: url(${props => props.path});
  background-repeat: no-repeat;
  background-size: auto;
  background-position: center top;
  margin: 20px 10px;
  -webkit-transition: width 0.8s; /* Safari prior 6.1 */
  transition: width 0.8s;
  &:hover {
    width: 350px;
    height: 520px;
  }

  &:hover > p {
    color: white;
    font-weight: 600;
    margin-top: 150px;
  }
`;

const Title = styled.h1`
  text-align: center;
  width: 300px;
  font-size: 18px;
  color: red;
  margin-top: 10px;
`;

const Overview = styled.p`
  color: grey;
  width: 300px;
  margin-top: 100px;
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
