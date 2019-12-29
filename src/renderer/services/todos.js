import axios from "axios";
import * as _ from "lodash";
require('dotenv').config();

// You can use your own logic to set your local or production domain
const baseDomain = "https://jsonplaceholder.typicode.com";
// The base URL is empty this time due we are using the jsonplaceholder API
let API_KEY = process.env.TRELLO_API;
let API_TOKEN;
let API_ENDPOINT = 'https://api.trello.com/1/';
let taskCount = 0

var TodoService = {
  makeApiRequest (query) {
    return axios
      .get(`${API_ENDPOINT}search?${query}&idBoards=mine&key=${API_KEY}&token=${API_TOKEN}`)
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
  getTodos () {
    return TodoService.makeApiRequest('query=@me due:week')
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