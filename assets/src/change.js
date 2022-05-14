const formChange = document.forms.change;

const token = localStorage.getItem("token");

if (!token) {
  location.replace("index.html");
}

formChange.addEventListener("submit", (e) => {
  e.preventDefault();

  const oldPassword = e.target.elements.oldPass.value.trim();
  const newPassword = e.target.elements.newPass.value.trim();

  const change = { oldPassword, newPassword };

  changePass(change);
});

const url = "http://localhost:8080/v1";

// change password

const changePass = async (change) => {
  try {
    const res = await fetch(`${url}/users/change`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(change),
    });

    const data = await res.json();

    location.replace("index.html");

    return alert(data.msg);
  } catch (err) {
    alert(err.message || "An error has happened. Try again later.");
  }
};
