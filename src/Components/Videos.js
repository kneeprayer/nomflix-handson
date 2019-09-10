import React, { useEffect, useState } from "react";
import { movieApi, TVApi } from "../api";

const Videos = ({ location, match }) => {
  const [isMovie, setIsMovie] = useState(location.pathname.includes("/movie/"));
  const [videos, setVideos] = useState(null);
  const parsedId = parseInt(match.params.id);

  useEffect(() => {
    const callApi = async () => {
      try {
        if (isMovie) {
          const {
            data: {
              videos: { results }
            }
          } = await movieApi.movieDetail(parsedId);
          setVideos(results);
        } else {
          const {
            data: {
              videos: { results }
            }
          } = await TVApi.showDetail(parsedId);
          setVideos(results);
        }
      } catch (e) {
        console.log(e);
      }
    };
    callApi();
  }, []);

  return (
    <div>
      {videos &&
        videos.map(item => (
          <iframe
            key={item.id}
            title={item.key}
            type="text/html"
            width="400"
            height="250"
            src={`//www.youtube.com/embed/${item.key}`}
            frameBorder="0"
            allow="autoplay; encrypted-media; gyroscope; accelerometer"
            allowFullScreen="true"
          ></iframe>
        ))}
    </div>
  );
};

export default Videos;
