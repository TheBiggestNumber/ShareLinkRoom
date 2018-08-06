/**
 * Setup the Networked-Aframe scene component based on query parameters
 */
AFRAME.registerComponent('dynamic-room', {
  init: function () {
    var el = this.el;
    var params = this.getUrlParams();

    if (!params.room) {
      
      var room = "";
      var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

      for (var i = 0; i < 8; i++)
      room += possible.charAt(Math.floor(Math.random() * possible.length))
      
      var url = window.location.href;    
      if (url.indexOf('?') > -1){
       url += '&room=' + room
      }else{
       url += '?room=' + room
      }
      window.location.href = url;
    }

    var isMultiuser = params.hasOwnProperty('room');
    var webrtc = params.hasOwnProperty('webrtc');
    var adapter = webrtc ?  'easyrtc' : 'wseasyrtc';
    var voice = params.hasOwnProperty('voice');
    
    var networkedComp = {
      room: params.room,
      adapter: adapter,
      audio: voice
    };
    console.info('Init networked-aframe with settings:', networkedComp);
    el.setAttribute('networked-scene', networkedComp);
  },

  getUrlParams: function () {
    var match;
    var pl = /\+/g;  // Regex for replacing addition symbol with a space
    var search = /([^&=]+)=?([^&]*)/g;
    var decode = function (s) { return decodeURIComponent(s.replace(pl, ' ')); };
    var query = window.location.search.substring(1);
    var urlParams = {};

    match = search.exec(query);
    while (match) {
      urlParams[decode(match[1])] = decode(match[2]);
      match = search.exec(query);
    }
    return urlParams;
  }
});