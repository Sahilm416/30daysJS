window.addEventListener("DOMContentLoaded", async () => {
  const people = [
    { name: "Wes", year: 1988 },
    { name: "Kait", year: 1986 },
    { name: "Irv", year: 1970 },
    { name: "Lux", year: 2015 },
  ];

  const comments = [
    { text: "Love this!", id: 523423 },
    { text: "Super good", id: 823423 },
    { text: "You are the best", id: 2039842 },
    { text: "Ramen is my fav food ever", id: 123523 },
    { text: "Nice Nice Nice!", id: 542328 },
  ];

  // Array.prototype.some();
  // This method checks if there is at least one member in the array that matches certain criteria and returns a boolean.
  const is_any_adult = people.some(
    (person) => new Date().getFullYear() - person.year > 18
  );
  console.log("Is there any adult ? :-> ", is_any_adult);

  //Array.prototype.every();
  //This method checks if all members in the array match a certain criteria and it also returns a boolean

  const are_all_adult = people.every(
    (person) => new Date().getFullYear() - person.year > 18
  );
  console.log("Are all adults ? :-> ", are_all_adult);

  //Array.prototype.find();
  //finds first member of the array that matches a criteria.

  const comment_with_specific_id = comments.find((c) => c.id === 523423);
  console.log("Comment with a specific id :-> ", comment_with_specific_id);

  //Array.prototype.findIndex();
  const index_of_comment = comments.findIndex(
    (c) => c.text === "Ramen is my fav food ever"
  );
  console.log("Index of comment :-> ", index_of_comment);

  //Array.prototype.splice();
  //This is pretty interesting method for original array manipulation. It takes following arguments : splice(start_index, number_of_items_to_delete, add_more_members);
  comments.splice(
    comments.length,
    0,
    { id: 123, text: "test" },
    { id: 1234, text: "another test" }
  ); // start from the last position , delete 0 and add more members
  console.table(comments);

  comments.splice(5, 2); // start from 5th position and delete 2 members.
  console.table(comments);

});
