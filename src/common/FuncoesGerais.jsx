//Neste diretório devias colocar as funções que vão calcular e descobrir dados do ficheiro json
import { NavLink } from "react-router-dom";
import array from "../assets/data/history.json";
import { useEffect, useState } from "react";

// CONSTANTES GLOBAIS

const dados = () => {
  return array.map((item) => ({
    musicName: item.master_metadata_track_name,
    artistName: item.master_metadata_album_artist_name,
    albumName: item.master_metadata_album_album_name,
    durationPlayed: item.ms_played,
    dia: item.ts,
  }));
};

const musicData = dados();

///--------- FUNCOES ---------///

/// GERAIS 

// 1 - Plays totais gerais
export function GeralPlays() {
  const msplayed = array.length;
  return msplayed;
}

// 2 - Ver quantas músicas diferentes já foram ouvidas no total.

export function DiffPlays() {
  const musicNames = musicData.map((item) => item.musicName);
  const uniqueMusicNames = [...new Set(musicNames)];
  return uniqueMusicNames.length;
}

// 3 - Ver quantos minutos já se passou a ouvir.

export function MinutesPlayed() {
  let contadorMs = 0;
  for (let i = 0; i < array.length; i++) {
    contadorMs += array[i].ms_played;
  }
  let newCount = Math.round(contadorMs / 1000 / 60);
  return newCount;
}

// 4 - Média de tempo diário a ouvir.

export function MediaTempoGerais() {
  const ultimaData = new Date(musicData[musicData.length - 1].dia);
  const primeiraData = new Date(musicData[0].dia);
  const diferencaMilissegundos = ultimaData - primeiraData;
  const diferencaDias = Math.ceil(
    diferencaMilissegundos / (1000 * 60 * 60 * 24)
  );
  const resultado = MinutesPlayed(musicData) / diferencaDias;
  return Math.round(resultado);
}

// 5 Quando é que o utilizador mais ouve música? (horas do dia)

export function MostListennedHour() {
  // Objeto para contar a frequência de cada hora
  const horasContagem = {};

  // Iterar sobre os dados das músicas e contar a frequência de cada hora
  musicData.forEach((item) => {
    const hora = new Date(item.dia).getHours();
    horasContagem[hora] = (horasContagem[hora] || 0) + 1;
  });
  // console.log(horasContagem)

  // Encontrar a hora com maior frequencia
  let horaMaisOuvida;
  let maiorValor = 0;
  for (let hora = 0; hora < 24; hora++) {
    if (horasContagem[hora] > maiorValor) {
      maiorValor = horasContagem[hora];
      horaMaisOuvida = hora;
    }
  }
  return horaMaisOuvida;
}

// 6 Quando é que o utilizador mais ouve música? (estações do ano)

export function obterEstacaoDoAno(data) {
  const mes = data.getMonth() + 1;
  if (mes >= 3 && mes <= 5) {
    return "Spring";
  } else if (mes >= 6 && mes <= 8) {
    return "Summer";
  } else if (mes >= 9 && mes <= 11) {
    return "Autumn";
  } else {
    return "Winter";
  }
}

export function MostListennedSeason() {
  const contagemEstacoes = {
    Primavera: 0,
    Verão: 0,
    Outono: 0,
    Inverno: 0,
  };

  musicData.forEach((item) => {
    const data = new Date(item.dia);
    const estacao = obterEstacaoDoAno(data);
    contagemEstacoes[estacao]++;
  });

  const estacaoMaisOuvida = Object.keys(contagemEstacoes).reduce((a, b) =>
    contagemEstacoes[a] > contagemEstacoes[b] ? a : b
  );
  return estacaoMaisOuvida;
}

// 7 [D] Ver uma lista com top 100 artistas ordenadas por quantidade de plays.

export function Top100Artists() {
  const contagemPlays = {};

  musicData.forEach((item) => {
    const artistName = item.artistName ;
    contagemPlays[artistName] = (contagemPlays[artistName] || 0) + 1;
  });

  const topArtistas = Object.entries(contagemPlays)
    .filter(([artistName, _]) => artistName !== "null") 
    .sort((a, b) => b[1] - a[1]) 
    .slice(0, 100) 
    .map((entry, index) => `${entry[0]}`); // Retorna diretamente o nome do artista com o índice

  return (
    <div className="flex gap-3 flex-col py-6">
      {topArtistas.map((item, index) => (
        <div key={index} className="top100return">
          <span style={{ color: '#facc15' }}>#{index + 1}</span>
          <span style={{ color: 'white' }}> {item}</span>
        </div>
      ))}
    </div>
  );
}

