import {csvParse, csvFormat} from 'd3-dsv';
import {readFileSync, writeFileSync} from 'fs';
import {parse, format} from 'path';
import Geonames from 'geonames.js';

// TODO: Only calculate the geodata for new data (check if data already exists? line count could be an initial strategy)
// Also convert to GeoJson in this script? (reduce rendertime computation)
// Merge duplictes (combined value)
// Make the script take in a file from stdin?

/** 
 * @type {SupportForPalestine} 
 * @NOTE (SENSITIVE API LIMIT): use the "development version" for testing. 
 */
// const csvFile = './data/support-for-palestine.csv'; // dataset for use in production/build
const csvFile = './data/support-for-palestine.dev.csv';
const geonamesUser = process.env.GEONAMES_USER;

// The entry point of the script. 
transformCsv(csvFile, geonamesUser);

/**
 * Appends latitude and longitude for each location, and writes to a new file.
 * Said file is created in the same directory and should have the same name with prefix:`ready-`.
 * @async
 * @param {String} file The path of the file
 * @param {String} username The Geonames account username
 * @return {Promise<void>} Produces a side effect on happy path
 */
async function transformCsv(file, username) {
  console.log(`running script with the file: "${file}" and user: "${geonamesUser}"`)
  if (!geonamesUser) return console.error("Please set the GEONAMES_USER environment variable.");
  const csv = getCsvData(file);
  const geonames = new Geonames({username: username, lan: 'en', encoding: 'JSON'});
  const transformedCsv = await addGeoDataToCsv(csv, geonames);

  if (transformedCsv.includes(undefined)) return console.error("There seems to have been some error when fetching the geodata");
	const path = parse(file);
	const newFile = `${path.dir}/ready-${path.name}.csv`;
	console.log('writing to file:',  newFile);
	writeFileSync(newFile, csvFormat(transformedCsv));
}

/**
 * @param {String} file The path of the file
 * @return {DSVRowArray?}
 * @todo the row transformer parameter of `csvParse`
 */
function getCsvData(file) {
  try {
    const contents = readFileSync(file, 'utf8');
    const data = csvParse(contents);
    console.info('data', data);
    return data;
  } catch (err) {
    console.error(err);
  }
}

/**
 * @async
 * @param {DSVRowArray} csv
 * @param {GeonamesInstance} geonames
 * @return {Promise<[DSVRowArray]>}
 * @todo memoize or filter duplicate locations (data/geodata.csv can be used)
 */
async function addGeoDataToCsv(csv, geonames) {
  const updatedRows = [];
  for (const row of csv) {
    try {
      const latLng = await getLatLong(row.location, geonames);
      if (!latLng) continue;
      row.lat = latLng.lat; row.lng = latLng.lng;
      console.info('newRow', row);
      updatedRows.push(row);
    } catch (err) {
			console.error(err.response);
      break; // stop makings calls on API error
    }
  }
  return updatedRows;
}

/**
 * @async
 * @param {String} location - The name of the place
 * @param {GeonamesInstance} geonames
 * @return {Promise<Object?>}
 * @todo create a `typedef` for the return value
 */
async function getLatLong(location, geonames) {
	const geodata = await geonames.search({q: location, maxRows: 1, style: 'short'}); // `geocode` & `geoCodeAddress` only worked for few countries
	const geoname = geodata.geonames[0];
	if (geoname == undefined) {
		console.error('Couldn\'t find geodata for the location:', location);
	} else {
		return {lat: geoname.lat, lng: geoname.lng};
	}
}

// function getColumnData(file, column) {
//   try {
//     const contents = readFileSync(file, 'utf8');
//     const data = csvParse(contents).map(row => row[column]);
//     console.info("data", data);
//     return data;
//   } catch (err) {
//     console.error(err);
//   }
// }
