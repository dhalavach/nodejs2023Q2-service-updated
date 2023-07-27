const arr1 = [1, 243243, 5353, 1, 43434];

const arr2 = arr1.map((el) => {
  if (el === 1) return 'foo';
});

const arr3 = [];

arr1.forEach((el) => {
  if (el === 1) arr3.push(el);
});

console.log(arr3);
