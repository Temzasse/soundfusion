export const getYoutubeSearchApi = () => {
  return window.gapi.client.youtube.search;
};

export const getSoundcloudSearchApi = () => {
  return window.SC;
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

export const normalizeSoundcloudResults = items => {
  const normalized = items
    .filter(x => x.streamable)
    .map(res => ({
      type: 'soundcloud',
      id: res.id,
      artist: res.user.username,
      title: res.title,
      thumbnails: {
        default: {
          url: res.artwork_url || res.user.avatar_url,
        },
      },
      meta: {
        duration: res.duration / 1000, // convert to seconds
      }
    }));

  return normalized;
};
