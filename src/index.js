'use strict';
/**
 * @ngInject
 */

require('angular-bootstrap-colorpicker');
var ModuleName = 'mi.ColorPicker',
    requires = ['colorpicker.module'];

module.exports = angular.module(ModuleName, requires)
  .run(function (formlyConfig) {
    var ngModelAttrs = {};
    function camelize(string) {
      string = string.replace(/[\-_\s]+(.)?/g, function (match, chr) {
        return chr ? chr.toUpperCase() : '';
      });
      return string.replace(/^([A-Z])/, function (match, chr) {
        return chr ? chr.toLowerCase() : '';
      });
    }

    ngModelAttrs = {};
    // attributes
    angular.forEach([
      'color-picker-format',
      'color-picker-alpha',
      'color-picker-swatch',
      'color-picker-swatch-pos',
      'color-picker-swatch-bootstrap',
      'color-picker-swatch-only',
      'color-picker-pos',
      'color-picker-case'
    ], function (attr) {
      ngModelAttrs[camelize(attr)] = {attribute: attr};
    });

    formlyConfig.setType({
      name: 'colorpicker',
      template: '<div class="input-group">' +
      '<input type="text" colorpicker class="form-control" colorpicker-position="top" ng-model="model[options.key]" ' +
      'placeholder="Recipient\'s username" aria-describedby="basic-addon2">' +
      '<span class="input-group-addon" style="background-color:{{model.backgroundColor}}" id="basic-addon2"></span>' +
      '</div>',
      wrapper: ['bootstrapLabel', 'bootstrapHasError'],
      defaultOptions: {
        ngModelAttrs: ngModelAttrs
      }
    });
  });