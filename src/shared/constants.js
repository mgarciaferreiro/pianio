module.exports = Object.freeze({
    SONG_LENGTH: 42,
    SONGS: {
      // songs and lengths: 
      // 1: twinkle twinkle - 42
      // 2: mary had a little lamb - 25 (repeated to get 42)
      // 3: frère jacques - 29 (repeated to get 42)
      // 4: barney i love you - 32 (repeated to get 42)
      // 5: old macdonald - 41
      // 6: when the saints - 41
      // 7: industry baby - 43
      SONG1: ['C', 'C', 'G', 'G', 'A', 'A', 'G', 'F', 'F', 'E', 'E', 'D', 'D', 'C', 'G', 'G', 'F', 'F', 'E', 'E', 'D', 'G', 'G', 'F', 'F', 'E', 'E', 'D', 'C', 'C', 'G', 'G', 'A', 'A', 'G', 'F', 'F', 'E', 'E', 'D', 'D', 'C'],
      SONG2: ['E', 'D', 'C', 'D', 'E', 'E', 'E', 'D', 'D', 'D', 'E', 'G', 'G', 'E', 'D', 'C', 'D', 'E', 'E', 'E', 'D', 'D', 'E', 'D', 'C', 'E', 'D', 'C', 'D', 'E', 'E', 'E', 'D', 'D', 'D', 'E', 'G', 'G', 'E', 'D', 'C', 'D'],
      SONG3: ['C', 'D', 'E', 'C', 'C', 'D', 'E', 'C', 'E', 'F', 'G', 'E', 'F', 'G', 'G', 'A', 'G', 'F', 'E', 'C', 'G', 'A', 'G', 'F', 'E', 'C', 'C', 'G', 'C', 'C', 'D', 'E', 'C', 'C', 'D', 'E', 'C', 'E', 'F', 'G', 'E', 'F'],
      SONG4: ['G', 'E', 'G', 'G', 'E', 'G', 'A', 'G', 'F', 'E', 'D', 'E', 'F', 'E', 'F', 'G', 'C', 'C', 'C', 'C', 'C', 'D', 'E', 'F', 'G', 'G', 'D', 'D', 'F', 'E', 'D', 'C', 'G', 'E', 'G', 'G', 'E', 'G', 'A', 'G', 'F', 'E'],
      SONG5: ['G', 'G', 'G', 'D', 'E', 'E', 'D', 'B', 'B', 'A', 'A', 'G', 'D', 'G', 'G', 'D', 'E', 'E', 'D', 'B', 'B', 'A', 'A', 'G', 'D', 'D', 'G', 'G', 'G', 'D', 'D', 'G', 'G', 'G', 'B', 'B', 'A', 'A', 'G', 'D', 'G', 'G'],
      SONG6: ['C', 'E', 'F', 'G', 'C', 'E', 'F', 'G', 'C', 'E', 'F', 'G', 'E', 'C', 'E', 'D', 'E', 'D', 'C', 'C', 'E', 'G', 'G', 'G', 'F', 'E', 'F', 'G', 'E', 'D', 'D', 'C', 'C', 'E', 'F', 'G', 'C', 'E', 'F', 'G', 'C', 'E'],
      SONG7: ['C', 'D', 'Ds', 'G', 'F', 'Ds', 'F', 'Ds', 'D', 'D', 'D', 'D', 'D', 'Ds', 'D', 'C', 'C', 'D', 'Ds', 'G', 'F', 'Ds', 'F', 'Ds', 'D', 'D', 'D', 'D', 'D', 'Ds', 'D', 'C', 'G', 'G', 'G', 'F', 'F', 'Ds', 'F', 'Ds', 'F', 'Ds', 'F', 'Ds', 'C']
    },
    NUM_PLAYERS_MAX: 6,
    MAP_SIZE: 3000,
    MSG_TYPES: {
      JOIN_GAME_REQUEST: 'join_game',
      JOIN_GAME_SUCCESS: 'join_game_success',
      JOIN_GAME_FAILURE: 'join_game_failure',
      JOIN_RANDOM_GAME_REQUEST: 'join_random_game',
      GAME_UPDATE_REQUEST: 'game_update_request',
      GAME_UPDATE_RESPONSE: 'game_update_response',
      GAME_WON: 'won',
      CREATE_GAME_REQUEST: 'create_game',
      CREATE_GAME_SUCCESS: 'create_game_success',
      START_GAME_REQUEST: 'start_game_request',
      START_GAME_RESPONSE: 'start_game_response',
      RESTART_GAME_REQUEST: 'restart_game_request',
      RESTART_GAME_RESPONSE: 'restart_game_response',
      PLAYER_JOINED_SESSION: 'player_joined_session',
      DISCONNECTED: 'disconnected',
      LEADERBOARD_REQUEST: 'leaderboard_request',
      LEADERBOARD_RESPONSE: 'leaderboard_response',
      FINISH_GAME: 'finish_game',
      LEAVE_LOBBY_REQUEST: 'leave_lobby_request',
    },
}); 