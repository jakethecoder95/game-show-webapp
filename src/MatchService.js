import axios from "axios";

const url = "https://game-show.herokuapp.com/match/";
const pressYourLuckURL = "https://game-show.herokuapp.com/press-your-luck/";

// const pressYourLuckURL = "http://localhost:8000/press-your-luck/";

class MatchService {
  static getMatch() {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await axios.get(url);
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
        const res = await axios.post(pressYourLuckURL + "handle-results", {
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

  static AddDisplayAnswer(text, teamIndex) {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await axios.post(pressYourLuckURL + "handle-results", {
          text,
          teamIndex
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
