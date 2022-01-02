const Constants = require('../shared/constants');

class Player {
    constructor(id, username) {
      this.id = id;
      this.username = username;
      this.position = 0; // -1 position means lost from misclick
      this.isFinished = false;
    }

    setPosition(position) {
      this.position = position
    }

    serializeForUpdate() {
      return {
        id: this.id,
        username: this.username,
        position: this.position,
        hasWon: this.hasWon,
        hasLost: this.hasLost
      };
    }
}

module.exports = Player;