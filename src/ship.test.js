import { Ship, PlayerShip, ComputerShip } from "./ship";;

describe("Ship Class", () => {
    beforeEach(() => {
      // Reset the static property before each test
      PlayerShip.availableLengths = [2, 2, 3, 4, 5];
      ComputerShip.availableLengths = [2, 2, 3, 4, 5];
    });
  
    test("Each instance gets a unique length", () => {
      const obj1 = new PlayerShip();
      const obj2 = new PlayerShip();
      const obj3 = new PlayerShip();
      const obj4 = new PlayerShip();
      const obj5 = new PlayerShip();
  
      const lengths = [obj1.length, obj2.length, obj3.length, obj4.length, obj5.length];
      const names = [obj1.type, obj2.type, obj3.type, obj4.type, obj5.type];
  
      // Ensure all values are unique
  
      expect(lengths).toEqual([5, 4, 3, 2, 2]); // Ensure it contains 1-4
      expect(names).toEqual(["Battleship", "Submarine", "Destroyer", "Patrol Boat", "Patrol Boat"]);
    });
  
    test("Throws an error when more than four instances are created", () => {
      new PlayerShip();
      new PlayerShip();
      new PlayerShip();
      new PlayerShip();
      new PlayerShip();
  
      expect(() => new PlayerShip()).toThrow("All ships has deployed!");
    });

    test("Assigns ship position", () => {
      const obj1 = new PlayerShip();
      expect(obj1.position).toBe("horizontal");
    })
  });