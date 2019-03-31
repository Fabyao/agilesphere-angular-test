import { browser, by, element } from 'protractor';

export class AppPage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('app-root h1')).getText();
  }

  getTitle() {
    return element(by.css('app-root > nav .navbar-brand')).getText();
  }

  getCitySearchTextBox() {
    return element(by.id('city'));
  }

  getForm() {
    return element(by.css('app-search form'));
  }

  getSearchButton() {
    return element(by.id('btn-search-city'));
  }
  getTableBobySearchResult() {

    return element.all(by.css('app-results table tbody tr td'));
  }
}
