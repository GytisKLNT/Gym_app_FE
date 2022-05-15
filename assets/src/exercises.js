const exerSection = document.querySelector(".exercises");

const token = localStorage.getItem("token");

if (!token) {
  location.replace("index.html");
}
document.getElementById("logout").addEventListener("click", () => {
  localStorage.removeItem("token");
  location.replace("index.html");
});

const displayExercises = (element) => {
  const container = document.createElement("div");
  exerSection.append(container);

  const exerc = document.createElement("div");
  exerc.className = "exerc";
  container.append(exerc);

  const h2 = document.createElement("h2");
  h2.textContent = element.title;
  exerc.append(h2);

  const infoForm = document.createElement("div");
  infoForm.className = "infoForm";
  infoForm.id = "infoForm";
  infoForm.style.height = "0";
  infoForm.style.opacity = "0";

  container.append(infoForm);

  exerc.addEventListener("click", () => {
    if (infoForm.style.height == "0px") {
      infoForm.style.height = "auto";
      infoForm.style.opacity = 1;
      exerc.style.marginBottom = 0;
    } else {
      infoForm.style.height = "0";
      infoForm.style.opacity = "0";
    }
  });

  const info = document.createElement("p");
  info.textContent = element.description;
  infoForm.append(info);
};

const displayOptions = (element) => {
  const select = document.querySelector("select");

  const option = document.createElement("option");
  option.textContent = `${element.title}`;
  option.value = `${element.id}`;

  select.append(option);
};

const sendData = async (userData) => {
  const res = await fetch(`http://localhost:8080/v1/sets`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(userData),
  });
  const data = await res.json();

  if (data.err) {
    return alert(data.err);
  }

  alert(data.msg);
  location.replace("stats.html");
};

const form = document.forms.addExerc;
const button = document.querySelector("button");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const weight = Number(e.target.elements.weight.value);
  const reps = Number(e.target.elements.reps.value);
  const sets = Number(e.target.elements.sets.value);
  const exercise_id = Number(e.target.elements.exercise.value);

  sendData({ weight, reps, sets, exercise_id });
  button.textContent = "✓";
});

const getExercises = async () => {
  try {
    const res = await fetch("http://localhost:8080/v1/exercises", {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();

    data.forEach((element) => {
      displayExercises(element);
      displayOptions(element);
    });
  } catch (err) {
    alert(err);
  }
};

getExercises();
