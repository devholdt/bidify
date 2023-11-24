import { renderNav, modals } from "./components/index.js";
import {
  displayListings,
  popularListings,
  latestListings,
  lastChance,
} from "./api/index.js";

popularListings();
latestListings();
lastChance();
displayListings();
modals();

renderNav();
