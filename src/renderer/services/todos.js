import axios from "axios";
import * as _ from "lodash";
require('dotenv').config();

// You can use your own logic to set your local or production domain
const baseDomain = "https://jsonplaceholder.typicode.com";
// The base URL is empty this time due we are using the jsonplaceholder API
let API_KEY = "0e59b4a3307f7f4e4e5aeb797c55cc51";
let API_TOKEN;
let API_ENDPOINT = 'https://api.trello.com/1/';
let taskCount = 0

var TodoService = {
  makeAPIRequest (query) {
    return axios
      .get(`${API_ENDPOINT}search?query=${query}&idBoards=mine&key=${API_KEY}&token=${API_TOKEN}`)
      .then(res => {
        console.log(res.data.cards)
        res.data = res.data.cards.map(card=>{
          var options = { weekday: 'long', month: 'long', day: 'numeric' };

          card.due = new Date(card.due).toLocaleDateString("en-US", options)
          return card;
        });
        taskCount = res.data.length

        return res;
      })
      .catch(error => {
        if (error) throw new Error(error)
      })
  },

  makeSearchRequest (query) {
    return axios
      .get(`${API_ENDPOINT}search?query=${query}&cards_limit=100&key=${API_KEY}&token=${API_TOKEN}`)
      .then(res => {
        console.log(res.data.cards)
        res.data = res.data.cards.map(card=>{
          return card;
        });
        taskCount = res.data.length

        return res;
      })
      .catch(error => {
        if (error) throw new Error(error)
      })
  },

  getTodayList (board="pDsfmnRm") {
    return axios
      .get(`${API_ENDPOINT}boards/${board}/lists?key=${API_KEY}&token=${API_TOKEN}`)
      .then(res => {
        console.log(res.data)
        let day = new Date().getDay();
        let list = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"]
        res.data = _.find(res.data, {name: list[day]})
        taskCount = res.data.length

        return res;
      })
      .catch(error => {
        if (error) throw new Error(error)
      })
  },

  getTodos () {
    return TodoService.makeSearchRequest('board:pDsfmnRm is:open')
  },

  async getTodayTodos(){
    let cards = await TodoService.getTodos();
    let list = await TodoService.getTodayList();

    let res = _.filter(cards.data, {idList: list.data.id})
    return res;
  },

  getPost(postId) {
    return axios.get(`${resource}/${postId}`);
  },

  createPost(payload) {
    return axios.post(`${resource}`, payload);
  },

  setToken (token) {
    API_TOKEN = token;
  },
  getToken() {
    return API_TOKEN
  },
  getTaskCount() {
    return taskCount
  },
  setTaskCount(count) {
  taskCount = count
  }

};

export default TodoService;