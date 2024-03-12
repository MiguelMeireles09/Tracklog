import React, { useState, useEffect } from "react";
import { IoMdSearch } from "react-icons/io";
import Autosuggest from "react-autosuggest";
import { ArtistsNamesSearchBar } from "../common/FuncoesGerais";
import { SearchResultsArtist } from "./SearchArtistResults";
import { Outlet } from "react-router-dom";

export default function Search() {
  const [searchTerm, setSearchTerm] = useState("");
  const [refreshValue, setRefreshValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [isAutosuggestOpen, setIsAutosuggestOpen] = useState(false);
  const [isResultsVisible, setIsResultsVisible] = useState(false);

  const handleSearchChange = (e, { newValue }) => {
    setSearchTerm(newValue);
    setIsResultsVisible(false);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setRefreshValue(searchTerm);
    setIsResultsVisible(true);
  };

  const getSuggestions = (value) => {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;

    return inputLength === 0
      ? []
      : ArtistsNamesSearchBar().filter(
          (artist) => artist.toLowerCase().slice(0, inputLength) === inputValue
        );
  };

  const inputProps = {
    placeholder: "Search for your artist...",
    value: searchTerm,
    onChange: handleSearchChange,
    style: {
      paddingLeft: "40px",
      color: "#9CA3AF",
      outline: "none",
      height: "35px",
      width: "100%",
      fontSize: "13px",
      borderRadius: "5px",
    },
  };
  
  const handleSuggestionClick = (event, { suggestionValue }) => {
    setSearchTerm(suggestionValue);
    setRefreshValue(suggestionValue);
    setIsResultsVisible(true);
  };

  const handleAutosuggestFocus = () => {
    setIsAutosuggestOpen(true);
  };

  const handleAutosuggestBlur = () => {
    setIsAutosuggestOpen(false);
  };

  return (
    <div className="text-center">
      <div className="text-3xl pb-10">Explore</div>
      <div className="" style={{ position: "relative",textAlign: "left" }}>
        <form
          id="searchForm"
          onSubmit={handleSearchSubmit}
          style={{ position: "relative" }}
        >
          <div style={{ position: "relative" }}>
            <IoMdSearch
              style={{
                position: "absolute",
                left: "10px",
                top: "8px",
                color: "black",
                fontSize: "20px",
              }}
            />
            <Autosuggest className="pb-3"
              suggestions={suggestions}
              onSuggestionsFetchRequested={({ value }) =>
                setSuggestions(getSuggestions(value))
              }
              onSuggestionsClearRequested={() => setSuggestions([])}
              getSuggestionValue={(suggestion) => suggestion}
              renderSuggestion={(suggestion) => <div>{suggestion}</div>}
              inputProps={inputProps}
              onSuggestionSelected={handleSuggestionClick}
              onFocus={handleAutosuggestFocus}
              onBlur={handleAutosuggestBlur}
            />
          </div>
        </form>
      </div>
      <div className="pt-5">
        {isResultsVisible && <SearchResultsArtist onTimeChange={(time) => console.log(time)}  refreshValue={refreshValue} />}
      </div>
    </div>
  );
}
