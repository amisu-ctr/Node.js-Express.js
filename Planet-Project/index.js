// https://csv.js.org/parse/
const { parse } = require("csv-parse");
const fs = require("fs");
// https://nodejs.org/api/fs.html#fs_fs_createreadstream_path_options

const habitablePlanets = [];

function isHabitablePlanets(planet) {
    return planet['koi_disposition'] === 'CONFIRMED' && planet["koi_insol"] > 0.36 && planet['koi_insol'] < 1.11 && planet['koi_prad'] < 1.6
}

fs.createReadStream("kepler_data.csv")
  // parse function was piped here to convert the buffer code to an array of actual text - table
  .pipe(
    parse({
      // treat lines that start with this character as comments
      comment: "#",
      // treates Each row as a javascript object with key value pairs rather than as just an array
      columns: true,
    })
  )
  .on("data", (data) => {
    // data['koi_disposition'] is 'COMFIRMED', meaning it is habitable
    if(isHabitablePlanets(data)) {
        habitablePlanets.push(data);
    }
  })
  .on("error", (err) => {
    console.log(err);
  })
  .on("end", () => {
    // log 'CONFIRMED' planets
    console.log(habitablePlanets.map((planet) => {
        return planet['kepler_name']
    }));
    console.log(`${habitablePlanets.length} habitable planets found`);
  });
