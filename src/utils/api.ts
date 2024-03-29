class API {
  async getCharacterInfo({ characterName }: { characterName: string }) {
    const url = `https://developer-lostark.game.onstove.com/characters/${characterName}/siblings`;
  }
}
