import { HashMap } from "./hashMap.js";

let hashMap = new HashMap();

console.log("\nhash(key) function test\n");
let fruit = "banana";
console.log(`The value: ${fruit} hashes into ${hashMap.hash(fruit)}`);

console.log("\nset(key, value) & get(key) functions test\n");
hashMap.set("banana", "yellow");
hashMap.set("kiwi", "green");
hashMap.set("apple", "red");
console.log(hashMap.get("kiwi"));
console.log(hashMap.get("zebra"));

console.log("\nhas(key) function test\n");
console.log(hashMap.has("apple"));
console.log(hashMap.has("ostrich"));

console.log("\nremove(key) function test\n");
console.log(hashMap.remove("kiwi"));
console.log(hashMap.get("kiwi"));
console.log(hashMap.remove("cow"));
hashMap.set("kiwi", "green");
console.log(hashMap.get("kiwi"));
