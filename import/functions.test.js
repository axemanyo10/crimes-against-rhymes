import { wordFromCMULine } from "./functions";

describe("test wordFromCMULine", () => {

    it.each`
        line                        | word
        ${"relax R IH0 L AE1 K S"}  | ${"relax"}
        ${""}                       | ${""}
    `("returns the word", ({line, word}) => {
        expect(wordFromCMULine(line)).toEqual(word); 
    }); 

});