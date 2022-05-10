const fs = require("fs");
const {
    filterByQuery,
    findById,
    createNewZookeeper,
    validateZookeeper,
} = require("../lib/zookeepers.js");
const { zookeepers } = require("../data/zookeepers");

jest.mock('fs');

test("creates a zookeeper object", () => {
    const zookeeper = createNewZookeeper(
        { name: "Joe", id: "2323" },
        zookeepers
    );

    expect(zookeeper.name).toBe("Joe");
    expect(zookeeper.id).toBe("2323");
});

test("filters by query", () => {
    const startingZookeepers = [
        {
            id: "3",
            name: "Linda",
            age: 48,
            favoriteAnimal: "otter"
        },
        {
            id: "4",
            name: "Ryan",
            age: 20,
            favoriteAnimal: "dog"
        }
    ];

    const updatedZookeepers = filterByQuery({ age: 20 }, startingZookeepers);

    expect(updatedZookeepers.length).toEqual(1);
});

test("finds by id", () => {
    const startingZookeepers = [
        {
            id: "3",
            name: "Linda",
            age: 48,
            favoriteAnimal: "otter"
        },
        {
            id: "4",
            name: "Ryan",
            age: 20,
            favoriteAnimal: "dog"
        }
    ];

    const result = findById("3", startingZookeepers);

    expect(result.name).toBe("Linda");
});

test("validates age", () => {
    const zookeeper = {
        id: "3",
        name: "Linda",
        age: 48,
        favoriteAnimal: "otter"
    };

    const invalidZookeeper = {
        id: "4",
        name: "Jake",
        age: "48",
        favoriteAnimal: "bear"
    };

    const result = validateZookeeper(zookeeper);
    const result2 = validateZookeeper(invalidZookeeper);

    expect(result).toBe(true);
    expect(result2).toBe(false);
});