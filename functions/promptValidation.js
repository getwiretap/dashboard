const damerauLevenshtein = require('talisman/metrics/damerau-levenshtein');
const fingerprint = require('talisman/keyers/fingerprint');
const namesig = require('talisman/keyers/name-sig');
// const ngramFingerprint = require('talisman/keyers/ngram-fingerprint');


const formatString = (string, keyer) => keyer(string);

const formatWords = (string, keyer) => string.split(' ').map(keyer).join(' ');

const getSimilarity = (a, b, keyer, formater) => {
  const formatedA = formater(a, keyer);
  const formatedB = formater(b, keyer);

  const longestStringLength = Math.max(formatedA.length, formatedB.length);
  const distance = damerauLevenshtein(formatedA, formatedB);
  const relativeDistance = distance / longestStringLength;
  const similarity = 1 - relativeDistance;

  return similarity;
};


exports.validate = (transcription, label) => {
  const similarities = [];

  [fingerprint, namesig].forEach((keyer) => {
    [formatString, formatWords].forEach((formater) => {
      const similarity = getSimilarity(transcription, label, keyer, formater);
      similarities.push(similarity);
    });
  });

  const similaritySum = similarities.reduce((total, similarity) => total + similarity);
  const similarityAverage = similaritySum / similarities.length;

  const isValid = similarityAverage > 0.85;

  return isValid;
};
