import { getUser } from "../storage/index.js";
import { API_URLS, headers } from "../api/index.js";
import { alert } from "../utilities/index.js";

export async function editProfileEvent(event) {
  event.preventDefault();

  try {
    const url = `${API_URLS.PROFILES}/${getUser().name}`;
    const userMedia = await fetch(`${url}`, { headers: headers() });
    const newAvatarInput = document.querySelector("#editProfileAvatar");
    const newAvatarValue = newAvatarInput.value;

    let newUserMedia = { avatar: userMedia.avatar };

    if (newAvatarValue.trim() !== "") {
      newUserMedia.avatar = newAvatarValue;
    }

    const response = await fetch(`${url}/media`, {
      method: "PUT",
      body: JSON.stringify(newUserMedia),
      headers: headers("application/json"),
    });

    if (response.ok) {
      alert(".success", "Avatar updated", ".alert-editprofile");

      setTimeout(() => {
        userMedia.avatar = newUserMedia.avatar;

        const avatarImage = document.getElementById("userAvatar");
        avatarImage.src = newUserMedia.avatar;
      });
    }
  } catch (error) {
    alert(
      "danger",
      "An error occured when attempting to edit profile",
      ".alert-editprofile"
    );
  }
}
