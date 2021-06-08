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
//   getters are used to access a property from a constructor or function
  get age() {
    return 2037 - this.birthYear;
  }
  // Static method
  static hey() {
    console.log("Hey there!");
    console.log(this);
  }
 
  //setters are used to change(mutate) a property from a constructor or function
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

// There is a 3rd way of creating an object

const PersonProto = {
  calcAge() {
    console.log(2037 - this.birthYear);
  },

  init(firstName, birthYear) {
    this.firstName = firstName;
    this.birthYear = birthYear;
  },
};

const steven = Object.create(PersonProto);
console.log(steven);
steven.name = "Steven";
steven.birthYear = 2002;
//* adding this is a little bit weird
//* this was written like this because 'init' waas not written first

steven.calcAge();

console.log(steven.__proto__ === PersonProto);

//* Now we will use init to make it a little bit shorter

const sarah = Object.create(PersonProto);
sarah.init("Sarah", 1979);
//* Now this is not weird and we are doing this in just one line
sarah.calcAge();

//? Now we will make a child class of the parent class

const Student = function (firstName, birthYear, course) {
  // this.firstName = firstName;
  // this.birthYear = birthYear;
  //We could use this .. but this means we are repeating ourselves
  //* so the better idea is.. to call the person class
  // ! Person(firstName,birthYear)
  //* but this method will not work either. So what we have to do is

  Person.call(this, firstName, birthYear);

  this.course = course;
};

//Linking prototype

Student.prototype = Object.create(Person.prototype);

const mike = new Student("Mike", 2020, "Computer Science");
console.log(mike);
// You will see new object was created

Student.prototype.introduce = function () {
  console.log(`My name is ${this.firstName} and I study ${this.course}`);
};

mike.introduce();
mike.calcAge();

console.log(mike.__proto__);
console.log(mike.__proto__.__proto__);

console.log(mike instanceof Student);
//> true
console.log(mike instanceof Person);
//> true
console.log(mike instanceof Object);
//> true

Student.prototype.constructor = Student;
console.dir(Student.prototype.constructor);

// class StudentCl extends PersonCl {
//   // constructor(fullName, birthYear, course) {
//   //Always needs to happen first
//   // super(fullName,birthYear);
//   // this.course = course
//   // }
// }

// const martha = new StudentCl("Martha Jones", 2012);
//this system will work

class StudentCl extends PersonCl {
  constructor(fullName, birthYear, course) {
    // Always needs to happen first
    super(fullName, birthYear);
    this.course = course;
  }

  introduce() {
    console.log(`My name is ${this.fullName} and I study ${this.course}`);
  }

  calcAge() {in
    console.log(
      `I'm ${
        2037 - this.birthYear
      } years old, but as a student I feel more like ${
        2037 - this.birthYear + 10
      } `
    );
  }
  //! this will overwrite the previous 'calcAge' method.
  //! If we write it like this
}

const martha = new StudentCl("Martha Jones", 2012, "Computer Science");
console.log(martha);

console.log(martha);
martha.introduce();
martha.calcAge();

const StudentProto = Object.create(PersonProto);
StudentProto.init = function (firstName, birthYear, course) {
  PersonProto.init.call(this, firstName, birthYear);
  this.course = course;
};

StudentProto.introduce = function () {
  console.log(`My name is ${this.fullName} and I study ${this.course}`);
};
const jayy = Object.create(StudentProto);
//! 'studentproto' inherits from the PersonProto
//! 'jay' inherits from the  'studentproto'
//! so indirectly jay inherits from the Person proto
//! It means they are in a chain
jayy.init("Jay", 2010, "Computer Science");
console.log(jayy);

jayy.introduce();

class Account {
  constructor(owner, currency, pin) {
    (this.owner = owner),
      (this.currency = currency),
      (this.pin = pin),
      //! using 'underscore'!
      //! this is called 'protected data'
      //! this is used in developer to protect data
      //! Developers agreed to do it. so, when you will use it, the developers will know not to touch it
      (this._movements = []),
      //! we can do this means we can create new things
      (this.locale = navigator.language);

    console.log(` Thanks for opening an account, ${owner}`);
  }

  //PUBLIC INTERFACE

  getMovements() {
    return this._movements;
  }
  deposit(val) {
    this._movements.push(val);
  }

  withdraw(val) {
    this.deposit(-val);
  }
  //! we used function in a function

  approveLoan(val) {
    return true;
  }

  requestLoan(val) {
    if (this.approveLoan(val)) {
      this.deposit(val);
      console.log("Loan approved");
    }
  }
}

const acc1 = new Account("Jonas", "EUR", 1111);
console.log(acc1);
acc1._movements.push(250);
acc1._movements.push(-140);
console.log(acc1);

acc1.deposit(250);
acc1.withdraw(140);

console.log(acc1.pin);
console.log(acc1.getMovements());

acc1.requestLoan(1000);
acc1.approveLoan(1000);
