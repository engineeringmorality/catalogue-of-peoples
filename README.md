# Catalogue of Peoples

The source for the Catalogue of Peoples website — an attempt to illustrate the rediscovery of our conscience that's manifesting in the global movement for the Palestinian Cause.

If not now, then never.

## Development
### Flow
```
Start
 ├──1.Data Curation (data/)
 │   └──Dataset: support-for-palestine.csv
 │       └──Add data using PRs
 ├──2.Data Transformation (build/)
 │   ├──Get latlong data based on location
 │   │   └──Using the GeoNames API
 │   └──Rerun in the build step, after each build
 │       └──Create a new csv appending this data
 └──3.Data Visualisation (src/)
     └──Render data in a ThreeJS globe
```

### API
Sample response (truncated). A full version can be [found here](https://www.geonames.org/export/geonames-search.html).

```json
{
    "totalResultsCount": 10579,
    "geonames": [
        {
            "adminCode1": "ENG",
            "lng": "-0.12574",
            "population": 8961989,
            "countryCode": "GB",
            "name": "London",
            "countryName": "United Kingdom",
            "adminName1": "England",
            "lat": "51.50853"
        }
    ]
}
```

### Build
Requirements:
    An username from [Geonames](https://www.geonames.org/). This acts as the API key.

Then, run the following command (from project root) to generate the production dataset, whenever the `support-for-palestine` dataset has been updated.
```sh
GEONAMES_USER=your-username-here node build/transformation.js
```

or, if you prefer using an `.env` file,
```sh
node -r dotenv/config build/transformation.js
```

*Note*: Use the 'development version' of the dataset; the production data has been commented out in the script. 

And in case you need to build for production:
```sh
npm build
```

### App Development

To run the project locally:
```sh
npm start
```

Linting and testing the code:
```sh
npm lint
npm test
```

## Resources
### Geo Data
#### Natural Earth
- https://github.com/AshKyd/geojson-regions
    - Polygon for a country using a web interface (CLI scripts & dataset too)
- https://geojson.xyz/
    - GeoJson data from Natural Earth using both CDN & CLI interfaces.
- https://github.com/rapomon/geojson-places
    - Reverse look up (using lat long)

#### GeoNames
- https://download.geonames.org/export/dump/
    - datasets
- https://github.com/kinotto/geonames.js
    - library (an API wrapper)
    - Alternatives: 
        - https://github.com/lucaspiller/offline-geocoder 
        - https://github.com/wyattdanger/geocoder
- https://geocoder.readthedocs.io/
    - CLI
- [World Cities Data](https://datahub.io/core/world-cities)

### Globe Rendering (libraries)
- Three.js/D3.js?
    - Standard libraries for things 3D & WebGL
- Globe.gl
    - Most similar
- https://examples.webglearth.com/
    - Unmaintained but simple enough
    - Leaflet compatible
    - Offline: https://github.com/webglearth/webglearth2-offline
    - Low quality using 1st library (in Earth view)
- Openglobus
    - Super new; not much documentation
- Cesium
    - Free
    - Recommended by `webglearth2`, an earlier project.
    - Talk: https://www.youtube.com/watch?v=MgKZFBaKWUM&list=PLniZsnqdguCpcCCEO26xRpjFa5tXD-Kvt
- Mapbox
    - Really expensive after 50k visits/month
    - Low Code (studio support)

#### Skins (Tiles)
- https://leaflet-extras.github.io/leaflet-providers/preview/
    - Stadia.AlidadeSmoothDark (open?)
    - CartoDB.Voyager or CartoDB.Positron
    - CartoDB.DarkMatter
    - Esri.WorldGrayCanvas 
- Map Tiler
    - [Setup own OpenStreetMap tileserver with vector and raster tiles - YouTube](https://www.youtube.com/watch?v=L3U-hJrg1Ek)
    - [Self Hosting](https://stackoverflow.com/questions/49054881/self-host-osm-tiles)

#### Chroma (Color Scheme)
- https://colorbrewer2.org/#
- https://d3js.org/d3-scale-chromatic

## Variables
- Number
- Frequency
- Capital?
- Other support

## Prospects
- Palestinian colors (gradient) and symbols
    - Red, Green, Black & White
- Better (meaningful) animations for the visualisation
- Support (growth) by date visualisation

## TODO
- Add about/footers
- Add different views of data (using an affordance)
    - Heat Map?
    - Polygon view
- Preview videos of (record) global demonstrations
    - On hover
    - Auto play videos? (not sure if this is possible with external sources)
- Citations and clips submission/crowdsource
    - GitHub issues
- Mobile Support/Integration

### Development
- Add Tests (especially the build script)
- Branch matchings deployment
- "Productionize"
    - Add [open graph metadata](https://web.dev/learn/html/metadata#open_graph)
