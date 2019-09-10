import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { tvApi } from "../api";

const SeasonInfo = ({ name, path, overview }) => (
  <>
    <h1>Name : {`${name}`}</h1>
    <img src={`${path}`} width="150px" />
    <p>Overview : {`${overview}`}</p>
  </>
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
          // eslint-disable-next-line react/jsx-key
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