export function Top100ArtistsLast4Weeks() {
  const ultimoDia = new Date(musicData[musicData.length - 1].dia);
  const quatroSemanasAtras = new Date(ultimoDia);
  quatroSemanasAtras.setDate(quatroSemanasAtras.getDate() - 28);

  const contagemPlays = {};

  musicData
    .filter((item) => new Date(item.dia) >= quatroSemanasAtras) // Filtrar os dados das últimas 4 semanas
    .forEach((item) => {
      const artistName = item.artistName;
      contagemPlays[artistName] = (contagemPlays[artistName] || 0) + 1;
    });

  const topArtistas = Object.entries(contagemPlays)
    .filter(([artistName, _]) => artistName !== "null") 
    .sort((a, b) => b[1] - a[1]) 
    .slice(0, 100) 
    .map((entry, index) => `${entry[0]}`); // Retorna diretamente o nome do artista com o índice

  return (
    <div className="flex gap-3 flex-col py-6">
      {topArtistas.map((item, index) => (
        <div key={index} className="top100return">
          <span style={{ color: '#facc15' }}>#{index + 1}</span>
          <span style={{ color: 'white' }}> {item}</span>
        </div>
      ))}
    </div>
  );
}

export function Top100ArtistsLast6Months() {
  const ultimoDia = new Date(musicData[musicData.length - 1].dia);
  const seisMesesAtras = new Date(ultimoDia);
  seisMesesAtras.setMonth(seisMesesAtras.getMonth() - 6);

  const contagemPlays = {};

  musicData
    .filter((item) => new Date(item.dia) >= seisMesesAtras) // Filtrar os dados dos últimos 6 meses
    .forEach((item) => {
      const artistName = item.artistName;
      contagemPlays[artistName] = (contagemPlays[artistName] || 0) + 1;
    });

  const topArtistas = Object.entries(contagemPlays)
    .filter(([artistName, _]) => artistName !== "null") 
    .sort((a, b) => b[1] - a[1]) 
    .slice(0, 100) 
    .map((entry, index) => `${entry[0]}`); // Retorna diretamente o nome do artista com o índice

  return (
    <div className="flex gap-3 flex-col py-6">
      {topArtistas.map((item, index) => (
        <div key={index} className="top100return">
          <span style={{ color: '#facc15' }}>#{index + 1}</span>
          <span style={{ color: 'white' }}> {item}</span>
        </div>
      ))}
    </div>
  );
}

export function Top100ArtistsLastYear() {
  const ultimoDia = new Date(musicData[musicData.length - 1].dia);
  const umAnoAtras = new Date(ultimoDia);
  umAnoAtras.setFullYear(umAnoAtras.getFullYear() - 1);

  const contagemPlays = {};

  musicData
    .filter((item) => new Date(item.dia) >= umAnoAtras) // Filtrar os dados do último ano
    .forEach((item) => {
      const artistName = item.artistName;
      contagemPlays[artistName] = (contagemPlays[artistName] || 0) + 1;
    });

  const topArtistas = Object.entries(contagemPlays)
    .filter(([artistName, _]) => artistName !== "null") 
    .sort((a, b) => b[1] - a[1]) 
    .slice(0, 100) 
    .map((entry, index) => `${entry[0]}`); // Retorna diretamente o nome do artista com o índice

  return (
    <div className="flex gap-3 flex-col py-6">
      {topArtistas.map((item, index) => (
        <div key={index} className="top100return">
          <span style={{ color: '#facc15' }}>#{index + 1}</span>
          <span style={{ color: 'white' }}> {item}</span>
        </div>
      ))}
    </div>
  );
}





// 8 [D] Ver uma lista com top 100 músicas ordenadas por millisegundos em plays.

export function Top100Musics() {
  const contagemPlays = {};

  musicData.forEach((item) => {
    const musicName = item.musicName;
    contagemPlays[musicName] = (contagemPlays[musicName] || 0) + item.durationPlayed;
  });

  const uniqueSorted = Object.entries(contagemPlays)
    .filter(([musicName, _]) => musicName !== "null")
    .sort((a, b) => b[1] - a[1]);

  const topMusicas = uniqueSorted
    .slice(0, 100)
    .map(([musicName, plays], index) => `${musicName}`);

  return (
    <div className="flex gap-3 flex-col py-6">
      {topMusicas.map((item, index) => (
        <div key={index} className="top100return">
          <span style={{ color: '#facc15' }}>#{index + 1}</span>
          <span style={{ color: 'white' }}> {item}</span>
        </div>
      ))}
    </div>
  );
}

