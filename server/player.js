const Constants = require('../src/shared/constants');

class Player {
    constructor(username, character) {
      this.username = username;
      this.character = character;
      this.position = 0;
      this.isFinished = false;
      this.seconds = 0
    }

    setPosition(position, seconds) {
      this.position = position
      this.seconds = seconds
      if (this.position == Constants.SONG_LENGTH) {
        this.isFinished = true
        return true
      }

      return false
    }

    getCharacter() {
      return this.character
    }

    serializeForUpdate() {
      return {
        username: this.username,
        character: this.character,
        position: this.position,
        isFinished: this.isFinished,
      };
    }
}

module.exports = Player;