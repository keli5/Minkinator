exports.convertTime = (time) => {
  const map = new Map([["s", 1000], ["m", 6e+4], ["h", 3.6e+6], ["d", 8.64e+7], ["w", 6.048e+8], ["M", 2.628e+9], ["y", 3.154e+10], ["D", 3.154e+11], ["c", 3.154e+12]]);
  let mem = "";
  let ms = 0;

  time = time.split("");

  for (const item of time) {
    if (isNaN(item)) {
      ms += parseInt(mem) * map.get(item);
      mem = "";
    } else {
      mem += item;
    }
  }

  return ms;
};

exports.randomInteger = (min, max) => {
  return Math.round(Math.random() * (max - min) + min);
};

exports.getUser = async (client, message, idArg) => {
  if (message.mentions.users.size) return message.mentions.users.first();

  if (idArg) {
    try {
      return client.users.fetch(idArg);
    } catch (error) {
      return;
    }
  }

  return message.author;
};

exports.kToC = (k) => {
  return (k - 273.15).toFixed(2);
};

exports.cToK = (c) => {
  return c + 273.15;
};

exports.cToF = (c) => {
  return (c * 1.8) + 32;
};

exports.fToC = (f) => {
  return (f - 32) / 1.8;
};

exports.capitalize = (string) => {
  if (typeof (string) !== "string") return "";
  return string.charAt(0).toUpperCase() + string.slice(1);
};

exports.sleep = (ms) => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

exports.formatNumber = (number, places = 0) => {
  return (number).toFixed(places).replace(/\d(?=(\d{3})+\.)/g, "$&,");
};

exports.fetchJSON = async (url) => {
  const fetch = global.fetch;
  
  return fetch(url).then(response => response.json());
};