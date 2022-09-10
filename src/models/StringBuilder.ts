// StringBuider Class
// A class to facilitate string concatenation.
// @param separator - The separator to use between each concatenation.
class StringBuilder {
  private output: string = '';
  private seperator: string;

  constructor(seperator = '') {
    this.seperator = seperator;
  }

  // Appends a string to the end of the output.
  append(string: string) {
    this.output += this.output !== '' ? `${this.seperator}${string}` : string;
    return this;
  }

  // Appends a string to the end of the output
  // if the condition is true.
  appendIf(condition: boolean, string: string) {
    if (condition) this.append(string);
    return this;
  }

  // Appends a string if the string has a value.
  appendIfNotEmpty(string: string) {
    if (string !== '') this.append(string);
    return this;
  }

  // Appends a string if the string is defined.
  appendIfDefined(string: string | undefined) {
    if (string !== undefined) this.append(string);
    return this;
  }

  // Returns the string output.
  toString() {
    return this.output;
  }

  // Clear the output.
  clear() {
    this.output = '';
  }
}

export default StringBuilder;
