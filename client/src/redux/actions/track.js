import axios from "axios";

export const searchTrack = (searchString) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/search-track/${searchString}`);

    return res;
  } catch (err) {
    const response = err.response;
    return response;
  }
};

export const removeTrack = (id) => async (dispatch) => {
  console.log(id);
  try {
    const res = await axios.delete(`/api/user/tracks/${id}`);

    return res;
  } catch (err) {
    const response = err.response;
    return response;
  }
};
