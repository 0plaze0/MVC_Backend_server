const whitelist = ["https://www.yourWebsite.com", "https://localhost:3500"];

corsOption = {
  origin: (origin, callback) => {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by cors"));
    }
  },
};

module.exports = corsOption;
