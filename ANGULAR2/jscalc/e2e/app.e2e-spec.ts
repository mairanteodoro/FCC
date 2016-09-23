import { JscalcPage } from './app.po';

describe('jscalc App', function() {
  let page: JscalcPage;

  beforeEach(() => {
    page = new JscalcPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
