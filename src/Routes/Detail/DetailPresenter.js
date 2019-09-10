import React from "react";
import { Link, Route, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import styled from "styled-components";
import Helmet from "react-helmet";
import Loader from "../../Components/Loader";
import Videos from "../../Components/Videos";
import Productions from "../../Components/Productions";
import Seasons from "../../Components/Seasons";

const Container = styled.div`
  height: calc(100vh - 50px);
  width: 100%;
  position: relative;
  padding: 50px;
`;

const Backdrop = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url(${props => props.bgImage});
  background-position: center center;
  background-size: cover;
  filter: blur(3px);
  opacity: 0.5;
  z-index: 0;
`;

const Content = styled.div`
  display: flex;
  width: 100%;
  position: relative;
  z-index: 1;
  height: 100%;
`;

const Cover = styled.div`
  width: 30%;
  background-image: url(${props => props.bgImage});
  background-position: center center;
  background-size: cover;
  height: 100%;
  border-radius: 5px;
`;

const Data = styled.div`
  width: 70%;
  margin-left: 10px;
`;

const Title = styled.h3`
  font-size: 32px;
`;

const IMDb = styled.span`
  margin: 6px 15px;
`;

const ItemContainer = styled.div`
  margin: 20px 0;
`;

const Item = styled.span``;

const Divider = styled.span`
  margin: 0 10px;
`;

const Overview = styled.p`
  font-size: 12px;
  opacity: 0.7;
  line-height: 1.5;
  width: 50%;
`;

const InsideMenu = styled.div`
  margin: 20px 0px;
`;

const List = styled.ul`
  display: flex;
`;

const Itemli = styled.li`
  cursor: pointer;
  margin-right: 20px;
  text-transform: uppercase;
  font-weight: 600;
  border: 2px solid #34495e;
  padding: 10px;
  border-radius: 3px;
  background-color: ${props => (props.active ? "#34495e" : "transparent")};
  color: white;
  min-width: 120px;
  text-align: center;
`;

const DetailPresenter = withRouter(({ location: { pathname }, result, loading }) =>
  loading ? (
    <>
      <Helmet>
        <title>Loading | Nomflix</title>
      </Helmet>
      <Loader />
    </>
  ) : (
    <Container>
      <Helmet>
        <title>{result.original_title ? result.original_title : result.original_name} | Nomflix</title>
      </Helmet>
      <Backdrop bgImage={`https://image.tmdb.org/t/p/original${result.backdrop_path}`} />
      <Content>
        <Cover
          bgImage={
            result.poster_path
              ? `https://image.tmdb.org/t/p/original${result.poster_path}`
              : require("../../assets/noPosterSmall.jpg")
          }
        />
        <Data>
          <Title>
            {result.original_title ? result.original_title : result.original_name}
            <IMDb>
              {result.imdb_id && (
                <a href={`https://www.imdb.com/title/${result.imdb_id}`}>
                  <img
                    src="https://m.media-amazon.com/images/G/01/IMDb/BG_rectangle._CB1509060989_SY230_SX307_AL_.png"
                    alt="IMDb url"
                    height="26"
                    width="52"
                  />
                </a>
              )}
            </IMDb>
          </Title>
          <ItemContainer>
            <Item>
              {result.release_date ? result.release_date.substring(0, 4) : result.first_air_date.substring(0, 4)}
            </Item>
            <Divider>•</Divider>
            <Item>{result.runtime ? result.runtime : result.episode_run_time[0]} min</Item>
            <Divider>•</Divider>
            <Item>
              {result.genres &&
                result.genres.map((genre, index) =>
                  index === result.genres.length - 1 ? genre.name : `${genre.name} / `
                )}
            </Item>
          </ItemContainer>
          <Overview>{result.overview}</Overview>
          <InsideMenu>
            <List>
              <Itemli
                active={
                  result.original_title
                    ? pathname === `/movie/${result.id}/videos`
                    : pathname === `/show/${result.id}/videos`
                }
              >
                <Link to={result.original_title ? `/movie/${result.id}/videos` : `/show/${result.id}/videos`}>
                  Videos
                </Link>
              </Itemli>
              <Itemli
                active={
                  result.original_title
                    ? pathname === `/movie/${result.id}/productions`
                    : pathname === `/show/${result.id}/productions`
                }
              >
                <Link to={result.original_title ? `/movie/${result.id}/productions` : `/show/${result.id}/productions`}>
                  Productions
                </Link>
              </Itemli>
              {result.original_title && (
                <Itemli active={result.original_title ? false : pathname === `/show/${result.id}/seasons`}>
                  <Link to={result.original_title ? false : `/show/${result.id}/seasons`}>Seasons</Link>
                </Itemli>
              )}
            </List>
          </InsideMenu>
          <Route path={result.original_title ? `/movie/:id/videos` : `/show/:id/videos`} exact component={Videos} />
          <Route
            path={result.original_title ? `/movie/:id/productions` : `/show/:id/productions`}
            exact
            component={Productions}
          />
          {parseInt(result.number_of_seasons) > 0 && <Route path={`/show/:id/seasons`} exact component={Seasons} />}
        </Data>
      </Content>
    </Container>
  )
);

DetailPresenter.propTypes = {
  result: PropTypes.object,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.string
};

export default DetailPresenter;
