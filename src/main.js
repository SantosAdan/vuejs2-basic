import Vue from 'vue'
import {Team} from './team'
import _ from 'lodash'

require("style-loader!css-loader!bootstrap/dist/css/bootstrap.min.css")
require('bootstrap')

let meuVue = new Vue({
  el: '#app',
  data: {
    order: {
      keys: ['score', 'scoredGoals', 'concededGoals'],
      sort: ['desc', 'desc', 'asc']
    },
    columns: ['Nome', 'score', 'scoredGoals', 'concededGoals', 'Saldo'],
    filter: '',
    teams: [
      new Team('Palmeiras', require('./assets/palmeiras_60x60.png')),
      new Team('Flamengo', require('./assets/flamengo_60x60.png')),
      new Team('Atlético-MG', require('./assets/atletico_mg_60x60.png')),
      new Team('Santos', require('./assets/santos_60x60.png')),
      new Team('Botafogo', require('./assets/botafogo_60x60.png')),
      new Team('Atlético-PR', require('./assets/atletico-pr_60x60.png')),
      new Team('Corinthians', require('./assets/corinthians_60x60.png')),
      new Team('Grêmio', require('./assets/gremio_60x60.png')),
      new Team('Fluminense', require('./assets/fluminense_60x60.png')),
      new Team('Ponte Preta', require('./assets/ponte_preta_60x60.png')),
      new Team('Chapecoense', require('./assets/chapecoense_60x60.png')),
      new Team('São Paulo', require('./assets/sao_paulo_60x60.png')),
      new Team('Cruzeiro', require('./assets/cruzeiro_60x60.png')),
      new Team('Sport', require('./assets/sport_60x60.png')),
      new Team('Coritiba', require('./assets/coritiba_60x60.png')),
      new Team('Internacional', require('./assets/internacional_60x60.png')),
      new Team('Vitória', require('./assets/vitoria_60x60.png')),
      new Team('Figueirense', require('./assets/figueirense_60x60.png')),
      new Team('Santa Cruz', require('./assets/santa_cruz_60x60.png')),
      new Team('América-MG', require('./assets/america_mg_60x60.png')),
    ],
    newGame: {
      home: {
        team: null,
        goals: 0
      },
      guest: {
        team: null,
        goals: 0
      }
    },
    view: 'results'
  },
  methods: {
    endGame () {
      let guestTeam = this.newGame.guest.team,
          homeGoals = +this.newGame.home.goals, // o "+" é para converter string para inteiro (whoooa!!)
          guestGoals = +this.newGame.guest.goals

      this.newGame.home.team.endGame(guestTeam, guestGoals, homeGoals)

      this.showView('results')
    },
    createNewGame () {
      // Criamos a nova partida randomicamente
      let indexHome = Math.floor(Math.random() * 20),
          indexGuest = Math.floor(Math.random() * 20)

      // Iniciamos o placar como 0 x 0
      this.newGame.home.team = this.teams[indexHome]
      this.newGame.home.goals = 0
      this.newGame.guest.team = this.teams[indexGuest]
      this.newGame.guest.goals = 0

      this.showView('newGame')
    },
    /**
     * Altera a view que será exibida para a de novo jogo
     * TODO: utilizar esse tipo de coisa com vuex e components
     */
    showView (viewName) {
      this.view = viewName
    },
    /**
     * Ordena a tabela de resultados pela coluna selecionada
     * @param  String columnName 
     */
    sortBy (columnName) {
      this.order.keys = columnName
      this.order.sort = this.order.sort == 'desc' ? 'asc' : 'desc'
    }
  },
  computed: {
    teamsFiltered() {
      let collection = _.orderBy(this.teams, this.order.keys, this.order.sort)

      return _.filter(collection, item => item.name.indexOf(this.filter) >= 0)
    }
  },
  filters: {
    balance (team) {
      return team.scoredGoals - team.concededGoals
    }
  }
})
