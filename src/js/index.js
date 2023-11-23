import {
  displayListings,
  popularListings,
  latestListings,
  lastChance,
} from "./api/index.js";
import { renderNav, modals } from "./components/index.js";

popularListings();
latestListings();
lastChance();
displayListings();
modals();

renderNav();