export function Top100Musics4Weeks() {
  const ultimoDia = new Date(musicData[musicData.length - 1].dia);
  const quatroSemanasAtras = new Date(ultimoDia);
  quatroSemanasAtras.setDate(quatroSemanasAtras.getDate() - 28);

  const contagemPlays = {};
  musicData
    .filter((item) => item.musicName !== null && new Date(item.dia) >= quatroSemanasAtras)
    .forEach((item) => {
      const musicName = item.musicName;
      contagemPlays[musicName] = (contagemPlays[musicName] || 0) + item.durationPlayed;
    });

  const uniqueSorted = Object.entries(contagemPlays)
    .filter(([musicName, _]) => musicName !== "null")
    .sort((a, b) => b[1] - a[1]);

  const topMusicas = uniqueSorted
    .slice(0, 100)
    .map(([musicName, plays], index) => `${musicName}`);

    return (
      <div className="flex gap-3 flex-col py-6">
        {topMusicas.map((item, index) => (
          <div key={index} className="top100return">
            <span style={{ color: '#facc15' }}>#{index + 1}</span>
            <span style={{ color: 'white' }}> {item}</span>
          </div>
        ))}
      </div>
    );
  }

export function Top100Musics6months() {
  const ultimoDia = new Date(musicData[musicData.length - 1].dia);
  const seisMesesAtras = new Date(ultimoDia);
  seisMesesAtras.setMonth(seisMesesAtras.getMonth() - 6);

  const contagemPlays = {};
  musicData
    .filter((item) => item.musicName !== null && new Date(item.dia) >= seisMesesAtras)
    .forEach((item) => {
      const musicName = item.musicName;
      contagemPlays[musicName] = (contagemPlays[musicName] || 0) + item.durationPlayed;
    });

  const uniqueSorted = Object.entries(contagemPlays)
    .filter(([musicName, _]) => musicName !== "null")
    .sort((a, b) => b[1] - a[1]);

  const topMusicas = uniqueSorted
    .slice(0, 100)
    .map(([musicName, plays], index) => `${musicName}`);

    return (
      <div className="flex gap-3 flex-col py-6">
        {topMusicas.map((item, index) => (
          <div key={index} className="top100return">
            <span style={{ color: '#facc15' }}>#{index + 1}</span>
            <span style={{ color: 'white' }}> {item}</span>
          </div>
        ))}
      </div>
    );
  }


export function Top100MusicsLasYear() {
  const ultimoDia = new Date(musicData[musicData.length - 1].dia);
  const umAnoAtras = new Date(ultimoDia);
  umAnoAtras.setFullYear(umAnoAtras.getFullYear() - 1);

  const contagemPlays = {};
  musicData
    .filter((item) => item.musicName !== null && new Date(item.dia) >= umAnoAtras)
    .forEach((item) => {
      const musicName = item.musicName;
      contagemPlays[musicName] = (contagemPlays[musicName] || 0) + item.durationPlayed;
    });

  const uniqueSorted = Object.entries(contagemPlays)
    .filter(([musicName, _]) => musicName !== "null")
    .sort((a, b) => b[1] - a[1]);

  const topMusicas = uniqueSorted
    .slice(0, 100)
    .map(([musicName, plays], index) => `${musicName}`);

  return (
    <div className="flex gap-3 flex-col py-6">
      {topMusicas.map((item, index) => (
        <div key={index} className="top100return">
          <span style={{ color: '#facc15' }}>#{index + 1}</span>
          <span style={{ color: 'white' }}> {item}</span>
        </div>
      ))}
    </div>
  );
}


// ARTISTA

// 9 Ver quantas plays no total.

export function ArtistaPlays({ nome }) {
  const contagemArtistaPlays = {};

  musicData.forEach((item) => {
    const artistName = item.artistName;
    contagemArtistaPlays[artistName] =
      (contagemArtistaPlays[artistName] || 0) + 1;
  });
  return contagemArtistaPlays[nome];
}
// console.log(ArtistaPlays("Eminem"))

// 10 Ver quantas músicas diferentes já foram ouvidas no total.

export function DiffPlaysArtist({ nome }) {
  let musicasDoArtista = [];
  const filtroMusicas = musicData.filter((item) => nome === item.artistName);
  filtroMusicas.forEach((item) => {
    if (!musicasDoArtista.find((x) => x === item.musicName)) {
      musicasDoArtista.push(item.musicName);
    }
  });
  return musicasDoArtista.length;
}
// console.log(DiffPlaysArtist("Eminem"))

// 11 Ver quantos minutos já se passou a ouvir.

