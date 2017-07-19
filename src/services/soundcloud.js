/*
SC Player ====

Methods
You can use the methods below to control the player that is returned from SC.stream

play(): Starts to play the sound
pause(): Pauses the player
seek(time): Seeks to the position in the song (in milliseconds)
currentTime(): Returns the current position (in milliseconds)
setVolume(volume): Sets the volume (from 0 to 1)
getVolume(): Returns the current volume
on(event, handler): Subscribes the handler to the given event

Events
You can subscribe to the events below by using the player's on(event, handler) method.

state-change: when audio controller changes state (e.g. from pause to play)
play: when play method is called
play-start: before playback is actually triggered
play-resume: when playback transits from any idle/loading/seeking state into playing state
pause: when playback is paused
finish: when sound is finished
seek: when seek method is called
seeked: when playback position is updated after calling seek method
geo_blocked: when there's no available streams for a sound, as it is not allowed to be played in the user's territory.
buffering_start: when buffering starts
buffering_end: when buffering stops
audio_error: when an error occurs
time: when playback position is updated
no_streams: when we failed fetching stream information
no_protocol: when no supported protocol could be found
no_connection: when we failed to connect to an endpoint due to missing transport or request timeout

- https://stackoverflow.com/questions/27421534/how-to-search-tracks-by-their-title-with-the-sound-cloud-api

*/

export default class SouncloudPlayer {
  constructor() {
    this.player = null;
    this.currentTrack = null;
  }

  play = () => {
    this.player.play();
  };

  pause = () => {
    this.player.pause();
  };

  seek = timeInSeconds => {
    this.player.seek(timeInSeconds * 1000);
  };

  getCurrentTime = () => {
    return this.player.currentTime() / 1000;
  };

  // NOTE: this a work-a-round because SC Player doesn't give us the duration
  getDuration = () => {
    return this.currentTrack.meta.duration;
  };

  reset = () => {
    if (this.player) this.player.dispose();
    this.player = null;
    this.currentTrack = null;
  };

  load = async (track) => {
    this.reset();

    const player = await window.SC.stream(`/tracks/${track.id}`);

    this.currentTrack = track;
    this.player = player;
  };
}