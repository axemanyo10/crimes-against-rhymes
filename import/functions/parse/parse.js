export const cmuLineParts = (line) => {
    return line.split(" ");
}

export const word = (parts) => {
    return parts[0];
}

export const stressedVowelIndex = (parts) => {
    return parts.findIndex(x => /[A-Z]+1/.test(x));
}

export const stressedVowel = (parts, index) => {
    return parts[index].slice(0, -1)    
}

