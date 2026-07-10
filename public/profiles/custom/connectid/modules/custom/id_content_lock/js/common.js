(function ($, Drupal, drupalSettings) {

  'use strict';

  Drupal.behaviors.isContentLockContextual = {
    attach: function (context, settings) {

      $(once('contentLockContextual', '.content-lock-form-disabled', context)).each(function () {

        // Handler for locked form.
        var $form = $(this);

        // If form was locked then remove all inline error messages for inline forms.

        $('.messages--error', $form).remove();

        // Remove error class for unset highlighted elements.
        $form.find('.error').removeClass('error');

        // Disable form.
        $form.prop('disabled', true).find(':input').attr('disabled', true);
        $form.find('.form-item').addClass('form-disabled');

        // Remove disable prop via class for contorl elements.
        $form.find('input.form-control--disabled').removeClass('form-control--disabled');

        // Set enable 'Cancel' button for inlline forms.
        $form.find('input[name^="ief-edit-cancel"]').addClass('is-active').attr('disabled', false);

        // Set enable 'Unlock' button.
        $form.find('a.button--unlock').addClass('is-active');

        // Handler for error messages.
        // Component inline form.
        var $component_inline = $('.ief-form .shared-component-form', $form);
        if ($component_inline.find('.form-item--error-message').length) {
          $component_inline.addClass('content-lock-form-disabled');
          console.log($component_inline.find('.form-item--error-message').text());
          $('.locked-component-form-message', $form).text($component_inline.find('.form-item--error-message').first().text()).show();
        }

        // Handler for error messages.
        // Component modal form.
        var $component_modal = $('#brick-modal-form .shared-component-form', $form);
        if ($component_modal.find('.container.alert-container').length) {
          $component_modal.addClass('content-lock-form-disabled');

          var $message = $component_modal.find('.container.alert-container').first();
          $message.find('button').remove();
          $message.find('.sr-only').remove();
          $('.locked-component-form-message').text($message.text()).show();
        }
      });

    }
  };

})(jQuery, Drupal, drupalSettings);
