const form = document.forms.login;

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const email = e.target.elements.email.value.trim().toLowerCase();
  const password = e.target.elements.pass.value.trim();

  const login = { email, password };

  accLogin(login);
});

const accLogin = async (login) => {
  try {
    const res = await fetch("http://localhost:8080/v1/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(login),
    });

    const data = await res.json();
    localStorage.setItem("token", data.token);
    location.replace("home.html");

    return alert(data.msg);
  } catch (err) {
    alert(err.message || "An error has happened. Try again later.");
  }
};
