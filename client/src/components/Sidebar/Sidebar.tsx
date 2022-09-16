import { Fragment } from "react";
import Button from "@mui/material/Button";
import { connect } from "react-redux";
import PlayCircleFilledWhiteIcon from "@mui/icons-material/PlayCircleFilledWhite";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import PauseCircleIcon from "@mui/icons-material/PauseCircle";
import { setPlaying } from "../../redux/actions/control";
import { Link } from "react-router-dom";
const Sidebar = (props: { audiocontrols: any; setPlaying: Function }) => {
  const { audiocontrols, setPlaying } = props;
  return (
    <div className="sidebar-wrapper">
      <div className="song-details-header fadein">
        <h3>{audiocontrols.artistName}</h3>
        <h3>{audiocontrols.trackName}</h3>
        <div className="album-art-container">
          <img height="200px" src={audiocontrols.albumArt} />
        </div>
        <div className="media-controls">
          <div>
            <SkipPreviousIcon />
          </div>
          <div id="playStatus" data-play-status={audiocontrols.playing}>
            {audiocontrols.playing ? (
              <PauseCircleIcon
                id="pauseTrack"
                onClick={() => setPlaying(false)}
              />
            ) : (
              <PlayCircleFilledWhiteIcon
                id="playTrack"
                onClick={() => setPlaying(true)}
              />
            )}
          </div>
          <div>
            <SkipNextIcon />
          </div>
        </div>
      </div>

      <div className="sidebar-footer">
        <Link to="/">
          <Button variant="contained">Explore Music</Button>
        </Link>
        <Link to="/my-tracks">
          <Button variant="contained">My Liked Songs</Button>
        </Link>
        <Link to="/my-playlist">
          <Button variant="contained">My Playlist</Button>
        </Link>
      </div>
    </div>
  );
};

const mapStateToProps = (state: { audiocontrols: any }) => ({
  audiocontrols: state.audiocontrols,
});
export default connect(mapStateToProps, { setPlaying })(Sidebar);
