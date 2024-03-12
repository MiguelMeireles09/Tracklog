  import { useState } from "react";
import {
  DiffPlays,
  GeralPlays,
  MediaTempoGerais,
  MinutesPlayed,
  MostListennedHour,
  MostListennedSeason,
} from "../common/FuncoesGerais";

export default function General() {
  const [first, setfirst] = useState({
    totalPLays: GeralPlays(),
    diffMusics: DiffPlays(),
    minPlays: MinutesPlayed(),
    mediaGeral: MediaTempoGerais(),
    listenedHour: MostListennedHour(),
    listenedSeason: MostListennedSeason(),
  });
  return (
    <section className="grid grid-cols-2 grid-rows-5 gap-4">
      <div className="cardGerais">
        {first.totalPLays}
        <br />
        <div className="textoCards">total plays</div>
      </div>
      <div className="cardGerais">
        {first.diffMusics}
        <br />
        <div className="textoCards">total songs</div>
      </div>
      <div className="cardGerais">
        {first.minPlays}
        <br />
        <div className="textoCards">heard minutes</div>
      </div>
      <div className="cardGerais">
        {first.mediaGeral}
        <br />
        <div className="textoCards">daily minutes</div>
      </div>
      <div className="cardGerais">
        {first.listenedHour}
        <br />
        <div className="textoCards">frequent hour</div>
      </div>
      <div className="cardGerais">
        {first.listenedSeason}
        <br />
        <div className="textoCards">most heard season</div>
      </div>
    </section>
  );
}
