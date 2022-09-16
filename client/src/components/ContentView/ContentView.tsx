import Search from "../SearchBar/SearchBar";
import TrackItem from "../Track/TrackItem";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Fragment, useEffect, useReducer, useState } from "react";
import { searchTrack } from "../../redux/actions/track";
import { connect } from "react-redux";
import { setTrack } from "../../redux/actions/control";
import {
  getMyPlayList,
  createPlayList,
  addTrackToPlaylist,
} from "../../redux/actions/playlist";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import PlaylistPlayIcon from "@mui/icons-material/PlaylistPlay";
import {
  Alert,
  Avatar,
  Checkbox,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Snackbar,
  TextField,
} from "@mui/material";
import { FALSE } from "sass";
import { AnyAaaaRecord } from "dns";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const ContentView = (props: {
  searchTrack: Function;
  audiocontrols: any;
  setTrack: Function;
  getMyPlayList: Function;
  createPlayList: Function;
  addTrackToPlaylist: Function;
}) => {
  const {
    searchTrack,
    setTrack,
    audiocontrols,
    getMyPlayList,
    createPlayList,
    addTrackToPlaylist,
  } = props;
  const { audioObject } = audiocontrols;
  const [trackList, setTrackList] = useState([]);
  const [myPlayList, setMyPlayList] = useState([]);
  const initialTrackDetails = {
    trackId: "",
    artistName: "",
    trackName: "",
    albumArt: "",
    previewUrl: "",
  };
  const [trackDetails, setTrackDetails] = useState(initialTrackDetails);

  const [isPlaylistCreated, setIsPlaylistCreated] = useState(false);
  const [snackBarOpen, setSnackBarOpen] = useState(false);

  const [modalAddToPlaylist, setModalAddToPlaylist] = useState(false);
  const [modalCreatePlaylist, setModalCreatePlaylist] = useState(false);
  const handleSearchTrack = async (searchString: String) => {
    let res = await searchTrack(searchString);

    if (res.status === 200) {
      let count = 0;

      const modifiedTracks = res.data.tracks.items.map((track: any) => {
        count++;
        return {
          ...track,
          trackNumber: count,
        };
      });
      setTrackList(modifiedTracks);
      // setTrackList(res.data.tracks.items);
    }
  };
  const handleAddToPlayList = async (trackDetails: any) => {
    setTrackDetails({
      trackId: trackDetails.id,
      artistName: trackDetails.artists[0].name,
      trackName: trackDetails.name,
      albumArt: trackDetails.album.images[0].url,
      previewUrl: trackDetails.preview_url,
    });
    loadMyPlaylist();

    setModalAddToPlaylist(true);
  };

  const loadMyPlaylist = async () => {
    let params = {
      username: "jebeekun",
    };
    let res = await getMyPlayList(params);
    if (res.status === 200 && res.data) {
      setMyPlayList(res.data);
    }
  };

  const handleCreatePlayListModal = () => {
    setModalAddToPlaylist(false);
    setModalCreatePlaylist(true);
  };

  const handleAddTrackToPlaylist = async () => {
    let params = {
      username: "jebeekun",
      playListIds: checked,
      trackDetails,
    };
    let res = await addTrackToPlaylist(params);
    if (res.status === 200) {
      setSnackBarOpen(true);
      setTrackDetails(initialTrackDetails);
      setChecked([]);
      setModalAddToPlaylist(false);
    }

    // setModalAddToPlaylist(true);
  };

  const [formInput, setFormInput] = useReducer(
    (state: any, newState: any) => ({ ...state, ...newState }),
    {
      name: "",
    }
  );

  const handleCreatePlaylistSubmit = async (evt: any) => {
    evt.preventDefault();

    let { name } = formInput;
    let params = {
      username: "jebeekun",
      playlistName: name,
    };

    let res = await createPlayList(params);

    if (res.status === 200) {
      console.log("SET PLAYLIST CREATED");
      setIsPlaylistCreated(true);
    }
  };

  const handleInput = (evt: any) => {
    const name = evt.target.name;
    const newValue = evt.target.value;
    setFormInput({ [name]: newValue });
  };

  const handlePlayAudio = (trackDetails: any) => {
    setTrack(trackDetails);
  };

  const [checked, setChecked]: any = useState([]);

  const handleToggle = (value: any) => () => {
    let arrayChecked = checked;
    if (checked.includes(value._id)) {
      let filtered = checked.filter((filter: any) => {
        return filter !== value._id;
      });
      console.log(filtered);
      setChecked(filtered);
    } else {
      arrayChecked.push(value._id);
      console.log(arrayChecked);

      setChecked(arrayChecked);
    }
  };

  useEffect(() => {
    handleSearchTrack("ed sheeran");
  }, []);

  return (
    <div id="container">
      <Snackbar
        open={snackBarOpen}
        autoHideDuration={6000}
        onClose={() => setSnackBarOpen(false)}
      >
        <Alert
          onClose={() => setSnackBarOpen(false)}
          severity="success"
          sx={{ width: "100%" }}
        >
          Track Added to Playlist
        </Alert>
      </Snackbar>
      <Modal
        open={modalAddToPlaylist}
        onClose={() => setModalAddToPlaylist(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            On What Playlist you want to add {trackDetails.trackName} by{" "}
            {trackDetails.artistName}?
          </Typography>

          <List dense sx={{ width: "100%", bgcolor: "background.paper" }}>
            {myPlayList &&
              myPlayList.map((playlist: any) => {
                const labelId = `checkbox-list-secondary-label-${playlist._id}`;
                return (
                  <ListItem
                    key={playlist._id}
                    secondaryAction={
                      <Checkbox
                        edge="end"
                        onChange={handleToggle(playlist)}
                        // checked={checked.includes(playlist._id)}
                        inputProps={{ "aria-labelledby": labelId }}
                      />
                    }
                    disablePadding
                  >
                    <ListItemButton>
                      <ListItemAvatar>
                        <PlaylistPlayIcon />
                      </ListItemAvatar>
                      <ListItemText id={labelId} primary={playlist.name} />
                    </ListItemButton>
                  </ListItem>
                );
              })}
          </List>
          <div className="d-flex justify-content-space-between">
            <Button
              variant="contained"
              endIcon={<AddCircleIcon />}
              onClick={() => handleAddTrackToPlaylist()}
            >
              Add To Playlist
            </Button>
            <Button
              variant="contained"
              endIcon={<AddCircleIcon />}
              onClick={() => handleCreatePlayListModal()}
            >
              Create New Playlist
            </Button>
          </div>
        </Box>
      </Modal>
      <Modal
        open={modalCreatePlaylist}
        onClose={() => setModalCreatePlaylist(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {!isPlaylistCreated ? (
            <Fragment>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Enter your desired playlist name
              </Typography>
              <form onSubmit={handleCreatePlaylistSubmit}>
                <div className="d-flex d-flex-column form-container">
                  <TextField
                    label="Playlist Name"
                    name="name"
                    defaultValue={formInput.email}
                    onChange={handleInput}
                  />
                  <Button
                    type="submit"
                    variant="contained"
                    endIcon={<AddCircleIcon />}
                    onClick={() => handleCreatePlayListModal()}
                  >
                    Create Playlist
                  </Button>
                </div>
              </form>
            </Fragment>
          ) : (
            <Fragment>
              <Typography variant="h6" component="h2">
                Playlist is created
              </Typography>
              <Button
                variant="contained"
                endIcon={<AddCircleIcon />}
                onClick={() => {
                  setModalCreatePlaylist(false);
                  setModalAddToPlaylist(true);
                  loadMyPlaylist();
                  setIsPlaylistCreated(false);
                }}
              >
                Continue adding track
              </Button>
            </Fragment>
          )}
        </Box>
      </Modal>
      <Search
        handleSearchTrack={handleSearchTrack}
        placeholder={"Search a Song"}
      />
      <div className="content-view-wrapper">
        <Fragment>
          {trackList &&
            trackList.map((trackItem: any) => {
              return (
                <TrackItem
                  handleAddToPlayList={handleAddToPlayList}
                  trackDetails={trackItem}
                  handlePlayAudio={handlePlayAudio}
                  local={false}
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
  createPlayList,
  addTrackToPlaylist,
})(ContentView);
