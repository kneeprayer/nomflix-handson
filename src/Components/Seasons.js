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

  // eslint-disable-next-line react/jsx-key
  return <div>{seasons && seasons.map(item => <img src={`//image.tmdb.org/t/p/w300/${item.poster_path}`} />)}</div>;
};

export default Seasons;
