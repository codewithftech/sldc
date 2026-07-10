(function ($, Drupal, drupalSettings) {

  'use strict';

  Drupal.behaviors.idCookieConsent = {
    attach: function () {
      var cookie_settings = drupalSettings.cookie_consent['0'];
      var __CookieConsentConfig = {
        cookieName: '__CookieConsentV300',
        legacyCookieName: '__CookieConsent200',
        title: cookie_settings.text.title,
        preferenceTitle: cookie_settings.text.preferenceTitle,
        acceptAllBtnText: cookie_settings.text.acceptAllBtnText,
        cookieSettingBtnText: cookie_settings.text.cookieSettingBtnText,
        disableOptionalBtnText: cookie_settings.text.disableOptionalBtnText,
        saveBtnText: cookie_settings.text.saveBtnText,
        description: cookie_settings.policy.description,
        expiry: cookie_settings.general.expiry,
        isGtagConfigured: cookie_settings.general.isGtagConfigured ?? 0,
        excludePages: cookie_settings.general.excludePages,
        categoriesTitle: cookie_settings.categories.categoriesTitle,
        categories: [{
          name: 'necessaryCookie',
          enabled: true,
          title: cookie_settings.categories.necessaryCookie.title,
          description: cookie_settings.categories.necessaryCookie.description,
          required: true,
          requiredText: 'Required',
          cookieList: cookie_settings.categories.necessaryCookie.cookieList
        }],
      };

      $.each(cookie_settings.categories.list, function(index, element){
        __CookieConsentConfig.categories.push(element);
      });

      if (window.CookieConsent.setConfiguration === undefined) {
        window.CookieConsent = new CookieConsent({});
      }
      window.CookieConsent.setConfiguration(__CookieConsentConfig);

      // Set colors.
      // Set message background color.
      if (typeof cookie_settings.colors.text !== 'undefined') {
        $('#__cookieWrapper .__cookieNotice .__cookieNoticeBody')
          .css('background', cookie_settings.colors.text.background);
        // Set message text color.
        $('#__cookieWrapper.custom-cookie p')
          .css('color', cookie_settings.colors.text.color);
        // Set message link color.
        $('#__cookieWrapper.custom-cookie a')
          .css('color', cookie_settings.colors.text.a);
      }
      // Set message button background color.
      if (typeof cookie_settings.colors.button !== 'undefined') {
        $('#__cookieWrapper.custom-cookie .ccBtn, .custom-cookie-modal .modal-footer button')
          .css('background', cookie_settings.colors.button.background);
        // Set message button text color.
        $('#__cookieWrapper.custom-cookie .ccBtn, #__cookieWrapper.custom-cookie .modal-footer button')
          .css('color', cookie_settings.colors.button.color);
      }
      // Set modal background color.
      if (typeof cookie_settings.colors.modal !== 'undefined') {
        $('#__cookieWrapper.custom-cookie .modal .modal-content')
          .css('background', cookie_settings.colors.modal.background);
        // Set modal text color.
        // Need to implement it as important.
        $('.custom-cookie-modal .modal-body, .custom-cookie-modal .modal-body h4, .custom-cookie-modal p, .custom-cookie-modal .modal-title')
          .attr('style', 'color: ' + cookie_settings.colors.modal.color + ' !important');
      }

      // Show cookie message.
      $('#__cookieWrapper').show();
    }
  };
})(jQuery, Drupal, drupalSettings);
