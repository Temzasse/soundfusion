import {
  getYoutubeSearchApi,
  getSoundcloudSearchApi,
  normalizeYoutubeResults,
  normalizeSoundcloudResults
} from './utils';

async function searchTracks(term) {
  const youtubeResults = await searchYoutube(term);
  const soundcloudResults = await searchSoundcloud(term);
  return [...youtubeResults, ...soundcloudResults];
}

async function searchYoutube(term) {
  const youtubeSearch = getYoutubeSearchApi();
  const { result } = await youtubeSearch.list({
    q: term,
    part: 'snippet',
    type: 'video',
    videoCategoryId: 10, // 10 -> MUSIC
    maxResults: 5,
  });

  return normalizeYoutubeResults(result);
}

async function searchSoundcloud(term) {
  const soundcloudSearch = getSoundcloudSearchApi();
  const result = await soundcloudSearch.get('/tracks', {
    q: term,
    limit: 5,
  });

  return normalizeSoundcloudResults(result);
}

export default searchTracks;