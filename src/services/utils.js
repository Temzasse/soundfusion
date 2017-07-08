export const getYoutubeSearchApi = () => {
  return window.gapi.client.youtube.search;
};

export const normalizeYoutubeResults = result => {
  const normalized = result.items.map(res => ({
    type: 'youtube',
    id: res.id.videoId,
    artist: res.snippet.channelTitle,
    title: res.snippet.title,
    thumbnails: res.snippet.thumbnails,
    meta: {
      etag: res.etag,
    }
  }));

  return normalized;
};