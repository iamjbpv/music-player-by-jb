const FooterPlayer = () => {
  const statusIcon = (playingPreviewUrl: String) => {
    // if (!playingPreviewUrl) {
    //   return <span>N/A</span>;
    // }

    // if (
    //   this.props.audiocontrol.playing &&
    //   this.props.audiocontrol.previewUrl === playingPreviewUrl
    // ) {
    //   // this.props.setPlayingTrue();
    //   return <span>| |</span>;
    // }
    // this.props.setPlayingFalse();
    return <span>&#9654;</span>;
  };
  return (
    <div className="audio-control-wrapper">
      <div className="d-flex justify-content-between h-100 px-3">
        <div className="w-75 my-auto">
          <div className="d-flex justify-content-start">
            <div>
              <img className="album-art" src={"none"} />
            </div>
            <div className="ml-2 my-auto">
              <div className="d-flex flex-column justify-content-start">
                <div className="text-left">
                  <h5 className="my-0">{"none"}</h5>
                </div>
                <div className="text-left">
                  <p className="my-0 track-title">{"none"}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-50 my-auto">
          <div className="d-flex justify-content-end h-100">
            <div className="px-2">
              <i className="fas fa-volume-up"></i>
            </div>
            <div className="mobile-volume my-auto px-2"></div>
            <div className="play px-2">{statusIcon("test")}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FooterPlayer;
