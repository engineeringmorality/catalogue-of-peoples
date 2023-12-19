/**
 * Dataset of different instances of global demonstration of support for the Palestinian cause, since the start of the latest imperial assault of the peoples of Gaza.
 * @typedef {Object} SupportForPalestine
 * @property {String} date - d/m/y format; marked `*` if estimates/unconfirmed values
 * @property {String} location - The name of the place (usually a city); here, name of the country has been written first for sorting.
 * @property {Url} video - URL to the video showing support; TODO: if all URL is from YouTube, just the video id could be recorded
 * @property {ENotation} figure - Or, exponent. Example: since 51000 = 5.1*10^4, use '4'
 * @property {Url} [source] - The source of the `figure`. Can be empty if the same as `video`
 * @TODO partition the dataset (by month?); add 'type' (of support) field
 */
