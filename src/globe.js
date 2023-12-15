import Globe from 'globe.gl';
import {csvParse} from 'd3-dsv';

import data from 'url:../data/ready-support-for-palestine.csv';

const globe = Globe();

// label layer
fetch(data).then(res => res.text()).then(places => {
	const csvData = csvParse(places, ({lat, lng, location, figure, video}) => ({lat: +lat, lng: +lng, figure: +figure || 1, location: location, video: video}));
	console.log("csvData", csvData);
	globe(document.getElementById('globeViz'))
		.globeImageUrl('//unpkg.com/three-globe/example/img/earth-night.jpg')
		.backgroundImageUrl('//unpkg.com/three-globe/example/img/night-sky.png')
		.labelColor(() => 'rgba(255, 255, 255, 0.50)')
		// .labelResolution(2)
		.labelsData(csvData)
		.labelLat(d => d.lat)
		.labelLng(d => d.lng)
		.labelDotRadius(d => d.figure * 4e-1)
		.labelSize(d => d.figure * 4e-1)
		// .labelDotRadius(d => Math.sqrt(+`1e${d.figure}`) * 8e-3)
		// .labelSize(d => Math.sqrt(+`1e${d.figure}`) * 8e-3)
		.labelText(d => d.location.split(',').pop());

	const controls = globe.controls();
	controls.autoRotate = true;
	controls.autoRotateSpeed = 0.6;
	controls.maxDistance = 720;
	controls.minDistance = 144;

	globe.onGlobeClick((_)=>controls.autoRotate = !controls.autoRotate);
});