
class Player {
    constructor(username, character) {
      this.username = username;
      this.character = character;
      this.position = 0;
      this.isFinished = false;
    }

    setPosition(position) {
      this.position = position
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