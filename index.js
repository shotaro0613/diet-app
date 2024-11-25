const weight = document.querySelector("#weight");
const height = document.querySelector("#height");
const bmiBtn = document.querySelector("#bmiBtn");
const bmi = document.querySelector("#bmi");
const judge = document.querySelector("#judge");
const normal = document.querySelector("#normal");
const age = document.querySelector("#age");
const calcRateBtn = document.querySelector("#calcRateBtn");
const totalConsumption = document.querySelector("#totalConsumption");
const loseWeight = document.querySelector("#loseWeight");
const days = document.querySelector("#days");
const calcCal = document.querySelector("#calcCal");
const result = document.querySelector("#result");
const pfcBtn = document.querySelector("#pfcBtn");
const p = document.querySelector("#p");
const f = document.querySelector("#f");
const c = document.querySelector("#c");
const no = document.querySelector("#no");
const light = document.querySelector("#light");
const middle = document.querySelector("#middle");
const workoutSelect = document.querySelector("#workoutSelect");
const men = document.querySelector("#men");
const women = document.querySelector("#women");

bmiBtn.addEventListener("click", () => {
  bmi.innerHTML = `BMI: ${checkBMI(weight, height)}`;
  normal.innerHTML = `標準体重: ${findGoodWeight(height)}`;
  judge.innerHTML = `${judgeBodyStyle(checkBMI(weight, height))}`;
});

calcRateBtn.addEventListener("click", () => {
  const selectedGender = getSelectedGender();
  totalConsumption.innerHTML = `${calcTDEE(weight, height, age, selectedGender)}カロリー/1日`;
});

calcCal.addEventListener("click", () => {
  result.innerHTML = `${calcIntakeCal(loseWeight, days)}カロリー/1日`;
});

pfcBtn.addEventListener("click", () => {
  calcPFC();
});

function calcTDEE(weight, height, age, gender) {
  const base = calcMBR(weight, height, age, gender);
  switch (workoutSelect.value) {
    case "0":
      return Math.floor(base * 1.2);

    case "1":
      return Math.floor(base * 1.375);

    case "2":
      return Math.floor(base * 1.55);
  }
}

function calcIntakeCal(loseWeight, days) {
  const totalConsumedCal = parseInt(loseWeight.value) * 7200;
  const consumedCal_day = totalConsumedCal / parseInt(days.value);
  const intakeCal_day = Math.floor(
    calcTDEE(weight, height, age, getSelectedGender()) - consumedCal_day
  );
  return intakeCal_day;
}

function calcPFC() {
  const calP = calcIntakeCal(loseWeight, days) * 0.3;
  const calF = calcIntakeCal(loseWeight, days) * 0.2;
  const calC = calcIntakeCal(loseWeight, days) * 0.5;
  const gramP = calP / 4;
  const gramF = calF / 9;
  const gramC = calC / 4;

  p.innerHTML = `タンパク質 : ${Math.round(gramP * 10) / 10}g`;
  f.innerHTML = `脂質 : ${Math.round(gramF * 10) / 10}g`;
  c.innerHTML = `炭水化物 : ${Math.round(gramC * 10) / 10}g`;
}

function calcMBR(weight, height, age, gender) {
  if (gender === "male") {
    return (
      parseInt(weight.value) * 13.397 +
      parseInt(height.value) * 4.799 -
      parseInt(age.value) * 5.677 +
      88.362
    );
  } else if (gender === "female") {
    return (
      parseInt(weight.value) * 9.247 +
      parseInt(height.value) * 3.098 -
      parseInt(age.value) * 4.33 +
      447.593
    );
  }
}

function checkBMI(weight, height) {
  const BMI =
    parseInt(weight.value) /
    ((parseInt(height.value) * parseInt(height.value)) / 10000);

  return BMI.toFixed(1);
}

function findGoodWeight(height) {
  const goodWeight = ((parseInt(height.value) / 100) ** 2 * 22).toFixed(1);
  return goodWeight;
}

function judgeBodyStyle(BMI) {
  if (BMI < 18.5) {
    return "低体重です。もう少し太りましょう。";
  } else if (BMI >= 18.5 && BMI < 25) {
    return "普通体重です。";
  } else if (BMI >= 25 && BMI < 30) {
    return "軽肥満です。瘦せましょう。";
  } else {
    return "デブです。瘦せろ。";
  }
}

function getSelectedGender() {
  if (men.checked) {
    return "male";
  }
  if (women.checked) {
    return "female";
  }
}
