type BinaryDataValueTypes = bigint | number | string;

function bigintToNumber(value: bigint) {
  return Number.parseInt(value.toString());
}

function reverseString(str: string) {
  return str.split('').reverse().join('');
}

/**
 * The BinaryData class is the default (and only) export of the BinaryMod module.
 * It holds a string of binary data and allows for manipulation of its contents.
 */
export default class BinaryData {
  private data = 0n;

  /**
   * @param length The length of the binary string to store.
   * @param data The data to store. This can be a bigint, an integer number, or an integer number stored in a string. Prefixes such as 0x, 0b, and 0o are allowed.
   */
  constructor(public readonly length: bigint, data: BinaryDataValueTypes) {
    this.set(data);
  }

  /**
   * Useful for resizing BinaryData objects
   * @param data A pre-existing BinaryData object.
   * @param newLength The new length of the binary string. Must not be smaller than the length of `data`.
   * @returns A new BinaryData object with a length of `length`, containing the data of `data`.
   */
  public static fromBinaryData(data: BinaryData, newLength: bigint) {
    return new BinaryData(newLength, '0b' + data.toString());
  }

  /**
   * Sets the data of this object equal to `data`.
   * @param data The data to store. This can be a bigint, an integer number, or an integer number stored in a string. Prefixes such as 0x, 0b, and 0o are allowed.
   */
  public set(data: BinaryDataValueTypes) {
    this.data = BigInt(data);
    this.checkLength();
  }

  /**
   * Sets the bit it index `idx` to `value`.
   * @param idx The index of the bit to set.
   * @param value The value that the bit should be set to.
   */
  public setBitAt(idx: bigint, value: boolean) {
    const thisString = reverseString(this.toString());
    const idxAsNum = bigintToNumber(idx);

    if(idxAsNum.toString().startsWith('-'))
      throw new Error('Index cannot be negative!');
    
    if(idx >= this.length)
      throw new Error('Index cannot be greater than maximum position ' + (this.lengthAsNumber() -1) + '!');

    this.set('0b' + reverseString(thisString.substring(0, idxAsNum) + (value ? '1' : '0') + thisString.substring(idxAsNum + 1)));
  }

  private checkLengthInternal(data: string) {
    if(BigInt(data.length) !== this.length)
      throw new Error(`Binary data has invalid length - ${data.length} bits / ${this.length} bits`);
  }

  /**
   * Checks that the length of the binary string is equal than the maximum allowed bit-length for this object. If not, then an error is thrown.
   */
  public checkLength() {
    this.toString();
  }

  /**
   * @returns The binary string stored in this object.
   */
  public toString() {
    const data = this.data.toString(2).padStart(this.lengthAsNumber(), '0');
    this.checkLengthInternal(data);
    
    return data;
  }

  /**
   * @returns The binary string stored in this object, with a space inserted every 4 bits from the right.
   */
  public toPrettyString() {
    let str = reverseString(reverseString(this.toString()).split(/(.{4})/g).join(' '));

    if(str.startsWith(' '))
      str = str.substring(1);
    
    return str.replaceAll('  ', ' ');
  }

  /**
   * @returns The length of the binary string stored in this object as a number
   */
  public lengthAsNumber() {
    return bigintToNumber(this.length);
  }

  /**
   * @returns The binary string stored in this object as a denary number.
   */
  public toDenaryNumber() {
    return Number.parseInt(this.toString(), 2);
  }
}