// 1. Filter method
import users_data from "./users.json" assert { type: "json" };

const filtered_users = users_data.data.filter(
  (user) => user.age > 30 && user.isActive
);
console.log(filtered_users.length, users_data.data.length);
// console.log(filtered_users);

//2. Map
const name_with_age = users_data.data.map(
  (user) => `${user.name + " " + user.age}`
);

// console.log(name_with_age)

//3. Sort
users_data.data.sort((a, b) => a.age - b.age);
users_data.data.sort((a, b) => (a.name < b.name ? -1 : 1));

// console.log(users_data.data);

//4. Reduce (used to reduce the array to a single value by applying a callback function to each element)

/*
   it takes folllowing arguments :
    1. accumulator
    2. current item
    3. index
    4. array
*/

const sum_of_ages_using_reduce = users_data.data.reduce((sum, user, i, arr) => {
  //   console.log(sum, user.age, i, arr.length);
  return sum + user.age;
}, 0);
// console.log(sum_of_ages_using_reduce);

// one more for reduce (count the number of characters in string)

const string = "sahil mulani";
const result = Array.from(string.replace(" ", "")).reduce((obj, char) => {
  obj[char] ? (obj[char] += 1) : (obj[char] = 1);
  return obj;
}, {});

console.table(result);
