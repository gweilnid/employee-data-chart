/**
 * This script is for generating random employees and creating chart data about employees data.
 * It includes functions to:
 * - Randomly generate integer values within a specified range
 * - Select genders, names, and surnames for employees randomly
 * - Calculate ages based on birthdays and handle edge date cases
 * - Generate birthdates in a specific age range and adjusts them into valid interval
 * - Categorize employees by gender and workload, and counts the occurrences of each name
 * - Converts each category’s map of names and counts into a sorted array of {label, value} objects
 */

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
function getRandomInt(min, max) {
  // I add +1 to adjust the interval from [min, max) to [min, max]
  const DELTA = 1;
  return Math.floor(Math.random() * (max - min + DELTA) + min);
}


// Returns a randomly chosen gender from an array 
function getGender() {
  const genders = ["female", "male"];

  return genders[getRandomInt(0, genders.length - 1)];
}

// Determines if a given year is leap or not
function isLeapYear(year) {
  return (year % 4 === 0) && (year % 100 !== 0 || year % 400 === 0);
}

// Returning 28 if the day is 29 and it's not a leap year
function februaryCheck(day, month, year) {
  const NON_LEAP_LAST_DAY = 28;
  const LEAP_LAST_DAY = 29;
  const FEBRUARY = 1;
  if (month === FEBRUARY && day === LEAP_LAST_DAY && !isLeapYear(year)) {
    //console.log("HERE 1");
    return NON_LEAP_LAST_DAY;
  }
  return day;
}

// Adjusts the birthdate if it is not inside correct age range
function birthdayIntervalEdges(minYear, maxYear, currentDate, birthday) {
  const minAgeLimit = new Date(Date.UTC(currentDate.getUTCFullYear() - minYear,
    currentDate.getUTCMonth(), currentDate.getUTCDate()));
  const maxAgeLimit = new Date(Date.UTC(currentDate.getUTCFullYear() - maxYear,
    currentDate.getUTCMonth(), currentDate.getUTCDate()));

  if (birthday > minAgeLimit) {
    birthday.setUTCFullYear(birthday.getUTCFullYear() - 1);
    //console.log("HERE 2");
  }
  else if (birthday < maxAgeLimit) {
    birthday.setUTCFullYear(birthday.getUTCFullYear() + 1);
    //console.log("HERE 3");
  }
}

// Generates a birthdate within a given age range based on current date
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date
function getBirthday(minYear, maxYear) {
  const JANUARY = 0, DECEMBER = 11;
  const FIRST_DAY = 1;

  const currentDate = new Date();
  const currentYear = currentDate.getUTCFullYear();
  const year = getRandomInt(currentYear - maxYear, currentYear - minYear);
  const month = getRandomInt(JANUARY, DECEMBER);
  // (year, month, last day of the month)
  let day = getRandomInt(FIRST_DAY, new Date(year, month + 1, 0).getDate());

  // If the date is February 29 in a non-leap year, decrement the day by one
  day = februaryCheck(day, month, year);

  // Using UTC to set the time to T00:00:00.000Z
  const birthday = new Date(Date.UTC(year, month, day));

  // Checks if the date is inside the correct interval
  birthdayIntervalEdges(minYear, maxYear, currentDate, birthday);

  return birthday.toISOString();
}

// Selects a random female name from array
function getFemaleName() {
  const femaleNames = [
    "Natálie", "Jana", "Eva", "Anna", "Hana", "Lenka", "Kateřina", "Věra", "Lucie", "Tereza",
    "Petra", "Martina", "Jitka", "Ludmila", "Helena", "Michaela", "Alena", "Dana", "Ivana", "Monika",
    "Jarmila", "Veronika", "Zdeňka", "Nikola", "Gabriela", "Božena", "Eliška", "Irena", "Klára", "Alice",
    "Barbora", "Margita", "Andrea", "Dagmar", "Šárka", "Zuzana", "Vlasta", "Katarína", "Jaroslava", "Simona",
    "Daniela", "Kristýna", "Olga", "Radka", "Blanka", "Iva", "Renata", "Romana", "Růžena", "Aneta"
  ];

  return femaleNames[getRandomInt(0, femaleNames.length - 1)];
}

// Selects a random female surname from array
function getFemaleSurname() {
  const femaleSurnames = [
    "Nováková", "Svobodová", "Novotná", "Dvořáková", "Černá", "Procházková", "Kučerová", "Veselá", "Horáková", "Němcová",
    "Marková", "Pospíšilová", "Pokorná", "Hájková", "Jelínková", "Králová", "Růžičková", "Benešová", "Fialová", "Sedláčková",
    "Doležalová", "Zemanová", "Kolářová", "Navrátilová", "Čermáková", "Vaněková", "Urbanová", "Blahová", "Křížová", "Kopecká",
    "Konečná", "Malá", "Holubová", "Abrahámová", "Adamová", "Bartáková", "Dostálová", "Eliášová", "Filipová", "Gregorová",
    "Hejnová", "Chalupová", "Jandová", "Kafková", "Langerová", "Machová", "Nová", "Odehnalová", "Pánková", "Říhová"
  ];

  return femaleSurnames[getRandomInt(0, femaleSurnames.length - 1)];
}

