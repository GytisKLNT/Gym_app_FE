const form = document.forms.login;

const accReg = async (login) => {
  try {
    const res = await fetch("http://localhost:8080/v1/users/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(login),
    });

    const data = await res.json();

    location.replace("index.html");

    return alert(data.msg);
  } catch (err) {
    alert(err.message || "An error has happened. Try again later.");
  }
};

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const name = e.target.elements.name.value.trim();
  const email = e.target.elements.email.value.trim().toLowerCase();
  const password = e.target.elements.pass.value.trim();

  const login = { name, email, password };

  accReg(login);
});
