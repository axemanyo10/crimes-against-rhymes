import { word, cmuLineParts, stressedVowel, stressedVowelIndex, stressedVowelPosition, beforeStressedVowel, afterStressedVowel, syllableCount, wordAttributes } from "./parse";

const line1 = "relax R IH0 L AE1 K S";
const parts1 = ["relax", "R", "IH0", "L", "AE1", "K", "S"];
const parts2 = ["affiliated", "AH0", "F", "IH1", "L", "IY0", "EY2", "T", "IH0", "D"];
const parts3 = ["detainee", "D", "IY2", "T", "EY0", "N", "IY1"];
const parts4 = ["accident", "AE1", "K", "S", "AH0", "D", "AH0", "N", "T"];
const parts5 = ["coincidence", "K", "OW0", "IH1", "N", "S", "IH0", "D", "AH0", "N", "S"];

describe("test wordAttributes", () => {

    it("returns an object containing all interesting word attributes from a CMU line", () => {
        expect(wordAttributes(line1)).toEqual({word: "relax", stress: "AE", position: 0, before: "L", after: "K S", syllables: 2});
    });

});

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

describe("test beforeStressedVowel", () => {

    it("returns the consonent before the stressed vowel", () => {
        expect(beforeStressedVowel(parts1, 4)).toEqual("L");
        expect(beforeStressedVowel(parts2, 3)).toEqual("F");
        expect(beforeStressedVowel(parts3, 6)).toEqual("N");
        expect(beforeStressedVowel(parts4, 1)).toEqual("");
        expect(beforeStressedVowel(parts5, 3)).toEqual("");
    });

});

describe("test afterStressedVowel", () => {

    it("returns the rest of the CMU line after the stressed vowel", () => {
        expect(afterStressedVowel(parts1, 4)).toEqual("K S");
        expect(afterStressedVowel(parts3, 6)).toEqual("");
    });

});

describe("test syllableCount", () => {

    it("returns the syllable count", () => {
        expect(syllableCount(parts1)).toEqual(2);
        expect(syllableCount(parts5)).toEqual(4);
    });

});