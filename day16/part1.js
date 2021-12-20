const fs = require('fs');

const input = fs.readFileSync('input.txt', 'utf8');

const hexaToBinary = (hexa) => (parseInt(hexa, 16).toString(2)).padStart(4, '0');

const binaryToDecimal = (binary) => parseInt(binary, 2);

let binary = input.split('').map(hexa => hexaToBinary(hexa)).join('');

const shiftAndGetNPositions = (length) => {
  const binaryArray = binary.split('');
  const firstElements = binaryArray.splice(0, length);
  binary = binaryArray.join('');
  return firstElements.join('');
};

let versionsTracker = [];

const processLiteralValue = () => {
  let isLastGroup = false;
  while (!isLastGroup) {
    const [prefix, ...group] = shiftAndGetNPositions(5).split('');
    isLastGroup = prefix === '0';
  }
};

const processPacketWithLengthTypeId0 = () => {
  const numberOfBitsInSubPacketsBinary = shiftAndGetNPositions(15);
  const numberOfBitsInSubPacketsDecimal = binaryToDecimal(numberOfBitsInSubPacketsBinary);

  let processedBits = 0;
  while (processedBits < numberOfBitsInSubPacketsDecimal) {
    const beforeBinaryLength = binary.length;
    processPacket();
    processedBits += beforeBinaryLength - binary.length;
  }
};

const processPacketWithLengthTypeId1 = () => {
  const numberOfSubPacketsBinary = shiftAndGetNPositions(11);
  const numberOfSubPacketsDecimal = binaryToDecimal(numberOfSubPacketsBinary);
  for (let i = 0; i < numberOfSubPacketsDecimal; i++) {
    processPacket();
  }
};

const processPacket = () => {
  const versionBinary = shiftAndGetNPositions(3);
  const versionDecimal = binaryToDecimal(versionBinary);
  const typeId = binaryToDecimal(shiftAndGetNPositions(3));

  versionsTracker.push(versionDecimal);

  if (typeId === 4) {
    processLiteralValue();
  } else {
    const typeIdLength = shiftAndGetNPositions(1);
    if (typeIdLength === '0') {
      processPacketWithLengthTypeId0();
    } else {
      processPacketWithLengthTypeId1();
    }
  }
}

processPacket();

const result = versionsTracker.reduce((a, b) => a + b, 0);

console.log('result', result);
