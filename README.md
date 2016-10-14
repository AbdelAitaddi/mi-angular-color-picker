# mi-angular-color-picker

## Installation

Install with [npm](https://www.npmjs.com/)

```sh
$ npm install mi-angular-color-picker --save
```

## Development

Copy css/colorpicker.css and js/mi-angular-color-picker.js. Add a dependency to your app, for instance:


```
angular.module('myApp', ['mi.ColorPicker'])
```

## Examples
in your formly model:

    {
         key: 'backgroundColor',
         type: 'colorpicker',
         defaultValue: '#961c1c',
         templateOptions: {
         label: $translate.instant('customize.form.backgroundColor.label'),
         placeholder: $translate.instant('customize.form.backgroundColor.placeholder'),
         required: true,
         colorPickerFormat: '\'hex\'',
         colorPickerAlpha: true,
         colorPickerPos: '\'top left\'',
         colorPickerSwatchBootstrap: false
         },
         validation: {
           show: true
         }
    }



## Contributing

1. Fork it
2. Create your feature branch (`git checkout -b my-new-feature`)
3. Commit your changes (`git commit -am 'Add some feature'`)
4. Push to the branch (`git push origin my-new-feature`)
5. Create new Pull Request


# License

This library is under the [MIT license](https://github.com/krimovish/mi-angular-color-picker/blob/master/LICENSE).