/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	/**
	 * @ngInject
	 */

	__webpack_require__(1);
	var ModuleName = 'mi.ColorPicker',
	    requires = ['colorpicker.module'];

	module.exports = angular.module(ModuleName, requires)
	  .run(["formlyConfig", function (formlyConfig) {
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
	      template: '<div class="input-group" colorpicker colorpicker-position="top" ng-model="model[options.key]">' +
	      '<input type="text"  class="form-control" aria-describedby="basic-addon2" ng-model="model[options.key]">' +
	      '<span class="input-group-addon mi-color-picker"  ' +
	      'style="background-color:{{model[options.key]}}" id="basic-addon2"></span>' +
	      '</div>',
	      wrapper: ['bootstrapLabel', 'bootstrapHasError'],
	      defaultOptions: {
	        ngModelAttrs: ngModelAttrs
	      }
	    });
	  }]);

/***/ },
/* 1 */
/***/ function(module, exports) {

	angular.module('colorpicker.module', [])
	    .factory('Helper', function () {
	      'use strict';
	      return {
	        closestSlider: function (elem) {
	          var matchesSelector = elem.matches || elem.webkitMatchesSelector || elem.mozMatchesSelector || elem.msMatchesSelector;
	          if (matchesSelector.bind(elem)('I')) {
	            return elem.parentNode;
	          }
	          return elem;
	        },
	        getOffset: function (elem, fixedPosition) {
	          var
	            scrollX = 0,
	            scrollY = 0,
	            rect = elem.getBoundingClientRect();
	          while (elem && !isNaN(elem.offsetLeft) && !isNaN(elem.offsetTop)) {
	            if (!fixedPosition && elem.tagName === 'BODY') {
	              scrollX += document.documentElement.scrollLeft || elem.scrollLeft;
	              scrollY += document.documentElement.scrollTop || elem.scrollTop;
	            } else {
	              scrollX += elem.scrollLeft;
	              scrollY += elem.scrollTop;
	            }
	            elem = elem.offsetParent;
	          }
	          return {
	            top: rect.top + window.pageYOffset,
	            left: rect.left + window.pageXOffset,
	            scrollX: scrollX,
	            scrollY: scrollY
	          };
	        },
	        // a set of RE's that can match strings and generate color tuples. https://github.com/jquery/jquery-color/
	        stringParsers: [
	          {
	            re: /rgba?\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*(?:,\s*(\d+(?:\.\d+)?)\s*)?\)/,
	            parse: function (execResult) {
	              return [
	                execResult[1],
	                execResult[2],
	                execResult[3],
	                execResult[4]
	              ];
	            }
	          },
	          {
	            re: /rgba?\(\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*(?:,\s*(\d+(?:\.\d+)?)\s*)?\)/,
	            parse: function (execResult) {
	              return [
	                2.55 * execResult[1],
	                2.55 * execResult[2],
	                2.55 * execResult[3],
	                execResult[4]
	              ];
	            }
	          },
	          {
	            re: /#([a-fA-F0-9]{2})([a-fA-F0-9]{2})([a-fA-F0-9]{2})/,
	            parse: function (execResult) {
	              return [
	                parseInt(execResult[1], 16),
	                parseInt(execResult[2], 16),
	                parseInt(execResult[3], 16)
	              ];
	            }
	          },
	          {
	            re: /#([a-fA-F0-9])([a-fA-F0-9])([a-fA-F0-9])/,
	            parse: function (execResult) {
	              return [
	                parseInt(execResult[1] + execResult[1], 16),
	                parseInt(execResult[2] + execResult[2], 16),
	                parseInt(execResult[3] + execResult[3], 16)
	              ];
	            }
	          }
	        ]
	      };
	    })
	    .factory('Color', ['Helper', function (Helper) {
	      'use strict';
	      return {
	        value: {
	          h: 1,
	          s: 1,
	          b: 1,
	          a: 1
	        },
	        // translate a format from Color object to a string
	        'rgb': function () {
	          var rgb = this.toRGB();
	          return 'rgb(' + rgb.r + ',' + rgb.g + ',' + rgb.b + ')';
	        },
	        'rgba': function () {
	          var rgb = this.toRGB();
	          return 'rgba(' + rgb.r + ',' + rgb.g + ',' + rgb.b + ',' + rgb.a + ')';
	        },
	        'hex': function () {
	          return  this.toHex();
	        },

	        // HSBtoRGB from RaphaelJS
	        RGBtoHSB: function (r, g, b, a) {
	          r /= 255;
	          g /= 255;
	          b /= 255;

	          var H, S, V, C;
	          V = Math.max(r, g, b);
	          C = V - Math.min(r, g, b);
	          H = (C === 0 ? null :
	              V === r ? (g - b) / C :
	                  V === g ? (b - r) / C + 2 :
	                      (r - g) / C + 4
	              );
	          H = ((H + 360) % 6) * 60 / 360;
	          S = C === 0 ? 0 : C / V;
	          return {h: H || 1, s: S, b: V, a: a || 1};
	        },

	        //parse a string to HSB
	        setColor: function (val) {
	          val = (val) ? val.toLowerCase() : val;
	          for (var key in Helper.stringParsers) {
	            if (Helper.stringParsers.hasOwnProperty(key)) {
	              var parser = Helper.stringParsers[key];
	              var match = parser.re.exec(val),
	                  values = match && parser.parse(match);
	              if (values) {
	                this.value = this.RGBtoHSB.apply(null, values);
	                return false;
	              }
	            }
	          }
	        },

	        setHue: function (h) {
	          this.value.h = 1 - h;
	        },

	        setSaturation: function (s) {
	          this.value.s = s;
	        },

	        setLightness: function (b) {
	          this.value.b = 1 - b;
	        },

	        setAlpha: function (a) {
	          this.value.a = parseInt((1 - a) * 100, 10) / 100;
	        },

	        // HSBtoRGB from RaphaelJS
	        // https://github.com/DmitryBaranovskiy/raphael/
	        toRGB: function (h, s, b, a) {
	          if (!h) {
	            h = this.value.h;
	            s = this.value.s;
	            b = this.value.b;
	          }
	          h *= 360;
	          var R, G, B, X, C;
	          h = (h % 360) / 60;
	          C = b * s;
	          X = C * (1 - Math.abs(h % 2 - 1));
	          R = G = B = b - C;

	          h = ~~h;
	          R += [C, X, 0, 0, X, C][h];
	          G += [X, C, C, X, 0, 0][h];
	          B += [0, 0, X, C, C, X][h];
	          return {
	            r: Math.round(R * 255),
	            g: Math.round(G * 255),
	            b: Math.round(B * 255),
	            a: a || this.value.a
	          };
	        },

	        toHex: function (h, s, b, a) {
	          var rgb = this.toRGB(h, s, b, a);
	          return '#' + ((1 << 24) | (parseInt(rgb.r, 10) << 16) | (parseInt(rgb.g, 10) << 8) | parseInt(rgb.b, 10)).toString(16).substr(1);
	        }
	      };
	    }])
	    .factory('Slider', ['Helper', function (Helper) {
	      'use strict';
	      var
	          slider = {
	            maxLeft: 0,
	            maxTop: 0,
	            callLeft: null,
	            callTop: null,
	            knob: {
	              top: 0,
	              left: 0
	            }
	          },
	          pointer = {};

	      return {
	        getSlider: function() {
	          return slider;
	        },
	        getLeftPosition: function(event) {
	          return Math.max(0, Math.min(slider.maxLeft, slider.left + ((event.pageX || pointer.left) - pointer.left)));
	        },
	        getTopPosition: function(event) {
	          return Math.max(0, Math.min(slider.maxTop, slider.top + ((event.pageY || pointer.top) - pointer.top)));
	        },
	        setSlider: function (event, fixedPosition) {
	          var
	            target = Helper.closestSlider(event.target),
	            targetOffset = Helper.getOffset(target, fixedPosition),
	            rect = target.getBoundingClientRect(),
	            offsetX = event.clientX - rect.left,
	            offsetY = event.clientY - rect.top;

	          slider.knob = target.children[0].style;
	          slider.left = event.pageX - targetOffset.left - window.pageXOffset + targetOffset.scrollX;
	          slider.top = event.pageY - targetOffset.top - window.pageYOffset + targetOffset.scrollY;

	          pointer = {
	            left: event.pageX - (offsetX - slider.left),
	            top: event.pageY - (offsetY - slider.top)
	          };
	        },
	        setSaturation: function(event, fixedPosition, componentSize) {
	          slider = {
	            maxLeft: componentSize,
	            maxTop: componentSize,
	            callLeft: 'setSaturation',
	            callTop: 'setLightness'
	          };
	          this.setSlider(event, fixedPosition);
	        },
	        setHue: function(event, fixedPosition, componentSize) {
	          slider = {
	            maxLeft: 0,
	            maxTop: componentSize,
	            callLeft: false,
	            callTop: 'setHue'
	          };
	          this.setSlider(event, fixedPosition);
	        },
	        setAlpha: function(event, fixedPosition, componentSize) {
	          slider = {
	            maxLeft: 0,
	            maxTop: componentSize,
	            callLeft: false,
	            callTop: 'setAlpha'
	          };
	          this.setSlider(event, fixedPosition);
	        },
	        setKnob: function(top, left) {
	          slider.knob.top = top + 'px';
	          slider.knob.left = left + 'px';
	        }
	      };
	    }])
	    .directive('colorpicker', ['$document', '$compile', 'Color', 'Slider', 'Helper', function ($document, $compile, Color, Slider, Helper) {
	      'use strict';
	      return {
	        require: '?ngModel',
	        restrict: 'A',
	        link: function ($scope, elem, attrs, ngModel) {
	          var
	              thisFormat = attrs.colorpicker ? attrs.colorpicker : 'hex',
	              position = angular.isDefined(attrs.colorpickerPosition) ? attrs.colorpickerPosition : 'bottom',
	              inline = angular.isDefined(attrs.colorpickerInline) ? attrs.colorpickerInline : false,
	              fixedPosition = angular.isDefined(attrs.colorpickerFixedPosition) ? attrs.colorpickerFixedPosition : false,
	              target = angular.isDefined(attrs.colorpickerParent) ? elem.parent() : angular.element(document.body),
	              withInput = angular.isDefined(attrs.colorpickerWithInput) ? attrs.colorpickerWithInput : false,
	              componentSize = angular.isDefined(attrs.colorpickerSize) ? attrs.colorpickerSize : 100,
	              componentSizePx = componentSize + 'px',
	              inputTemplate = withInput ? '<input type="text" name="colorpicker-input" spellcheck="false">' : '',
	              closeButton = !inline ? '<button type="button" class="close close-colorpicker">&times;</button>' : '',
	              template =
	                  '<div class="colorpicker dropdown">' +
	                      '<div class="dropdown-menu">' +
	                      '<colorpicker-saturation><i></i></colorpicker-saturation>' +
	                      '<colorpicker-hue><i></i></colorpicker-hue>' +
	                      '<colorpicker-alpha><i></i></colorpicker-alpha>' +
	                      '<colorpicker-preview></colorpicker-preview>' +
	                      inputTemplate +
	                      closeButton +
	                      '</div>' +
	                      '</div>',
	              colorpickerTemplate = angular.element(template),
	              pickerColor = Color,
	              componentSizePx,
	              sliderAlpha,
	              sliderHue = colorpickerTemplate.find('colorpicker-hue'),
	              sliderSaturation = colorpickerTemplate.find('colorpicker-saturation'),
	              colorpickerPreview = colorpickerTemplate.find('colorpicker-preview'),
	              pickerColorPointers = colorpickerTemplate.find('i');

	          $compile(colorpickerTemplate)($scope);
	          colorpickerTemplate.css('min-width', parseInt(componentSize) + 29 + 'px');
	          sliderSaturation.css({
	            'width' : componentSizePx,
	            'height' : componentSizePx
	          });
	          sliderHue.css('height', componentSizePx);

	          if (withInput) {
	            var pickerColorInput = colorpickerTemplate.find('input');
	            pickerColorInput.css('width', componentSizePx);
	            pickerColorInput
	                .on('mousedown', function(event) {
	                  event.stopPropagation();
	                })
	              .on('keyup', function() {
	                var newColor = this.value;
	                elem.val(newColor);
	                if (ngModel && ngModel.$modelValue !== newColor) {
	                  $scope.$apply(ngModel.$setViewValue(newColor));
	                  update(true);
	                }
	              });
	          }

	          function bindMouseEvents() {
	            $document.on('mousemove', mousemove);
	            $document.on('mouseup', mouseup);
	          }

	          if (thisFormat === 'rgba') {
	            colorpickerTemplate.addClass('alpha');
	            sliderAlpha = colorpickerTemplate.find('colorpicker-alpha');
	            sliderAlpha.css('height', componentSizePx);
	            sliderAlpha
	                .on('click', function(event) {
	                  Slider.setAlpha(event, fixedPosition, componentSize);
	                  mousemove(event);
	                })
	                .on('mousedown', function(event) {
	                  Slider.setAlpha(event, fixedPosition, componentSize);
	                  bindMouseEvents();
	                })
	                .on('mouseup', function(event){
	                  emitEvent('colorpicker-selected-alpha');
	                });
	          }

	          sliderHue
	              .on('click', function(event) {
	                Slider.setHue(event, fixedPosition, componentSize);
	                mousemove(event);
	              })
	              .on('mousedown', function(event) {
	                Slider.setHue(event, fixedPosition, componentSize);
	                bindMouseEvents();
	              })
	              .on('mouseup', function(event){
	                emitEvent('colorpicker-selected-hue');
	              });

	          sliderSaturation
	              .on('click', function(event) {
	                Slider.setSaturation(event, fixedPosition, componentSize);
	                mousemove(event);
	                if (angular.isDefined(attrs.colorpickerCloseOnSelect)) {
	                  hideColorpickerTemplate();
	                }
	              })
	              .on('mousedown', function(event) {
	                Slider.setSaturation(event, fixedPosition, componentSize);
	                bindMouseEvents();
	              })
	              .on('mouseup', function(event){
	                emitEvent('colorpicker-selected-saturation');
	              });

	          if (fixedPosition) {
	            colorpickerTemplate.addClass('colorpicker-fixed-position');
	          }

	          colorpickerTemplate.addClass('colorpicker-position-' + position);
	          if (inline === 'true') {
	            colorpickerTemplate.addClass('colorpicker-inline');
	          }

	          target.append(colorpickerTemplate);

	          if (ngModel) {
	            ngModel.$render = function () {
	              elem.val(ngModel.$viewValue);

	              update();
	            };
	          }

	          elem.on('blur keyup change', function() {
	            update();
	          });

	          elem.on('$destroy', function() {
	            colorpickerTemplate.remove();
	          });

	          function previewColor() {
	            try {
	              colorpickerPreview.css('backgroundColor', pickerColor[thisFormat]());
	            } catch (e) {
	              colorpickerPreview.css('backgroundColor', pickerColor.toHex());
	            }
	            sliderSaturation.css('backgroundColor', pickerColor.toHex(pickerColor.value.h, 1, 1, 1));
	            if (thisFormat === 'rgba') {
	              sliderAlpha.css.backgroundColor = pickerColor.toHex();
	            }
	          }

	          function mousemove(event) {
	            var 
	                left = Slider.getLeftPosition(event),
	                top = Slider.getTopPosition(event),
	                slider = Slider.getSlider();

	            Slider.setKnob(top, left);

	            if (slider.callLeft) {
	              pickerColor[slider.callLeft].call(pickerColor, left / componentSize);
	            }
	            if (slider.callTop) {
	              pickerColor[slider.callTop].call(pickerColor, top / componentSize);
	            }
	            previewColor();
	            var newColor = pickerColor[thisFormat]();
	            elem.val(newColor);
	            if (ngModel) {
	              $scope.$apply(ngModel.$setViewValue(newColor));
	            }
	            if (withInput) {
	              pickerColorInput.val(newColor);
	            }
	            return false;
	          }

	          function mouseup() {
	            emitEvent('colorpicker-selected');
	            $document.off('mousemove', mousemove);
	            $document.off('mouseup', mouseup);
	          }

	          function update(omitInnerInput) {
	            pickerColor.setColor(elem.val());
	            if (withInput && !omitInnerInput) {
	              pickerColorInput.val(elem.val());
	            }
	            pickerColorPointers.eq(0).css({
	              left: pickerColor.value.s * componentSize + 'px',
	              top: componentSize - pickerColor.value.b * componentSize + 'px'
	            });
	            pickerColorPointers.eq(1).css('top', componentSize * (1 - pickerColor.value.h) + 'px');
	            pickerColorPointers.eq(2).css('top', componentSize * (1 - pickerColor.value.a) + 'px');
	            previewColor();
	          }

	          function getColorpickerTemplatePosition() {
	            var
	                positionValue,
	                positionOffset = Helper.getOffset(elem[0]);

	            if(angular.isDefined(attrs.colorpickerParent)) {
	              positionOffset.left = 0;
	              positionOffset.top = 0;
	            }

	            if (position === 'top') {
	              positionValue =  {
	                'top': positionOffset.top - 147,
	                'left': positionOffset.left
	              };
	            } else if (position === 'right') {
	              positionValue = {
	                'top': positionOffset.top,
	                'left': positionOffset.left + 126
	              };
	            } else if (position === 'bottom') {
	              positionValue = {
	                'top': positionOffset.top + elem[0].offsetHeight + 2,
	                'left': positionOffset.left
	              };
	            } else if (position === 'left') {
	              positionValue = {
	                'top': positionOffset.top,
	                'left': positionOffset.left - 150
	              };
	            }
	            return {
	              'top': positionValue.top + 'px',
	              'left': positionValue.left + 'px'
	            };
	          }

	          function documentMousedownHandler() {
	            hideColorpickerTemplate();
	          }

	          function showColorpickerTemplate() {

	            if (!colorpickerTemplate.hasClass('colorpicker-visible')) {
	              update();
	              colorpickerTemplate
	                .addClass('colorpicker-visible')
	                .css(getColorpickerTemplatePosition());
	              emitEvent('colorpicker-shown');

	              if (inline === false) {
	                // register global mousedown event to hide the colorpicker
	                $document.on('mousedown', documentMousedownHandler);
	              }

	              if (attrs.colorpickerIsOpen) {
	                $scope[attrs.colorpickerIsOpen] = true;
	                if (!$scope.$$phase) {
	                  $scope.$digest(); //trigger the watcher to fire
	                }
	              }
	            }
	          }

	          if (inline === false) {
	            elem.on('click', showColorpickerTemplate);
	          } else {
	            showColorpickerTemplate();
	          }

	          colorpickerTemplate.on('mousedown', function (event) {
	            event.stopPropagation();
	            event.preventDefault();
	          });

	          function emitEvent(name) {
	            if (ngModel) {
	              $scope.$emit(name, {
	                name: attrs.ngModel,
	                value: ngModel.$modelValue
	              });
	            }
	          }

	          function hideColorpickerTemplate() {
	            if (colorpickerTemplate.hasClass('colorpicker-visible')) {
	              colorpickerTemplate.removeClass('colorpicker-visible');
	              emitEvent('colorpicker-closed');
	              // unregister the global mousedown event
	              $document.off('mousedown', documentMousedownHandler);

	              if (attrs.colorpickerIsOpen) {
	                $scope[attrs.colorpickerIsOpen] = false;
	                if (!$scope.$$phase) {
	                  $scope.$digest(); //trigger the watcher to fire
	                }
	              }
	            }
	          }

	          colorpickerTemplate.find('button').on('click', function () {
	            hideColorpickerTemplate();
	          });

	          if (attrs.colorpickerIsOpen) {
	            $scope.$watch(attrs.colorpickerIsOpen, function(shouldBeOpen) {

	              if (shouldBeOpen === true) {
	                showColorpickerTemplate();
	              } else if (shouldBeOpen === false) {
	                hideColorpickerTemplate();
	              }

	            });
	          }
	        }
	      };
	    }]);


