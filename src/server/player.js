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

    handleTileClicked(tileClicked, correctTile) {
      if (!this.isFinished) {
        if (tileClicked == correctTile) {
          this.position += 1;
          this.score += 1;
          if (this.position == Constants.SONG_LENGTH - 1) {
              this.isFinished = true;
          }
        } else {
            this.position = -1;
            this.isFinished = true;
        }
      }
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