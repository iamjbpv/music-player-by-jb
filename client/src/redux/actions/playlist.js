import axios from "axios";

export const getMyPlayList = (param) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  let body = {
    username: param.username,
  };
  try {
    const res = await axios.get(`/api/user/playlist/${param.username}`);

    return res;
  } catch (err) {
    const response = err.response;
    return response;
  }
};

export const getMyTracks = (param) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  let body = {
    username: param.username,
  };
  try {
    const res = await axios.get(`/api/user/tracks/${param.username}`);

    return res;
  } catch (err) {
    const response = err.response;
    return response;
  }
};

export const getMyPlaylistTracks = (param) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  try {
    const res = await axios.get(
      `/api/user/playlist/${param.playListId}/tracks/${param.sortByArtistName}/${param.sortByTrackName}`
    );

    return res;
  } catch (err) {
    const response = err.response;
    return response;
  }
};

export const createPlayList = (formData) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const res = await axios.post(`/api/user/playlist`, formData, config);
    return res;
  } catch (err) {
    const response = err.response;
    return response;
  }
};

export const addTrackToPlaylist = (formData) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const res = await axios.post(
      `/api/user/playlist/add-track`,
      formData,
      config
    );
    return res;
  } catch (err) {
    const response = err.response;
    return response;
  }
};

export const updateMyPlaylist = (formData) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const res = await axios.put(`/api/user/playlist/`, formData, config);
    return res;
  } catch (err) {
    const response = err.response;
    return response;
  }
};

export const removePlaylist = (id) => async (dispatch) => {
  try {
    const res = await axios.delete(`/api/user/playlist/${id}`);

    return res;
  } catch (err) {
    const response = err.response;
    return response;
  }
};
