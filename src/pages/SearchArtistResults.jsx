import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { ArtistaPlays, DiffPlaysArtist, MinutesPlayedArtist, MostPlayedArtistSeason, PercentagemPlays, Top100ArtistPostion, Top20MusicasArtista } from "../common/FuncoesGerais";

export function SearchResultsArtist({ refreshValue, onTimeChange }) {
  const [timeRange, setTimeRange] = useState("always");
  const [refreshValueState, setRefreshValueState] = useState("");

  const handleTimeChange = (selectedTime) => {
    setTimeRange(selectedTime);
  };

  console.log(timeRange)
  return (
    <div>
    <div className="grid gap-4 text-left pt-5">
      <div className="cardGerais"><ArtistaPlays nome={refreshValue} /><br /><div className="textoCards">total plays</div></div>
      <div className="cardGerais"><DiffPlaysArtist nome={refreshValue} /><br /><div className="textoCards">total unique songs</div></div>
      <div className="cardGerais"><MinutesPlayedArtist nome={refreshValue} /><br /><div className="textoCards">heard minutes</div></div>
      <div className="cardGerais"><PercentagemPlays nome={refreshValue} /><br /><div className="textoCards">of plays</div></div>
      <div className="cardGerais"><Top100ArtistPostion nome={refreshValue} /><br /><div className="textoCards">top position</div></div>
      <div className="cardGerais"><MostPlayedArtistSeason nome={refreshValue} /><br /><div className="textoCards">most heard season</div></div>
      <div className="col-span-2 text-center pt-5 title">Top 20 Musics</div>
      <div className="grid grid-cols-4 col-span-2 grid-rows-1 gap-4 text-center butoesTempo w-auto">
        <button to="" onClick={() => handleTimeChange("4-weeks")} className={`border-none rounded-md leading-5 p-1 ${timeRange === "4-weeks" ? "bg-yellow text-black font-medium" : "bg-gray"}`}>Last 4 weeks</button>
        <button to="" onClick={() => handleTimeChange("6-months")} className={`border-none rounded-md leading-5 p-1 ${timeRange === "6-months" ? "bg-yellow text-black font-medium" : "bg-gray"}`}>Last 6 months</button>
        <button to="" onClick={() => handleTimeChange("1-year")} className={`border-none rounded-md leading-5 p-1 ${timeRange === "1-year" ? "bg-yellow text-black font-medium" : "bg-gray"}`}>Last year</button>
        <button to="" onClick={() => handleTimeChange("always")} className={`border-none rounded-md leading-5 p-1 ${timeRange === "always" ? "bg-yellow text-black font-medium" : "bg-gray"}`}>Since forever</button>
      </div>
      </div>
      <div className="col-span-2 flex gap-3 flex-col text-left">
        <Top20MusicasArtista timeRange={timeRange} nome={refreshValue} />
      </div>
    </div>

  );
}
