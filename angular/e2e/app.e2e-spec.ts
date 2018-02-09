import { GametablePage } from './app.po';

describe('gametable App', function() {
  let page: GametablePage;

  beforeEach(() => {
    page = new GametablePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
