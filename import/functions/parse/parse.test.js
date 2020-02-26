import { word, cmuLineParts, stressedVowel, stressedVowelIndex, stressedVowelPosition, beforeStressedVowel, afterStressedVowel, syllableCount, wordAttributes, allWordAttributes } from "./parse";

const line1 = "relax R IH0 L AE1 K S";
const parts1 = ["relax", "R", "IH0", "L", "AE1", "K", "S"];
const wordAttributes1 = { word: "relax", stress: "AE", position: 0, before: "L", after: "K S", syllables: 2 };
const line2 = "affiliated AH0 F IH1 L IY0 EY2 T IH0 D";
const parts2 = ["affiliated", "AH0", "F", "IH1", "L", "IY0", "EY2", "T", "IH0", "D"];
const wordAttributes2 = { word: "affiliated", stress: "IH", position: 3, before: "F", after: "L IY0 EY2 T IH0 D", syllables: 5 };
const line3 = "detainee D IY2 T EY0 N IY1";
const parts3 = ["detainee", "D", "IY2", "T", "EY0", "N", "IY1"];
const wordAttributes3 = { word: "detainee", stress: "IY", position: 0, before: "N", after: "", syllables: 3 };
const line4 = "accident AE1 K S AH0 D AH0 N T";
const parts4 = ["accident", "AE1", "K", "S", "AH0", "D", "AH0", "N", "T"];
const wordAttributes4 = { word: "accident", stress: "AE", position: 2, before: "", after: "K S AH0 D AH0 N T", syllables: 3 };
const line5 = "coincidence K OW0 IH1 N S IH0 D AH0 N S";
const parts5 = ["coincidence", "K", "OW0", "IH1", "N", "S", "IH0", "D", "AH0", "N", "S"];
const wordAttributes5 = { word: "coincidence", stress: "IH", position: 2, before: "", after: "N S IH0 D AH0 N S", syllables: 4 };

describe("test allWordAttributes", () => {

    it("returns an array of word attribute objects with an entry for each line", () => {
        expect(allWordAttributes(line1)).toEqual([wordAttributes1]);
        expect(allWordAttributes(`${line1}\n${line2}\n${line3}\n${line4}\n${line5}`)).toEqual([wordAttributes1, wordAttributes2, wordAttributes3, wordAttributes4, wordAttributes5]);
    });

});

describe("test wordAttributes", () => {

    it("returns an object containing all interesting word attributes from a CMU line", () => {
        expect(wordAttributes(line1)).toEqual(wordAttributes1);
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
        expect(stressedVowel(parts2, 3)).toEqual("IH");
        expect(stressedVowel(parts3, 6)).toEqual("IY");
        expect(stressedVowel(parts4, 1)).toEqual("AE");
        expect(stressedVowel(parts5, 3)).toEqual("IH");
    })

});

describe("test stressedVowelPosition", () => {

    it("returns the position of the stressed syllable", () => {
        expect(stressedVowelPosition(parts1, 4)).toEqual(0);
        expect(stressedVowelPosition(parts2, 3)).toEqual(3);
        expect(stressedVowelPosition(parts3, 6)).toEqual(0);
        expect(stressedVowelPosition(parts4, 1)).toEqual(2);
        expect(stressedVowelPosition(parts5, 3)).toEqual(2);
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
        expect(afterStressedVowel(parts2, 3)).toEqual("L IY0 EY2 T IH0 D");
        expect(afterStressedVowel(parts3, 6)).toEqual("");
        expect(afterStressedVowel(parts4, 1)).toEqual("K S AH0 D AH0 N T");
        expect(afterStressedVowel(parts5, 3)).toEqual("N S IH0 D AH0 N S");
    });

});

describe("test syllableCount", () => {

    it("returns the syllable count", () => {
        expect(syllableCount(parts1)).toEqual(2);
        expect(syllableCount(parts5)).toEqual(4);
    });

});