export function MinutesPlayedArtist({ nome }) {
  let minutosArtista = 0;
  musicData.forEach((item) => {
    if (nome === item.artistName) {
      minutosArtista += item.durationPlayed;
    }
  });
  return Math.round(minutosArtista / 60000);
}
// console.log(MinutesPlayedArtist("Taylor Swift"))

// 12 Ver % das plays dentro do total (ex: Kendrick Lamar representa 1.7% das minhas plays)

export function PercentagemPlays({ nome }) {
  const [percentagem, setPercentagem] = useState(0);

  useEffect(() => {
    let filtroMusicas = musicData.filter((item) => nome === item.artistName); // Use '===' para comparação
    setPercentagem(((filtroMusicas.length / musicData.length) * 100).toFixed(2)); // Corrija para usar musicData.length
  }, [nome]);

  return `${percentagem}%`;
}

// console.log(PercentagemPlays("Kendrick Lamar"))

// 13 [D] Ver uma lista com top 20 músicas ordenadas por millisegundos em plays.

export function Top20MusicasArtista({ nome, timeRange }) {
  const musicasDoArtista = musicData.filter((item) => nome === item.artistName);

  let dataLimite;
  switch (timeRange) {
    case "4-weeks":
      dataLimite = new Date(new Date() - 28 * 24 * 3600 * 1000);
      break;
    case "6-months":
      dataLimite = new Date(new Date().setMonth(new Date().getMonth() - 6));
      break;
    case "1-year":
      dataLimite = new Date(new Date().setFullYear(new Date().getFullYear() - 1));
      break;
    case "always": // Tratar "always" como um caso adicional para retornar todas as músicas sem limite de tempo
      dataLimite = new Date(0); // ou qualquer outra lógica que signifique "always" para sua aplicação
      break;
    default:
      dataLimite = new Date(0); // Desde sempre
  }
  const musicasDoArtistaPorTempo = musicasDoArtista.filter((e) => new Date(e.dia) > dataLimite);
  const contagemMusicas = {};
  musicasDoArtistaPorTempo.forEach((item) => {
    const musicName = item.musicName;
    contagemMusicas[musicName] = (contagemMusicas[musicName] || 0) + 1;
  });
  const topMusicas = Object.entries(contagemMusicas)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 20)
    .map((musicName) => musicName[0]); 
    return (
      <div className="flex gap-3 flex-col py-6">
        {topMusicas.map((e, index) => (
          <div key={e} className="top100return">
            <span style={{ color: '#facc15' }}>#{index + 1}</span>
            <span style={{ color: 'white' }}> {e}</span>
          </div>
        ))}
      </div>
    );
  }

// console.log(Top20MusicasArtista("Kendrick Lamar"));

// 14 Ver em posição está no top 100 artistas ("desde sempre")

export function Top100ArtistPostion({ nome }) {
  const contagemPlays = {};
  musicData.forEach((item) => {
    const artistName = item.artistName;
    contagemPlays[artistName] = (contagemPlays[artistName] || 0) + 1;
  });

  const topArtistas = Object.entries(contagemPlays)
    .filter(([artistName, _]) => artistName !== "null")
    .sort((a, b) => b[1] - a[1])
    .slice(0, 100)
    .map((entry) => entry[0]);
  const findPosicao = topArtistas.indexOf(nome) + 1;

  if (findPosicao > 0) {
    return `#${findPosicao}`;
  } else {
    return "Not in top";
  }
}

// console.log(Top100ArtistPostion("Eminem"));

// 15 Quando é que o utilizador mais ouve o artista? (estações do ano)

export function MostPlayedArtistSeason({ nome }) {
  const artistData = musicData.filter((item) => item.artistName === nome);
  const seasonTotals = artistData.reduce((acc, item) => {
    const season = obterEstacaoDoAno(new Date(item.dia));

    if (!acc[season]) {
      acc[season] = 0;
    }

    acc[season] += item.durationPlayed;
    return acc;
  }, {});

  let maxSeason;
  let maxDuration = 0;
  for (const season in seasonTotals) {
    if (seasonTotals[season] > maxDuration) {
      maxDuration = seasonTotals[season];
      maxSeason = season;
    }
  }

  return maxSeason;
}

// console.log(MostPlayedArtistSeason("Eminem"))

export function ArtistsNamesSearchBar() {
  let naoRepetidos = [];
  const sorted = musicData
    .filter((item) => item.artistName !== null)
    .map((item) => item.artistName);
  sorted.forEach((item) => {
    if (!naoRepetidos.find((x) => x === item)) {
      naoRepetidos.push(item);
    }
  });
  return naoRepetidos;
}
