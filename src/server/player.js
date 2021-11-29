const Constants = require('../shared/constants');

class Player {
    constructor(id, username) {
      this.id = id;
      this.username = username;
      this.position = 0;
      this.score = 0;
      this.hasLost = false;
      this.hasWon = false;
    }

    setPosition(position) {
      this.position = position
    }

    handleTileClicked(tileClicked, correctTile) {
        if (tileClicked == correctTile) {
            this.position += 1;
            this.score += 1;
            if (this.position == Constants.SONG_LENGTH) {
                this.hasWon = true;
            }
        } else {
            this.hasLost = true;
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