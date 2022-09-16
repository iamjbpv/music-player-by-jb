import Search from "../SearchBar/SearchBar";
import TrackItem from "../Track/TrackItem";
import { Fragment, useEffect, useState } from "react";
import { removeTrack, searchTrack } from "../../redux/actions/track";
import { connect } from "react-redux";
import { setTrack } from "../../redux/actions/control";
import {
  getMyPlayList,
  createPlayList,
  addTrackToPlaylist,
  getMyTracks,
  getMyPlaylistTracks,
} from "../../redux/actions/playlist";
import { useNavigate, useParams } from "react-router-dom";

import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

const MyTracks = (props: {
  searchTrack: Function;
  audiocontrols: any;
  setTrack: Function;
  getMyPlayList: Function;
  getMyTracks: Function;
  createPlayList: Function;
  addTrackToPlaylist: Function;
  removeTrack: Function;
  getMyPlaylistTracks: Function;
}) => {
  const { playListId } = useParams();

  const {
    getMyTracks,
    searchTrack,
    setTrack,
    removeTrack,
    getMyPlaylistTracks,
  } = props;
  const [trackList, setTrackList] = useState([]);
  const [trackListOriginal, setTrackListOriginal] = useState([]);
  const [sortByArtistName, setSortByArtistName] = useState(0);
  const [sortByTrackName, setsortByTrackName] = useState(0);
  const [sortByTrackNumber, setSortByTrackNumber] = useState(true);

  const quickSearch = (arr: any, searchString: any) => {
    return arr.filter(function (obj: any) {
      return (
        obj.trackName.toLowerCase().includes(searchString.toLowerCase()) ||
        obj.artistName.toLowerCase().includes(searchString.toLowerCase())
      );
    });
  };

  const handleSearchMyTracks = async (searchString: String) => {
    if (searchString.length == 0) {
      setTrackList(trackListOriginal);
    } else {
      let result = quickSearch(trackList, searchString);

      setTrackList(result);
    }
  };

  const handlePlayAudio = (trackDetails: any) => {
    let customFormat = {
      ...trackDetails,
      customFormat: true,
    };
    setTrack(customFormat);
  };

  const handleRemoveToPlayList = async (trackDetails: any) => {
    let res = await removeTrack(trackDetails._id);
    if (res.status === 200) {
      let newArr = trackList.filter((track: any) => {
        return track._id !== trackDetails._id;
      });
      setTrackList(newArr);
    }

    // }

    // setModalAddToPlaylist(true);
  };
  useEffect(() => {
    const fetchMyTracks = async () => {
      let res;
      if (!playListId) {
        res = await getMyTracks({ username: "jebeekun" });
      } else {
        res = await getMyPlaylistTracks({
          username: "jebeekun",
          playListId: playListId,
          sortByArtistName: sortByArtistName,
          sortByTrackName: sortByTrackName,
        });
      }

      if (res.status === 200) {
        let count = 0;

        const modifiedTracks = res.data.map((track: any) => {
          count++;
          return {
            ...track,
            trackNumber: count,
          };
        });
        setTrackList(modifiedTracks);
        setTrackListOriginal(modifiedTracks);
        // setTrackList(res.data.tracks.items);
      }
    };
    fetchMyTracks();
  }, [sortByArtistName, sortByTrackName, playListId]);

  const handleTrackNumberSort = (status: any) => {
    setSortByTrackNumber(status);
    let result;
    if (status === true) {
      result = trackList.sort((a: any, b: any) =>
        a.trackNumber > b.trackNumber ? 1 : -1
      );
    } else {
      result = trackList.sort((a: any, b: any) =>
        a.trackNumber < b.trackNumber ? 1 : -1
      );
    }
    // console.log(x);
    setTrackList(result);
  };

  return (
    <div>
      <Search
        handleSearchTrack={handleSearchMyTracks}
        placeholder={"Search your music library"}
      />
      <div className="content-view-wrapper">
        <Fragment>
          <div className="sort-container">
            <Button
              variant="contained"
              style={{ marginRight: 5 }}
              id="basic-button"
              onClick={() =>
                handleTrackNumberSort(sortByTrackNumber === true ? false : true)
              }
            >
              Sort By Track Number :{" "}
              {sortByTrackNumber === false ? "ASC" : "DESC"}
            </Button>

            <Button
              variant="contained"
              style={{ marginRight: 5 }}
              id="basic-button"
              onClick={() => {
                setsortByTrackName(sortByTrackName === -1 ? 1 : -1);
              }}
            >
              Sort By TrackName : {sortByTrackName === -1 ? "ASC" : "DESC"}
            </Button>
            <Button
              variant="contained"
              id="basic-button"
              onClick={() => {
                setSortByArtistName(sortByArtistName === -1 ? 1 : -1);
              }}
            >
              Sort By ArtistName : {sortByArtistName === -1 ? "ASC" : "DESC"}
            </Button>
          </div>
          {trackList &&
            trackList.map((trackItem: any) => {
              return (
                <TrackItem
                  handleAddToPlayList={handleRemoveToPlayList}
                  trackDetails={trackItem}
                  handlePlayAudio={handlePlayAudio}
                  local={true}
                />
              );
            })}
        </Fragment>
      </div>
    </div>
  );
};

const mapStateToProps = (state: { audiocontrols: any }) => ({
  audiocontrols: state.audiocontrols,
});
export default connect(mapStateToProps, {
  searchTrack,
  setTrack,
  getMyPlayList,
  getMyTracks,
  createPlayList,
  addTrackToPlaylist,
  removeTrack,
  getMyPlaylistTracks,
})(MyTracks);
