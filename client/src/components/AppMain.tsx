import { Fragment, useEffect } from "react";
// import Row from "react-bootstrap/Row";
// import Col from "react-bootstrap/Col";
import App from "../App";
import FooterPlayer from "./FooterPlayer/FooterPlayer";
import Sidebar from "./Sidebar/Sidebar";
import ContentView from "./ContentView/ContentView";

import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";
import { connect } from "react-redux";
import { Route, Routes } from "react-router-dom";
import MyTracks from "./MyTracks/MyTracks";
import MyPlaylist from "./MyPlaylist/MyPlaylist";

const AppMain = (props: { audiocontrols: any }) => {
  const { audiocontrols } = props;

  useEffect(() => {
    if (audiocontrols) {
      console.log(audiocontrols);

      audiocontrols.audioObject.src = audiocontrols.previewUrl;
      if (audiocontrols.playing) {
        audiocontrols.audioObject.volume = 0.3;

        audiocontrols.audioObject.play();
      } else {
        audiocontrols.audioObject.pause();
      }
    }
  }, [audiocontrols]);

  return (
    <Fragment>
      <Grid container>
        <Grid className="px-0 sidebar" item xs={12} sm={5} md={4} lg={3} xl={2}>
          <Sidebar />
        </Grid>
        <Grid className="px-0 " item xs={12} sm={7} md={8} lg={9} xl={10}>
          <Routes>
            <Route index={true} element={<ContentView />} />
            <Route path="/my-tracks" element={<MyTracks />} />
            <Route path="/my-playlist" element={<MyPlaylist />} />
            <Route path="/my-playlist/:playListId" element={<MyTracks />} />
          </Routes>
        </Grid>
      </Grid>
      {/* <Row className="mx-0">
        <Col className=" px-0 sidebar" xs={12} md={3}>
          <Sidebar />
        </Col>
        <Col className="px-0" xs={6} md={9}>
          <ContentView />
        </Col>
      </Row> */}
      {/* <FooterPlayer /> */}
    </Fragment>
  );
};

const mapStateToProps = (state: { audiocontrols: any }) => ({
  audiocontrols: state.audiocontrols,
});
export default connect(mapStateToProps, {})(AppMain);
