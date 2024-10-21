const express = require('express');
const { resolve } = require('path');
const cors = require('cors');
const sqlite = require('sqlite');
const sqlite3 = require('sqlite3').verbose();
const { open } = require('sqlite');

const app = express();
const port = 3010;

app.use(express.static('static'));
app.use(cors());
app.use(express.json());

let db;

(async () => {
  db = await open({
    filename: './database.sqlite',
    driver: sqlite3.Database,
  });
})();

async function fetchAllGames() {
  let query = 'SELECT * FROM games';
  let response = await db.all(query, []);

  return response;
}
app.get('/games', async (req, res) => {
  try {
    let getAllGames = await fetchAllGames();

    if (getAllGames.length === 0) {
      res.status(404).json({
        message: 'Games not found',
      });
    }

    res.status(200).json({
      games: getAllGames,
    });
  } catch (error) {
    res.status(500).send({
      error: error.message,
    });
  }
});

async function fetchAllGameById(id) {
  let query = 'SELECT * FROM games WHERE id = ?';
  let response = await db.all(query, [id]);

  return response;
}
app.get('/games/details/:id', async (req, res) => {
  let id = req.params.id;
  try {
    let getAllGameById = await fetchAllGameById(id);

    if (getAllGameById.length === 0) {
      res.status(404).json({
        message: 'Game not found for Id: ' + id,
      });
    }

    res.status(200).json({
      game: getAllGameById,
    });
  } catch (error) {
    res.status(500).send({
      error: error.message,
    });
  }
});

async function fetchAllGamesByGenre(genre) {
  let query = 'SELECT * FROM games WHERE genre = ?';
  let response = await db.all(query, [genre]);

  return response;
}
app.get('/games/genre/:genre', async (req, res) => {
  let genre = req.params.genre;
  try {
    let getAllGamesByGenre = await fetchAllGamesByGenre(genre);

    if (getAllGamesByGenre.length === 0) {
      res.status(404).json({
        message: 'Games not found for Genre: ' + genre,
      });
    }

    res.status(200).json({
      games: getAllGamesByGenre,
    });
  } catch (error) {
    res.status(500).send({
      error: error.message,
    });
  }
});

async function fetchAllGamesByPlatform(platform) {
  let query = 'SELECT * FROM games WHERE platform = ?';
  let response = await db.all(query, [platform]);

  return response;
}
app.get('/games/platform/:platform', async (req, res) => {
  let platform = req.params.platform;
  try {
    let getAllGamesByPlatform = await fetchAllGamesByPlatform(platform);

    if (getAllGamesByPlatform.length === 0) {
      res.status(404).json({
        message: 'Games not found for Platform: ' + platform,
      });
    }

    res.status(200).json({
      games: getAllGamesByPlatform,
    });
  } catch (error) {
    res.status(500).send({
      error: error.message,
    });
  }
});

async function fetchAllSortedGames() {
  let query = 'SELECT * FROM games ORDER BY rating DESC';
  let response = await db.all(query, []);

  return response;
}
app.get('/games/sort-by-rating', async (req, res) => {
  try {
    let getAllSortedGames = await fetchAllSortedGames();

    if (getAllSortedGames.length === 0) {
      res.status(404).json({
        message: 'Games not found',
      });
    }

    res.status(200).json({
      games: getAllSortedGames,
    });
  } catch (error) {
    res.status(500).send({
      error: error.message,
    });
  }
});

async function fetchAllPlayers() {
  let query = 'SELECT * FROM players';
  let response = await db.all(query, []);

  return response;
}
app.get('/players', async (req, res) => {
  try {
    let getAllPlayers = await fetchAllPlayers();

    if (getAllPlayers.length === 0) {
      res.status(404).json({
        message: 'Players not found',
      });
    }

    res.status(200).json({
      players: getAllPlayers,
    });
  } catch (error) {
    res.status(500).send({
      error: error.message,
    });
  }
});

