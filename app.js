
var g = G$('John', 'Doe'); //intentionally not passing in a language in order to check out the default.
console.log(g); // = Greetr.init {firstName: "John", lastName: "Doe", language: "en"}

/* g.greet(); will check to see if 'formal' was passed, if yes, formalGreetings(), else greetings()
              = Hello John!

/********Chainable*********/
/* g.greet().greet(true);  = Hello John!
                            Greetings, John Doe */

/* g.greet().setLang('es').greet(true); /* = Hello John!
                                             Saludos, John Doe */

/* g.greet().setLang('es').greet(true).log(); /* = Hello John!
                                                   Saludos, John Doe
                                                   Inició sesión: John Doe */
/********Chainable*********/

$('#login').click(function(){
  // Make new object with G$()
  var loginGrtr = G$('John', 'Doe').setLang($('#lang').val());

  // hide the dropdown and button interface in HTML
  $('#logindiv').hide();

  // 1. loginGrtr.setLang($('#lang').val()) = pass the value string of ''#lang' to setLang
  // option 2(line 22): var loginGrtr = G$('John', 'Doe');
  // 2. chain 'HTMLGreeting()' pass it jQuery selector and formal value;
  // 3. chain log the value to console
  loginGrtr.setLang($('#lang').val()).HTMLGreeting('#greeting', true).log();

});
