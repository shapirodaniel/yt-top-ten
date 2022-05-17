const youtubeData = require('./data');

function cleanTitle(song) {
	return song.title.replace('Watched ', '');
}

function buildSongFrequencyMap(data) {
	const map = {};

	for (const song of data) {
		if (!map[song.title]) {
			map[song.title] = {
				seen: 1,
				song,
			};
		} else {
			map[song.title].seen++;
		}
	}

	return map;
}

function sortResults(result) {
	result.sort((a, b) => (a.seen < b.seen ? 1 : -1));
}

function extractTopTenSongs(data) {
	const result = [];
	const songFrequencyMap = buildSongFrequencyMap(data);

	for (const key in songFrequencyMap) {
		const entry = songFrequencyMap[key];

		if (result.length < 10) {
			result.push(entry);
			sortResults(result);
			continue;
		}

		if (
			entry.seen > result[result.length - 1].seen &&
			result.length === 10
		) {
			result[result.length - 1] = entry;
			sortResults(result);
		}
	}

	return result;
}

console.dir({ result: extractTopTenSongs(youtubeData) }, { depth: null });
