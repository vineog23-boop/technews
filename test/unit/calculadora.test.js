const calculadora = require("../../models/calculadora");

test("Soma de 2  + 2 deve ser igual a 4", () => {
  expect(calculadora.somar(2, 2)).toBe(4);
});
test("Soma de 100  + 2 deve ser igual a 102", () => {
  expect(calculadora.somar(100, 2)).toBe(102);
});
test("Subtração de 5 - 3 deve ser igual a 2", () => {
  expect(calculadora.subtrair(5, 3)).toBe(2);
});

test("Multiplicação de 4 * 5 deve ser igual a 20", () => {
  expect(calculadora.multiplicar(4, 5)).toBe(20);
});
