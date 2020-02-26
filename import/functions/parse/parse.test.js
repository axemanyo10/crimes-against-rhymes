import { word, cmuLineParts, stressedVowel, stressedVowelIndex, stressedVowelPosition } from "./parse";

const parts1 = ["relax", "R", "IH0", "L", "AE1", "K", "S"];
const parts2 = ["affiliated", "AH0", "F", "IH1", "L", "IY0", "EY2", "T", "IH0", "D"];
const parts3 = ["detainee", "D", "IY2", "T", "EY0", "N", "IY1"];

describe("test cmuLineParts", () => {

    it("returns array of line parts", () => {
        const line = "relax R IH0 L AE1 K S";
        expect(cmuLineParts(line)).toEqual(parts1);
    });

});

describe("test word", () => {

    it("returns the word from CMU line parts", () => {
        expect(word(parts1)).toEqual("relax");
    });

});

describe("test stressVowelIndex", () => {

    it("returns the array index of the stressed vowel", () => {
        expect(stressedVowelIndex(parts1)).toEqual(4); // AE1 is at position 4 when starting from 0
    });

});

describe("test stressedVowel", () => {

    it("returns the stress from CMU line parts given the stress index", () => {
        expect(stressedVowel(parts1, 4)).toEqual("AE");
    })

});

describe("test stressedVowelPosition", () => {

    it("returns the position of the stressed syllable when it's the last one", () => {
        expect(stressedVowelPosition(parts1, 4)).toEqual(0);
    });

    it("returns the position of the stressed syllable when it's not at the end", () => {
        expect(stressedVowelPosition(parts2, 3)).toEqual(3);
    });

    it("returns the correct position when stressed vowel is last sound", () => {
        expect(stressedVowelPosition(parts3, 6)).toEqual(0);
    });
    
});