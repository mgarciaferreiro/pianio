module.exports = Object.freeze({
    SONG_LENGTH: 40,
    NUM_PLAYERS_MAX: 5,
    MAP_SIZE: 3000,
    MSG_TYPES: {
      JOIN_GAME_REQUEST: 'join_game',
      JOIN_GAME_SUCCESS: 'join_game_success',
      JOIN_GAME_FAILURE: 'join_game_failure',
      GAME_UPDATE_REQUEST: 'game_update_request',
      GAME_UPDATE_RESPONSE: 'game_update_response',
      GAME_WON: 'won',
      CREATE_GAME_REQUEST: 'create_game',
      CREATE_GAME_SUCCESS: 'create_game_success',
      START_GAME_REQUEST: 'start_game_request',
      START_GAME_RESPONSE: 'start_game_response',
      RESTART_GAME: 'restart_game',
      PLAYER_JOINED_SESSION: 'player_joined_session',
      DISCONNECT: 'disconnect',
      GET_OVERALL_LEADERBOARD: 'get_overall_leaderboard',
      FINISH_GAME: 'finish_game'
    },
});