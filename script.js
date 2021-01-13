"use strict";
// instance properties
const Person = function (firstName, birthYear) {
  this.firstName = firstName;
  this.birthYear = birthYear;

  //never do this
  //! never create functions in a constructor
  //! when you will create more and more of it
  //! It will create performance issue
  // this.calcAge = function () {
  //   console.log(2037 - this.birthYear);
  // };
};

const jonas = new Person("Jonas", 1992);
console.log(jonas);

//! new empty object {} created
//! function is called , this = {}
//* this = empty object
//!  {} linked to prototype
//! function automatically return {}

//?{} = empty object

// now this constructor function can be used in
//  various ways

const matilda = new Person("Matilda", 2017);
const jack = new Person("Jack", 1973);
console.log(matilda, jack);

// so here matilda or jack is a instance of Person
// To check

const jay = "jay";
console.log(jonas instanceof Person);
//> true
console.log(jay instanceof Person);

//> false

//* Prototypes

Person.prototype.calcAge = function () {
  console.log(2037 - this.birthYear);
};

jonas.calcAge();
matilda.calcAge();

console.log(jonas.__proto__);
console.log((jonas.__proto__ = Person.prototype));
//> true
//? means they are the same thing

//! actually Person.prototype is not the prototype
//! of Person.  It is what's gonna be used as the prototype of all the objects
//! that are created with the person constructor function

console.log(Person.prototype.isPrototypeOf(jonas));
//> true
console.log(Person.prototype.isPrototypeOf(matilda));
//>true
console.log(Person.prototype.isPrototypeOf(Person));
//>false

//prototypeOfLinkedObjects

Person.prototype.species = "Homo Sapiens";
// We can access like this
console.log(jonas.species, matilda.species);

console.log(jonas.hasOwnProperty("firstName"));
console.log(jonas.hasOwnProperty("species"));

console.log(jonas.__proto__);
console.log(jonas.__proto__.__proto__);
console.log(jonas.__proto__.__proto__.__proto__);
//>null
// because object.prototype is the top of the prototype chain

console.dir(Person.prototype.constructor);

const arr = [3, 6, 4, 5, 6, 9, 3];
console.log(arr.__proto__);

console.log(arr.__proto__ === Array.prototype);
//> true
console.log(arr.__proto__.__proto__);

// now we can use 'unique method' from the prototype

Array.prototype.unique = function () {
  return [...new Set(this)];
};
console.log(arr.unique);

const h1 = document.querySelector("h1");
//! on console write 'console.dir('h1')'
//! and check all the prototypes
//! there will be 6  to 7 layers of prototype
//! and it can go really deep
console.dir((x) => x + 1);

//Class Expression
//const PersonCl = class {}

//Class Declaration

class PersonCl {
  constructor(fullName, birthYear) {
    this.fullName = fullName;
    this.birthYear = birthYear;
  }
  //Methods will be addes to the prototype property
  calcAge() {
    console.log(2037 - this.birthYear);
  }
  //This will be the prototype

  greet() {
    console.log(`Hey ${this.firstName}`);
  }

  get age() {
    return 2037 - this.birthYear;
  }
  // Static method
  static hey() {
    console.log("Hey there!");
    console.log(this);
  }

  set fullName(name) {
    console.log(name);

    //! Set a property that is already exists
    // if (name.includes(' ')) this.fullName = name;
    // this line was creating conflict .. that's why we are creating a new one
    if (name.includes(" ")) this._fullName = name;
    else alert(`${name} is not a full name`);
  }

  get fullName() {
    return this._fullName;
  }
}

PersonCl.hey();
const jessica = new PersonCl("jessica Davis", 1996);

console.log(jessica);
jessica.calcAge();
console.log(jessica.age);

console.log(jessica.__proto__ === PersonCl.prototype);

// PersonCl.prototype.greet = function () {
//   console.log(`Hey ${this.firstName}`);
// };
// we have created greet inside there
jessica.greet();

//? 1. Classes are NOT hoisted
//? 1. Classes are first Class citizens
//? 1. Classes are executed in strict mode

// const walter = new PersonCl('walter', 1965);
//? you will not get the full name from here , because this doesn't have the full name
const walter = new PersonCl("walter white", 1965);
//! but this has the full name . this won't get the error message
//! this will return the full name property

//SETTERS AND GETTERS

const account = {
  owner: "Jonas",
  movements: [20, 530, 120, 300],

  get latest() {
    return this.movements.slice(-1).pop();
  },
  set latest(mov) {
    this.movements.push(mov);
  },
  // we can set a push method
};
console.log(account.latest);
// ! here we will not call this as method
//!  like .. latest().

account.latest = 50;
//! this is the way of using set method
//! you have to use it like this
//! you need to set it with '='

console.log(account.movements);

Person.hey = function () {
  console.log("Hey there!");
  console.log(this);
};
//you can do this too
// ? you will call it like this

Person.hey();
