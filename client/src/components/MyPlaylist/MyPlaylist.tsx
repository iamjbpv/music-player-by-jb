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
  updateMyPlaylist,
  removePlaylist,
} from "../../redux/actions/playlist";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import bgImage from "../../assets/bg.jpg";
import { TextField } from "@mui/material";
import { Link } from "react-router-dom";
import { useNavigate, useParams } from "react-router-dom";

const MyPlaylist = (props: {
  getMyPlayList: Function;
  updateMyPlaylist: Function;
  removePlaylist: Function;
}) => {
  const navigate = useNavigate();
  const { getMyPlayList, updateMyPlaylist, removePlaylist } = props;
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [playList, setPlaylist] = useState([]);
  const [playListOriginal, setPlayListOriginal] = useState([]);

  const quickSearch = (arr: any, searchString: any) => {
    return arr.filter(function (obj: any) {
      return obj.name.toLowerCase().includes(searchString.toLowerCase());
    });
  };

  const handleSearchMyPlaylist = async (searchString: String) => {
    if (searchString.length == 0) {
      setPlaylist(playListOriginal);
    } else {
      let result = quickSearch(playList, searchString);

      setPlaylist(result);
    }
  };

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    // OR
    event.preventDefault();
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const handleDoubleClick = (e: any, id: any) => {
    e.stopPropagation();
    // OR
    e.preventDefault();

    let arr: any = playList.map((item: any) => {
      if (item._id === id) {
        return {
          ...item,
          isEditing: true,
        };
      } else {
        return item;
      }
    });
    setPlaylist(arr);
  };
  const handleDeletePlaylist = async (e: any, id: any) => {
    e.stopPropagation();
    // OR
    e.preventDefault();

    let res = await removePlaylist(id);
    if (res.status === 200) {
      let arr: any = playList.filter((item: any) => {
        if (item._id !== id) {
          return item;
        }
      });
      setPlaylist(arr);
    }
  };

  const handleInput = async (e: any, id: string) => {
    const res = await updateMyPlaylist({ id, name: e.target.value });

    if (res.status === 200) {
      let arr: any = playList.map((item: any) => {
        if (item._id === id) {
          return {
            ...item,
            name: e.target.value,
            isEditing: false,
          };
        } else {
          return item;
        }
      });
      setPlaylist(arr);
    }
  };

  const handleClickPlaylist = (trackItem: any) => {
    navigate(`/my-playlist/${trackItem._id}`);
  };

  useEffect(() => {
    const fetchMyPlaylist = async () => {
      const res = await getMyPlayList({ username: "jebeekun" });

      if (res.status === 200) {
        let count = 0;

        const modifiedPlaylist = res.data.map((track: any) => {
          count++;
          return {
            ...track,
            trackNumber: count,
            isEditing: false,
          };
        });
        setPlaylist(modifiedPlaylist);
        setPlayListOriginal(modifiedPlaylist);
        // setPlaylist(res.data.tracks.items);
      }
    };
    fetchMyPlaylist();
  }, []);

  return (
    <div>
      <Search
        handleSearchTrack={handleSearchMyPlaylist}
        placeholder={"Search your playlist"}
      />
      <div className="content-view-wrapper">
        <div className="playlist-container">
          {playList &&
            playList.map((trackItem: any) => {
              return (
                <div
                  {...(trackItem && !trackItem.isEditing
                    ? { onClick: (e) => handleClickPlaylist(trackItem) }
                    : "")}
                  className="playlist-item"
                  style={{
                    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)) ,url(${bgImage})`,
                  }}
                >
                  <div className="playlist-control-overlay">
                    <div className="control-container">
                      <div>
                        <EditIcon
                          fontSize="small"
                          onClick={(e: any) =>
                            handleDoubleClick(e, trackItem._id)
                          }
                        />
                      </div>
                      <div>
                        <DeleteIcon
                          fontSize="small"
                          onClick={(e: any) =>
                            handleDeletePlaylist(e, trackItem._id)
                          }
                        />
                      </div>
                    </div>
                  </div>
                  <div className="playlist-details-wrapper">
                    <div className="playlist-details">
                      {trackItem.isEditing ? (
                        <TextField
                          autoComplete="off"
                          color="warning"
                          name="name"
                          inputRef={(input) => input && input.focus()}
                          defaultValue={trackItem.name}
                          onBlur={(e: any) => handleInput(e, trackItem._id)}
                        />
                      ) : (
                        <h3
                        // onClick={(e) => {
                        //   e.stopPropagation();
                        //   // OR
                        //   e.preventDefault();
                        // }}
                        // onDoubleClick={(e) =>
                        //   handleDoubleClick(e, trackItem._id)
                        // }
                        >
                          {trackItem.name}
                        </h3>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
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
  updateMyPlaylist,
  removePlaylist,
})(MyPlaylist);
