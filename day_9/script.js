const h1 = document.getElementsByTagName("h1");

const make_green = () => {
  h1[0].style.color = "green";
};

const test_array = [
  { name: "foo", value: "bar" },
  { name: "john", value: "doe" },
];

//Normal One
console.log("hello JS");

//Styled Console
console.log(
  "%c This is a styled console",
  "color: red; font-size: 20px; background-color: white"
);

// Info (adds a info icon to the console)
console.info("This is a info");

// Warn (Yellow color warning)
console.warn("This is a warn");

// Error (Red color error)
console.error("This is a error");

// Assert Something (checks a condition on the console)
console.assert(h1[1], "Element does not exists");

//Dire for details of the element
console.dir(h1[0]);

//Grouping in console

test_array.forEach((o, i) => {
  console.groupCollapsed(i);
  console.log(o.name);
  console.log(o.value);
  console.groupEnd(i);
});

console.time("Started Fetch");
new Promise((res) => setTimeout(res, 1000)).then(() =>
  console.timeEnd("Started Fetch")
);
