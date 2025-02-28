
/**
 * Returns the bank account number parsed from specified string.
 *
 * You work for a bank, which has recently purchased an ingenious machine to assist
 * in reading letters and faxes sent in by branch offices.
 * The machine scans the paper documents, and produces a string with a bank account
 * that looks like this:
 *
 *    _  _     _  _  _  _  _
 *  | _| _||_||_ |_   ||_||_|
 *  ||_  _|  | _||_|  ||_| _|
 *
 * Each string contains an account number written using pipes and underscores.
 * Each account number should have 9 digits, all of which should be in the range 0-9.
 *
 * Your task is to write a function that can take bank account string and parse it
 * into actual account numbers.
 *
 * @param {string} bankAccount
 * @return {number}
 *
 * Example of return :
 *
 *   '    _  _     _  _  _  _  _ \n'+
 *   '  | _| _||_||_ |_   ||_||_|\n'+     =>  123456789
 *   '  ||_  _|  | _||_|  ||_| _|\n'
 *
 *   ' _  _  _  _  _  _  _  _  _ \n'+
 *   '| | _| _|| ||_ |_   ||_||_|\n'+     => 23056789
 *   '|_||_  _||_| _||_|  ||_| _|\n',
 *
 *   ' _  _  _  _  _  _  _  _  _ \n'+
 *   '|_| _| _||_||_ |_ |_||_||_|\n'+     => 823856989
 *   '|_||_  _||_| _||_| _||_| _|\n',
 *
 */
function parseBankAccount(bankAccount) {
  const numbers = {
    0 :' _ | ||_|',
    1 :'     |  |',
    2 :' _  _||_ ',
    3 :' _  _| _|',
    4 :'   |_|  |',
    5 :' _ |_  _|',
    6 :' _ |_ |_|',
    7 :' _   |  |',
    8 :' _ |_||_|',
    9 :' _ |_| _|'
  };

  const arr = [];
  const str = bankAccount.split('\n');
  for (let i = 0; i < str[0].length; i += 3) {
    const temp = [];
    temp.push(str[0].slice(i, i+3));
    temp.push(str[1].slice(i, i+3));
    temp.push(str[2].slice(i, i+3));
    arr.push(temp.join(''));
  }
  const resl = [];
  for (let i = 0; i < arr.length; i++) {
    for (const j in numbers) {
      if (arr[i] === numbers[j]) resl.push(j);
    }
  }
  return +resl.join('');
}


/**
 * Returns the string, but with line breaks inserted at just the right places to make
 * sure that no line is longer than the specified column number.
 * Lines can be broken at word boundaries only.
 *
 * @param {string} text
 * @param {number} columns
 * @return {Iterable.<string>}
 *
 * @example :
 *
 *  'The String global object is a constructor for strings, or a sequence of characters.', 26 =>
 *      'The String global object',
 *      'is a constructor for',
 *      'strings, or a sequence of',
 *      'characters.'
 *
 *  'The String global object is a constructor for strings, or a sequence of characters.', 12 =>
 *      'The String',
 *      'global',
 *      'object is a',
 *      'constructor',
 *      'for strings,',
 *      'or a',
 *      'sequence of',
 *      'characters.'
 */
function* wrapText(text, columns) {
  const textArr = text.split(' ');
  let resl = [];
  for (let i = 0; i < textArr.length; i++) {
    if (resl.join(' ').length + textArr[i].length < columns) {
      resl.push(textArr[i]);
    } else {
      yield resl.join(' ');
      resl = []; 
      i--;
    }
  }
  yield resl.join(' ');
}


