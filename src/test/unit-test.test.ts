import { assert } from "chai";

function addNums(a: number, b: number): number {
  return a + b;
}

// Es una fución de mocha que se utiliza para describir una suite
// y test. Test que prueba cosas relacionados van en una misma suite
describe("Suite de pruebas incial", () => {
  // Test Case
  it("Should return 2", () => {
    const value = addNums(2, 2);
    assert.equal(value, 4);
  });
});
