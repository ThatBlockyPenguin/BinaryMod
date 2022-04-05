# Usage
```ts
import BinaryData from 'https://deno.land/x/binarymod@1.0.0/mod.ts';

const myBinaryData = new BinaryData(8n, 0b1001);
console.log(myBinaryData.toPrettyString()); // 0000 1001
```

# BinaryDataValueTypes
```ts
type BinaryDataValueTypes = bigint | number | string;
```
The `BinaryData` constructor and `BinaryData#set` method take in a parameter of type `BinaryDataValueTypes`. `BinaryDataValueTypes` can be either a denary bigint primitive, a number (default is denary, but can be preceded by `0x` `0o` or `0b` for hexadecimal, octal and binary respectively, as per ECMA standard), or a string that can be parsed to a number (`0x`, `0c` and `0b` are allowed in this case as well).

# BinaryData
The `BinaryData` class is the default (and only) export of the BinaryMod module. It holds a string of binary data and allows for manipulation of its contents.

## Constructor
```ts
constructor(length: bigint, data: BinaryDataValueTypes) { ... }
```
The `BinaryData` constructor takes in a denary bigint primitive as a `length` parameter, to speicify the length of the binary string. It also takes in a `BinaryDataValueTypes` parameter, which will be the binary data of this object. If the amount of bits required to store the data is greater than `length`, then an error occurs.

## Methods
### checkLength()
```ts
public checkLength() { ... }
```
Checks that the length of the binary string is equal than the maximum allowed bit-length for this object. If not, then an error is thrown.

### lengthAsNumber()
```ts
public lengthAsNumber() { ... }
```
Returns the bit-length of this object as a JS number.

### set(data: BinaryDataValueTypes)
```ts
public set(data: BinaryDataValueTypes) { ... }
```
Takes in a `BinaryDataValueTypes` parameter, which will replace the current binary data of this object. If the amount of bits required to store the data is greater than the object's bit-length, then an error occurs.

### setBitAt(idx: bigint, value: boolean)
```ts
public setBitAt(idx: bigint, value: boolean) { ... }
```
Sets the bit at the index of `idx` in the binary string of this object to be either `true` (1) or `false` (0), as declared by the `value` parameter. The index is counted from right-to-left, so, in the sequence `1001`, the rightmost `1` would be at index 0.

### toDenaryNumber()
```ts
public toDenaryNumber() { ... }
```
Returns the value of the stored binary string as a denary number.

### toPrettyString()
```ts
public toPrettyString() { ... }
```
Returns the stored binary string, formatted with spaces every 4 bits from the right.


### toString()
```ts
public toString() { ... }
```
Returns the stored binary string.

## Static Methods
### fromBinaryData(data: BinaryData, newLength: bigint)
```ts
public static fromBinaryData(data: BinaryData, newLength: bigint) { ... }
```
Returns a new BinaryData object with the bit data of `data`, and a length of `newLength`. Useful for re-sizing BinaryData objects. If the amount of bits required to store the data in `data` is greater than `newLength`, then an error occurs.
