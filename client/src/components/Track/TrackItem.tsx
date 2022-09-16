const TrackItem = (props: {
  handleAddToPlayList: Function;
  handlePlayAudio: Function;
  trackDetails: any;
  local: boolean;
}) => {
  const { handleAddToPlayList, trackDetails, handlePlayAudio, local } = props;
  const albumArt = local
    ? trackDetails.albumArt
    : trackDetails.album.images[0].url && trackDetails.album.images[0].url;

  const artistName = local
    ? trackDetails.artistName
    : trackDetails.artists[0].name && trackDetails.artists[0].name;

  const previewUrl = local
    ? trackDetails.previewUrl
    : trackDetails.preview_url && trackDetails.preview_url;

  const trackName = local
    ? trackDetails.trackName
    : trackDetails.name && trackDetails.name;

  return (
    <div className="track-item">
      <div className="track-container">
        <h1 className="trackCounter">{trackDetails.trackNumber}</h1>
        <div className="album-art-container d-flex justify-content-center align-items-center">
          <img height="80px" src={albumArt} />
        </div>

        <div className="song-information">
          <h5>{trackName}</h5>
          <h5>{artistName}</h5>

          {trackDetails && trackDetails.external_urls && (
            <a href={trackDetails.external_urls["spotify"]} target="_blank">
              Listen to this song using Spotify
            </a>
          )}
        </div>
      </div>
      <div className="track-controls">
        {previewUrl ? (
          <div onClick={() => handlePlayAudio(trackDetails)}>
            <span>Play</span>
          </div>
        ) : (
          <div>
            <span>Preview Not Available</span>
          </div>
        )}

        <div onClick={() => handleAddToPlayList(trackDetails)}>
          {local ? (
            <span>Remove to Playlist</span>
          ) : (
            <span>Add to Playlist</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default TrackItem;
