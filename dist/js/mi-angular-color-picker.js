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
	      template: '<div class="input-group">' +
	      '<input type="text" colorpicker class="form-control" colorpicker-position="top" ng-model="model[options.key]" ' +
	      'placeholder="Recipient\'s username" aria-describedby="basic-addon2">' +
	      '<span class="input-group-addon mi-color-picker" style="background-color:{{model.backgroundColor}}" ' +
	      'id="basic-addon2"></span>' +
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgZjg3Y2ZlZDZiOGM0ZmU5YjI4YWIiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LmpzIiwid2VicGFjazovLy8uL34vYW5ndWxhci1ib290c3RyYXAtY29sb3JwaWNrZXIvanMvYm9vdHN0cmFwLWNvbG9ycGlja2VyLW1vZHVsZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsdUJBQWU7QUFDZjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7OztBQ3RDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBTztBQUNQO0FBQ0E7QUFDQSxRQUFPO0FBQ1A7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUNBQXNDO0FBQ3RDLE1BQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtGQUFpRix1QkFBdUI7QUFDeEc7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBSztBQUNMLElBQUcsRTs7Ozs7O0FDakRIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLGdDQUErQixJQUFJLFlBQVksSUFBSSxZQUFZLElBQUk7QUFDbkU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVc7QUFDWDtBQUNBLGdDQUErQixFQUFFLGNBQWMsRUFBRSxjQUFjLEVBQUU7QUFDakU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQSxVQUFTOztBQUVUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQkFBa0I7QUFDbEIsVUFBUzs7QUFFVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBUzs7QUFFVDtBQUNBO0FBQ0EsVUFBUzs7QUFFVDtBQUNBO0FBQ0EsVUFBUzs7QUFFVDtBQUNBO0FBQ0EsVUFBUzs7QUFFVDtBQUNBO0FBQ0EsVUFBUzs7QUFFVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBUzs7QUFFVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVc7QUFDWDs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUdBQW9HO0FBQ3BHO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFXO0FBQ1g7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0JBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0JBQWU7QUFDZjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0JBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBLGtCQUFpQjtBQUNqQjtBQUNBO0FBQ0Esa0JBQWlCO0FBQ2pCOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0JBQWU7QUFDZjtBQUNBO0FBQ0E7QUFDQSxnQkFBZTtBQUNmO0FBQ0E7QUFDQSxnQkFBZTs7QUFFZjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdCQUFlO0FBQ2Y7QUFDQTtBQUNBO0FBQ0EsZ0JBQWU7QUFDZjtBQUNBO0FBQ0EsZ0JBQWU7O0FBRWY7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFlBQVc7O0FBRVg7QUFDQTtBQUNBLFlBQVc7O0FBRVg7QUFDQTtBQUNBO0FBQ0EsY0FBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG9DQUFtQztBQUNuQztBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsWUFBVztBQUNYO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsWUFBVzs7QUFFWDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0JBQWU7QUFDZjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxvQ0FBbUM7QUFDbkM7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFlBQVc7O0FBRVg7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsZ0JBQWU7QUFDZjtBQUNBOztBQUVBLGNBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQSxNQUFLIiwiZmlsZSI6Im1pLWFuZ3VsYXItY29sb3ItcGlja2VyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pXG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG5cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGV4cG9ydHM6IHt9LFxuIFx0XHRcdGlkOiBtb2R1bGVJZCxcbiBcdFx0XHRsb2FkZWQ6IGZhbHNlXG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmxvYWRlZCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oMCk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiB3ZWJwYWNrL2Jvb3RzdHJhcCBmODdjZmVkNmI4YzRmZTliMjhhYlxuICoqLyIsIid1c2Ugc3RyaWN0Jztcbi8qKlxuICogQG5nSW5qZWN0XG4gKi9cblxucmVxdWlyZSgnYW5ndWxhci1ib290c3RyYXAtY29sb3JwaWNrZXInKTtcbnZhciBNb2R1bGVOYW1lID0gJ21pLkNvbG9yUGlja2VyJyxcbiAgICByZXF1aXJlcyA9IFsnY29sb3JwaWNrZXIubW9kdWxlJ107XG5cbm1vZHVsZS5leHBvcnRzID0gYW5ndWxhci5tb2R1bGUoTW9kdWxlTmFtZSwgcmVxdWlyZXMpXG4gIC5ydW4oZnVuY3Rpb24gKGZvcm1seUNvbmZpZykge1xuICAgIHZhciBuZ01vZGVsQXR0cnMgPSB7fTtcbiAgICBmdW5jdGlvbiBjYW1lbGl6ZShzdHJpbmcpIHtcbiAgICAgIHN0cmluZyA9IHN0cmluZy5yZXBsYWNlKC9bXFwtX1xcc10rKC4pPy9nLCBmdW5jdGlvbiAobWF0Y2gsIGNocikge1xuICAgICAgICByZXR1cm4gY2hyID8gY2hyLnRvVXBwZXJDYXNlKCkgOiAnJztcbiAgICAgIH0pO1xuICAgICAgcmV0dXJuIHN0cmluZy5yZXBsYWNlKC9eKFtBLVpdKS8sIGZ1bmN0aW9uIChtYXRjaCwgY2hyKSB7XG4gICAgICAgIHJldHVybiBjaHIgPyBjaHIudG9Mb3dlckNhc2UoKSA6ICcnO1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgbmdNb2RlbEF0dHJzID0ge307XG4gICAgLy8gYXR0cmlidXRlc1xuICAgIGFuZ3VsYXIuZm9yRWFjaChbXG4gICAgICAnY29sb3ItcGlja2VyLWZvcm1hdCcsXG4gICAgICAnY29sb3ItcGlja2VyLWFscGhhJyxcbiAgICAgICdjb2xvci1waWNrZXItc3dhdGNoJyxcbiAgICAgICdjb2xvci1waWNrZXItc3dhdGNoLXBvcycsXG4gICAgICAnY29sb3ItcGlja2VyLXN3YXRjaC1ib290c3RyYXAnLFxuICAgICAgJ2NvbG9yLXBpY2tlci1zd2F0Y2gtb25seScsXG4gICAgICAnY29sb3ItcGlja2VyLXBvcycsXG4gICAgICAnY29sb3ItcGlja2VyLWNhc2UnXG4gICAgXSwgZnVuY3Rpb24gKGF0dHIpIHtcbiAgICAgIG5nTW9kZWxBdHRyc1tjYW1lbGl6ZShhdHRyKV0gPSB7YXR0cmlidXRlOiBhdHRyfTtcbiAgICB9KTtcblxuICAgIGZvcm1seUNvbmZpZy5zZXRUeXBlKHtcbiAgICAgIG5hbWU6ICdjb2xvcnBpY2tlcicsXG4gICAgICB0ZW1wbGF0ZTogJzxkaXYgY2xhc3M9XCJpbnB1dC1ncm91cFwiPicgK1xuICAgICAgJzxpbnB1dCB0eXBlPVwidGV4dFwiIGNvbG9ycGlja2VyIGNsYXNzPVwiZm9ybS1jb250cm9sXCIgY29sb3JwaWNrZXItcG9zaXRpb249XCJ0b3BcIiBuZy1tb2RlbD1cIm1vZGVsW29wdGlvbnMua2V5XVwiICcgK1xuICAgICAgJ3BsYWNlaG9sZGVyPVwiUmVjaXBpZW50XFwncyB1c2VybmFtZVwiIGFyaWEtZGVzY3JpYmVkYnk9XCJiYXNpYy1hZGRvbjJcIj4nICtcbiAgICAgICc8c3BhbiBjbGFzcz1cImlucHV0LWdyb3VwLWFkZG9uIG1pLWNvbG9yLXBpY2tlclwiIHN0eWxlPVwiYmFja2dyb3VuZC1jb2xvcjp7e21vZGVsLmJhY2tncm91bmRDb2xvcn19XCIgJyArXG4gICAgICAnaWQ9XCJiYXNpYy1hZGRvbjJcIj48L3NwYW4+JyArXG4gICAgICAnPC9kaXY+JyxcbiAgICAgIHdyYXBwZXI6IFsnYm9vdHN0cmFwTGFiZWwnLCAnYm9vdHN0cmFwSGFzRXJyb3InXSxcbiAgICAgIGRlZmF1bHRPcHRpb25zOiB7XG4gICAgICAgIG5nTW9kZWxBdHRyczogbmdNb2RlbEF0dHJzXG4gICAgICB9XG4gICAgfSk7XG4gIH0pO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zcmMvaW5kZXguanNcbiAqKiBtb2R1bGUgaWQgPSAwXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJhbmd1bGFyLm1vZHVsZSgnY29sb3JwaWNrZXIubW9kdWxlJywgW10pXHJcbiAgICAuZmFjdG9yeSgnSGVscGVyJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAndXNlIHN0cmljdCc7XHJcbiAgICAgIHJldHVybiB7XHJcbiAgICAgICAgY2xvc2VzdFNsaWRlcjogZnVuY3Rpb24gKGVsZW0pIHtcclxuICAgICAgICAgIHZhciBtYXRjaGVzU2VsZWN0b3IgPSBlbGVtLm1hdGNoZXMgfHwgZWxlbS53ZWJraXRNYXRjaGVzU2VsZWN0b3IgfHwgZWxlbS5tb3pNYXRjaGVzU2VsZWN0b3IgfHwgZWxlbS5tc01hdGNoZXNTZWxlY3RvcjtcclxuICAgICAgICAgIGlmIChtYXRjaGVzU2VsZWN0b3IuYmluZChlbGVtKSgnSScpKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBlbGVtLnBhcmVudE5vZGU7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICByZXR1cm4gZWxlbTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIGdldE9mZnNldDogZnVuY3Rpb24gKGVsZW0sIGZpeGVkUG9zaXRpb24pIHtcclxuICAgICAgICAgIHZhclxyXG4gICAgICAgICAgICBzY3JvbGxYID0gMCxcclxuICAgICAgICAgICAgc2Nyb2xsWSA9IDAsXHJcbiAgICAgICAgICAgIHJlY3QgPSBlbGVtLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xyXG4gICAgICAgICAgd2hpbGUgKGVsZW0gJiYgIWlzTmFOKGVsZW0ub2Zmc2V0TGVmdCkgJiYgIWlzTmFOKGVsZW0ub2Zmc2V0VG9wKSkge1xyXG4gICAgICAgICAgICBpZiAoIWZpeGVkUG9zaXRpb24gJiYgZWxlbS50YWdOYW1lID09PSAnQk9EWScpIHtcclxuICAgICAgICAgICAgICBzY3JvbGxYICs9IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zY3JvbGxMZWZ0IHx8IGVsZW0uc2Nyb2xsTGVmdDtcclxuICAgICAgICAgICAgICBzY3JvbGxZICs9IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zY3JvbGxUb3AgfHwgZWxlbS5zY3JvbGxUb3A7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgc2Nyb2xsWCArPSBlbGVtLnNjcm9sbExlZnQ7XHJcbiAgICAgICAgICAgICAgc2Nyb2xsWSArPSBlbGVtLnNjcm9sbFRvcDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbGVtID0gZWxlbS5vZmZzZXRQYXJlbnQ7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICB0b3A6IHJlY3QudG9wICsgd2luZG93LnBhZ2VZT2Zmc2V0LFxyXG4gICAgICAgICAgICBsZWZ0OiByZWN0LmxlZnQgKyB3aW5kb3cucGFnZVhPZmZzZXQsXHJcbiAgICAgICAgICAgIHNjcm9sbFg6IHNjcm9sbFgsXHJcbiAgICAgICAgICAgIHNjcm9sbFk6IHNjcm9sbFlcclxuICAgICAgICAgIH07XHJcbiAgICAgICAgfSxcclxuICAgICAgICAvLyBhIHNldCBvZiBSRSdzIHRoYXQgY2FuIG1hdGNoIHN0cmluZ3MgYW5kIGdlbmVyYXRlIGNvbG9yIHR1cGxlcy4gaHR0cHM6Ly9naXRodWIuY29tL2pxdWVyeS9qcXVlcnktY29sb3IvXHJcbiAgICAgICAgc3RyaW5nUGFyc2VyczogW1xyXG4gICAgICAgICAge1xyXG4gICAgICAgICAgICByZTogL3JnYmE/XFwoXFxzKihcXGR7MSwzfSlcXHMqLFxccyooXFxkezEsM30pXFxzKixcXHMqKFxcZHsxLDN9KVxccyooPzosXFxzKihcXGQrKD86XFwuXFxkKyk/KVxccyopP1xcKS8sXHJcbiAgICAgICAgICAgIHBhcnNlOiBmdW5jdGlvbiAoZXhlY1Jlc3VsdCkge1xyXG4gICAgICAgICAgICAgIHJldHVybiBbXHJcbiAgICAgICAgICAgICAgICBleGVjUmVzdWx0WzFdLFxyXG4gICAgICAgICAgICAgICAgZXhlY1Jlc3VsdFsyXSxcclxuICAgICAgICAgICAgICAgIGV4ZWNSZXN1bHRbM10sXHJcbiAgICAgICAgICAgICAgICBleGVjUmVzdWx0WzRdXHJcbiAgICAgICAgICAgICAgXTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIHtcclxuICAgICAgICAgICAgcmU6IC9yZ2JhP1xcKFxccyooXFxkKyg/OlxcLlxcZCspPylcXCVcXHMqLFxccyooXFxkKyg/OlxcLlxcZCspPylcXCVcXHMqLFxccyooXFxkKyg/OlxcLlxcZCspPylcXCVcXHMqKD86LFxccyooXFxkKyg/OlxcLlxcZCspPylcXHMqKT9cXCkvLFxyXG4gICAgICAgICAgICBwYXJzZTogZnVuY3Rpb24gKGV4ZWNSZXN1bHQpIHtcclxuICAgICAgICAgICAgICByZXR1cm4gW1xyXG4gICAgICAgICAgICAgICAgMi41NSAqIGV4ZWNSZXN1bHRbMV0sXHJcbiAgICAgICAgICAgICAgICAyLjU1ICogZXhlY1Jlc3VsdFsyXSxcclxuICAgICAgICAgICAgICAgIDIuNTUgKiBleGVjUmVzdWx0WzNdLFxyXG4gICAgICAgICAgICAgICAgZXhlY1Jlc3VsdFs0XVxyXG4gICAgICAgICAgICAgIF07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICB7XHJcbiAgICAgICAgICAgIHJlOiAvIyhbYS1mQS1GMC05XXsyfSkoW2EtZkEtRjAtOV17Mn0pKFthLWZBLUYwLTldezJ9KS8sXHJcbiAgICAgICAgICAgIHBhcnNlOiBmdW5jdGlvbiAoZXhlY1Jlc3VsdCkge1xyXG4gICAgICAgICAgICAgIHJldHVybiBbXHJcbiAgICAgICAgICAgICAgICBwYXJzZUludChleGVjUmVzdWx0WzFdLCAxNiksXHJcbiAgICAgICAgICAgICAgICBwYXJzZUludChleGVjUmVzdWx0WzJdLCAxNiksXHJcbiAgICAgICAgICAgICAgICBwYXJzZUludChleGVjUmVzdWx0WzNdLCAxNilcclxuICAgICAgICAgICAgICBdO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAge1xyXG4gICAgICAgICAgICByZTogLyMoW2EtZkEtRjAtOV0pKFthLWZBLUYwLTldKShbYS1mQS1GMC05XSkvLFxyXG4gICAgICAgICAgICBwYXJzZTogZnVuY3Rpb24gKGV4ZWNSZXN1bHQpIHtcclxuICAgICAgICAgICAgICByZXR1cm4gW1xyXG4gICAgICAgICAgICAgICAgcGFyc2VJbnQoZXhlY1Jlc3VsdFsxXSArIGV4ZWNSZXN1bHRbMV0sIDE2KSxcclxuICAgICAgICAgICAgICAgIHBhcnNlSW50KGV4ZWNSZXN1bHRbMl0gKyBleGVjUmVzdWx0WzJdLCAxNiksXHJcbiAgICAgICAgICAgICAgICBwYXJzZUludChleGVjUmVzdWx0WzNdICsgZXhlY1Jlc3VsdFszXSwgMTYpXHJcbiAgICAgICAgICAgICAgXTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIF1cclxuICAgICAgfTtcclxuICAgIH0pXHJcbiAgICAuZmFjdG9yeSgnQ29sb3InLCBbJ0hlbHBlcicsIGZ1bmN0aW9uIChIZWxwZXIpIHtcclxuICAgICAgJ3VzZSBzdHJpY3QnO1xyXG4gICAgICByZXR1cm4ge1xyXG4gICAgICAgIHZhbHVlOiB7XHJcbiAgICAgICAgICBoOiAxLFxyXG4gICAgICAgICAgczogMSxcclxuICAgICAgICAgIGI6IDEsXHJcbiAgICAgICAgICBhOiAxXHJcbiAgICAgICAgfSxcclxuICAgICAgICAvLyB0cmFuc2xhdGUgYSBmb3JtYXQgZnJvbSBDb2xvciBvYmplY3QgdG8gYSBzdHJpbmdcclxuICAgICAgICAncmdiJzogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgdmFyIHJnYiA9IHRoaXMudG9SR0IoKTtcclxuICAgICAgICAgIHJldHVybiAncmdiKCcgKyByZ2IuciArICcsJyArIHJnYi5nICsgJywnICsgcmdiLmIgKyAnKSc7XHJcbiAgICAgICAgfSxcclxuICAgICAgICAncmdiYSc6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgIHZhciByZ2IgPSB0aGlzLnRvUkdCKCk7XHJcbiAgICAgICAgICByZXR1cm4gJ3JnYmEoJyArIHJnYi5yICsgJywnICsgcmdiLmcgKyAnLCcgKyByZ2IuYiArICcsJyArIHJnYi5hICsgJyknO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgJ2hleCc6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgIHJldHVybiAgdGhpcy50b0hleCgpO1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIC8vIEhTQnRvUkdCIGZyb20gUmFwaGFlbEpTXHJcbiAgICAgICAgUkdCdG9IU0I6IGZ1bmN0aW9uIChyLCBnLCBiLCBhKSB7XHJcbiAgICAgICAgICByIC89IDI1NTtcclxuICAgICAgICAgIGcgLz0gMjU1O1xyXG4gICAgICAgICAgYiAvPSAyNTU7XHJcblxyXG4gICAgICAgICAgdmFyIEgsIFMsIFYsIEM7XHJcbiAgICAgICAgICBWID0gTWF0aC5tYXgociwgZywgYik7XHJcbiAgICAgICAgICBDID0gViAtIE1hdGgubWluKHIsIGcsIGIpO1xyXG4gICAgICAgICAgSCA9IChDID09PSAwID8gbnVsbCA6XHJcbiAgICAgICAgICAgICAgViA9PT0gciA/IChnIC0gYikgLyBDIDpcclxuICAgICAgICAgICAgICAgICAgViA9PT0gZyA/IChiIC0gcikgLyBDICsgMiA6XHJcbiAgICAgICAgICAgICAgICAgICAgICAociAtIGcpIC8gQyArIDRcclxuICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgSCA9ICgoSCArIDM2MCkgJSA2KSAqIDYwIC8gMzYwO1xyXG4gICAgICAgICAgUyA9IEMgPT09IDAgPyAwIDogQyAvIFY7XHJcbiAgICAgICAgICByZXR1cm4ge2g6IEggfHwgMSwgczogUywgYjogViwgYTogYSB8fCAxfTtcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICAvL3BhcnNlIGEgc3RyaW5nIHRvIEhTQlxyXG4gICAgICAgIHNldENvbG9yOiBmdW5jdGlvbiAodmFsKSB7XHJcbiAgICAgICAgICB2YWwgPSAodmFsKSA/IHZhbC50b0xvd2VyQ2FzZSgpIDogdmFsO1xyXG4gICAgICAgICAgZm9yICh2YXIga2V5IGluIEhlbHBlci5zdHJpbmdQYXJzZXJzKSB7XHJcbiAgICAgICAgICAgIGlmIChIZWxwZXIuc3RyaW5nUGFyc2Vycy5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XHJcbiAgICAgICAgICAgICAgdmFyIHBhcnNlciA9IEhlbHBlci5zdHJpbmdQYXJzZXJzW2tleV07XHJcbiAgICAgICAgICAgICAgdmFyIG1hdGNoID0gcGFyc2VyLnJlLmV4ZWModmFsKSxcclxuICAgICAgICAgICAgICAgICAgdmFsdWVzID0gbWF0Y2ggJiYgcGFyc2VyLnBhcnNlKG1hdGNoKTtcclxuICAgICAgICAgICAgICBpZiAodmFsdWVzKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnZhbHVlID0gdGhpcy5SR0J0b0hTQi5hcHBseShudWxsLCB2YWx1ZXMpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIHNldEh1ZTogZnVuY3Rpb24gKGgpIHtcclxuICAgICAgICAgIHRoaXMudmFsdWUuaCA9IDEgLSBoO1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIHNldFNhdHVyYXRpb246IGZ1bmN0aW9uIChzKSB7XHJcbiAgICAgICAgICB0aGlzLnZhbHVlLnMgPSBzO1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIHNldExpZ2h0bmVzczogZnVuY3Rpb24gKGIpIHtcclxuICAgICAgICAgIHRoaXMudmFsdWUuYiA9IDEgLSBiO1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIHNldEFscGhhOiBmdW5jdGlvbiAoYSkge1xyXG4gICAgICAgICAgdGhpcy52YWx1ZS5hID0gcGFyc2VJbnQoKDEgLSBhKSAqIDEwMCwgMTApIC8gMTAwO1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIC8vIEhTQnRvUkdCIGZyb20gUmFwaGFlbEpTXHJcbiAgICAgICAgLy8gaHR0cHM6Ly9naXRodWIuY29tL0RtaXRyeUJhcmFub3Zza2l5L3JhcGhhZWwvXHJcbiAgICAgICAgdG9SR0I6IGZ1bmN0aW9uIChoLCBzLCBiLCBhKSB7XHJcbiAgICAgICAgICBpZiAoIWgpIHtcclxuICAgICAgICAgICAgaCA9IHRoaXMudmFsdWUuaDtcclxuICAgICAgICAgICAgcyA9IHRoaXMudmFsdWUucztcclxuICAgICAgICAgICAgYiA9IHRoaXMudmFsdWUuYjtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIGggKj0gMzYwO1xyXG4gICAgICAgICAgdmFyIFIsIEcsIEIsIFgsIEM7XHJcbiAgICAgICAgICBoID0gKGggJSAzNjApIC8gNjA7XHJcbiAgICAgICAgICBDID0gYiAqIHM7XHJcbiAgICAgICAgICBYID0gQyAqICgxIC0gTWF0aC5hYnMoaCAlIDIgLSAxKSk7XHJcbiAgICAgICAgICBSID0gRyA9IEIgPSBiIC0gQztcclxuXHJcbiAgICAgICAgICBoID0gfn5oO1xyXG4gICAgICAgICAgUiArPSBbQywgWCwgMCwgMCwgWCwgQ11baF07XHJcbiAgICAgICAgICBHICs9IFtYLCBDLCBDLCBYLCAwLCAwXVtoXTtcclxuICAgICAgICAgIEIgKz0gWzAsIDAsIFgsIEMsIEMsIFhdW2hdO1xyXG4gICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgcjogTWF0aC5yb3VuZChSICogMjU1KSxcclxuICAgICAgICAgICAgZzogTWF0aC5yb3VuZChHICogMjU1KSxcclxuICAgICAgICAgICAgYjogTWF0aC5yb3VuZChCICogMjU1KSxcclxuICAgICAgICAgICAgYTogYSB8fCB0aGlzLnZhbHVlLmFcclxuICAgICAgICAgIH07XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgdG9IZXg6IGZ1bmN0aW9uIChoLCBzLCBiLCBhKSB7XHJcbiAgICAgICAgICB2YXIgcmdiID0gdGhpcy50b1JHQihoLCBzLCBiLCBhKTtcclxuICAgICAgICAgIHJldHVybiAnIycgKyAoKDEgPDwgMjQpIHwgKHBhcnNlSW50KHJnYi5yLCAxMCkgPDwgMTYpIHwgKHBhcnNlSW50KHJnYi5nLCAxMCkgPDwgOCkgfCBwYXJzZUludChyZ2IuYiwgMTApKS50b1N0cmluZygxNikuc3Vic3RyKDEpO1xyXG4gICAgICAgIH1cclxuICAgICAgfTtcclxuICAgIH1dKVxyXG4gICAgLmZhY3RvcnkoJ1NsaWRlcicsIFsnSGVscGVyJywgZnVuY3Rpb24gKEhlbHBlcikge1xyXG4gICAgICAndXNlIHN0cmljdCc7XHJcbiAgICAgIHZhclxyXG4gICAgICAgICAgc2xpZGVyID0ge1xyXG4gICAgICAgICAgICBtYXhMZWZ0OiAwLFxyXG4gICAgICAgICAgICBtYXhUb3A6IDAsXHJcbiAgICAgICAgICAgIGNhbGxMZWZ0OiBudWxsLFxyXG4gICAgICAgICAgICBjYWxsVG9wOiBudWxsLFxyXG4gICAgICAgICAgICBrbm9iOiB7XHJcbiAgICAgICAgICAgICAgdG9wOiAwLFxyXG4gICAgICAgICAgICAgIGxlZnQ6IDBcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIHBvaW50ZXIgPSB7fTtcclxuXHJcbiAgICAgIHJldHVybiB7XHJcbiAgICAgICAgZ2V0U2xpZGVyOiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgIHJldHVybiBzbGlkZXI7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBnZXRMZWZ0UG9zaXRpb246IGZ1bmN0aW9uKGV2ZW50KSB7XHJcbiAgICAgICAgICByZXR1cm4gTWF0aC5tYXgoMCwgTWF0aC5taW4oc2xpZGVyLm1heExlZnQsIHNsaWRlci5sZWZ0ICsgKChldmVudC5wYWdlWCB8fCBwb2ludGVyLmxlZnQpIC0gcG9pbnRlci5sZWZ0KSkpO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZ2V0VG9wUG9zaXRpb246IGZ1bmN0aW9uKGV2ZW50KSB7XHJcbiAgICAgICAgICByZXR1cm4gTWF0aC5tYXgoMCwgTWF0aC5taW4oc2xpZGVyLm1heFRvcCwgc2xpZGVyLnRvcCArICgoZXZlbnQucGFnZVkgfHwgcG9pbnRlci50b3ApIC0gcG9pbnRlci50b3ApKSk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBzZXRTbGlkZXI6IGZ1bmN0aW9uIChldmVudCwgZml4ZWRQb3NpdGlvbikge1xyXG4gICAgICAgICAgdmFyXHJcbiAgICAgICAgICAgIHRhcmdldCA9IEhlbHBlci5jbG9zZXN0U2xpZGVyKGV2ZW50LnRhcmdldCksXHJcbiAgICAgICAgICAgIHRhcmdldE9mZnNldCA9IEhlbHBlci5nZXRPZmZzZXQodGFyZ2V0LCBmaXhlZFBvc2l0aW9uKSxcclxuICAgICAgICAgICAgcmVjdCA9IHRhcmdldC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKSxcclxuICAgICAgICAgICAgb2Zmc2V0WCA9IGV2ZW50LmNsaWVudFggLSByZWN0LmxlZnQsXHJcbiAgICAgICAgICAgIG9mZnNldFkgPSBldmVudC5jbGllbnRZIC0gcmVjdC50b3A7XHJcblxyXG4gICAgICAgICAgc2xpZGVyLmtub2IgPSB0YXJnZXQuY2hpbGRyZW5bMF0uc3R5bGU7XHJcbiAgICAgICAgICBzbGlkZXIubGVmdCA9IGV2ZW50LnBhZ2VYIC0gdGFyZ2V0T2Zmc2V0LmxlZnQgLSB3aW5kb3cucGFnZVhPZmZzZXQgKyB0YXJnZXRPZmZzZXQuc2Nyb2xsWDtcclxuICAgICAgICAgIHNsaWRlci50b3AgPSBldmVudC5wYWdlWSAtIHRhcmdldE9mZnNldC50b3AgLSB3aW5kb3cucGFnZVlPZmZzZXQgKyB0YXJnZXRPZmZzZXQuc2Nyb2xsWTtcclxuXHJcbiAgICAgICAgICBwb2ludGVyID0ge1xyXG4gICAgICAgICAgICBsZWZ0OiBldmVudC5wYWdlWCAtIChvZmZzZXRYIC0gc2xpZGVyLmxlZnQpLFxyXG4gICAgICAgICAgICB0b3A6IGV2ZW50LnBhZ2VZIC0gKG9mZnNldFkgLSBzbGlkZXIudG9wKVxyXG4gICAgICAgICAgfTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIHNldFNhdHVyYXRpb246IGZ1bmN0aW9uKGV2ZW50LCBmaXhlZFBvc2l0aW9uLCBjb21wb25lbnRTaXplKSB7XHJcbiAgICAgICAgICBzbGlkZXIgPSB7XHJcbiAgICAgICAgICAgIG1heExlZnQ6IGNvbXBvbmVudFNpemUsXHJcbiAgICAgICAgICAgIG1heFRvcDogY29tcG9uZW50U2l6ZSxcclxuICAgICAgICAgICAgY2FsbExlZnQ6ICdzZXRTYXR1cmF0aW9uJyxcclxuICAgICAgICAgICAgY2FsbFRvcDogJ3NldExpZ2h0bmVzcydcclxuICAgICAgICAgIH07XHJcbiAgICAgICAgICB0aGlzLnNldFNsaWRlcihldmVudCwgZml4ZWRQb3NpdGlvbik7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBzZXRIdWU6IGZ1bmN0aW9uKGV2ZW50LCBmaXhlZFBvc2l0aW9uLCBjb21wb25lbnRTaXplKSB7XHJcbiAgICAgICAgICBzbGlkZXIgPSB7XHJcbiAgICAgICAgICAgIG1heExlZnQ6IDAsXHJcbiAgICAgICAgICAgIG1heFRvcDogY29tcG9uZW50U2l6ZSxcclxuICAgICAgICAgICAgY2FsbExlZnQ6IGZhbHNlLFxyXG4gICAgICAgICAgICBjYWxsVG9wOiAnc2V0SHVlJ1xyXG4gICAgICAgICAgfTtcclxuICAgICAgICAgIHRoaXMuc2V0U2xpZGVyKGV2ZW50LCBmaXhlZFBvc2l0aW9uKTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIHNldEFscGhhOiBmdW5jdGlvbihldmVudCwgZml4ZWRQb3NpdGlvbiwgY29tcG9uZW50U2l6ZSkge1xyXG4gICAgICAgICAgc2xpZGVyID0ge1xyXG4gICAgICAgICAgICBtYXhMZWZ0OiAwLFxyXG4gICAgICAgICAgICBtYXhUb3A6IGNvbXBvbmVudFNpemUsXHJcbiAgICAgICAgICAgIGNhbGxMZWZ0OiBmYWxzZSxcclxuICAgICAgICAgICAgY2FsbFRvcDogJ3NldEFscGhhJ1xyXG4gICAgICAgICAgfTtcclxuICAgICAgICAgIHRoaXMuc2V0U2xpZGVyKGV2ZW50LCBmaXhlZFBvc2l0aW9uKTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIHNldEtub2I6IGZ1bmN0aW9uKHRvcCwgbGVmdCkge1xyXG4gICAgICAgICAgc2xpZGVyLmtub2IudG9wID0gdG9wICsgJ3B4JztcclxuICAgICAgICAgIHNsaWRlci5rbm9iLmxlZnQgPSBsZWZ0ICsgJ3B4JztcclxuICAgICAgICB9XHJcbiAgICAgIH07XHJcbiAgICB9XSlcclxuICAgIC5kaXJlY3RpdmUoJ2NvbG9ycGlja2VyJywgWyckZG9jdW1lbnQnLCAnJGNvbXBpbGUnLCAnQ29sb3InLCAnU2xpZGVyJywgJ0hlbHBlcicsIGZ1bmN0aW9uICgkZG9jdW1lbnQsICRjb21waWxlLCBDb2xvciwgU2xpZGVyLCBIZWxwZXIpIHtcclxuICAgICAgJ3VzZSBzdHJpY3QnO1xyXG4gICAgICByZXR1cm4ge1xyXG4gICAgICAgIHJlcXVpcmU6ICc/bmdNb2RlbCcsXHJcbiAgICAgICAgcmVzdHJpY3Q6ICdBJyxcclxuICAgICAgICBsaW5rOiBmdW5jdGlvbiAoJHNjb3BlLCBlbGVtLCBhdHRycywgbmdNb2RlbCkge1xyXG4gICAgICAgICAgdmFyXHJcbiAgICAgICAgICAgICAgdGhpc0Zvcm1hdCA9IGF0dHJzLmNvbG9ycGlja2VyID8gYXR0cnMuY29sb3JwaWNrZXIgOiAnaGV4JyxcclxuICAgICAgICAgICAgICBwb3NpdGlvbiA9IGFuZ3VsYXIuaXNEZWZpbmVkKGF0dHJzLmNvbG9ycGlja2VyUG9zaXRpb24pID8gYXR0cnMuY29sb3JwaWNrZXJQb3NpdGlvbiA6ICdib3R0b20nLFxyXG4gICAgICAgICAgICAgIGlubGluZSA9IGFuZ3VsYXIuaXNEZWZpbmVkKGF0dHJzLmNvbG9ycGlja2VySW5saW5lKSA/IGF0dHJzLmNvbG9ycGlja2VySW5saW5lIDogZmFsc2UsXHJcbiAgICAgICAgICAgICAgZml4ZWRQb3NpdGlvbiA9IGFuZ3VsYXIuaXNEZWZpbmVkKGF0dHJzLmNvbG9ycGlja2VyRml4ZWRQb3NpdGlvbikgPyBhdHRycy5jb2xvcnBpY2tlckZpeGVkUG9zaXRpb24gOiBmYWxzZSxcclxuICAgICAgICAgICAgICB0YXJnZXQgPSBhbmd1bGFyLmlzRGVmaW5lZChhdHRycy5jb2xvcnBpY2tlclBhcmVudCkgPyBlbGVtLnBhcmVudCgpIDogYW5ndWxhci5lbGVtZW50KGRvY3VtZW50LmJvZHkpLFxyXG4gICAgICAgICAgICAgIHdpdGhJbnB1dCA9IGFuZ3VsYXIuaXNEZWZpbmVkKGF0dHJzLmNvbG9ycGlja2VyV2l0aElucHV0KSA/IGF0dHJzLmNvbG9ycGlja2VyV2l0aElucHV0IDogZmFsc2UsXHJcbiAgICAgICAgICAgICAgY29tcG9uZW50U2l6ZSA9IGFuZ3VsYXIuaXNEZWZpbmVkKGF0dHJzLmNvbG9ycGlja2VyU2l6ZSkgPyBhdHRycy5jb2xvcnBpY2tlclNpemUgOiAxMDAsXHJcbiAgICAgICAgICAgICAgY29tcG9uZW50U2l6ZVB4ID0gY29tcG9uZW50U2l6ZSArICdweCcsXHJcbiAgICAgICAgICAgICAgaW5wdXRUZW1wbGF0ZSA9IHdpdGhJbnB1dCA/ICc8aW5wdXQgdHlwZT1cInRleHRcIiBuYW1lPVwiY29sb3JwaWNrZXItaW5wdXRcIiBzcGVsbGNoZWNrPVwiZmFsc2VcIj4nIDogJycsXHJcbiAgICAgICAgICAgICAgY2xvc2VCdXR0b24gPSAhaW5saW5lID8gJzxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiY2xvc2UgY2xvc2UtY29sb3JwaWNrZXJcIj4mdGltZXM7PC9idXR0b24+JyA6ICcnLFxyXG4gICAgICAgICAgICAgIHRlbXBsYXRlID1cclxuICAgICAgICAgICAgICAgICAgJzxkaXYgY2xhc3M9XCJjb2xvcnBpY2tlciBkcm9wZG93blwiPicgK1xyXG4gICAgICAgICAgICAgICAgICAgICAgJzxkaXYgY2xhc3M9XCJkcm9wZG93bi1tZW51XCI+JyArXHJcbiAgICAgICAgICAgICAgICAgICAgICAnPGNvbG9ycGlja2VyLXNhdHVyYXRpb24+PGk+PC9pPjwvY29sb3JwaWNrZXItc2F0dXJhdGlvbj4nICtcclxuICAgICAgICAgICAgICAgICAgICAgICc8Y29sb3JwaWNrZXItaHVlPjxpPjwvaT48L2NvbG9ycGlja2VyLWh1ZT4nICtcclxuICAgICAgICAgICAgICAgICAgICAgICc8Y29sb3JwaWNrZXItYWxwaGE+PGk+PC9pPjwvY29sb3JwaWNrZXItYWxwaGE+JyArXHJcbiAgICAgICAgICAgICAgICAgICAgICAnPGNvbG9ycGlja2VyLXByZXZpZXc+PC9jb2xvcnBpY2tlci1wcmV2aWV3PicgK1xyXG4gICAgICAgICAgICAgICAgICAgICAgaW5wdXRUZW1wbGF0ZSArXHJcbiAgICAgICAgICAgICAgICAgICAgICBjbG9zZUJ1dHRvbiArXHJcbiAgICAgICAgICAgICAgICAgICAgICAnPC9kaXY+JyArXHJcbiAgICAgICAgICAgICAgICAgICAgICAnPC9kaXY+JyxcclxuICAgICAgICAgICAgICBjb2xvcnBpY2tlclRlbXBsYXRlID0gYW5ndWxhci5lbGVtZW50KHRlbXBsYXRlKSxcclxuICAgICAgICAgICAgICBwaWNrZXJDb2xvciA9IENvbG9yLFxyXG4gICAgICAgICAgICAgIGNvbXBvbmVudFNpemVQeCxcclxuICAgICAgICAgICAgICBzbGlkZXJBbHBoYSxcclxuICAgICAgICAgICAgICBzbGlkZXJIdWUgPSBjb2xvcnBpY2tlclRlbXBsYXRlLmZpbmQoJ2NvbG9ycGlja2VyLWh1ZScpLFxyXG4gICAgICAgICAgICAgIHNsaWRlclNhdHVyYXRpb24gPSBjb2xvcnBpY2tlclRlbXBsYXRlLmZpbmQoJ2NvbG9ycGlja2VyLXNhdHVyYXRpb24nKSxcclxuICAgICAgICAgICAgICBjb2xvcnBpY2tlclByZXZpZXcgPSBjb2xvcnBpY2tlclRlbXBsYXRlLmZpbmQoJ2NvbG9ycGlja2VyLXByZXZpZXcnKSxcclxuICAgICAgICAgICAgICBwaWNrZXJDb2xvclBvaW50ZXJzID0gY29sb3JwaWNrZXJUZW1wbGF0ZS5maW5kKCdpJyk7XHJcblxyXG4gICAgICAgICAgJGNvbXBpbGUoY29sb3JwaWNrZXJUZW1wbGF0ZSkoJHNjb3BlKTtcclxuICAgICAgICAgIGNvbG9ycGlja2VyVGVtcGxhdGUuY3NzKCdtaW4td2lkdGgnLCBwYXJzZUludChjb21wb25lbnRTaXplKSArIDI5ICsgJ3B4Jyk7XHJcbiAgICAgICAgICBzbGlkZXJTYXR1cmF0aW9uLmNzcyh7XHJcbiAgICAgICAgICAgICd3aWR0aCcgOiBjb21wb25lbnRTaXplUHgsXHJcbiAgICAgICAgICAgICdoZWlnaHQnIDogY29tcG9uZW50U2l6ZVB4XHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICAgIHNsaWRlckh1ZS5jc3MoJ2hlaWdodCcsIGNvbXBvbmVudFNpemVQeCk7XHJcblxyXG4gICAgICAgICAgaWYgKHdpdGhJbnB1dCkge1xyXG4gICAgICAgICAgICB2YXIgcGlja2VyQ29sb3JJbnB1dCA9IGNvbG9ycGlja2VyVGVtcGxhdGUuZmluZCgnaW5wdXQnKTtcclxuICAgICAgICAgICAgcGlja2VyQ29sb3JJbnB1dC5jc3MoJ3dpZHRoJywgY29tcG9uZW50U2l6ZVB4KTtcclxuICAgICAgICAgICAgcGlja2VyQ29sb3JJbnB1dFxyXG4gICAgICAgICAgICAgICAgLm9uKCdtb3VzZWRvd24nLCBmdW5jdGlvbihldmVudCkge1xyXG4gICAgICAgICAgICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgLm9uKCdrZXl1cCcsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgdmFyIG5ld0NvbG9yID0gdGhpcy52YWx1ZTtcclxuICAgICAgICAgICAgICAgIGVsZW0udmFsKG5ld0NvbG9yKTtcclxuICAgICAgICAgICAgICAgIGlmIChuZ01vZGVsICYmIG5nTW9kZWwuJG1vZGVsVmFsdWUgIT09IG5ld0NvbG9yKSB7XHJcbiAgICAgICAgICAgICAgICAgICRzY29wZS4kYXBwbHkobmdNb2RlbC4kc2V0Vmlld1ZhbHVlKG5ld0NvbG9yKSk7XHJcbiAgICAgICAgICAgICAgICAgIHVwZGF0ZSh0cnVlKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICBmdW5jdGlvbiBiaW5kTW91c2VFdmVudHMoKSB7XHJcbiAgICAgICAgICAgICRkb2N1bWVudC5vbignbW91c2Vtb3ZlJywgbW91c2Vtb3ZlKTtcclxuICAgICAgICAgICAgJGRvY3VtZW50Lm9uKCdtb3VzZXVwJywgbW91c2V1cCk7XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgaWYgKHRoaXNGb3JtYXQgPT09ICdyZ2JhJykge1xyXG4gICAgICAgICAgICBjb2xvcnBpY2tlclRlbXBsYXRlLmFkZENsYXNzKCdhbHBoYScpO1xyXG4gICAgICAgICAgICBzbGlkZXJBbHBoYSA9IGNvbG9ycGlja2VyVGVtcGxhdGUuZmluZCgnY29sb3JwaWNrZXItYWxwaGEnKTtcclxuICAgICAgICAgICAgc2xpZGVyQWxwaGEuY3NzKCdoZWlnaHQnLCBjb21wb25lbnRTaXplUHgpO1xyXG4gICAgICAgICAgICBzbGlkZXJBbHBoYVxyXG4gICAgICAgICAgICAgICAgLm9uKCdjbGljaycsIGZ1bmN0aW9uKGV2ZW50KSB7XHJcbiAgICAgICAgICAgICAgICAgIFNsaWRlci5zZXRBbHBoYShldmVudCwgZml4ZWRQb3NpdGlvbiwgY29tcG9uZW50U2l6ZSk7XHJcbiAgICAgICAgICAgICAgICAgIG1vdXNlbW92ZShldmVudCk7XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLm9uKCdtb3VzZWRvd24nLCBmdW5jdGlvbihldmVudCkge1xyXG4gICAgICAgICAgICAgICAgICBTbGlkZXIuc2V0QWxwaGEoZXZlbnQsIGZpeGVkUG9zaXRpb24sIGNvbXBvbmVudFNpemUpO1xyXG4gICAgICAgICAgICAgICAgICBiaW5kTW91c2VFdmVudHMoKTtcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAub24oJ21vdXNldXAnLCBmdW5jdGlvbihldmVudCl7XHJcbiAgICAgICAgICAgICAgICAgIGVtaXRFdmVudCgnY29sb3JwaWNrZXItc2VsZWN0ZWQtYWxwaGEnKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIHNsaWRlckh1ZVxyXG4gICAgICAgICAgICAgIC5vbignY2xpY2snLCBmdW5jdGlvbihldmVudCkge1xyXG4gICAgICAgICAgICAgICAgU2xpZGVyLnNldEh1ZShldmVudCwgZml4ZWRQb3NpdGlvbiwgY29tcG9uZW50U2l6ZSk7XHJcbiAgICAgICAgICAgICAgICBtb3VzZW1vdmUoZXZlbnQpO1xyXG4gICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgLm9uKCdtb3VzZWRvd24nLCBmdW5jdGlvbihldmVudCkge1xyXG4gICAgICAgICAgICAgICAgU2xpZGVyLnNldEh1ZShldmVudCwgZml4ZWRQb3NpdGlvbiwgY29tcG9uZW50U2l6ZSk7XHJcbiAgICAgICAgICAgICAgICBiaW5kTW91c2VFdmVudHMoKTtcclxuICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgIC5vbignbW91c2V1cCcsIGZ1bmN0aW9uKGV2ZW50KXtcclxuICAgICAgICAgICAgICAgIGVtaXRFdmVudCgnY29sb3JwaWNrZXItc2VsZWN0ZWQtaHVlJyk7XHJcbiAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgc2xpZGVyU2F0dXJhdGlvblxyXG4gICAgICAgICAgICAgIC5vbignY2xpY2snLCBmdW5jdGlvbihldmVudCkge1xyXG4gICAgICAgICAgICAgICAgU2xpZGVyLnNldFNhdHVyYXRpb24oZXZlbnQsIGZpeGVkUG9zaXRpb24sIGNvbXBvbmVudFNpemUpO1xyXG4gICAgICAgICAgICAgICAgbW91c2Vtb3ZlKGV2ZW50KTtcclxuICAgICAgICAgICAgICAgIGlmIChhbmd1bGFyLmlzRGVmaW5lZChhdHRycy5jb2xvcnBpY2tlckNsb3NlT25TZWxlY3QpKSB7XHJcbiAgICAgICAgICAgICAgICAgIGhpZGVDb2xvcnBpY2tlclRlbXBsYXRlKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAub24oJ21vdXNlZG93bicsIGZ1bmN0aW9uKGV2ZW50KSB7XHJcbiAgICAgICAgICAgICAgICBTbGlkZXIuc2V0U2F0dXJhdGlvbihldmVudCwgZml4ZWRQb3NpdGlvbiwgY29tcG9uZW50U2l6ZSk7XHJcbiAgICAgICAgICAgICAgICBiaW5kTW91c2VFdmVudHMoKTtcclxuICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgIC5vbignbW91c2V1cCcsIGZ1bmN0aW9uKGV2ZW50KXtcclxuICAgICAgICAgICAgICAgIGVtaXRFdmVudCgnY29sb3JwaWNrZXItc2VsZWN0ZWQtc2F0dXJhdGlvbicpO1xyXG4gICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgIGlmIChmaXhlZFBvc2l0aW9uKSB7XHJcbiAgICAgICAgICAgIGNvbG9ycGlja2VyVGVtcGxhdGUuYWRkQ2xhc3MoJ2NvbG9ycGlja2VyLWZpeGVkLXBvc2l0aW9uJyk7XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgY29sb3JwaWNrZXJUZW1wbGF0ZS5hZGRDbGFzcygnY29sb3JwaWNrZXItcG9zaXRpb24tJyArIHBvc2l0aW9uKTtcclxuICAgICAgICAgIGlmIChpbmxpbmUgPT09ICd0cnVlJykge1xyXG4gICAgICAgICAgICBjb2xvcnBpY2tlclRlbXBsYXRlLmFkZENsYXNzKCdjb2xvcnBpY2tlci1pbmxpbmUnKTtcclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICB0YXJnZXQuYXBwZW5kKGNvbG9ycGlja2VyVGVtcGxhdGUpO1xyXG5cclxuICAgICAgICAgIGlmIChuZ01vZGVsKSB7XHJcbiAgICAgICAgICAgIG5nTW9kZWwuJHJlbmRlciA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICBlbGVtLnZhbChuZ01vZGVsLiR2aWV3VmFsdWUpO1xyXG5cclxuICAgICAgICAgICAgICB1cGRhdGUoKTtcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICBlbGVtLm9uKCdibHVyIGtleXVwIGNoYW5nZScsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICB1cGRhdGUoKTtcclxuICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgIGVsZW0ub24oJyRkZXN0cm95JywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIGNvbG9ycGlja2VyVGVtcGxhdGUucmVtb3ZlKCk7XHJcbiAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICBmdW5jdGlvbiBwcmV2aWV3Q29sb3IoKSB7XHJcbiAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgY29sb3JwaWNrZXJQcmV2aWV3LmNzcygnYmFja2dyb3VuZENvbG9yJywgcGlja2VyQ29sb3JbdGhpc0Zvcm1hdF0oKSk7XHJcbiAgICAgICAgICAgIH0gY2F0Y2ggKGUpIHtcclxuICAgICAgICAgICAgICBjb2xvcnBpY2tlclByZXZpZXcuY3NzKCdiYWNrZ3JvdW5kQ29sb3InLCBwaWNrZXJDb2xvci50b0hleCgpKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBzbGlkZXJTYXR1cmF0aW9uLmNzcygnYmFja2dyb3VuZENvbG9yJywgcGlja2VyQ29sb3IudG9IZXgocGlja2VyQ29sb3IudmFsdWUuaCwgMSwgMSwgMSkpO1xyXG4gICAgICAgICAgICBpZiAodGhpc0Zvcm1hdCA9PT0gJ3JnYmEnKSB7XHJcbiAgICAgICAgICAgICAgc2xpZGVyQWxwaGEuY3NzLmJhY2tncm91bmRDb2xvciA9IHBpY2tlckNvbG9yLnRvSGV4KCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICBmdW5jdGlvbiBtb3VzZW1vdmUoZXZlbnQpIHtcclxuICAgICAgICAgICAgdmFyIFxyXG4gICAgICAgICAgICAgICAgbGVmdCA9IFNsaWRlci5nZXRMZWZ0UG9zaXRpb24oZXZlbnQpLFxyXG4gICAgICAgICAgICAgICAgdG9wID0gU2xpZGVyLmdldFRvcFBvc2l0aW9uKGV2ZW50KSxcclxuICAgICAgICAgICAgICAgIHNsaWRlciA9IFNsaWRlci5nZXRTbGlkZXIoKTtcclxuXHJcbiAgICAgICAgICAgIFNsaWRlci5zZXRLbm9iKHRvcCwgbGVmdCk7XHJcblxyXG4gICAgICAgICAgICBpZiAoc2xpZGVyLmNhbGxMZWZ0KSB7XHJcbiAgICAgICAgICAgICAgcGlja2VyQ29sb3Jbc2xpZGVyLmNhbGxMZWZ0XS5jYWxsKHBpY2tlckNvbG9yLCBsZWZ0IC8gY29tcG9uZW50U2l6ZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHNsaWRlci5jYWxsVG9wKSB7XHJcbiAgICAgICAgICAgICAgcGlja2VyQ29sb3Jbc2xpZGVyLmNhbGxUb3BdLmNhbGwocGlja2VyQ29sb3IsIHRvcCAvIGNvbXBvbmVudFNpemUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHByZXZpZXdDb2xvcigpO1xyXG4gICAgICAgICAgICB2YXIgbmV3Q29sb3IgPSBwaWNrZXJDb2xvclt0aGlzRm9ybWF0XSgpO1xyXG4gICAgICAgICAgICBlbGVtLnZhbChuZXdDb2xvcik7XHJcbiAgICAgICAgICAgIGlmIChuZ01vZGVsKSB7XHJcbiAgICAgICAgICAgICAgJHNjb3BlLiRhcHBseShuZ01vZGVsLiRzZXRWaWV3VmFsdWUobmV3Q29sb3IpKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAod2l0aElucHV0KSB7XHJcbiAgICAgICAgICAgICAgcGlja2VyQ29sb3JJbnB1dC52YWwobmV3Q29sb3IpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICBmdW5jdGlvbiBtb3VzZXVwKCkge1xyXG4gICAgICAgICAgICBlbWl0RXZlbnQoJ2NvbG9ycGlja2VyLXNlbGVjdGVkJyk7XHJcbiAgICAgICAgICAgICRkb2N1bWVudC5vZmYoJ21vdXNlbW92ZScsIG1vdXNlbW92ZSk7XHJcbiAgICAgICAgICAgICRkb2N1bWVudC5vZmYoJ21vdXNldXAnLCBtb3VzZXVwKTtcclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICBmdW5jdGlvbiB1cGRhdGUob21pdElubmVySW5wdXQpIHtcclxuICAgICAgICAgICAgcGlja2VyQ29sb3Iuc2V0Q29sb3IoZWxlbS52YWwoKSk7XHJcbiAgICAgICAgICAgIGlmICh3aXRoSW5wdXQgJiYgIW9taXRJbm5lcklucHV0KSB7XHJcbiAgICAgICAgICAgICAgcGlja2VyQ29sb3JJbnB1dC52YWwoZWxlbS52YWwoKSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcGlja2VyQ29sb3JQb2ludGVycy5lcSgwKS5jc3Moe1xyXG4gICAgICAgICAgICAgIGxlZnQ6IHBpY2tlckNvbG9yLnZhbHVlLnMgKiBjb21wb25lbnRTaXplICsgJ3B4JyxcclxuICAgICAgICAgICAgICB0b3A6IGNvbXBvbmVudFNpemUgLSBwaWNrZXJDb2xvci52YWx1ZS5iICogY29tcG9uZW50U2l6ZSArICdweCdcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHBpY2tlckNvbG9yUG9pbnRlcnMuZXEoMSkuY3NzKCd0b3AnLCBjb21wb25lbnRTaXplICogKDEgLSBwaWNrZXJDb2xvci52YWx1ZS5oKSArICdweCcpO1xyXG4gICAgICAgICAgICBwaWNrZXJDb2xvclBvaW50ZXJzLmVxKDIpLmNzcygndG9wJywgY29tcG9uZW50U2l6ZSAqICgxIC0gcGlja2VyQ29sb3IudmFsdWUuYSkgKyAncHgnKTtcclxuICAgICAgICAgICAgcHJldmlld0NvbG9yKCk7XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgZnVuY3Rpb24gZ2V0Q29sb3JwaWNrZXJUZW1wbGF0ZVBvc2l0aW9uKCkge1xyXG4gICAgICAgICAgICB2YXJcclxuICAgICAgICAgICAgICAgIHBvc2l0aW9uVmFsdWUsXHJcbiAgICAgICAgICAgICAgICBwb3NpdGlvbk9mZnNldCA9IEhlbHBlci5nZXRPZmZzZXQoZWxlbVswXSk7XHJcblxyXG4gICAgICAgICAgICBpZihhbmd1bGFyLmlzRGVmaW5lZChhdHRycy5jb2xvcnBpY2tlclBhcmVudCkpIHtcclxuICAgICAgICAgICAgICBwb3NpdGlvbk9mZnNldC5sZWZ0ID0gMDtcclxuICAgICAgICAgICAgICBwb3NpdGlvbk9mZnNldC50b3AgPSAwO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAocG9zaXRpb24gPT09ICd0b3AnKSB7XHJcbiAgICAgICAgICAgICAgcG9zaXRpb25WYWx1ZSA9ICB7XHJcbiAgICAgICAgICAgICAgICAndG9wJzogcG9zaXRpb25PZmZzZXQudG9wIC0gMTQ3LFxyXG4gICAgICAgICAgICAgICAgJ2xlZnQnOiBwb3NpdGlvbk9mZnNldC5sZWZ0XHJcbiAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChwb3NpdGlvbiA9PT0gJ3JpZ2h0Jykge1xyXG4gICAgICAgICAgICAgIHBvc2l0aW9uVmFsdWUgPSB7XHJcbiAgICAgICAgICAgICAgICAndG9wJzogcG9zaXRpb25PZmZzZXQudG9wLFxyXG4gICAgICAgICAgICAgICAgJ2xlZnQnOiBwb3NpdGlvbk9mZnNldC5sZWZ0ICsgMTI2XHJcbiAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChwb3NpdGlvbiA9PT0gJ2JvdHRvbScpIHtcclxuICAgICAgICAgICAgICBwb3NpdGlvblZhbHVlID0ge1xyXG4gICAgICAgICAgICAgICAgJ3RvcCc6IHBvc2l0aW9uT2Zmc2V0LnRvcCArIGVsZW1bMF0ub2Zmc2V0SGVpZ2h0ICsgMixcclxuICAgICAgICAgICAgICAgICdsZWZ0JzogcG9zaXRpb25PZmZzZXQubGVmdFxyXG4gICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAocG9zaXRpb24gPT09ICdsZWZ0Jykge1xyXG4gICAgICAgICAgICAgIHBvc2l0aW9uVmFsdWUgPSB7XHJcbiAgICAgICAgICAgICAgICAndG9wJzogcG9zaXRpb25PZmZzZXQudG9wLFxyXG4gICAgICAgICAgICAgICAgJ2xlZnQnOiBwb3NpdGlvbk9mZnNldC5sZWZ0IC0gMTUwXHJcbiAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICd0b3AnOiBwb3NpdGlvblZhbHVlLnRvcCArICdweCcsXHJcbiAgICAgICAgICAgICAgJ2xlZnQnOiBwb3NpdGlvblZhbHVlLmxlZnQgKyAncHgnXHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgZnVuY3Rpb24gZG9jdW1lbnRNb3VzZWRvd25IYW5kbGVyKCkge1xyXG4gICAgICAgICAgICBoaWRlQ29sb3JwaWNrZXJUZW1wbGF0ZSgpO1xyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIGZ1bmN0aW9uIHNob3dDb2xvcnBpY2tlclRlbXBsYXRlKCkge1xyXG5cclxuICAgICAgICAgICAgaWYgKCFjb2xvcnBpY2tlclRlbXBsYXRlLmhhc0NsYXNzKCdjb2xvcnBpY2tlci12aXNpYmxlJykpIHtcclxuICAgICAgICAgICAgICB1cGRhdGUoKTtcclxuICAgICAgICAgICAgICBjb2xvcnBpY2tlclRlbXBsYXRlXHJcbiAgICAgICAgICAgICAgICAuYWRkQ2xhc3MoJ2NvbG9ycGlja2VyLXZpc2libGUnKVxyXG4gICAgICAgICAgICAgICAgLmNzcyhnZXRDb2xvcnBpY2tlclRlbXBsYXRlUG9zaXRpb24oKSk7XHJcbiAgICAgICAgICAgICAgZW1pdEV2ZW50KCdjb2xvcnBpY2tlci1zaG93bicpO1xyXG5cclxuICAgICAgICAgICAgICBpZiAoaW5saW5lID09PSBmYWxzZSkge1xyXG4gICAgICAgICAgICAgICAgLy8gcmVnaXN0ZXIgZ2xvYmFsIG1vdXNlZG93biBldmVudCB0byBoaWRlIHRoZSBjb2xvcnBpY2tlclxyXG4gICAgICAgICAgICAgICAgJGRvY3VtZW50Lm9uKCdtb3VzZWRvd24nLCBkb2N1bWVudE1vdXNlZG93bkhhbmRsZXIpO1xyXG4gICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgaWYgKGF0dHJzLmNvbG9ycGlja2VySXNPcGVuKSB7XHJcbiAgICAgICAgICAgICAgICAkc2NvcGVbYXR0cnMuY29sb3JwaWNrZXJJc09wZW5dID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIGlmICghJHNjb3BlLiQkcGhhc2UpIHtcclxuICAgICAgICAgICAgICAgICAgJHNjb3BlLiRkaWdlc3QoKTsgLy90cmlnZ2VyIHRoZSB3YXRjaGVyIHRvIGZpcmVcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICBpZiAoaW5saW5lID09PSBmYWxzZSkge1xyXG4gICAgICAgICAgICBlbGVtLm9uKCdjbGljaycsIHNob3dDb2xvcnBpY2tlclRlbXBsYXRlKTtcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHNob3dDb2xvcnBpY2tlclRlbXBsYXRlKCk7XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgY29sb3JwaWNrZXJUZW1wbGF0ZS5vbignbW91c2Vkb3duJywgZnVuY3Rpb24gKGV2ZW50KSB7XHJcbiAgICAgICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgZnVuY3Rpb24gZW1pdEV2ZW50KG5hbWUpIHtcclxuICAgICAgICAgICAgaWYgKG5nTW9kZWwpIHtcclxuICAgICAgICAgICAgICAkc2NvcGUuJGVtaXQobmFtZSwge1xyXG4gICAgICAgICAgICAgICAgbmFtZTogYXR0cnMubmdNb2RlbCxcclxuICAgICAgICAgICAgICAgIHZhbHVlOiBuZ01vZGVsLiRtb2RlbFZhbHVlXHJcbiAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICBmdW5jdGlvbiBoaWRlQ29sb3JwaWNrZXJUZW1wbGF0ZSgpIHtcclxuICAgICAgICAgICAgaWYgKGNvbG9ycGlja2VyVGVtcGxhdGUuaGFzQ2xhc3MoJ2NvbG9ycGlja2VyLXZpc2libGUnKSkge1xyXG4gICAgICAgICAgICAgIGNvbG9ycGlja2VyVGVtcGxhdGUucmVtb3ZlQ2xhc3MoJ2NvbG9ycGlja2VyLXZpc2libGUnKTtcclxuICAgICAgICAgICAgICBlbWl0RXZlbnQoJ2NvbG9ycGlja2VyLWNsb3NlZCcpO1xyXG4gICAgICAgICAgICAgIC8vIHVucmVnaXN0ZXIgdGhlIGdsb2JhbCBtb3VzZWRvd24gZXZlbnRcclxuICAgICAgICAgICAgICAkZG9jdW1lbnQub2ZmKCdtb3VzZWRvd24nLCBkb2N1bWVudE1vdXNlZG93bkhhbmRsZXIpO1xyXG5cclxuICAgICAgICAgICAgICBpZiAoYXR0cnMuY29sb3JwaWNrZXJJc09wZW4pIHtcclxuICAgICAgICAgICAgICAgICRzY29wZVthdHRycy5jb2xvcnBpY2tlcklzT3Blbl0gPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIGlmICghJHNjb3BlLiQkcGhhc2UpIHtcclxuICAgICAgICAgICAgICAgICAgJHNjb3BlLiRkaWdlc3QoKTsgLy90cmlnZ2VyIHRoZSB3YXRjaGVyIHRvIGZpcmVcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICBjb2xvcnBpY2tlclRlbXBsYXRlLmZpbmQoJ2J1dHRvbicpLm9uKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgaGlkZUNvbG9ycGlja2VyVGVtcGxhdGUoKTtcclxuICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgIGlmIChhdHRycy5jb2xvcnBpY2tlcklzT3Blbikge1xyXG4gICAgICAgICAgICAkc2NvcGUuJHdhdGNoKGF0dHJzLmNvbG9ycGlja2VySXNPcGVuLCBmdW5jdGlvbihzaG91bGRCZU9wZW4pIHtcclxuXHJcbiAgICAgICAgICAgICAgaWYgKHNob3VsZEJlT3BlbiA9PT0gdHJ1ZSkge1xyXG4gICAgICAgICAgICAgICAgc2hvd0NvbG9ycGlja2VyVGVtcGxhdGUoKTtcclxuICAgICAgICAgICAgICB9IGVsc2UgaWYgKHNob3VsZEJlT3BlbiA9PT0gZmFsc2UpIHtcclxuICAgICAgICAgICAgICAgIGhpZGVDb2xvcnBpY2tlclRlbXBsYXRlKCk7XHJcbiAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9O1xyXG4gICAgfV0pO1xyXG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9hbmd1bGFyLWJvb3RzdHJhcC1jb2xvcnBpY2tlci9qcy9ib290c3RyYXAtY29sb3JwaWNrZXItbW9kdWxlLmpzXG4gKiogbW9kdWxlIGlkID0gMVxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIl0sInNvdXJjZVJvb3QiOiIifQ==