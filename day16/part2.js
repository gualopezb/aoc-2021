const fs = require('fs');

const input = fs.readFileSync('input.txt', 'utf8');

const hexaToBinary = (hexa) => (parseInt(hexa, 16).toString(2)).padStart(4, '0');

const binaryToDecimal = (binary) => parseInt(binary, 2);

let binary = input.split('').map(hexa => hexaToBinary(hexa)).join('');

const operationsByTypeId = {
  0: (packetValues) => packetValues.reduce((acc, current) => acc + current, 0),
  1: (packetValues) => packetValues.reduce((acc, current) => acc * current, 1),
  2: (packetValues) => Math.min(...packetValues),
  3: (packetValues) => Math.max(...packetValues),
  5: ([leftPacketValue, rightPacketValue]) => leftPacketValue > rightPacketValue ? 1 : 0,
  6: ([leftPacketValue, rightPacketValue]) => leftPacketValue < rightPacketValue ? 1 : 0,
  7: ([leftPacketValue, rightPacketValue]) => leftPacketValue === rightPacketValue ? 1 : 0,
};

const shiftAndGetNPositions = (length) => {
  const binaryArray = binary.split('');
  const firstElements = binaryArray.splice(0, length);
  binary = binaryArray.join('');
  return firstElements.join('');
};

const processLiteralValue = () => {
  let isLastGroup = false;
  let literalValue = '';

  while (!isLastGroup) {
    const [prefix, ...group] = shiftAndGetNPositions(5).split('');
    literalValue += group.join('');
    isLastGroup = prefix === '0';
  }
  return binaryToDecimal(literalValue);
};

const processPacketWithLengthTypeId0 = () => {
  const numberOfBitsInSubPacketsBinary = shiftAndGetNPositions(15);
  const numberOfBitsInSubPacketsDecimal = binaryToDecimal(numberOfBitsInSubPacketsBinary);

  let processedBits = 0;
  let values = [];
  while (processedBits < numberOfBitsInSubPacketsDecimal) {
    const beforeBinaryLength = binary.length;
    values.push(processPacket());
    processedBits += beforeBinaryLength - binary.length;
  }
  return values;
};

const processPacketWithLengthTypeId1 = () => {
  const numberOfSubPacketsBinary = shiftAndGetNPositions(11);
  const numberOfSubPacketsDecimal = binaryToDecimal(numberOfSubPacketsBinary);
  let values = [];
  for (let i = 0; i < numberOfSubPacketsDecimal; i++) {
    values.push(processPacket());
  }
  return values;
};

const processPacket = () => {
  shiftAndGetNPositions(3); // version number can be ignored
  const typeId = binaryToDecimal(shiftAndGetNPositions(3));

  if (typeId === 4) {
    return processLiteralValue();
  } else {
    const typeIdLength = shiftAndGetNPositions(1);
    const packetValues = typeIdLength === '0' ? processPacketWithLengthTypeId0() : processPacketWithLengthTypeId1();
    const calculateExpression = operationsByTypeId[typeId];
    return calculateExpression(packetValues);
  }
};

const result = processPacket();
console.log('result', result);