/***/ }
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgODU0MTFkMGFlOTJkZGY4Mzk0YTciLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LmpzIiwid2VicGFjazovLy8uL34vYW5ndWxhci1ib290c3RyYXAtY29sb3JwaWNrZXIvanMvYm9vdHN0cmFwLWNvbG9ycGlja2VyLW1vZHVsZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsdUJBQWU7QUFDZjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7OztBQ3RDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBTztBQUNQO0FBQ0E7QUFDQSxRQUFPO0FBQ1A7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUNBQXNDO0FBQ3RDLE1BQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtDQUFpQyxvQkFBb0I7QUFDckQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7QUFDTCxJQUFHLEU7Ozs7OztBQ2hESDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxnQ0FBK0IsSUFBSSxZQUFZLElBQUksWUFBWSxJQUFJO0FBQ25FO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFXO0FBQ1g7QUFDQSxnQ0FBK0IsRUFBRSxjQUFjLEVBQUUsY0FBYyxFQUFFO0FBQ2pFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBVztBQUNYO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0EsVUFBUzs7QUFFVDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBQWtCO0FBQ2xCLFVBQVM7O0FBRVQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVM7O0FBRVQ7QUFDQTtBQUNBLFVBQVM7O0FBRVQ7QUFDQTtBQUNBLFVBQVM7O0FBRVQ7QUFDQTtBQUNBLFVBQVM7O0FBRVQ7QUFDQTtBQUNBLFVBQVM7O0FBRVQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVM7O0FBRVQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFXO0FBQ1g7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFHQUFvRztBQUNwRztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBVztBQUNYOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdCQUFlO0FBQ2Y7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQSxrQkFBaUI7QUFDakI7QUFDQTtBQUNBLGtCQUFpQjtBQUNqQjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdCQUFlO0FBQ2Y7QUFDQTtBQUNBO0FBQ0EsZ0JBQWU7QUFDZjtBQUNBO0FBQ0EsZ0JBQWU7O0FBRWY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQkFBZTtBQUNmO0FBQ0E7QUFDQTtBQUNBLGdCQUFlO0FBQ2Y7QUFDQTtBQUNBLGdCQUFlOztBQUVmO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxZQUFXOztBQUVYO0FBQ0E7QUFDQSxZQUFXOztBQUVYO0FBQ0E7QUFDQTtBQUNBLGNBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxvQ0FBbUM7QUFDbkM7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFlBQVc7QUFDWDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFlBQVc7O0FBRVg7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdCQUFlO0FBQ2Y7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0Esb0NBQW1DO0FBQ25DO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxZQUFXOztBQUVYO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGdCQUFlO0FBQ2Y7QUFDQTs7QUFFQSxjQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0EsTUFBSyIsImZpbGUiOiJtaS1hbmd1bGFyLWNvbG9yLXBpY2tlci5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKVxuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuXG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRleHBvcnRzOiB7fSxcbiBcdFx0XHRpZDogbW9kdWxlSWQsXG4gXHRcdFx0bG9hZGVkOiBmYWxzZVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sb2FkZWQgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKDApO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogd2VicGFjay9ib290c3RyYXAgODU0MTFkMGFlOTJkZGY4Mzk0YTdcbiAqKi8iLCIndXNlIHN0cmljdCc7XG4vKipcbiAqIEBuZ0luamVjdFxuICovXG5cbnJlcXVpcmUoJ2FuZ3VsYXItYm9vdHN0cmFwLWNvbG9ycGlja2VyJyk7XG52YXIgTW9kdWxlTmFtZSA9ICdtaS5Db2xvclBpY2tlcicsXG4gICAgcmVxdWlyZXMgPSBbJ2NvbG9ycGlja2VyLm1vZHVsZSddO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGFuZ3VsYXIubW9kdWxlKE1vZHVsZU5hbWUsIHJlcXVpcmVzKVxuICAucnVuKGZ1bmN0aW9uIChmb3JtbHlDb25maWcpIHtcbiAgICB2YXIgbmdNb2RlbEF0dHJzID0ge307XG4gICAgZnVuY3Rpb24gY2FtZWxpemUoc3RyaW5nKSB7XG4gICAgICBzdHJpbmcgPSBzdHJpbmcucmVwbGFjZSgvW1xcLV9cXHNdKyguKT8vZywgZnVuY3Rpb24gKG1hdGNoLCBjaHIpIHtcbiAgICAgICAgcmV0dXJuIGNociA/IGNoci50b1VwcGVyQ2FzZSgpIDogJyc7XG4gICAgICB9KTtcbiAgICAgIHJldHVybiBzdHJpbmcucmVwbGFjZSgvXihbQS1aXSkvLCBmdW5jdGlvbiAobWF0Y2gsIGNocikge1xuICAgICAgICByZXR1cm4gY2hyID8gY2hyLnRvTG93ZXJDYXNlKCkgOiAnJztcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIG5nTW9kZWxBdHRycyA9IHt9O1xuICAgIC8vIGF0dHJpYnV0ZXNcbiAgICBhbmd1bGFyLmZvckVhY2goW1xuICAgICAgJ2NvbG9yLXBpY2tlci1mb3JtYXQnLFxuICAgICAgJ2NvbG9yLXBpY2tlci1hbHBoYScsXG4gICAgICAnY29sb3ItcGlja2VyLXN3YXRjaCcsXG4gICAgICAnY29sb3ItcGlja2VyLXN3YXRjaC1wb3MnLFxuICAgICAgJ2NvbG9yLXBpY2tlci1zd2F0Y2gtYm9vdHN0cmFwJyxcbiAgICAgICdjb2xvci1waWNrZXItc3dhdGNoLW9ubHknLFxuICAgICAgJ2NvbG9yLXBpY2tlci1wb3MnLFxuICAgICAgJ2NvbG9yLXBpY2tlci1jYXNlJ1xuICAgIF0sIGZ1bmN0aW9uIChhdHRyKSB7XG4gICAgICBuZ01vZGVsQXR0cnNbY2FtZWxpemUoYXR0cildID0ge2F0dHJpYnV0ZTogYXR0cn07XG4gICAgfSk7XG5cbiAgICBmb3JtbHlDb25maWcuc2V0VHlwZSh7XG4gICAgICBuYW1lOiAnY29sb3JwaWNrZXInLFxuICAgICAgdGVtcGxhdGU6ICc8ZGl2IGNsYXNzPVwiaW5wdXQtZ3JvdXBcIiBjb2xvcnBpY2tlciBjb2xvcnBpY2tlci1wb3NpdGlvbj1cInRvcFwiIG5nLW1vZGVsPVwibW9kZWxbb3B0aW9ucy5rZXldXCI+JyArXG4gICAgICAnPGlucHV0IHR5cGU9XCJ0ZXh0XCIgIGNsYXNzPVwiZm9ybS1jb250cm9sXCIgYXJpYS1kZXNjcmliZWRieT1cImJhc2ljLWFkZG9uMlwiIG5nLW1vZGVsPVwibW9kZWxbb3B0aW9ucy5rZXldXCI+JyArXG4gICAgICAnPHNwYW4gY2xhc3M9XCJpbnB1dC1ncm91cC1hZGRvbiBtaS1jb2xvci1waWNrZXJcIiAgJyArXG4gICAgICAnc3R5bGU9XCJiYWNrZ3JvdW5kLWNvbG9yOnt7bW9kZWxbb3B0aW9ucy5rZXldfX1cIiBpZD1cImJhc2ljLWFkZG9uMlwiPjwvc3Bhbj4nICtcbiAgICAgICc8L2Rpdj4nLFxuICAgICAgd3JhcHBlcjogWydib290c3RyYXBMYWJlbCcsICdib290c3RyYXBIYXNFcnJvciddLFxuICAgICAgZGVmYXVsdE9wdGlvbnM6IHtcbiAgICAgICAgbmdNb2RlbEF0dHJzOiBuZ01vZGVsQXR0cnNcbiAgICAgIH1cbiAgICB9KTtcbiAgfSk7XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NyYy9pbmRleC5qc1xuICoqIG1vZHVsZSBpZCA9IDBcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsImFuZ3VsYXIubW9kdWxlKCdjb2xvcnBpY2tlci5tb2R1bGUnLCBbXSlcclxuICAgIC5mYWN0b3J5KCdIZWxwZXInLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICd1c2Ugc3RyaWN0JztcclxuICAgICAgcmV0dXJuIHtcclxuICAgICAgICBjbG9zZXN0U2xpZGVyOiBmdW5jdGlvbiAoZWxlbSkge1xyXG4gICAgICAgICAgdmFyIG1hdGNoZXNTZWxlY3RvciA9IGVsZW0ubWF0Y2hlcyB8fCBlbGVtLndlYmtpdE1hdGNoZXNTZWxlY3RvciB8fCBlbGVtLm1vek1hdGNoZXNTZWxlY3RvciB8fCBlbGVtLm1zTWF0Y2hlc1NlbGVjdG9yO1xyXG4gICAgICAgICAgaWYgKG1hdGNoZXNTZWxlY3Rvci5iaW5kKGVsZW0pKCdJJykpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGVsZW0ucGFyZW50Tm9kZTtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIHJldHVybiBlbGVtO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZ2V0T2Zmc2V0OiBmdW5jdGlvbiAoZWxlbSwgZml4ZWRQb3NpdGlvbikge1xyXG4gICAgICAgICAgdmFyXHJcbiAgICAgICAgICAgIHNjcm9sbFggPSAwLFxyXG4gICAgICAgICAgICBzY3JvbGxZID0gMCxcclxuICAgICAgICAgICAgcmVjdCA9IGVsZW0uZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XHJcbiAgICAgICAgICB3aGlsZSAoZWxlbSAmJiAhaXNOYU4oZWxlbS5vZmZzZXRMZWZ0KSAmJiAhaXNOYU4oZWxlbS5vZmZzZXRUb3ApKSB7XHJcbiAgICAgICAgICAgIGlmICghZml4ZWRQb3NpdGlvbiAmJiBlbGVtLnRhZ05hbWUgPT09ICdCT0RZJykge1xyXG4gICAgICAgICAgICAgIHNjcm9sbFggKz0gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnNjcm9sbExlZnQgfHwgZWxlbS5zY3JvbGxMZWZ0O1xyXG4gICAgICAgICAgICAgIHNjcm9sbFkgKz0gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnNjcm9sbFRvcCB8fCBlbGVtLnNjcm9sbFRvcDtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICBzY3JvbGxYICs9IGVsZW0uc2Nyb2xsTGVmdDtcclxuICAgICAgICAgICAgICBzY3JvbGxZICs9IGVsZW0uc2Nyb2xsVG9wO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsZW0gPSBlbGVtLm9mZnNldFBhcmVudDtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIHRvcDogcmVjdC50b3AgKyB3aW5kb3cucGFnZVlPZmZzZXQsXHJcbiAgICAgICAgICAgIGxlZnQ6IHJlY3QubGVmdCArIHdpbmRvdy5wYWdlWE9mZnNldCxcclxuICAgICAgICAgICAgc2Nyb2xsWDogc2Nyb2xsWCxcclxuICAgICAgICAgICAgc2Nyb2xsWTogc2Nyb2xsWVxyXG4gICAgICAgICAgfTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIC8vIGEgc2V0IG9mIFJFJ3MgdGhhdCBjYW4gbWF0Y2ggc3RyaW5ncyBhbmQgZ2VuZXJhdGUgY29sb3IgdHVwbGVzLiBodHRwczovL2dpdGh1Yi5jb20vanF1ZXJ5L2pxdWVyeS1jb2xvci9cclxuICAgICAgICBzdHJpbmdQYXJzZXJzOiBbXHJcbiAgICAgICAgICB7XHJcbiAgICAgICAgICAgIHJlOiAvcmdiYT9cXChcXHMqKFxcZHsxLDN9KVxccyosXFxzKihcXGR7MSwzfSlcXHMqLFxccyooXFxkezEsM30pXFxzKig/OixcXHMqKFxcZCsoPzpcXC5cXGQrKT8pXFxzKik/XFwpLyxcclxuICAgICAgICAgICAgcGFyc2U6IGZ1bmN0aW9uIChleGVjUmVzdWx0KSB7XHJcbiAgICAgICAgICAgICAgcmV0dXJuIFtcclxuICAgICAgICAgICAgICAgIGV4ZWNSZXN1bHRbMV0sXHJcbiAgICAgICAgICAgICAgICBleGVjUmVzdWx0WzJdLFxyXG4gICAgICAgICAgICAgICAgZXhlY1Jlc3VsdFszXSxcclxuICAgICAgICAgICAgICAgIGV4ZWNSZXN1bHRbNF1cclxuICAgICAgICAgICAgICBdO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAge1xyXG4gICAgICAgICAgICByZTogL3JnYmE/XFwoXFxzKihcXGQrKD86XFwuXFxkKyk/KVxcJVxccyosXFxzKihcXGQrKD86XFwuXFxkKyk/KVxcJVxccyosXFxzKihcXGQrKD86XFwuXFxkKyk/KVxcJVxccyooPzosXFxzKihcXGQrKD86XFwuXFxkKyk/KVxccyopP1xcKS8sXHJcbiAgICAgICAgICAgIHBhcnNlOiBmdW5jdGlvbiAoZXhlY1Jlc3VsdCkge1xyXG4gICAgICAgICAgICAgIHJldHVybiBbXHJcbiAgICAgICAgICAgICAgICAyLjU1ICogZXhlY1Jlc3VsdFsxXSxcclxuICAgICAgICAgICAgICAgIDIuNTUgKiBleGVjUmVzdWx0WzJdLFxyXG4gICAgICAgICAgICAgICAgMi41NSAqIGV4ZWNSZXN1bHRbM10sXHJcbiAgICAgICAgICAgICAgICBleGVjUmVzdWx0WzRdXHJcbiAgICAgICAgICAgICAgXTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIHtcclxuICAgICAgICAgICAgcmU6IC8jKFthLWZBLUYwLTldezJ9KShbYS1mQS1GMC05XXsyfSkoW2EtZkEtRjAtOV17Mn0pLyxcclxuICAgICAgICAgICAgcGFyc2U6IGZ1bmN0aW9uIChleGVjUmVzdWx0KSB7XHJcbiAgICAgICAgICAgICAgcmV0dXJuIFtcclxuICAgICAgICAgICAgICAgIHBhcnNlSW50KGV4ZWNSZXN1bHRbMV0sIDE2KSxcclxuICAgICAgICAgICAgICAgIHBhcnNlSW50KGV4ZWNSZXN1bHRbMl0sIDE2KSxcclxuICAgICAgICAgICAgICAgIHBhcnNlSW50KGV4ZWNSZXN1bHRbM10sIDE2KVxyXG4gICAgICAgICAgICAgIF07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICB7XHJcbiAgICAgICAgICAgIHJlOiAvIyhbYS1mQS1GMC05XSkoW2EtZkEtRjAtOV0pKFthLWZBLUYwLTldKS8sXHJcbiAgICAgICAgICAgIHBhcnNlOiBmdW5jdGlvbiAoZXhlY1Jlc3VsdCkge1xyXG4gICAgICAgICAgICAgIHJldHVybiBbXHJcbiAgICAgICAgICAgICAgICBwYXJzZUludChleGVjUmVzdWx0WzFdICsgZXhlY1Jlc3VsdFsxXSwgMTYpLFxyXG4gICAgICAgICAgICAgICAgcGFyc2VJbnQoZXhlY1Jlc3VsdFsyXSArIGV4ZWNSZXN1bHRbMl0sIDE2KSxcclxuICAgICAgICAgICAgICAgIHBhcnNlSW50KGV4ZWNSZXN1bHRbM10gKyBleGVjUmVzdWx0WzNdLCAxNilcclxuICAgICAgICAgICAgICBdO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgXVxyXG4gICAgICB9O1xyXG4gICAgfSlcclxuICAgIC5mYWN0b3J5KCdDb2xvcicsIFsnSGVscGVyJywgZnVuY3Rpb24gKEhlbHBlcikge1xyXG4gICAgICAndXNlIHN0cmljdCc7XHJcbiAgICAgIHJldHVybiB7XHJcbiAgICAgICAgdmFsdWU6IHtcclxuICAgICAgICAgIGg6IDEsXHJcbiAgICAgICAgICBzOiAxLFxyXG4gICAgICAgICAgYjogMSxcclxuICAgICAgICAgIGE6IDFcclxuICAgICAgICB9LFxyXG4gICAgICAgIC8vIHRyYW5zbGF0ZSBhIGZvcm1hdCBmcm9tIENvbG9yIG9iamVjdCB0byBhIHN0cmluZ1xyXG4gICAgICAgICdyZ2InOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICB2YXIgcmdiID0gdGhpcy50b1JHQigpO1xyXG4gICAgICAgICAgcmV0dXJuICdyZ2IoJyArIHJnYi5yICsgJywnICsgcmdiLmcgKyAnLCcgKyByZ2IuYiArICcpJztcclxuICAgICAgICB9LFxyXG4gICAgICAgICdyZ2JhJzogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgdmFyIHJnYiA9IHRoaXMudG9SR0IoKTtcclxuICAgICAgICAgIHJldHVybiAncmdiYSgnICsgcmdiLnIgKyAnLCcgKyByZ2IuZyArICcsJyArIHJnYi5iICsgJywnICsgcmdiLmEgKyAnKSc7XHJcbiAgICAgICAgfSxcclxuICAgICAgICAnaGV4JzogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgcmV0dXJuICB0aGlzLnRvSGV4KCk7XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgLy8gSFNCdG9SR0IgZnJvbSBSYXBoYWVsSlNcclxuICAgICAgICBSR0J0b0hTQjogZnVuY3Rpb24gKHIsIGcsIGIsIGEpIHtcclxuICAgICAgICAgIHIgLz0gMjU1O1xyXG4gICAgICAgICAgZyAvPSAyNTU7XHJcbiAgICAgICAgICBiIC89IDI1NTtcclxuXHJcbiAgICAgICAgICB2YXIgSCwgUywgViwgQztcclxuICAgICAgICAgIFYgPSBNYXRoLm1heChyLCBnLCBiKTtcclxuICAgICAgICAgIEMgPSBWIC0gTWF0aC5taW4ociwgZywgYik7XHJcbiAgICAgICAgICBIID0gKEMgPT09IDAgPyBudWxsIDpcclxuICAgICAgICAgICAgICBWID09PSByID8gKGcgLSBiKSAvIEMgOlxyXG4gICAgICAgICAgICAgICAgICBWID09PSBnID8gKGIgLSByKSAvIEMgKyAyIDpcclxuICAgICAgICAgICAgICAgICAgICAgIChyIC0gZykgLyBDICsgNFxyXG4gICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICBIID0gKChIICsgMzYwKSAlIDYpICogNjAgLyAzNjA7XHJcbiAgICAgICAgICBTID0gQyA9PT0gMCA/IDAgOiBDIC8gVjtcclxuICAgICAgICAgIHJldHVybiB7aDogSCB8fCAxLCBzOiBTLCBiOiBWLCBhOiBhIHx8IDF9O1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIC8vcGFyc2UgYSBzdHJpbmcgdG8gSFNCXHJcbiAgICAgICAgc2V0Q29sb3I6IGZ1bmN0aW9uICh2YWwpIHtcclxuICAgICAgICAgIHZhbCA9ICh2YWwpID8gdmFsLnRvTG93ZXJDYXNlKCkgOiB2YWw7XHJcbiAgICAgICAgICBmb3IgKHZhciBrZXkgaW4gSGVscGVyLnN0cmluZ1BhcnNlcnMpIHtcclxuICAgICAgICAgICAgaWYgKEhlbHBlci5zdHJpbmdQYXJzZXJzLmhhc093blByb3BlcnR5KGtleSkpIHtcclxuICAgICAgICAgICAgICB2YXIgcGFyc2VyID0gSGVscGVyLnN0cmluZ1BhcnNlcnNba2V5XTtcclxuICAgICAgICAgICAgICB2YXIgbWF0Y2ggPSBwYXJzZXIucmUuZXhlYyh2YWwpLFxyXG4gICAgICAgICAgICAgICAgICB2YWx1ZXMgPSBtYXRjaCAmJiBwYXJzZXIucGFyc2UobWF0Y2gpO1xyXG4gICAgICAgICAgICAgIGlmICh2YWx1ZXMpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMudmFsdWUgPSB0aGlzLlJHQnRvSFNCLmFwcGx5KG51bGwsIHZhbHVlcyk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgc2V0SHVlOiBmdW5jdGlvbiAoaCkge1xyXG4gICAgICAgICAgdGhpcy52YWx1ZS5oID0gMSAtIGg7XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgc2V0U2F0dXJhdGlvbjogZnVuY3Rpb24gKHMpIHtcclxuICAgICAgICAgIHRoaXMudmFsdWUucyA9IHM7XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgc2V0TGlnaHRuZXNzOiBmdW5jdGlvbiAoYikge1xyXG4gICAgICAgICAgdGhpcy52YWx1ZS5iID0gMSAtIGI7XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgc2V0QWxwaGE6IGZ1bmN0aW9uIChhKSB7XHJcbiAgICAgICAgICB0aGlzLnZhbHVlLmEgPSBwYXJzZUludCgoMSAtIGEpICogMTAwLCAxMCkgLyAxMDA7XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgLy8gSFNCdG9SR0IgZnJvbSBSYXBoYWVsSlNcclxuICAgICAgICAvLyBodHRwczovL2dpdGh1Yi5jb20vRG1pdHJ5QmFyYW5vdnNraXkvcmFwaGFlbC9cclxuICAgICAgICB0b1JHQjogZnVuY3Rpb24gKGgsIHMsIGIsIGEpIHtcclxuICAgICAgICAgIGlmICghaCkge1xyXG4gICAgICAgICAgICBoID0gdGhpcy52YWx1ZS5oO1xyXG4gICAgICAgICAgICBzID0gdGhpcy52YWx1ZS5zO1xyXG4gICAgICAgICAgICBiID0gdGhpcy52YWx1ZS5iO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgaCAqPSAzNjA7XHJcbiAgICAgICAgICB2YXIgUiwgRywgQiwgWCwgQztcclxuICAgICAgICAgIGggPSAoaCAlIDM2MCkgLyA2MDtcclxuICAgICAgICAgIEMgPSBiICogcztcclxuICAgICAgICAgIFggPSBDICogKDEgLSBNYXRoLmFicyhoICUgMiAtIDEpKTtcclxuICAgICAgICAgIFIgPSBHID0gQiA9IGIgLSBDO1xyXG5cclxuICAgICAgICAgIGggPSB+fmg7XHJcbiAgICAgICAgICBSICs9IFtDLCBYLCAwLCAwLCBYLCBDXVtoXTtcclxuICAgICAgICAgIEcgKz0gW1gsIEMsIEMsIFgsIDAsIDBdW2hdO1xyXG4gICAgICAgICAgQiArPSBbMCwgMCwgWCwgQywgQywgWF1baF07XHJcbiAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICByOiBNYXRoLnJvdW5kKFIgKiAyNTUpLFxyXG4gICAgICAgICAgICBnOiBNYXRoLnJvdW5kKEcgKiAyNTUpLFxyXG4gICAgICAgICAgICBiOiBNYXRoLnJvdW5kKEIgKiAyNTUpLFxyXG4gICAgICAgICAgICBhOiBhIHx8IHRoaXMudmFsdWUuYVxyXG4gICAgICAgICAgfTtcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICB0b0hleDogZnVuY3Rpb24gKGgsIHMsIGIsIGEpIHtcclxuICAgICAgICAgIHZhciByZ2IgPSB0aGlzLnRvUkdCKGgsIHMsIGIsIGEpO1xyXG4gICAgICAgICAgcmV0dXJuICcjJyArICgoMSA8PCAyNCkgfCAocGFyc2VJbnQocmdiLnIsIDEwKSA8PCAxNikgfCAocGFyc2VJbnQocmdiLmcsIDEwKSA8PCA4KSB8IHBhcnNlSW50KHJnYi5iLCAxMCkpLnRvU3RyaW5nKDE2KS5zdWJzdHIoMSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9O1xyXG4gICAgfV0pXHJcbiAgICAuZmFjdG9yeSgnU2xpZGVyJywgWydIZWxwZXInLCBmdW5jdGlvbiAoSGVscGVyKSB7XHJcbiAgICAgICd1c2Ugc3RyaWN0JztcclxuICAgICAgdmFyXHJcbiAgICAgICAgICBzbGlkZXIgPSB7XHJcbiAgICAgICAgICAgIG1heExlZnQ6IDAsXHJcbiAgICAgICAgICAgIG1heFRvcDogMCxcclxuICAgICAgICAgICAgY2FsbExlZnQ6IG51bGwsXHJcbiAgICAgICAgICAgIGNhbGxUb3A6IG51bGwsXHJcbiAgICAgICAgICAgIGtub2I6IHtcclxuICAgICAgICAgICAgICB0b3A6IDAsXHJcbiAgICAgICAgICAgICAgbGVmdDogMFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAgcG9pbnRlciA9IHt9O1xyXG5cclxuICAgICAgcmV0dXJuIHtcclxuICAgICAgICBnZXRTbGlkZXI6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgcmV0dXJuIHNsaWRlcjtcclxuICAgICAgICB9LFxyXG4gICAgICAgIGdldExlZnRQb3NpdGlvbjogZnVuY3Rpb24oZXZlbnQpIHtcclxuICAgICAgICAgIHJldHVybiBNYXRoLm1heCgwLCBNYXRoLm1pbihzbGlkZXIubWF4TGVmdCwgc2xpZGVyLmxlZnQgKyAoKGV2ZW50LnBhZ2VYIHx8IHBvaW50ZXIubGVmdCkgLSBwb2ludGVyLmxlZnQpKSk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBnZXRUb3BQb3NpdGlvbjogZnVuY3Rpb24oZXZlbnQpIHtcclxuICAgICAgICAgIHJldHVybiBNYXRoLm1heCgwLCBNYXRoLm1pbihzbGlkZXIubWF4VG9wLCBzbGlkZXIudG9wICsgKChldmVudC5wYWdlWSB8fCBwb2ludGVyLnRvcCkgLSBwb2ludGVyLnRvcCkpKTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIHNldFNsaWRlcjogZnVuY3Rpb24gKGV2ZW50LCBmaXhlZFBvc2l0aW9uKSB7XHJcbiAgICAgICAgICB2YXJcclxuICAgICAgICAgICAgdGFyZ2V0ID0gSGVscGVyLmNsb3Nlc3RTbGlkZXIoZXZlbnQudGFyZ2V0KSxcclxuICAgICAgICAgICAgdGFyZ2V0T2Zmc2V0ID0gSGVscGVyLmdldE9mZnNldCh0YXJnZXQsIGZpeGVkUG9zaXRpb24pLFxyXG4gICAgICAgICAgICByZWN0ID0gdGFyZ2V0LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLFxyXG4gICAgICAgICAgICBvZmZzZXRYID0gZXZlbnQuY2xpZW50WCAtIHJlY3QubGVmdCxcclxuICAgICAgICAgICAgb2Zmc2V0WSA9IGV2ZW50LmNsaWVudFkgLSByZWN0LnRvcDtcclxuXHJcbiAgICAgICAgICBzbGlkZXIua25vYiA9IHRhcmdldC5jaGlsZHJlblswXS5zdHlsZTtcclxuICAgICAgICAgIHNsaWRlci5sZWZ0ID0gZXZlbnQucGFnZVggLSB0YXJnZXRPZmZzZXQubGVmdCAtIHdpbmRvdy5wYWdlWE9mZnNldCArIHRhcmdldE9mZnNldC5zY3JvbGxYO1xyXG4gICAgICAgICAgc2xpZGVyLnRvcCA9IGV2ZW50LnBhZ2VZIC0gdGFyZ2V0T2Zmc2V0LnRvcCAtIHdpbmRvdy5wYWdlWU9mZnNldCArIHRhcmdldE9mZnNldC5zY3JvbGxZO1xyXG5cclxuICAgICAgICAgIHBvaW50ZXIgPSB7XHJcbiAgICAgICAgICAgIGxlZnQ6IGV2ZW50LnBhZ2VYIC0gKG9mZnNldFggLSBzbGlkZXIubGVmdCksXHJcbiAgICAgICAgICAgIHRvcDogZXZlbnQucGFnZVkgLSAob2Zmc2V0WSAtIHNsaWRlci50b3ApXHJcbiAgICAgICAgICB9O1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgc2V0U2F0dXJhdGlvbjogZnVuY3Rpb24oZXZlbnQsIGZpeGVkUG9zaXRpb24sIGNvbXBvbmVudFNpemUpIHtcclxuICAgICAgICAgIHNsaWRlciA9IHtcclxuICAgICAgICAgICAgbWF4TGVmdDogY29tcG9uZW50U2l6ZSxcclxuICAgICAgICAgICAgbWF4VG9wOiBjb21wb25lbnRTaXplLFxyXG4gICAgICAgICAgICBjYWxsTGVmdDogJ3NldFNhdHVyYXRpb24nLFxyXG4gICAgICAgICAgICBjYWxsVG9wOiAnc2V0TGlnaHRuZXNzJ1xyXG4gICAgICAgICAgfTtcclxuICAgICAgICAgIHRoaXMuc2V0U2xpZGVyKGV2ZW50LCBmaXhlZFBvc2l0aW9uKTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIHNldEh1ZTogZnVuY3Rpb24oZXZlbnQsIGZpeGVkUG9zaXRpb24sIGNvbXBvbmVudFNpemUpIHtcclxuICAgICAgICAgIHNsaWRlciA9IHtcclxuICAgICAgICAgICAgbWF4TGVmdDogMCxcclxuICAgICAgICAgICAgbWF4VG9wOiBjb21wb25lbnRTaXplLFxyXG4gICAgICAgICAgICBjYWxsTGVmdDogZmFsc2UsXHJcbiAgICAgICAgICAgIGNhbGxUb3A6ICdzZXRIdWUnXHJcbiAgICAgICAgICB9O1xyXG4gICAgICAgICAgdGhpcy5zZXRTbGlkZXIoZXZlbnQsIGZpeGVkUG9zaXRpb24pO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgc2V0QWxwaGE6IGZ1bmN0aW9uKGV2ZW50LCBmaXhlZFBvc2l0aW9uLCBjb21wb25lbnRTaXplKSB7XHJcbiAgICAgICAgICBzbGlkZXIgPSB7XHJcbiAgICAgICAgICAgIG1heExlZnQ6IDAsXHJcbiAgICAgICAgICAgIG1heFRvcDogY29tcG9uZW50U2l6ZSxcclxuICAgICAgICAgICAgY2FsbExlZnQ6IGZhbHNlLFxyXG4gICAgICAgICAgICBjYWxsVG9wOiAnc2V0QWxwaGEnXHJcbiAgICAgICAgICB9O1xyXG4gICAgICAgICAgdGhpcy5zZXRTbGlkZXIoZXZlbnQsIGZpeGVkUG9zaXRpb24pO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgc2V0S25vYjogZnVuY3Rpb24odG9wLCBsZWZ0KSB7XHJcbiAgICAgICAgICBzbGlkZXIua25vYi50b3AgPSB0b3AgKyAncHgnO1xyXG4gICAgICAgICAgc2xpZGVyLmtub2IubGVmdCA9IGxlZnQgKyAncHgnO1xyXG4gICAgICAgIH1cclxuICAgICAgfTtcclxuICAgIH1dKVxyXG4gICAgLmRpcmVjdGl2ZSgnY29sb3JwaWNrZXInLCBbJyRkb2N1bWVudCcsICckY29tcGlsZScsICdDb2xvcicsICdTbGlkZXInLCAnSGVscGVyJywgZnVuY3Rpb24gKCRkb2N1bWVudCwgJGNvbXBpbGUsIENvbG9yLCBTbGlkZXIsIEhlbHBlcikge1xyXG4gICAgICAndXNlIHN0cmljdCc7XHJcbiAgICAgIHJldHVybiB7XHJcbiAgICAgICAgcmVxdWlyZTogJz9uZ01vZGVsJyxcclxuICAgICAgICByZXN0cmljdDogJ0EnLFxyXG4gICAgICAgIGxpbms6IGZ1bmN0aW9uICgkc2NvcGUsIGVsZW0sIGF0dHJzLCBuZ01vZGVsKSB7XHJcbiAgICAgICAgICB2YXJcclxuICAgICAgICAgICAgICB0aGlzRm9ybWF0ID0gYXR0cnMuY29sb3JwaWNrZXIgPyBhdHRycy5jb2xvcnBpY2tlciA6ICdoZXgnLFxyXG4gICAgICAgICAgICAgIHBvc2l0aW9uID0gYW5ndWxhci5pc0RlZmluZWQoYXR0cnMuY29sb3JwaWNrZXJQb3NpdGlvbikgPyBhdHRycy5jb2xvcnBpY2tlclBvc2l0aW9uIDogJ2JvdHRvbScsXHJcbiAgICAgICAgICAgICAgaW5saW5lID0gYW5ndWxhci5pc0RlZmluZWQoYXR0cnMuY29sb3JwaWNrZXJJbmxpbmUpID8gYXR0cnMuY29sb3JwaWNrZXJJbmxpbmUgOiBmYWxzZSxcclxuICAgICAgICAgICAgICBmaXhlZFBvc2l0aW9uID0gYW5ndWxhci5pc0RlZmluZWQoYXR0cnMuY29sb3JwaWNrZXJGaXhlZFBvc2l0aW9uKSA/IGF0dHJzLmNvbG9ycGlja2VyRml4ZWRQb3NpdGlvbiA6IGZhbHNlLFxyXG4gICAgICAgICAgICAgIHRhcmdldCA9IGFuZ3VsYXIuaXNEZWZpbmVkKGF0dHJzLmNvbG9ycGlja2VyUGFyZW50KSA/IGVsZW0ucGFyZW50KCkgOiBhbmd1bGFyLmVsZW1lbnQoZG9jdW1lbnQuYm9keSksXHJcbiAgICAgICAgICAgICAgd2l0aElucHV0ID0gYW5ndWxhci5pc0RlZmluZWQoYXR0cnMuY29sb3JwaWNrZXJXaXRoSW5wdXQpID8gYXR0cnMuY29sb3JwaWNrZXJXaXRoSW5wdXQgOiBmYWxzZSxcclxuICAgICAgICAgICAgICBjb21wb25lbnRTaXplID0gYW5ndWxhci5pc0RlZmluZWQoYXR0cnMuY29sb3JwaWNrZXJTaXplKSA/IGF0dHJzLmNvbG9ycGlja2VyU2l6ZSA6IDEwMCxcclxuICAgICAgICAgICAgICBjb21wb25lbnRTaXplUHggPSBjb21wb25lbnRTaXplICsgJ3B4JyxcclxuICAgICAgICAgICAgICBpbnB1dFRlbXBsYXRlID0gd2l0aElucHV0ID8gJzxpbnB1dCB0eXBlPVwidGV4dFwiIG5hbWU9XCJjb2xvcnBpY2tlci1pbnB1dFwiIHNwZWxsY2hlY2s9XCJmYWxzZVwiPicgOiAnJyxcclxuICAgICAgICAgICAgICBjbG9zZUJ1dHRvbiA9ICFpbmxpbmUgPyAnPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJjbG9zZSBjbG9zZS1jb2xvcnBpY2tlclwiPiZ0aW1lczs8L2J1dHRvbj4nIDogJycsXHJcbiAgICAgICAgICAgICAgdGVtcGxhdGUgPVxyXG4gICAgICAgICAgICAgICAgICAnPGRpdiBjbGFzcz1cImNvbG9ycGlja2VyIGRyb3Bkb3duXCI+JyArXHJcbiAgICAgICAgICAgICAgICAgICAgICAnPGRpdiBjbGFzcz1cImRyb3Bkb3duLW1lbnVcIj4nICtcclxuICAgICAgICAgICAgICAgICAgICAgICc8Y29sb3JwaWNrZXItc2F0dXJhdGlvbj48aT48L2k+PC9jb2xvcnBpY2tlci1zYXR1cmF0aW9uPicgK1xyXG4gICAgICAgICAgICAgICAgICAgICAgJzxjb2xvcnBpY2tlci1odWU+PGk+PC9pPjwvY29sb3JwaWNrZXItaHVlPicgK1xyXG4gICAgICAgICAgICAgICAgICAgICAgJzxjb2xvcnBpY2tlci1hbHBoYT48aT48L2k+PC9jb2xvcnBpY2tlci1hbHBoYT4nICtcclxuICAgICAgICAgICAgICAgICAgICAgICc8Y29sb3JwaWNrZXItcHJldmlldz48L2NvbG9ycGlja2VyLXByZXZpZXc+JyArXHJcbiAgICAgICAgICAgICAgICAgICAgICBpbnB1dFRlbXBsYXRlICtcclxuICAgICAgICAgICAgICAgICAgICAgIGNsb3NlQnV0dG9uICtcclxuICAgICAgICAgICAgICAgICAgICAgICc8L2Rpdj4nICtcclxuICAgICAgICAgICAgICAgICAgICAgICc8L2Rpdj4nLFxyXG4gICAgICAgICAgICAgIGNvbG9ycGlja2VyVGVtcGxhdGUgPSBhbmd1bGFyLmVsZW1lbnQodGVtcGxhdGUpLFxyXG4gICAgICAgICAgICAgIHBpY2tlckNvbG9yID0gQ29sb3IsXHJcbiAgICAgICAgICAgICAgY29tcG9uZW50U2l6ZVB4LFxyXG4gICAgICAgICAgICAgIHNsaWRlckFscGhhLFxyXG4gICAgICAgICAgICAgIHNsaWRlckh1ZSA9IGNvbG9ycGlja2VyVGVtcGxhdGUuZmluZCgnY29sb3JwaWNrZXItaHVlJyksXHJcbiAgICAgICAgICAgICAgc2xpZGVyU2F0dXJhdGlvbiA9IGNvbG9ycGlja2VyVGVtcGxhdGUuZmluZCgnY29sb3JwaWNrZXItc2F0dXJhdGlvbicpLFxyXG4gICAgICAgICAgICAgIGNvbG9ycGlja2VyUHJldmlldyA9IGNvbG9ycGlja2VyVGVtcGxhdGUuZmluZCgnY29sb3JwaWNrZXItcHJldmlldycpLFxyXG4gICAgICAgICAgICAgIHBpY2tlckNvbG9yUG9pbnRlcnMgPSBjb2xvcnBpY2tlclRlbXBsYXRlLmZpbmQoJ2knKTtcclxuXHJcbiAgICAgICAgICAkY29tcGlsZShjb2xvcnBpY2tlclRlbXBsYXRlKSgkc2NvcGUpO1xyXG4gICAgICAgICAgY29sb3JwaWNrZXJUZW1wbGF0ZS5jc3MoJ21pbi13aWR0aCcsIHBhcnNlSW50KGNvbXBvbmVudFNpemUpICsgMjkgKyAncHgnKTtcclxuICAgICAgICAgIHNsaWRlclNhdHVyYXRpb24uY3NzKHtcclxuICAgICAgICAgICAgJ3dpZHRoJyA6IGNvbXBvbmVudFNpemVQeCxcclxuICAgICAgICAgICAgJ2hlaWdodCcgOiBjb21wb25lbnRTaXplUHhcclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgc2xpZGVySHVlLmNzcygnaGVpZ2h0JywgY29tcG9uZW50U2l6ZVB4KTtcclxuXHJcbiAgICAgICAgICBpZiAod2l0aElucHV0KSB7XHJcbiAgICAgICAgICAgIHZhciBwaWNrZXJDb2xvcklucHV0ID0gY29sb3JwaWNrZXJUZW1wbGF0ZS5maW5kKCdpbnB1dCcpO1xyXG4gICAgICAgICAgICBwaWNrZXJDb2xvcklucHV0LmNzcygnd2lkdGgnLCBjb21wb25lbnRTaXplUHgpO1xyXG4gICAgICAgICAgICBwaWNrZXJDb2xvcklucHV0XHJcbiAgICAgICAgICAgICAgICAub24oJ21vdXNlZG93bicsIGZ1bmN0aW9uKGV2ZW50KSB7XHJcbiAgICAgICAgICAgICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAub24oJ2tleXVwJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgbmV3Q29sb3IgPSB0aGlzLnZhbHVlO1xyXG4gICAgICAgICAgICAgICAgZWxlbS52YWwobmV3Q29sb3IpO1xyXG4gICAgICAgICAgICAgICAgaWYgKG5nTW9kZWwgJiYgbmdNb2RlbC4kbW9kZWxWYWx1ZSAhPT0gbmV3Q29sb3IpIHtcclxuICAgICAgICAgICAgICAgICAgJHNjb3BlLiRhcHBseShuZ01vZGVsLiRzZXRWaWV3VmFsdWUobmV3Q29sb3IpKTtcclxuICAgICAgICAgICAgICAgICAgdXBkYXRlKHRydWUpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIGZ1bmN0aW9uIGJpbmRNb3VzZUV2ZW50cygpIHtcclxuICAgICAgICAgICAgJGRvY3VtZW50Lm9uKCdtb3VzZW1vdmUnLCBtb3VzZW1vdmUpO1xyXG4gICAgICAgICAgICAkZG9jdW1lbnQub24oJ21vdXNldXAnLCBtb3VzZXVwKTtcclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICBpZiAodGhpc0Zvcm1hdCA9PT0gJ3JnYmEnKSB7XHJcbiAgICAgICAgICAgIGNvbG9ycGlja2VyVGVtcGxhdGUuYWRkQ2xhc3MoJ2FscGhhJyk7XHJcbiAgICAgICAgICAgIHNsaWRlckFscGhhID0gY29sb3JwaWNrZXJUZW1wbGF0ZS5maW5kKCdjb2xvcnBpY2tlci1hbHBoYScpO1xyXG4gICAgICAgICAgICBzbGlkZXJBbHBoYS5jc3MoJ2hlaWdodCcsIGNvbXBvbmVudFNpemVQeCk7XHJcbiAgICAgICAgICAgIHNsaWRlckFscGhhXHJcbiAgICAgICAgICAgICAgICAub24oJ2NsaWNrJywgZnVuY3Rpb24oZXZlbnQpIHtcclxuICAgICAgICAgICAgICAgICAgU2xpZGVyLnNldEFscGhhKGV2ZW50LCBmaXhlZFBvc2l0aW9uLCBjb21wb25lbnRTaXplKTtcclxuICAgICAgICAgICAgICAgICAgbW91c2Vtb3ZlKGV2ZW50KTtcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAub24oJ21vdXNlZG93bicsIGZ1bmN0aW9uKGV2ZW50KSB7XHJcbiAgICAgICAgICAgICAgICAgIFNsaWRlci5zZXRBbHBoYShldmVudCwgZml4ZWRQb3NpdGlvbiwgY29tcG9uZW50U2l6ZSk7XHJcbiAgICAgICAgICAgICAgICAgIGJpbmRNb3VzZUV2ZW50cygpO1xyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5vbignbW91c2V1cCcsIGZ1bmN0aW9uKGV2ZW50KXtcclxuICAgICAgICAgICAgICAgICAgZW1pdEV2ZW50KCdjb2xvcnBpY2tlci1zZWxlY3RlZC1hbHBoYScpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgc2xpZGVySHVlXHJcbiAgICAgICAgICAgICAgLm9uKCdjbGljaycsIGZ1bmN0aW9uKGV2ZW50KSB7XHJcbiAgICAgICAgICAgICAgICBTbGlkZXIuc2V0SHVlKGV2ZW50LCBmaXhlZFBvc2l0aW9uLCBjb21wb25lbnRTaXplKTtcclxuICAgICAgICAgICAgICAgIG1vdXNlbW92ZShldmVudCk7XHJcbiAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAub24oJ21vdXNlZG93bicsIGZ1bmN0aW9uKGV2ZW50KSB7XHJcbiAgICAgICAgICAgICAgICBTbGlkZXIuc2V0SHVlKGV2ZW50LCBmaXhlZFBvc2l0aW9uLCBjb21wb25lbnRTaXplKTtcclxuICAgICAgICAgICAgICAgIGJpbmRNb3VzZUV2ZW50cygpO1xyXG4gICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgLm9uKCdtb3VzZXVwJywgZnVuY3Rpb24oZXZlbnQpe1xyXG4gICAgICAgICAgICAgICAgZW1pdEV2ZW50KCdjb2xvcnBpY2tlci1zZWxlY3RlZC1odWUnKTtcclxuICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICBzbGlkZXJTYXR1cmF0aW9uXHJcbiAgICAgICAgICAgICAgLm9uKCdjbGljaycsIGZ1bmN0aW9uKGV2ZW50KSB7XHJcbiAgICAgICAgICAgICAgICBTbGlkZXIuc2V0U2F0dXJhdGlvbihldmVudCwgZml4ZWRQb3NpdGlvbiwgY29tcG9uZW50U2l6ZSk7XHJcbiAgICAgICAgICAgICAgICBtb3VzZW1vdmUoZXZlbnQpO1xyXG4gICAgICAgICAgICAgICAgaWYgKGFuZ3VsYXIuaXNEZWZpbmVkKGF0dHJzLmNvbG9ycGlja2VyQ2xvc2VPblNlbGVjdCkpIHtcclxuICAgICAgICAgICAgICAgICAgaGlkZUNvbG9ycGlja2VyVGVtcGxhdGUoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgIC5vbignbW91c2Vkb3duJywgZnVuY3Rpb24oZXZlbnQpIHtcclxuICAgICAgICAgICAgICAgIFNsaWRlci5zZXRTYXR1cmF0aW9uKGV2ZW50LCBmaXhlZFBvc2l0aW9uLCBjb21wb25lbnRTaXplKTtcclxuICAgICAgICAgICAgICAgIGJpbmRNb3VzZUV2ZW50cygpO1xyXG4gICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgLm9uKCdtb3VzZXVwJywgZnVuY3Rpb24oZXZlbnQpe1xyXG4gICAgICAgICAgICAgICAgZW1pdEV2ZW50KCdjb2xvcnBpY2tlci1zZWxlY3RlZC1zYXR1cmF0aW9uJyk7XHJcbiAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgaWYgKGZpeGVkUG9zaXRpb24pIHtcclxuICAgICAgICAgICAgY29sb3JwaWNrZXJUZW1wbGF0ZS5hZGRDbGFzcygnY29sb3JwaWNrZXItZml4ZWQtcG9zaXRpb24nKTtcclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICBjb2xvcnBpY2tlclRlbXBsYXRlLmFkZENsYXNzKCdjb2xvcnBpY2tlci1wb3NpdGlvbi0nICsgcG9zaXRpb24pO1xyXG4gICAgICAgICAgaWYgKGlubGluZSA9PT0gJ3RydWUnKSB7XHJcbiAgICAgICAgICAgIGNvbG9ycGlja2VyVGVtcGxhdGUuYWRkQ2xhc3MoJ2NvbG9ycGlja2VyLWlubGluZScpO1xyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIHRhcmdldC5hcHBlbmQoY29sb3JwaWNrZXJUZW1wbGF0ZSk7XHJcblxyXG4gICAgICAgICAgaWYgKG5nTW9kZWwpIHtcclxuICAgICAgICAgICAgbmdNb2RlbC4kcmVuZGVyID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgIGVsZW0udmFsKG5nTW9kZWwuJHZpZXdWYWx1ZSk7XHJcblxyXG4gICAgICAgICAgICAgIHVwZGF0ZSgpO1xyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIGVsZW0ub24oJ2JsdXIga2V5dXAgY2hhbmdlJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHVwZGF0ZSgpO1xyXG4gICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgZWxlbS5vbignJGRlc3Ryb3knLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgY29sb3JwaWNrZXJUZW1wbGF0ZS5yZW1vdmUoKTtcclxuICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgIGZ1bmN0aW9uIHByZXZpZXdDb2xvcigpIHtcclxuICAgICAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgICBjb2xvcnBpY2tlclByZXZpZXcuY3NzKCdiYWNrZ3JvdW5kQ29sb3InLCBwaWNrZXJDb2xvclt0aGlzRm9ybWF0XSgpKTtcclxuICAgICAgICAgICAgfSBjYXRjaCAoZSkge1xyXG4gICAgICAgICAgICAgIGNvbG9ycGlja2VyUHJldmlldy5jc3MoJ2JhY2tncm91bmRDb2xvcicsIHBpY2tlckNvbG9yLnRvSGV4KCkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHNsaWRlclNhdHVyYXRpb24uY3NzKCdiYWNrZ3JvdW5kQ29sb3InLCBwaWNrZXJDb2xvci50b0hleChwaWNrZXJDb2xvci52YWx1ZS5oLCAxLCAxLCAxKSk7XHJcbiAgICAgICAgICAgIGlmICh0aGlzRm9ybWF0ID09PSAncmdiYScpIHtcclxuICAgICAgICAgICAgICBzbGlkZXJBbHBoYS5jc3MuYmFja2dyb3VuZENvbG9yID0gcGlja2VyQ29sb3IudG9IZXgoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIGZ1bmN0aW9uIG1vdXNlbW92ZShldmVudCkge1xyXG4gICAgICAgICAgICB2YXIgXHJcbiAgICAgICAgICAgICAgICBsZWZ0ID0gU2xpZGVyLmdldExlZnRQb3NpdGlvbihldmVudCksXHJcbiAgICAgICAgICAgICAgICB0b3AgPSBTbGlkZXIuZ2V0VG9wUG9zaXRpb24oZXZlbnQpLFxyXG4gICAgICAgICAgICAgICAgc2xpZGVyID0gU2xpZGVyLmdldFNsaWRlcigpO1xyXG5cclxuICAgICAgICAgICAgU2xpZGVyLnNldEtub2IodG9wLCBsZWZ0KTtcclxuXHJcbiAgICAgICAgICAgIGlmIChzbGlkZXIuY2FsbExlZnQpIHtcclxuICAgICAgICAgICAgICBwaWNrZXJDb2xvcltzbGlkZXIuY2FsbExlZnRdLmNhbGwocGlja2VyQ29sb3IsIGxlZnQgLyBjb21wb25lbnRTaXplKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoc2xpZGVyLmNhbGxUb3ApIHtcclxuICAgICAgICAgICAgICBwaWNrZXJDb2xvcltzbGlkZXIuY2FsbFRvcF0uY2FsbChwaWNrZXJDb2xvciwgdG9wIC8gY29tcG9uZW50U2l6ZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcHJldmlld0NvbG9yKCk7XHJcbiAgICAgICAgICAgIHZhciBuZXdDb2xvciA9IHBpY2tlckNvbG9yW3RoaXNGb3JtYXRdKCk7XHJcbiAgICAgICAgICAgIGVsZW0udmFsKG5ld0NvbG9yKTtcclxuICAgICAgICAgICAgaWYgKG5nTW9kZWwpIHtcclxuICAgICAgICAgICAgICAkc2NvcGUuJGFwcGx5KG5nTW9kZWwuJHNldFZpZXdWYWx1ZShuZXdDb2xvcikpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICh3aXRoSW5wdXQpIHtcclxuICAgICAgICAgICAgICBwaWNrZXJDb2xvcklucHV0LnZhbChuZXdDb2xvcik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIGZ1bmN0aW9uIG1vdXNldXAoKSB7XHJcbiAgICAgICAgICAgIGVtaXRFdmVudCgnY29sb3JwaWNrZXItc2VsZWN0ZWQnKTtcclxuICAgICAgICAgICAgJGRvY3VtZW50Lm9mZignbW91c2Vtb3ZlJywgbW91c2Vtb3ZlKTtcclxuICAgICAgICAgICAgJGRvY3VtZW50Lm9mZignbW91c2V1cCcsIG1vdXNldXApO1xyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIGZ1bmN0aW9uIHVwZGF0ZShvbWl0SW5uZXJJbnB1dCkge1xyXG4gICAgICAgICAgICBwaWNrZXJDb2xvci5zZXRDb2xvcihlbGVtLnZhbCgpKTtcclxuICAgICAgICAgICAgaWYgKHdpdGhJbnB1dCAmJiAhb21pdElubmVySW5wdXQpIHtcclxuICAgICAgICAgICAgICBwaWNrZXJDb2xvcklucHV0LnZhbChlbGVtLnZhbCgpKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBwaWNrZXJDb2xvclBvaW50ZXJzLmVxKDApLmNzcyh7XHJcbiAgICAgICAgICAgICAgbGVmdDogcGlja2VyQ29sb3IudmFsdWUucyAqIGNvbXBvbmVudFNpemUgKyAncHgnLFxyXG4gICAgICAgICAgICAgIHRvcDogY29tcG9uZW50U2l6ZSAtIHBpY2tlckNvbG9yLnZhbHVlLmIgKiBjb21wb25lbnRTaXplICsgJ3B4J1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgcGlja2VyQ29sb3JQb2ludGVycy5lcSgxKS5jc3MoJ3RvcCcsIGNvbXBvbmVudFNpemUgKiAoMSAtIHBpY2tlckNvbG9yLnZhbHVlLmgpICsgJ3B4Jyk7XHJcbiAgICAgICAgICAgIHBpY2tlckNvbG9yUG9pbnRlcnMuZXEoMikuY3NzKCd0b3AnLCBjb21wb25lbnRTaXplICogKDEgLSBwaWNrZXJDb2xvci52YWx1ZS5hKSArICdweCcpO1xyXG4gICAgICAgICAgICBwcmV2aWV3Q29sb3IoKTtcclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICBmdW5jdGlvbiBnZXRDb2xvcnBpY2tlclRlbXBsYXRlUG9zaXRpb24oKSB7XHJcbiAgICAgICAgICAgIHZhclxyXG4gICAgICAgICAgICAgICAgcG9zaXRpb25WYWx1ZSxcclxuICAgICAgICAgICAgICAgIHBvc2l0aW9uT2Zmc2V0ID0gSGVscGVyLmdldE9mZnNldChlbGVtWzBdKTtcclxuXHJcbiAgICAgICAgICAgIGlmKGFuZ3VsYXIuaXNEZWZpbmVkKGF0dHJzLmNvbG9ycGlja2VyUGFyZW50KSkge1xyXG4gICAgICAgICAgICAgIHBvc2l0aW9uT2Zmc2V0LmxlZnQgPSAwO1xyXG4gICAgICAgICAgICAgIHBvc2l0aW9uT2Zmc2V0LnRvcCA9IDA7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmIChwb3NpdGlvbiA9PT0gJ3RvcCcpIHtcclxuICAgICAgICAgICAgICBwb3NpdGlvblZhbHVlID0gIHtcclxuICAgICAgICAgICAgICAgICd0b3AnOiBwb3NpdGlvbk9mZnNldC50b3AgLSAxNDcsXHJcbiAgICAgICAgICAgICAgICAnbGVmdCc6IHBvc2l0aW9uT2Zmc2V0LmxlZnRcclxuICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKHBvc2l0aW9uID09PSAncmlnaHQnKSB7XHJcbiAgICAgICAgICAgICAgcG9zaXRpb25WYWx1ZSA9IHtcclxuICAgICAgICAgICAgICAgICd0b3AnOiBwb3NpdGlvbk9mZnNldC50b3AsXHJcbiAgICAgICAgICAgICAgICAnbGVmdCc6IHBvc2l0aW9uT2Zmc2V0LmxlZnQgKyAxMjZcclxuICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKHBvc2l0aW9uID09PSAnYm90dG9tJykge1xyXG4gICAgICAgICAgICAgIHBvc2l0aW9uVmFsdWUgPSB7XHJcbiAgICAgICAgICAgICAgICAndG9wJzogcG9zaXRpb25PZmZzZXQudG9wICsgZWxlbVswXS5vZmZzZXRIZWlnaHQgKyAyLFxyXG4gICAgICAgICAgICAgICAgJ2xlZnQnOiBwb3NpdGlvbk9mZnNldC5sZWZ0XHJcbiAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChwb3NpdGlvbiA9PT0gJ2xlZnQnKSB7XHJcbiAgICAgICAgICAgICAgcG9zaXRpb25WYWx1ZSA9IHtcclxuICAgICAgICAgICAgICAgICd0b3AnOiBwb3NpdGlvbk9mZnNldC50b3AsXHJcbiAgICAgICAgICAgICAgICAnbGVmdCc6IHBvc2l0aW9uT2Zmc2V0LmxlZnQgLSAxNTBcclxuICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgJ3RvcCc6IHBvc2l0aW9uVmFsdWUudG9wICsgJ3B4JyxcclxuICAgICAgICAgICAgICAnbGVmdCc6IHBvc2l0aW9uVmFsdWUubGVmdCArICdweCdcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICBmdW5jdGlvbiBkb2N1bWVudE1vdXNlZG93bkhhbmRsZXIoKSB7XHJcbiAgICAgICAgICAgIGhpZGVDb2xvcnBpY2tlclRlbXBsYXRlKCk7XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgZnVuY3Rpb24gc2hvd0NvbG9ycGlja2VyVGVtcGxhdGUoKSB7XHJcblxyXG4gICAgICAgICAgICBpZiAoIWNvbG9ycGlja2VyVGVtcGxhdGUuaGFzQ2xhc3MoJ2NvbG9ycGlja2VyLXZpc2libGUnKSkge1xyXG4gICAgICAgICAgICAgIHVwZGF0ZSgpO1xyXG4gICAgICAgICAgICAgIGNvbG9ycGlja2VyVGVtcGxhdGVcclxuICAgICAgICAgICAgICAgIC5hZGRDbGFzcygnY29sb3JwaWNrZXItdmlzaWJsZScpXHJcbiAgICAgICAgICAgICAgICAuY3NzKGdldENvbG9ycGlja2VyVGVtcGxhdGVQb3NpdGlvbigpKTtcclxuICAgICAgICAgICAgICBlbWl0RXZlbnQoJ2NvbG9ycGlja2VyLXNob3duJyk7XHJcblxyXG4gICAgICAgICAgICAgIGlmIChpbmxpbmUgPT09IGZhbHNlKSB7XHJcbiAgICAgICAgICAgICAgICAvLyByZWdpc3RlciBnbG9iYWwgbW91c2Vkb3duIGV2ZW50IHRvIGhpZGUgdGhlIGNvbG9ycGlja2VyXHJcbiAgICAgICAgICAgICAgICAkZG9jdW1lbnQub24oJ21vdXNlZG93bicsIGRvY3VtZW50TW91c2Vkb3duSGFuZGxlcik7XHJcbiAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICBpZiAoYXR0cnMuY29sb3JwaWNrZXJJc09wZW4pIHtcclxuICAgICAgICAgICAgICAgICRzY29wZVthdHRycy5jb2xvcnBpY2tlcklzT3Blbl0gPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgaWYgKCEkc2NvcGUuJCRwaGFzZSkge1xyXG4gICAgICAgICAgICAgICAgICAkc2NvcGUuJGRpZ2VzdCgpOyAvL3RyaWdnZXIgdGhlIHdhdGNoZXIgdG8gZmlyZVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIGlmIChpbmxpbmUgPT09IGZhbHNlKSB7XHJcbiAgICAgICAgICAgIGVsZW0ub24oJ2NsaWNrJywgc2hvd0NvbG9ycGlja2VyVGVtcGxhdGUpO1xyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgc2hvd0NvbG9ycGlja2VyVGVtcGxhdGUoKTtcclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICBjb2xvcnBpY2tlclRlbXBsYXRlLm9uKCdtb3VzZWRvd24nLCBmdW5jdGlvbiAoZXZlbnQpIHtcclxuICAgICAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICBmdW5jdGlvbiBlbWl0RXZlbnQobmFtZSkge1xyXG4gICAgICAgICAgICBpZiAobmdNb2RlbCkge1xyXG4gICAgICAgICAgICAgICRzY29wZS4kZW1pdChuYW1lLCB7XHJcbiAgICAgICAgICAgICAgICBuYW1lOiBhdHRycy5uZ01vZGVsLFxyXG4gICAgICAgICAgICAgICAgdmFsdWU6IG5nTW9kZWwuJG1vZGVsVmFsdWVcclxuICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIGZ1bmN0aW9uIGhpZGVDb2xvcnBpY2tlclRlbXBsYXRlKCkge1xyXG4gICAgICAgICAgICBpZiAoY29sb3JwaWNrZXJUZW1wbGF0ZS5oYXNDbGFzcygnY29sb3JwaWNrZXItdmlzaWJsZScpKSB7XHJcbiAgICAgICAgICAgICAgY29sb3JwaWNrZXJUZW1wbGF0ZS5yZW1vdmVDbGFzcygnY29sb3JwaWNrZXItdmlzaWJsZScpO1xyXG4gICAgICAgICAgICAgIGVtaXRFdmVudCgnY29sb3JwaWNrZXItY2xvc2VkJyk7XHJcbiAgICAgICAgICAgICAgLy8gdW5yZWdpc3RlciB0aGUgZ2xvYmFsIG1vdXNlZG93biBldmVudFxyXG4gICAgICAgICAgICAgICRkb2N1bWVudC5vZmYoJ21vdXNlZG93bicsIGRvY3VtZW50TW91c2Vkb3duSGFuZGxlcik7XHJcblxyXG4gICAgICAgICAgICAgIGlmIChhdHRycy5jb2xvcnBpY2tlcklzT3Blbikge1xyXG4gICAgICAgICAgICAgICAgJHNjb3BlW2F0dHJzLmNvbG9ycGlja2VySXNPcGVuXSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgaWYgKCEkc2NvcGUuJCRwaGFzZSkge1xyXG4gICAgICAgICAgICAgICAgICAkc2NvcGUuJGRpZ2VzdCgpOyAvL3RyaWdnZXIgdGhlIHdhdGNoZXIgdG8gZmlyZVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIGNvbG9ycGlja2VyVGVtcGxhdGUuZmluZCgnYnV0dG9uJykub24oJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBoaWRlQ29sb3JwaWNrZXJUZW1wbGF0ZSgpO1xyXG4gICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgaWYgKGF0dHJzLmNvbG9ycGlja2VySXNPcGVuKSB7XHJcbiAgICAgICAgICAgICRzY29wZS4kd2F0Y2goYXR0cnMuY29sb3JwaWNrZXJJc09wZW4sIGZ1bmN0aW9uKHNob3VsZEJlT3Blbikge1xyXG5cclxuICAgICAgICAgICAgICBpZiAoc2hvdWxkQmVPcGVuID09PSB0cnVlKSB7XHJcbiAgICAgICAgICAgICAgICBzaG93Q29sb3JwaWNrZXJUZW1wbGF0ZSgpO1xyXG4gICAgICAgICAgICAgIH0gZWxzZSBpZiAoc2hvdWxkQmVPcGVuID09PSBmYWxzZSkge1xyXG4gICAgICAgICAgICAgICAgaGlkZUNvbG9ycGlja2VyVGVtcGxhdGUoKTtcclxuICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH07XHJcbiAgICB9XSk7XHJcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2FuZ3VsYXItYm9vdHN0cmFwLWNvbG9ycGlja2VyL2pzL2Jvb3RzdHJhcC1jb2xvcnBpY2tlci1tb2R1bGUuanNcbiAqKiBtb2R1bGUgaWQgPSAxXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iXSwic291cmNlUm9vdCI6IiJ9