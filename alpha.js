var fs = require("fs");
var e = () => {};

class A {

}

class B extends A {
	
}

class Greeter {
  sayHi(name = 'Anonymous') {
    console.log(`Hi ${name}!`);
  }
}

var s = new Greeter();
s.sayHi("Joe");