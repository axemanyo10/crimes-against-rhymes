import { wordFromParts, pronunciationFromCMULine, cmuLineParts } from "./parse";

describe("test cmuLineParts", () => {

    it("returns array of line parts", () => {
        const line = "relax R IH0 L AE1 K S";
        expect(cmuLineParts(line)).toEqual(["relax", "R", "IH0", "L", "AE1", "K", "S"]);
    });

});

describe("test wordFromCMULine", () => {

    it("returns the word from CMU line parts", () => {
        const parts = ["relax", "R", "IH0", "L", "AE1", "K", "S"];
        expect(wordFromParts(parts)).toEqual("relax");
    });

});
