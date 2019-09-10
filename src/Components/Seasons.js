import React, { useEffect, useState } from "react";
import { tvApi } from "../api";

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
        seasons.map(item => {
          item.name && <h1>{`Name : ${item.name}`}</h1>;
          item.poster_path && <img src={`//image.tmdb.org/t/p/w300/${item.poster_path}`} width="150px" />;
          item.overview && <p>{`Overview : ${item.overview}`}</p>;
        })}
    </div>
  );
};

export default Seasons;
