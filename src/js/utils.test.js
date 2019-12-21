const Utils = require('../js/utils');
const fs = require('fs');
const path = require('path');
const html = fs.readFileSync(path.resolve(__dirname, '../layouts/index.html'), 'utf8');

jest
  .dontMock('fs');

describe('Places for draw the Progress Bars', function () {
  beforeEach(() => {
    document.documentElement.innerHTML = html.toString();
  });

  afterEach(() => {
    jest.resetModules();
  });

  it('progress-bars exists', function () {
    expect(document.getElementById('progress-bars')).toBeTruthy();
  });
});

describe('Places for draw the Max Value from API', function () {
  beforeEach(() => {
    document.documentElement.innerHTML = html.toString();
  });

  afterEach(() => {
    jest.resetModules();
  });

  it('max-value exists', function () {
    expect(document.getElementById('max-value')).toBeTruthy();
  });
});

describe('Places for draw Selector', function () {
  beforeEach(() => {
    document.documentElement.innerHTML = html.toString();
  });

  afterEach(() => {
    jest.resetModules();
  });

  it('select-control exists', function () {
    expect(document.getElementById('progress-bars')).toBeTruthy();
  });
});

describe('Places for draw Buttons', function () {
  beforeEach(() => {
    document.documentElement.innerHTML = html.toString();
  });

  afterEach(() => {
    jest.resetModules();
  });

  it('Buttons exists', function () {
    expect(document.getElementById('buttons')).toBeTruthy();
  });
});
