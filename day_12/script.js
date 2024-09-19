const input_array = [];
const sequence = "30daysjs";
document.addEventListener("keydown", (e) => {
  input_array.push(e.key);
  input_array.splice(0, input_array.length - sequence.length);
  const str_arr = input_array.join("");
  console.log(str_arr);
  if (str_arr.includes(sequence)) {
    alert("You Got it!");
  }
});
