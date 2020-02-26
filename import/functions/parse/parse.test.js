import { word, cmuLineParts, stressedVowel, stressedVowelIndex } from "./parse";

const parts = ["relax", "R", "IH0", "L", "AE1", "K", "S"];

describe("test cmuLineParts", () => {

    it("returns array of line parts", () => {
        const line = "relax R IH0 L AE1 K S";
        expect(cmuLineParts(line)).toEqual(parts);
    });

});

describe("test word", () => {

    it("returns the word from CMU line parts", () => {
        expect(word(parts)).toEqual("relax");
    });

});

describe("test stressVowelIndex", () => {

    it("returns the array index of the stressed vowel", () => {
        expect(stressedVowelIndex(parts)).toEqual(4); // AE1 is at position 4 when starting from 0
    });

});

describe("test stressedVowel", () => {

    it("returns the stress from CMU line parts given the stress index", () => {
        expect(stressedVowel(parts, 4)).toEqual("AE");
    })

});