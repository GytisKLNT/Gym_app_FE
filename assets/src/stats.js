const table = document.querySelector("tbody");
const total = document.querySelector(".totalNum");

const token = localStorage.getItem("token");

document.getElementById("logout").addEventListener("click", () => {
  localStorage.removeItem("token");
  location.replace("index.html");
});

const weightChart = (data) => {
  const weight = [];
  const time = [];

  data.forEach((element) => {
    weight.push(element.weight);
    let date = new Date(element.lastUpdated);
    let shortMonth = date.toLocaleString("en-us", { month: "short" });
    time.push(shortMonth);
  });

  const ctx = document.getElementById("myChart");
  const myChart = new Chart(ctx, {
    type: "line",
    data: {
      labels: time,
      datasets: [
        {
          label: "Weight, kg",
          data: weight,
          backgroundColor: ["rgba(255, 99, 132, 0.2)"],
          borderColor: ["rgba(255, 99, 132, 1)"],
          borderWidth: 1,
        },
      ],
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });
};

const repsChart = (data) => {
  const reps = [];
  const titles = [];

  data.forEach((a) => {
    reps.push(a.reps);
    titles.push(a.title);
  });

  const ctx = document.getElementById("repsChart");
  const myChart = new Chart(ctx, {
    type: "bar",
    data: {
      labels: titles,
      datasets: [
        {
          label: "# of Reps",
          data: reps,
          backgroundColor: [
            "rgba(255, 99, 132, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(255, 206, 86, 0.2)",
            "rgba(75, 192, 192, 0.2)",
            "rgba(153, 102, 255, 0.2)",
            "rgba(255, 159, 64, 0.2)",
          ],
          borderColor: [
            "rgba(255, 99, 132, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(75, 192, 192, 1)",
            "rgba(153, 102, 255, 1)",
            "rgba(255, 159, 64, 1)",
          ],
          borderWidth: 1,
        },
      ],
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });
};

const setsChart = (data) => {
  const sets = [];
  const titles = [];

  data.forEach((a) => {
    sets.push(a.sets);
    titles.push(a.title);
  });

  const ctx = document.getElementById("setsChart");
  const myChart = new Chart(ctx, {
    type: "bar",
    data: {
      labels: titles,
      datasets: [
        {
          label: "# of Sets",
          data: sets,
          backgroundColor: [
            "rgba(255, 99, 132, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(255, 206, 86, 0.2)",
            "rgba(75, 192, 192, 0.2)",
            "rgba(153, 102, 255, 0.2)",
            "rgba(255, 159, 64, 0.2)",
          ],
          borderColor: [
            "rgba(255, 99, 132, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(75, 192, 192, 1)",
            "rgba(153, 102, 255, 1)",
            "rgba(255, 159, 64, 1)",
          ],
          borderWidth: 1,
        },
      ],
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });
};

const addTable = (element) => {
  if (!element) {
    table.textContent = "No activity today. #CheatDay";
  } else {
    const tr = document.createElement("tr");
    table.append(tr);

    const td1 = document.createElement("td");
    td1.textContent = element.title;

    const td2 = document.createElement("td");
    td2.textContent = element.reps;

    const td3 = document.createElement("td");
    td3.textContent = element.sets;

    const td4 = document.createElement("td");
    td4.textContent = `${element.weight} kg`;

    tr.append(td1, td2, td3, td4);
  }
};

const getData = async (token) => {
  try {
    const res = await fetch(`http://localhost:8080/v1/sets`, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json();
    console.log(data);

    weightChart(data);
    repsChart(data);
    setsChart(data);

    const date = new Date().getDate();

    const todayActivity = data.filter(
      (v) => new Date(v.lastUpdated).getDate() === date
    );

    todayActivity.forEach((element) => {
      addTable(element);
    });

    total.textContent = data.length;
  } catch (err) {
    alert(err.msg || "An error has happened. Try again later.");
  }
};

if (!token) {
  location.replace("index.html");
} else {
  getData(token);
}