// Selects a random male name from array
function getMaleName() {
  const maleNames = [
    "Jiří", "Jan", "Petr", "Josef", "Pavel", "Martin", "Jaroslav", "Tomáš", "Miroslav", "František",
    "Karel", "Václav", "Michal", "Lukáš", "David", "Zdeněk", "Jakub", "Stanislav", "Roman", "Ondřej",
    "Jaromír", "Marek", "Milan", "Vladimír", "Ladislav", "Ivan", "Filip", "Adam", "Radek", "Matěj",
    "Vojtěch", "Daniel", "Kamil", "Luboš", "Patrik", "Vít", "Rudolf", "Dominik", "Luděk", "Aleš",
    "Stepan", "Richard", "Igor", "Marian", "Janek", "Robert", "Erik", "Norbert", "Emil", "Dennis"
  ];

  return maleNames[getRandomInt(0, maleNames.length - 1)];
}

// Selects a random male surname from array
function getMaleSurname() {
  const maleSurnames = [
    "Novák", "Svoboda", "Novotný", "Dvořák", "Černý", "Procházka", "Kučera", "Veselý", "Horák", "Němec",
    "Marek", "Pospíšil", "Pokorný", "Hájek", "Jelínek", "Král", "Růžička", "Beneš", "Fiala", "Sedláček",
    "Doležal", "Zeman", "Kolář", "Navrátil", "Čermák", "Vaněk", "Urban", "Blaha", "Kříž", "Kopecký",
    "Konečný", "Malý", "Holub", "Abrahám", "Adam", "Barták", "Dostál", "Eliáš", "Filip", "Gregor",
    "Hejna", "Chalupa", "Janda", "Kafka", "Langer", "Mach", "Nový", "Odehnal", "Pánek", "Říha"
  ];

  return maleSurnames[getRandomInt(0, maleSurnames.length - 1)];
}

// Randomly selects a workload from array
function getWorkload() {
  const workloads = [10, 20, 30, 40];
  return workloads[getRandomInt(0, workloads.length - 1)]
}

// Generates employee data based on input specifications (count, age range)
function generateEmployeeData(dtoIn) {
  let count = dtoIn.count;
  let minAge = dtoIn.age.min;
  let maxAge = dtoIn.age.max;
  let employee = {};
  let employees = [];

  if (count == 0) {
    return [];
  } else if (count < 0) {
    throw new Error("Zadejte kladné číslo.");
  } else if (minAge < 18 || minAge > maxAge) {
    throw new Error("Neplatný věkový intervál.");
  } else {
    for (let i = 0; i < count; i++) {
      let gender = getGender();
      let name, surname;
      if (gender === "female") {
        name = getFemaleName();
        surname = getFemaleSurname();
      }
      else {
        name = getMaleName();
        surname = getMaleSurname();
      }

      employee = {
        gender: gender,
        birthdate: getBirthday(minAge, maxAge),
        name: name,
        surname: surname,
        workload: getWorkload()
      };

      employees.push(employee);
    }
  }
  return employees;
}

// Increments the count for a given name if it exists if not, initializes the count to 0 and adds 1.
function incrementNameCount(nameCounts, name) {
  nameCounts[name] = (nameCounts[name] || 0) + 1;
}

// Iterates through a list of employees, categorizes them by gender and workload, and counts the occurrences of each name.
function categorizeAndCountEmployees(employees) {
  const FULL_TIME = 40;
  const categories = {
    all: {},
    male: {},
    female: {},
    femalePartTime: {},
    maleFullTime: {}
  };

  employees.forEach(employee => {
    incrementNameCount(categories.all, employee.name);

    if (employee.gender == "male") {
      incrementNameCount(categories.male, employee.name);
      if (employee.workload == FULL_TIME) {
        incrementNameCount(categories.maleFullTime, employee.name);
      }
    } else {
      incrementNameCount(categories.female, employee.name);
      if (employee.workload != FULL_TIME) {
        incrementNameCount(categories.femalePartTime, employee.name);
      }
    }
  });

  return categories;
}

// Converts each category’s map of names and counts into a sorted array of {label, value} objects.
function transformToChartData(counts) {
  const chartData = {};
  Object.keys(counts).forEach(category =>{
    chartData[category] = Object.entries(counts[category])
      .map(([label, value]) => ({label, value}))
      .sort((a,b) => b.value - a.value);
  });

  return chartData;
}

// Processes employee data to create chart content, then transforms it into chart data.
function getEmployeeChartContent(employees) {
  const counts = categorizeAndCountEmployees(employees);
  const chartData = transformToChartData(counts);
  return {names: counts, chartData};
}

/* Takes a dtoIn object as input, which has parameters for generating random employees.
   It generates employee data then creates chart content, chart data from generated employees. */
function main(dtoIn) {
  let employees = generateEmployeeData(dtoIn);
  let dtoOut = getEmployeeChartContent(employees);
  console.log(JSON.stringify(dtoOut, null, 2));
  return dtoOut;
}


const dtoIn = {
  count: 60,
  age: {
    min: 19,
    max: 35
  }
}

main(dtoIn);