async function fetchAllPlayerById(id) {
  let query = 'SELECT * FROM players WHERE id = ?';
  let response = await db.all(query, [id]);

  return response;
}
app.get('/players/details/:id', async (req, res) => {
  let id = req.params.id;
  try {
    let getAllPlayerById = await fetchAllPlayerById(id);

    if (getAllPlayerById.length === 0) {
      res.status(404).json({
        message: 'Players not found for Id: ' + id,
      });
    }

    res.status(200).json({
      player: getAllPlayerById,
    });
  } catch (error) {
    res.status(500).send({
      error: error.message,
    });
  }
});

async function fetchAllPlayerByPlatform(platform) {
  let query = 'SELECT * FROM players WHERE platform = ?';
  let response = await db.all(query, [platform]);

  return response;
}
app.get('/players/platform/:platform', async (req, res) => {
  let platform = req.params.platform;
  try {
    let getAllPlayerByPlatform = await fetchAllPlayerByPlatform(platform);

    if (getAllPlayerByPlatform.length === 0) {
      res.status(404).json({
        message: 'Players not found for platform: ' + platform,
      });
    }

    res.status(200).json({
      player: getAllPlayerByPlatform,
    });
  } catch (error) {
    res.status(500).send({
      error: error.message,
    });
  }
});

async function fetchAllSortedPlayers() {
  let query = 'SELECT * FROM players ORDER BY rating DESC';
  let response = await db.all(query, []);

  return response;
}
app.get('/players/sort-by-rating', async (req, res) => {
  try {
    let getAllSortedPlayers = await fetchAllSortedPlayers();

    if (getAllSortedPlayers.length === 0) {
      res.status(404).json({
        message: 'Players not found',
      });
    }

    res.status(200).json({
      player: getAllSortedPlayers,
    });
  } catch (error) {
    res.status(500).send({
      error: error.message,
    });
  }
});

async function fetchAllTournaments() {
  let query = 'SELECT * FROM tournaments';
  let response = await db.all(query, []);

  return response;
}
app.get('/tournaments', async (req, res) => {
  try {
    let getAllTournaments = await fetchAllTournaments();

    if (getAllTournaments.length === 0) {
      res.status(404).json({
        message: 'tournaments not found',
      });
    }

    res.status(200).json({
      tournaments: getAllTournaments,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
});

async function fetchAllTournamentById(id) {
  let query = 'SELECT * FROM tournaments WHERE id = ?';
  let response = await db.all(query, [id]);

  return response;
}
app.get('/tournaments/details/:id', async (req, res) => {
  let id = req.params.id;
  try {
    let getAllTournamentById = await fetchAllTournamentById(id);

    if (getAllTournamentById.length === 0) {
      res.status(404).json({
        message: 'tournaments not found for Id: ' + id,
      });
    }

    res.status(200).json({
      tournament: getAllTournamentById,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
});

async function fetchAllTournamentGameId(gameId) {
  let query = 'SELECT * FROM tournaments WHERE gameId = ?';
  let response = await db.all(query, [gameId]);

  return response;
}
app.get('/tournaments/game/:id', async (req, res) => {
  let gameId = req.params.id;
  try {
    let getAllTournamentByGameId = await fetchAllTournamentGameId(gameId);

    if (getAllTournamentByGameId.length === 0) {
      res.status(404).json({
        message: 'tournaments not found for GameId: ' + gameId,
      });
    }

    res.status(200).json({
      tournament: getAllTournamentByGameId,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
});

async function fetchAllSortedTournaments() {
  let query = 'SELECT * FROM tournaments ORDER BY prizePool DESC';
  let response = await db.all(query, []);

  return response;
}
app.get('/tournaments/sort-by-price-pool', async (req, res) => {
  try {
    let getAllSortedTournaments = await fetchAllSortedTournaments();

    if (getAllSortedTournaments.length === 0) {
      res.status(404).json({
        message: 'tournaments not found',
      });
    }

    res.status(200).json({
      tournaments: getAllSortedTournaments,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
