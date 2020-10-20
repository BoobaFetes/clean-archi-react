export type Guid = string;
export const NewGuid = () => {
  const part1 = generate(8);
  const part2 = generate(4);
  const m = M();
  const part3 = generate(3);
  const n = N();
  const part4 = generate(3);
  const part5 = generate(12);

  return `${part1}-${part2}-${m}${part3}-${n}${part4}-${part5}` as Guid;
};

function generate(count: number) {
  let result = "";
  for (let i = 0; i < count; i++) {
    result += cartouche[Math.floor(Math.random() * 16)];
  }
  return result;
}
function M() {
  return cartouche[Math.floor(Math.random() * 5) + 1];
}
function N() {
  return cartouche[Math.floor(Math.random() * 4) + 9];
}

const cartouche = [
  "0",
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
];
