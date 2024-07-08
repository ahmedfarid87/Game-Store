import { Details } from "./details.js";
import { Ui } from "./ui.js";

const uiGames = new Ui();

export class Games {
  constructor() {
    this.getApi("mmorpg");

    document.querySelectorAll(".nav-link").forEach((link) => {
      link.addEventListener("click", (e) => {
        this.changAct(link);
        this.getApi(link.dataset.category);
      });
    });
    this.ui = new Ui();
  }

  changAct(link) {
    document.querySelector(".navbar-nav .active").classList.remove("active");
    link.classList.add("active");
  }

  async getApi(category) {
    const loading = document.querySelector(".loading");
    loading.classList.remove("d-none");
    const options = {
      method: "GET",
      headers: {
        "x-rapidapi-key": "520d38355amsh9bde0d196efb295p1b0896jsn0e30d9f418c4",
        "x-rapidapi-host": "free-to-play-games-database.p.rapidapi.com",
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    };

    const api = await fetch(
      `https://free-to-play-games-database.p.rapidapi.com/api/games?category=${category}`,
      options
    );

    const response = await api.json();
    this.ui.display(response);
    this.startEvent();
    loading.classList.add("d-none");
  }
  startEvent() {
    document.querySelectorAll(".card").forEach((item) => {
      item.addEventListener("click", () => {
        const id = item.dataset.id;
        this.showDetails(id);
      });
    });
  }

  showDetails(idGame) {
    const details = new Details(idGame);
    document.querySelector(".games").classList.add("d-none");
    document.querySelector(".details").classList.remove("d-none");
  }
}
