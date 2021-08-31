module.exports = new (function() {
  this['before'] = function(browser, done) {
    browser.resetDb(done).end();
  };

  this['check if login page is visible'] = function(browser) {
    browser
      .url(browser.globals.entrypoint + '/login')
      .waitForElementVisible('//body', browser.globals.load_speed)
      .dumpConsole('browser')
      .assert.containsText(
        "//div[contains(@id,root)]//*[contains(@class, 'form-subtitle')]//span",
        'Merci de vous identifier'
      )
      .end();
  };

  this['check successful login when entering good credentials'] = function(browser) {
    browser
      .url(browser.globals.entrypoint + '/login')
      .waitForElementVisible('//body', browser.globals.load_speed)
      .assert.containsText(
        "//div[contains(@id,root)]//*[contains(@class, 'form-subtitle')]//span",
        'Merci de vous identifier'
      )
      .setValue('//input[@name="username"]', 'patient1@tmm-software.tech')
      .setValue('//input[@name="password"]', 'Medic123')
      .click('//button[@type="submit"]')
      .waitForElementPresent('//h1/span', browser.globals.load_speed)
      .assert.containsText('//h1/span', 'BIENVENUE')
      .end();
  };

  this['check unsuccessful login when entering bad credentials'] = function(browser) {
    browser
      .url(browser.globals.entrypoint + '/login')
      .waitForElementVisible('//body', browser.globals.load_speed)
      .assert.containsText(
        "//div[contains(@id,root)]//*[contains(@class, 'form-subtitle')]//span",
        'Merci de vous identifier'
      )
      .setValue('//input[@name="username"]', '1234567890123')
      .setValue('//input[@name="password"]', 'password')
      .click('//button[@type="submit"]')
      .waitForElementPresent('//div[contains(@class, "alert-danger")]', browser.globals.load_speed)
      .assert.containsText(
        '//div[contains(@class, "alert-danger")]',
        'Adresse mail et/ou mot de passe incorrects'
      )
      .waitForElementPresent('//input[@name="username"]', browser.globals.load_speed)
      .setValue('//input[@name="username"]', 'test2')
      .end();
  };

  // todo: uncomment this when account locking is back on api
  // this['check account locking'] = function(browser) {
  //   browser
  //     .url(browser.globals.entrypoint + '/login')
  //     .waitForElementVisible('//body', browser.globals.load_speed)
  //     .assert.containsText(
  //       "//div[contains(@id,root)]//*[contains(@class, 'form-subtitle')]//span",
  //       'Merci de vous identifier'
  //     )
  //     .setValue('//input[@name="username"]', 'patient1@tmm-software.tech')
  //     .setValue('//input[@name="password"]', 'password')
  //     .click('//button[@type="submit"]')
  //     .waitForElementPresent('//div[contains(@class, "alert-danger")]', browser.globals.load_speed)
  //     .assert.containsText(
  //       '//div[contains(@class, "alert-danger")]',
  //       'Adresse mail et/ou mot de passe incorrects'
  //     )
  //     .setValue('//input[@name="username"]', 'patient1@tmm-software.tech')
  //     .setValue('//input[@name="password"]', 'password')
  //     .click('//button[@type="submit"]')
  //     .waitForElementPresent('//div[contains(@class, "alert-danger")]', browser.globals.load_speed)
  //     .assert.containsText(
  //       '//div[contains(@class, "alert-danger")]',
  //       'Adresse mail et/ou mot de passe incorrects'
  //     )
  //     .setValue('//input[@name="username"]', 'patient1@tmm-software.tech')
  //     .setValue('//input[@name="password"]', 'password')
  //     .click('//button[@type="submit"]')
  //     .waitForElementPresent('//div[contains(@class, "alert-danger")]', browser.globals.load_speed)
  //     .assert.containsText(
  //       '//div[contains(@class, "alert-danger")]',
  //       'Adresse mail et/ou mot de passe incorrects'
  //     )
  //     .setValue('//input[@name="username"]', 'patient1@tmm-software.tech')
  //     .setValue('//input[@name="password"]', 'password')
  //     .click('//button[@type="submit"]')
  //     .waitForElementPresent('//div[contains(@class, "alert-danger")]', browser.globals.load_speed)
  //     .assert.containsText(
  //       '//div[contains(@class, "alert-danger")]',
  //       'Votre compte a été temporairement bloqué suite à un trop grand nombre de tentatives de connexion infructueuses.'
  //     )
  //     .waitForElementPresent('//input[@name="username"]', browser.globals.load_speed)
  //     .setValue('//input[@name="username"]', 'test2')
  //     .end();
  // };

  this['check warning message when a field is empty'] = function(browser) {
    browser
      .url(browser.globals.entrypoint + '/login')
      .waitForElementVisible('//body', browser.globals.load_speed)
      .assert.containsText(
        "//div[contains(@id,root)]//*[contains(@class, 'form-subtitle')]//span",
        'Merci de vous identifier'
      )
      .setValue('//input[@name="username"]', 'test')
      .assert.containsText(
        '//div[contains(@class, "alert-warning")]//span',
        'Veuillez renseigner votre adresse mail et votre mot de passe'
      )
      .setValue('//input[@name="password"]', 'test')
      .end();
  };
})();
