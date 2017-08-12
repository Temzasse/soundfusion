import {
  getYoutubeSearchApi,
  getSoundcloudSearchApi,
  normalizeYoutubeResults,
  normalizeSoundcloudResults
} from './utils';

const MAX_RESULTS = 8;

async function searchTracks(term) {
  const youtubeResults = await searchYoutube(term);
  const soundcloudResults = await searchSoundcloud(term);
  return [...youtubeResults, ...soundcloudResults];
}

async function searchYoutube(term) {
  try {
    const youtubeSearch = getYoutubeSearchApi();
    const { result } = await youtubeSearch.list({
      q: term,
      part: 'snippet',
      type: 'video',
      videoCategoryId: 10, // 10 -> MUSIC
      maxResults: MAX_RESULTS,
    });

    return normalizeYoutubeResults(result);
  } catch (e) {
    console.log('Youtube search failed', e);
    return [];
  }
}

async function searchSoundcloud(term) {
  try {
    const soundcloudSearch = getSoundcloudSearchApi();
    const result = await soundcloudSearch.get('/tracks', {
      q: term,
      limit: MAX_RESULTS,
    });

    return normalizeSoundcloudResults(result);
  } catch(e) {
    console.log('Soundcloud search failed', e);
    return [];
  }
}

export default searchTracks;