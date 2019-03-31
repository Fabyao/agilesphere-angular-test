import { AppPage } from './app.po';
import { browser, by, element, ElementArrayFinder } from 'protractor';

describe('angular-weather App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
    page.navigateTo();
  });

  it('Should have the correct title', () => {
    page.getTitle().then((title: string) => {
      expect(title).toEqual('AgileSphere coding test - The Weather App');
    });
  });

  it('Search form should be valid', () => {
    page.getCitySearchTextBox().sendKeys('London');
    const formClass = page.getForm().getAttribute('class');
    expect(formClass).toContain('ng-valid');
  });

  it('Should display search results', () => {
    const searchTerm = 'London';
    page.getCitySearchTextBox().sendKeys(searchTerm);

    page.getSearchButton().click();

    const cells = page.getTableBobySearchResult();

    expect(cells.count()).toEqual(5);
    expect(cells.get(0).getText()).toEqual(searchTerm);
  });

});
