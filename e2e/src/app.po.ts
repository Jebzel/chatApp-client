import { browser, by, element } from 'protractor';

export class AppPage {
  navigateTo() {
    return browser.get(browser.baseUrl) as Promise<any>;
  }

  getTitleText() {
    return element(by.css('app-root h1')).getText() as Promise<string>;
  }

  getMsgTextbox() {
    return element(by.name('message'));
   }

   getMsgText() {
    return element(by.name('messageText'));
   }
  
}
