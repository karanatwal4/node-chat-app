const expect = require('expect');
const {generateMessage, generateLocationMessage} = require('./message');

describe('generateMessage', () => {
  it('should generate correct message', () => {
    var from = 'karan';
    var text = 'hello';
    var message = generateMessage(from, text);

    expect(message.from).toBe(from);
    expect(message.text).toBe(text);
  });
});

describe('generateLocationMessage', () => {
  it('should generate correct location message', () => {
    var from ='User';
    var location;
    var latitude = 22;
    var longitude = 44;

    var message = generateLocationMessage(from, latitude, longitude);

    expect(message.createdAt).toBeA('number');
    expect(message.from).toBe(from);
    expect(message.url).toBe(`http://www.google.com/maps?q=${latitude},${longitude}`);

  });
});
