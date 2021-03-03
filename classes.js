// class Person {
//     constructor(name) {
//       this.name = name;
//       this.walk();
//     }
  
//     walk() {
//       console.log(this.name + ' is walking.');
//     }
//   }
  
//   let bob = new Person('Bob');
//   console.log(bob.name);


// ES6 get and set
class Person {
  constructor(name) {
    this._name = name;
  }

  // get name() {
  //   return this._name.toUpperCase();
  // }

  set name(newName) {
    this._name = newName; // validation could be checked here such as only allowing non numerical values
  }

  walk() {
    console.log(this._name + ' is walking.');
  }
}

let bob = new Person('sharad');
//bob.name = bob;
//console.log(bob.name); // Outputs 'BOB'
console.log(bob);