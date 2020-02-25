import { wordFromCMULine } from "./parse";

describe("test wordFromCMULine", () => {

    it.each`
        line                        | word
        ${"relax R IH0 L AE1 K S"}  | ${"relax"}
        ${""}                       | ${""}
    `("returns the word '$word' from '$line'", ({line, word}) => {
        expect(wordFromCMULine(line)).toEqual(word); 
    }); 

});