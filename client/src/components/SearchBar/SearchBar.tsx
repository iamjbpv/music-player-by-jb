import { useEffect, useState } from "react";

const Search = (props: {
  handleSearchTrack: Function;
  placeholder: string;
}) => {
  const { handleSearchTrack, placeholder } = props;
  const [searchString, setSearchString] = useState(0);
  const updateArtistQuery = (event: {
    key: string;
    target: { value: any };
  }) => {
    // console.log(event.target.value);
    if (event.key === "Enter") {
      setSearchString(event.target.value);
      handleSearchTrack(event.target.value);
    }
  };

  return (
    <div className="search-wrapper">
      <input
        className="form-control search-input"
        onKeyPress={(e: any) => updateArtistQuery(e)}
        placeholder={placeholder}
      />
      {/* <button className='btn btn-flat' onClick={this.searchArtist}>Search</button> */}
    </div>
  );
};

export default Search;
