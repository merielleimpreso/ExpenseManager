import _ from 'underscore';
import moment from 'moment';

let Strings = {};

Strings.capitalizeWords = (str) => {
  if (str) {
    var pieces = str.split(" ");
    for ( var i = 0; i < pieces.length; i++ ) {
      var j = pieces[i].charAt(0).toUpperCase();
      pieces[i] = j + pieces[i].substr(1);
    }
    return pieces.join(" ");
  } else {
    return '';
  }
}

module.exports = Strings;
