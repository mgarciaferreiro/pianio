module.exports = Object.freeze({
    SONG_LENGTH: 40,
    NUM_PLAYERS_MAX: 5,
    MAP_SIZE: 3000,
    MSG_TYPES: {
      JOIN_GAME_REQUEST: 'join_game',
      JOIN_GAME_SUCCESS: 'join_game_success',
      JOIN_GAME_FAILURE: 'join_game_failure',
      GAME_UPDATE: 'update',
      INPUT: 'input',
      GAME_LOST: 'lost',
      GAME_WON: 'won',
      CREATE_GAME_REQUEST: 'create_game',
      CREATE_GAME_SUCCESS: 'create_game_success',
      START_GAME: 'start_game',
      RESTART_GAME: 'restart_game',
      PLAYER_JOINED_SESSION: 'player_joined_session',
      DISCONNECT: 'disconnect'
    },
});