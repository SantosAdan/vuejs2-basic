export class Team {
  // Construtor da classe
  constructor(name, crest) {
      this.name = name
      this.crest = crest

      this.score = 0
      this.scoredGoals = 0
      this.concededGoals = 0
  }

  updateInfo(score, scoredGoals, concededGoals) {
    this.score += score
    this.scoredGoals += scoredGoals
    this.concededGoals += concededGoals
  }

  endGame(guestTeam, guestGoals, homeGoals) {
    if (homeGoals == guestGoals) {
      this.updateInfo(1, homeGoals, guestGoals)
      guestTeam.updateInfo(1, guestGoals, homeGoals)
    } else if ( homeGoals > guestGoals) {
      this.updateInfo(3, homeGoals, guestGoals)
      guestTeam.updateInfo(0, guestGoals, homeGoals)
    } else {
      this.updateInfo(0, homeGoals, guestGoals)
      guestTeam.updateInfo(3, guestGoals, homeGoals)
    }
  }
}