/**
 * Returns the rank of the specified poker hand.
 * See the ranking rules here: https://en.wikipedia.org/wiki/List_of_poker_hands.
 *
 * @param {array} hand
 * @return {PokerRank} rank
 *
 * @example
 *   [ '4♥','5♥','6♥','7♥','8♥' ] => PokerRank.StraightFlush
 *   [ 'A♠','4♠','3♠','5♠','2♠' ] => PokerRank.StraightFlush
 *   [ '4♣','4♦','4♥','4♠','10♥' ] => PokerRank.FourOfKind
 *   [ '4♣','4♦','5♦','5♠','5♥' ] => PokerRank.FullHouse
 *   [ '4♣','5♣','6♣','7♣','Q♣' ] => PokerRank.Flush
 *   [ '2♠','3♥','4♥','5♥','6♥' ] => PokerRank.Straight
 *   [ '2♥','4♦','5♥','A♦','3♠' ] => PokerRank.Straight
 *   [ '2♥','2♠','2♦','7♥','A♥' ] => PokerRank.ThreeOfKind
 *   [ '2♥','4♦','4♥','A♦','A♠' ] => PokerRank.TwoPairs
 *   [ '3♥','4♥','10♥','3♦','A♠' ] => PokerRank.OnePair
 *   [ 'A♥','K♥','Q♥','2♦','3♠' ] =>  PokerRank.HighCard
 */
const PokerRank = {
  StraightFlush: 8,
  FourOfKind: 7,
  FullHouse: 6,
  Flush: 5,
  Straight: 4,
  ThreeOfKind: 3,
  TwoPairs: 2,
  OnePair: 1,
  HighCard: 0
};

function getPokerHandRank(hand) {
  const faces = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 
    'J', 'Q', 'K', 'A'];
  const suits = ['♥', '♦', '♣', '♠'];
  const HandFaces = hand.map(el => faces.indexOf(el.slice(0, -1)));
  const HandSuits = hand.map(el => suits.indexOf(el.slice(-1)));
  const flush = HandSuits.every(el => el === HandSuits[0]);
  const groups = faces.map( (el, i) => HandFaces
    .filter(el => i === el).length)
    .sort((a, b) => b - a);
  const shift = HandFaces.map(el => (el + 1) % 13);
  const distance = Math.min( Math.max(...HandFaces) - Math.min(...HandFaces), 
    Math.max(...shift) - Math.min(...shift));
  const straight = groups[0] === 1 && distance < 5;

  if (straight && flush)                  return PokerRank.StraightFlush;
  if (groups[0] === 4)                    return PokerRank.FourOfKind;
  if (groups[0] === 3 && groups[1] === 2) return PokerRank.FullHouse;
  if (flush)                              return PokerRank.Flush;
  if (straight)                           return PokerRank.Straight;
  if (groups[0] === 3)                    return PokerRank.ThreeOfKind;
  if (groups[0] === 2 && groups[1] === 2) return PokerRank.TwoPairs;
  if (groups[0] === 2)                    return PokerRank.OnePair;
  return PokerRank.HighCard;
}


/**
 * Returns the rectangles sequence of specified figure.
 * The figure is ASCII multiline string comprised of minus signs -, plus signs +,
 * vertical bars | and whitespaces.
 * The task is to break the figure in the rectangles it is made of.
 *
 * NOTE: The order of rectanles does not matter.
 *
 * @param {string} figure
 * @return {Iterable.<string>} decomposition to basic parts
 *
 * @example
 *
 *    '+------------+\n'+
 *    '|            |\n'+
 *    '|            |\n'+        '+------------+\n'+
 *    '|            |\n'+        '|            |\n'+         '+------+\n'+          '+-----+\n'+
 *    '+------+-----+\n'+   =>   '|            |\n'+     ,   '|      |\n'+     ,    '|     |\n'+
 *    '|      |     |\n'+        '|            |\n'+         '|      |\n'+          '|     |\n'+
 *    '|      |     |\n'         '+------------+\n'          '+------+\n'           '+-----+\n'
 *    '+------+-----+\n'
 *
 *
 *
 *    '   +-----+     \n'+
 *    '   |     |     \n'+                                    '+-------------+\n'+
 *    '+--+-----+----+\n'+              '+-----+\n'+          '|             |\n'+
 *    '|             |\n'+      =>      '|     |\n'+     ,    '|             |\n'+
 *    '|             |\n'+              '+-----+\n'           '+-------------+\n'
 *    '+-------------+\n'
 */
// eslint-disable-next-line require-yield
function* getFigureRectangles(figure) {
  throw new Error('Not implemented');
}

module.exports = {
  parseBankAccount: parseBankAccount,
  wrapText: wrapText,
  PokerRank: PokerRank,
  getPokerHandRank: getPokerHandRank,
  getFigureRectangles: getFigureRectangles
};
