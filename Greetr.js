// Creating an execution context for the framwork/library so that all it's declared variables are safe. Only exposing to the global object what we want.
/*  Imitating JQuery structure in the Greetr object so that it generates an object that runs it via: G$(firstname, lastname, language), and it gives me back an Object. */
// Pass in Global Object(global) & jQuery(or $).

(function(global, $) { // (IIFE)();
  "use strict";
  var Greetr = function(firstName, lastName, language) {
    // Return a  function Constructor to generate the object.
    return new Greetr.init(firstName, lastName, language);
  };

  var supportedLangs = ['en', 'es']; // won't be exposed anywhere. Thanks to Closures, this can be used anywhere inside this function.

  // using objects so that I can reference the object's name/value properties (i.e. greetings['en'])
  var greetings = {
    en: 'Hello',
    es: 'Hola'
  };

  var formalGreetings = {
    en: 'Greetings',
    es: 'Saludos'
  };

  var logMessages = {
    en: 'Logged in',
    es: 'Inició sesión'
  };

  // Add all methods here that we want to use inside of the object returned from Greetr().
  Greetr.prototype = {
    fullName: function() {
      return this.firstName + ' ' + this.lastName;
    },

    validate: function() {
      if (supportedLangs.indexOf(this.language) === -1) {
        /* supportedLang is an array, so using indexOf(this.language) will check to make sure 'this.language' is within it. if not: */
        throw 'Invalid language';
      }
    },

    greeting: function() {
      return greetings[this.language] + ' ' + this.firstName + '!';
    },

    formalGreeting: function() {
      return formalGreetings[this.language] + ', ' + this.fullName();
    },

    greet: function(formal) {
      var msg;

      // If undefined or null it will be coersed to 'false'
      if (formal) {
        msg = this.formalGreeting();
      } else {
        msg = this.greeting();
      }

      if (console) {
        console.log(msg);
      }

      // 'this' refers to the calling object at execution time makes the method chainable
      return this;
    },

    log: function() {
      if (console) {
        console.log(logMessages[this.language] + ": " + this.fullName());
      }
      // chainable
      return this;
    },

    setLang: function(lang) {
      this.language = lang;
      this.validate();
      // chainable
      return this;
    },

    //jQuery method that accepts a selector and if there is a formalGreeting
    HTMLGreeting: function(selector, formal) {
      if(!$) {
        throw 'jQuery not loaded';
      }
      if(!selector) {
        throw 'Missing jQuery selector';
      }
      // set up greeting
      var msg;
      if(formal) {
        msg = this.formalGreeting();
      } else {
        msg = this.greeting();
      }
      //update greeting
      $(selector).html(msg);
      //chainable
      return this;
    }
  }; // all of the methods defined inside of the object literal, Greetr.prototype

  // The function constructor returned by the Greetr object.
  // This object can be given 3 properties. If none given, then the defaults will be set('', '', 'en').
  Greetr.init = function(firstName, lastName, language) {

    // set self to 'this' so that we don't have to worry about what 'this' points to later.
    var self = this;
    self.firstName = firstName || '';
    self.lastName = lastName || '';
    self.language = language || 'en';
    self.validate();
  };

  Greetr.init.prototype = Greetr.prototype;
  // Make global.Greetr and G$() equal to the created Greetr() function.
  global.Greetr = global.G$ = Greetr;

}(window, jQuery)); // Invoking global and jquery objects. Could've used '$' instead of 'JQuery'

/* Summary:
• G$ points to --> Greetr() (line 8)
• Greetr() returns a new (empty)Greetr.init (line 11)
• Greetr.init() builds the object(empty no longer) and sets the values(self.firstname, etc etc...) (lines 95-102)
• Greetr.init.prototype = Greetr.prototype (line 104) makes sure that Greetr.init() has access to all the methods on the Greetr.prototype property (lines 33-88)
•
•

*/
