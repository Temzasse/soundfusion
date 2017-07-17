import React, { Component } from 'react';
import { GOOGLE_API_KEY, SOUNDCLOUD_CLIENT_ID } from '../constants';

const withApis = (Comp) => {
  return class ApiProvider extends Component {
    state = {
      youtubeApiLoaded: false,
      youtubePlayerLoaded: false,
      soundcloudSdkLoaded: false,
    };

    componentWillMount() {
      this.startGApiLoader();
      this.startYtLoader();
      this.startSCLoader();
    }

    startSCLoader = () => {
      if (!window.SC) {
        this.soundcloudSdkLoader = setInterval(
          this.checkIfSoundcloudSdkExists,
          500
        );
      } else {
        this.initSoundcloud();
        this.setState({ soundcloudSdkLoaded: true });
      }
    };

    startGApiLoader = () => {
      if (!window.gapi || !window.gapi.client) {
        this.googleApiLoader = setInterval(
          this.checkIfGoogleApiExists,
          500
        );
      } else {
        this.loadYoutubeApi();
      }
    };

    startYtLoader = () => {
      if (!window.YT) {
        this.youtubePlayerApiLoader = setInterval(
          this.checkIfPlayerApiExists,
          500
        );
      } else {
        this.setState({ youtubePlayerLoaded: true });
      }
    };

    checkIfGoogleApiExists = () => {
      if (window.gapi && window.gapi.client) {
        this.loadYoutubeApi();
        clearInterval(this.googleApiLoader);
      }
    };

    checkIfPlayerApiExists = () => {
      if (window.YT) {
        this.setState({ youtubePlayerLoaded: true });
        clearInterval(this.youtubePlayerApiLoader);
      }
    };

    checkIfSoundcloudSdkExists = () => {
      if (window.SC) {
        this.initSoundcloud();
        this.setState({ soundcloudSdkLoaded: true });
        clearInterval(this.soundcloudSdkLoader);
      }
    };

    initSoundcloud = () => {
      window.SC.initialize({ client_id: SOUNDCLOUD_CLIENT_ID });
    };

    loadYoutubeApi = () => {
      window.gapi.client.load('youtube', 'v3', () => {
        window.gapi.client.setApiKey(GOOGLE_API_KEY);
        this.setState({ youtubeApiLoaded: true });
      });
    };

    render() {
      const {
        youtubeApiLoaded,
        youtubePlayerLoaded,
        soundcloudSdkLoaded,
      } = this.state;

      const ready =
        youtubeApiLoaded &&
        youtubePlayerLoaded &&
        soundcloudSdkLoaded;

      if (!ready) return null;
      
      return <Comp {...this.props} youtubeApi={window.gapi.client.youtube} />;
    }
  }
}

export default withApis;
