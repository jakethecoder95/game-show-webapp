import axios from "axios";

const url = /localhost/.test(location.href)
  ? "http://localhost:8000/"
  : "https://game-show.herokuapp.com/";

class MatchService {
  static getMatch() {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await axios.get(url + "match");
        const data = res.data;
        resolve(data);
      } catch (err) {
        reject(err);
      }
    });
  }

  static handleResults(amount, freeSpin) {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await axios.post(url + "press-your-luck/handle-results", {
          amount,
          freeSpin
        });
        const data = res.data;
        resolve(data);
      } catch (err) {
        reject(err);
      }
    });
  }
}

export default MatchService;
