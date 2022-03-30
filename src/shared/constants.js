module.exports = Object.freeze({
    SONG_LENGTH: 6,
    SONGS: {
      // lengths respectively: 41, 25, 29
      SONG1: ['C', 'C', 'G', 'G', 'A', 'A', 'G', 'F', 'F', 'E', 'E', 'D', 'D', 'C', 'G', 'G', 'F', 'F', 'E', 'E', 'D', 'G', 'G', 'F', 'F', 'E', 'E', 'D', 'C', 'G', 'G', 'A', 'A', 'G', 'F', 'F', 'E', 'E', 'D', 'D', 'C'],
      SONG2: ['E', 'D', 'C', 'D', 'E', 'E', 'E', 'D', 'D', 'D', 'E', 'G', 'G', 'E', 'D', 'C', 'D', 'E', 'E', 'E', 'D', 'D', 'E', 'D', 'C'],
      SONG3: ['C', 'D', 'E', 'C', 'C', 'D', 'E', 'C', 'E', 'F', 'G', 'E', 'F', 'G', 'G', 'A', 'G', 'F', 'E', 'C', 'G', 'A', 'G', 'F', 'E', 'C', 'C', 'G', 'C'],
    },
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
      FINISH_GAME: 'finish_game',
      LEAVE_LOBBY_REQUEST: 'leave_lobby_request'
    },
});