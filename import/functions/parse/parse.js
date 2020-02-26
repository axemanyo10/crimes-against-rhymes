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

export const stressedVowelPosition = (parts, index) => {
    return parts.slice(index + 1).filter(x => /[A-Z]+[02]/.test(x)).length
}

