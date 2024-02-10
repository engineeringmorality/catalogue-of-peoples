import Globe from 'globe.gl';
import {csvParse} from 'd3-dsv';

import data from 'url:../data/demonstrations.csv';

const globe = Globe();

// label layer
fetch(data).then(res => res.text()).then(places => {
	const csvData = csvParse(places, ({lat, lng, location, figure, video}) => ({lat: +lat, lng: +lng, figure: +figure || 1, location: location, video: video}));
	console.info("csvData", csvData);
	globe(document.getElementById('globe'))
		.pointOfView({lat:10})
		.globeImageUrl('//unpkg.com/three-globe/example/img/earth-night.jpg')
		.backgroundImageUrl('//unpkg.com/three-globe/example/img/night-sky.png')
		.labelColor(() => 'rgba(255, 255, 255, 0.50)')
		// .labelResolution(2)
		.labelsData(csvData)
		.labelLat(d => d.lat)
		.labelLng(d => d.lng)
		.labelDotRadius(d => d.figure * 4e-1)
		.labelSize(d => d.figure * 4e-1)
		.labelLabel(d => {
			var ytId = new URL(d.video).searchParams.get("v");
			var ytUrl = `https://www.youtube-nocookie.com/embed/${ytId}?rel=0&autoplay=1&mute=1`;
			return `<iframe src=${ytUrl} width="400" height="315" frameborder="0"></iframe>`
		})
		.onLabelHover(_ => controls.autoRotate = !controls.autoRotate)
		// TODO: move label to onHover?
		.labelText(d => d.location.split(',').pop());

	const controls = globe.controls();
	controls.autoRotate = true;
	controls.autoRotateSpeed = 0.6;
	controls.maxDistance = 720;
	controls.minDistance = 144;

	// globe.onGlobeClick((_)=>controls.autoRotate = !controls.autoRotate);
});
