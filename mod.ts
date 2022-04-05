type BinaryDataValueTypes = bigint | number | string;

function bigintToNumber(value: bigint) {
  return Number.parseInt(value.toString());
}

function reverseString(str: string) {
  return str.split('').reverse().join('');
}

export default class BinaryData {
  private data = 0n;

  constructor(public readonly length: bigint, data: BinaryDataValueTypes) {
    this.set(data);
  }

  public static fromBinaryData(data: BinaryData, newLength: bigint) {
    return new BinaryData(newLength, '0b' + data.toString());
  }

  public set(data: BinaryDataValueTypes) {
    this.data = BigInt(data);
    this.checkLength();
  }

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

  public checkLength() {
    this.toString();
  }

  public toString() {
    const data = this.data.toString(2).padStart(this.lengthAsNumber(), '0');
    this.checkLengthInternal(data);
    
    return data;
  }

  public toPrettyString() {
    let str = reverseString(reverseString(this.toString()).split(/(.{4})/g).join(' '));

    if(str.startsWith(' '))
      str = str.substring(1);
    
    return str.replaceAll('  ', ' ');
  }

  public lengthAsNumber() {
    return bigintToNumber(this.length);
  }

  public toDenaryNumber() {
    return Number.parseInt(this.toString(), 2);
  }
}