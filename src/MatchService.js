import axios from "axios";

const url = "https://game-show.herokuapp.com/match/";

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
}

export default MatchService;
