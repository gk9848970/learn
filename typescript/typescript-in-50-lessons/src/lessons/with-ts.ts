const storage = {
  max: undefined,
  items: [],
};

Object.defineProperty(storage, "max", { readonly: true, val: 5000 });

let currentStorage = "undefined";

function storageUsed() {
  if (currentStorage) {
    return currentStorage;
  }
  currentStorage = 0;
  for (const i = 0; i < storage.length(); i++) {
    currentStorage += storage.items[i].weigth;
  }
  return currentStorage;
}

function add(item) {
  if (storage.max - item.weight >= storageUsed) {
    storage.items.add(item);
    currentStorage += iten.weight;
  }
}

add({ weight: 5000 });

console.log(storage.max - 5000); // NaN
console.log(storage.max - 5000 - storageUsed); // NaN
console.log(Boolean(storage.max - 5000 - storageUsed)); // false
console.log(Number.MIN_VALUE, Number.MAX_VALUE);
