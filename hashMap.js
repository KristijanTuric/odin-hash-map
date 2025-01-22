class HashMap {
    #capacity;
    #loadFactor;
    #size;
    #buckets;

    constructor (capacity = 16, loadFactor = 0.75) {
        this.#capacity = capacity; // Total number of buckets we currently have
        this.#loadFactor = loadFactor; // Factor that determines when to resize
        this.#size = 0; // The number of [key, value] pairs in the Hash Map
        this.#buckets = Array(this.#capacity).fill(null).map(() => []); // Makes an array of arrays of size capacity, each element will be an array with two elements
    }

    hash(key) {
        let hashCode = 0;

        const primeNumber = 31;
        for (let i = 0; i < key.length; i++) {
            hashCode = primeNumber * hashCode + key.charCodeAt(i);
            hashCode = hashCode % this.#capacity;
        }

        return hashCode;
    }

    set(key, value) {

        const index = this.hash(key);

        if (index < 0 || index >= this.#buckets.length) {
            throw new Error("Trying to access index out of bounds");
        }
          
        const bucket = this.#buckets[index];

        for (let i = 0; i < bucket.length; i++) {
            const [storedKey, storedValue] = bucket[i];
            if (storedKey === key) {
                bucket[i] = [key, value];
                return;
            }
        }

        bucket.push([key, value]);
        this.#size += 1;

        if (this.#size / this.#capacity > this.#loadFactor) {
            this.#resize();
        }
    }

    #resize() {
        const oldBuckets = this.#buckets;
        this.#capacity *= 2;
        this.#buckets = Array(this.#capacity).fill(null).map(() => []);
        this.#size = 0;

        for (const bucket of oldBuckets) {
            for (const [key, value] of bucket) {
                this.set(key, value);
            }
        }
    }

    get(key) {
        const index = this.hash(key);
        const bucket = this.#buckets[index];

        for (let i = 0; i < bucket.length; i++) {
            const [storedKey, storedValue] = bucket[i];
            if (storedKey === key) {
                return storedValue;
            }
        }

        return null;
    }

    has(key) {
        const index = this.hash(key);
        const bucket = this.#buckets[index];

        for (let i = 0; i < bucket.length; i++) {
            const [storedKey, storedValue] = bucket[i];
            if (storedKey === key) {
                return true;
            }
        }

        return false;
    }

    remove(key) {
        const index = this.hash(key);
        const bucket = this.#buckets[index];

        for (let i = 0; i < bucket.length; i++) {
            const [storedKey, storedValue] = bucket[i];
            if (storedKey === key) {
                // Remove the [key, value] pair, decrease the size
                bucket.splice(i, 1);
                this.#size -= 1;
                return true;
            }
        }

        return false;
    }

    length() {
        return this.#size;
    }

    clear() {
        this.#buckets = Array(this.#capacity).fill(null).map(() => []);
        this.#size = 0;
    }

    keys() {
        let keys = [];

        for (const bucket of this.#buckets) {
            for (const [key, value] of bucket) {
                keys[keys.length] = key;
            }
        }

        if (keys.length === 0) return null;
        return keys;
    }

    values() {
        let values = [];

        for (const bucket of this.#buckets) {
            for (const [key, value] of bucket) {
                values[values.length] = value;
            }
        }

        if (values.length === 0) return null;
        return values;
    }

    entries() {
        let entries = [];

        for (const bucket of this.#buckets) {
            for (const [key, value] of bucket) {
                entries[entries.length] = [key, value];
            }
        }

        if (entries.length === 0) return null;
        return entries;
    }
}

export { HashMap };