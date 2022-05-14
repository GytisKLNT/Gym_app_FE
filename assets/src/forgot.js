const formForgot = document.forms.forgot;

formForgot.addEventListener("submit", (e) => {
  e.preventDefault();

  const email = e.target.elements.email.value.trim();

  const forgot = { email };

  forgotPass(forgot);
});

const url = "http://localhost:8080/v1";

// forgot password

const forgotPass = async (forgot) => {
  try {
    const res = await fetch(`${url}/users/forgot`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(forgot),
    });

    const data = await res.json();

    return alert(data.msg);
  } catch (err) {
    alert(err.message || "An error has happened. Try again later.");
  }
};
