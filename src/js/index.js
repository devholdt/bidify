import {
  displayListings,
  popularListings,
  latestListings,
  lastChance,
} from "./api/index.js";
import { modals } from "./utilities/modals.js";

import { renderNav } from "./components/navigation.js";

popularListings();
latestListings();
lastChance();
displayListings();
modals();

renderNav();
