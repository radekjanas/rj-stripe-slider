# rj-stripe-slider - Clever responsive logo slider

rj-stripe-slider displays configurable slider widget. It is designed for displaying logos in "Company Partners" section but of course it can be used for other purposes.
This plugin has been created for one of my commercial projects.

## Screenshot
![rj-stripe-slider](./screenshot.png)

## Why stripe slider is clever?

Lets say you have 12 images (and each has 200px of width) in slider and the container with slider is full width:

* When the screen width is 1920px everything works perfectly because the "logos stripe" is wider (12 * 200px = 2400px) than screen width. You can click slider navigation to slide the stripe, slider autoslide also works.
* When the screen is wider than "logos stripe", for example 3000px - Oooops, in this moment there is no sense in placing navigation arrows and have slider autoslide working because every logos are present on the screen. There is no point in sliding it.

Of course - that's why in above example stripe slider automatically will turn off slider autoslide, hide navigation and center the "logos stripe" in container to make it look nice.
Moreover, you can place images with any dimensions in your HTML. Stripe slider will take care of fitting it to the slide box with specified `slideWidth` and `slideHeight` and the image will always look fine.
Clever, isn't it? :)

## How to use

1. Upload CSS, JS and IMG files to your project
2. Add proper links to files in your HTML
3. Check if url address for navigation buttons images are set properly for your project file system in CSS file (line 17)
4. Prepare HTML code for the slider as presented in "Slider HTML" section
5. Add stripe slider with configuration object in your HTML in a way presented in "Configuration" section

## Slider HTML

Prepare HTML code for stripe slider and add this to your page. Of course there is also no problem in adding two stripe sliders on your page.

```html
<div id="your-slider-id" class="rjss">
    <div class="rjss-navigation rjss-left rjss-blocked"></div>
    <div class="rjss-container">
        <div class="rjss-bar">
            <a class="rjss-slide" href="partner1.com"><img class="rjss-img" src="img/logo-1.png" alt="Logo 1"></a>
            <a class="rjss-slide" href="partner2.com"><img class="rjss-img" src="img/logo-2.png" alt="Logo 2"></a>
            <a class="rjss-slide" href="partner3.com"><img class="rjss-img" src="img/logo-3.png" alt="Logo 3"></a>
            <a class="rjss-slide" href="partner4.com"><img class="rjss-img" src="img/logo-4.png" alt="Logo 4"></a>
            <!-- Any number of rjss-slide elements, the more the better :) -->
        </div>
    </div>
    <div class="rjss-navigation rjss-right"></div>
</div>
```

## Configuration

To add stripe slider with complete configuration object use this code and configure it in a way displayed below snippet:

```Javascript
const sliderName = new StripeSlider('sliderId', {
    slideWidth: 300,
    slideHeight: 100,
    autoslide: true,
    autoslideSpeed: 2000,
    navigation: true,
    animation: 'wobble',
    arrowStyle: 'black'
});
```

The code presented above contains a configuration object. These are also default options so if you don't provide any of options when adding stripe slider, it will be added to your page with these options. Now lets get further information about every configuration options:

* `sliderId` - insert `your-slider-id` (same as in slider HTML code) **(string)**
* `slideWidth` - set slide width (it will be treated like in pixels). e.g. `300` **(number)**
* `slideHeight` - set slide height (it will be treated like in pixels). e.g. `100` **(number)**
* `autoslide` - decide whether the slider should autoslide. Choose between `true` and `false` **(boolean)**
* `autoslideSpeed` - when in `autoslide` you have chosen `true` then it sets the time after which the stripe automatically slides. The value will be treated like in milliseconds. e.g. `2000`. If in `autoslide` you have chosen `false` then `autoslideSpeed` will change nothing **(number)**
* `navigation` - decide whether the slider should have navigation. Choose between `true` and `false` **(boolean)**
* `animation` - choose slide animation: `wobble`, `dash`, `skew` or `linear` **(string)**
* `arrowStyle` - choose navigation buttons color: `black`, `white` or `green` **(string)**

## Technologies used
* JavaScript (ES5, ES6)
* CSS
* HTML

## Project status
Finished
