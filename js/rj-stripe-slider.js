// rj-auxilary.js content (ES5, contains tools necessary for writing rj-stripe-slider.js)
var aUtils = aUtils || {
	// Removing class
	// pass only elSelector -> remove all classes from selected objects
	// pass elSelector and elClass -> remove elClass from selected objects
	removeClass: function (elSelector, elClass) {
		var argLength = arguments.length,
			elements,
			elCheckClass, 
			elCheckClassArray,
			elLength,
			i, j;
		
		// Checking if there is a node or elements collection
		if (elSelector === undefined || elSelector === null) {
			console.warn('The node doesn\'t exist');
			return;
		} else if (elSelector.nodeType === undefined) {
			elements = document.querySelectorAll(elSelector);
		} else {
			elements = elSelector;
		}
		
		if (elements.length === 0) {
			console.warn('There are no elements with this class');
			return;
		} else if (elements.length > 0) {
			elLength = elements.length;
			
			switch (argLength) {
			case 1:
				for (i = 0; i < elLength; i++) {
					elements[i].className = '';
				}
				break;
			case 2:
				for (i = 0; i < elLength; i++) {
					elCheckClass = elements[i].className;
					elCheckClassArray = elCheckClass.split(' ');
					
					for (j = 0; j < elCheckClassArray.length; j++) {
						if (elCheckClassArray[j] === elClass) {
							elCheckClassArray.splice(j, 1);
						}
					}
					
					if (elCheckClassArray.length === 0) {		// When after removing class the array is empty
						elements[i].className = '';
					} else if (elCheckClassArray.length === 1) {
						elements[i].className = elCheckClassArray[0];
					} else {
						elements[i].className = elCheckClassArray[0];
						
						for (j = 1; j < elCheckClassArray.length; j++) {
							elements[i].className += (' ' + elCheckClassArray[j]);
						}
					}
				}
				break;
			default:
				return;
			}
		} else {
			switch (argLength) {
			case 1:
				elements.className = '';
				break;
			case 2:
				elCheckClass = elements.className;
				elCheckClassArray = elCheckClass.split(' ');
				
				for (i = 0; i < elCheckClassArray.length; i++) {
					if (elCheckClassArray[i] === elClass) {
						elCheckClassArray.splice(i, 1);
					}
				}
				
				if (elCheckClassArray.length === 0) {		// When after removing class the array is empty
					elements.className = '';
				} else if (elCheckClassArray.length === 1) {
					elements.className = elCheckClassArray[0];
				} else {
					elements.className = elCheckClassArray[0];
					
					for (i = 1; i < elCheckClassArray.length; i++) {
						elements.className += (' ' + elCheckClassArray[i]);
					}
				}
				break;
			default:
				return;
			}					
		}
	},
	// Adding class
	// pass elSelector and elClass -> adds elClass to selected objects			
	addClass: function (elSelector, elClass) {
		var argLength = arguments.length,
			elSelector,
			elClass,
			elements,
			elLength,
			i;	
	
		// Checking if there is a node or elements collection
		if (elSelector === undefined || elSelector === null) {
			console.warn('The node doesn\'t exist');
			return;
		} else if (elSelector.nodeType === undefined) {
			elements = document.querySelectorAll(elSelector);
		} else {
			elements = elSelector;
		}

		if (elements.length === 0) {
			console.warn('There are no elements with this class');
			return;
		} else if (elements.length > 0) {
			elLength = elements.length;
			
			if (argLength === 2) {
				if (elLength > 0) {
					for (i = 0; i < elLength; i++) {
						if (elements[i].className === '') {
							elements[i].className = elClass;
						} else {
							if (elements[i].className.indexOf(elClass) >= 0) {
								return;
							} else {
								elements[i].className += (' ' + elClass);
							}
						}
					}
				} else {
					return;
				}
			} else {
				console.warn('There is no class selected to add');
				return;
			}
		} else {
			if (argLength === 2) {
				if (elements.className === '') {
					elements.className = elClass;
				} else {
					if (elements.className.indexOf(elClass) >= 0) {
						return;
					} else {
						elements.className += (' ' + elClass);
					}
				}
			} else {
				console.warn('There is no class selected to add');
				return;
			}					
		}
	},
	// Checking if object has class
	// pass elSelector and elClass -> check if selected object (only one!) has elClass
	hasClass: function (elSelector, elClass) {
		if (arguments.length === 2) {
			var result = false,
				elClass,
				elements, 
				classArray,
				i;
				
			// Checking if there is a node or elements collection
			if (elSelector === undefined || elSelector === null) {
				console.warn('The selector doesn\'t contain any element');
				return;
			} else if (typeof elSelector === 'string') {
				elements = document.querySelector(elSelector);
			} else {
				elements = elSelector;
			}			

			classArray = elements.className.split(' ');
			
			for (i = 0; i < classArray.length; i++) {
				if (classArray[i] === elClass) {
					result = true;
				}
			}
			return result;					
		} else {
			console.warn('Too less arguments');
			return;
		}			
	}
};

// rj-stripe-slider.js code
'use strict';
class StripeSlider {
    constructor(sliderId, options) {
        const defaultOptions = {
            slideWidth: 300,
            slideHeight: 100,
            autoslide: true,
            autoslideSpeed: 2000,
            navigation: true,
            animation: 'wobble',
            arrowStyle: 'black'
        }

        this.options = Object.assign({}, defaultOptions, options);

        this.sliderId = sliderId
        this.slider = document.getElementById(this.sliderId);
        this.page = document.documentElement;
        this.navButtons = this.slider.querySelectorAll('.rjss-navigation');
        this.leftButton = this.slider.querySelector('.rjss-left');
        this.rightButton = this.slider.querySelector('.rjss-right');
        this.slideBar = this.slider.querySelector('.rjss-bar');
        this.slideContainer = this.slider.querySelector('.rjss-container');
        this.slides = this.slider.querySelectorAll('.rjss-slide');
        this.slidesCount = this.slides.length;
        this.images = this.slider.querySelectorAll('.rjss-img');
        this.navMargin = 40;
        this.slideMargin = 20;
        this.navigationWidth = 2 * (this.leftButton.offsetWidth + this.navMargin);
        this.play = this.options.autoslide;
        this.vector = undefined;
        this.imagesParameter = undefined;
        this.actualMargin = undefined;
        this.autoslider = undefined;
        this.sliderEls = document.querySelectorAll(`#${sliderId} *`);

        // Buffer two functions in order to remove them easily from event listeners
        this.slideBind = this.slide.bind(this);
        this.slidingBind = this.sliding.bind(this);

        // Mark this slider elements
        // It is needed when pausing autoslide on hover
        // The system must know that user hovers (stops) this slider, not other
        // (It is possible to have multiple sliders on one page)
        for (let sliderEl of this.sliderEls) {
            sliderEl.dataset.slider = sliderId;
        }

        // Change arrow style
        const arrowStyles = ['black', 'white', 'green']
        if (!arrowStyles.includes(this.options.arrowStyle)) {
            console.warn('Wrong name of arrow style passed by slider options');
        } else {
            aUtils.addClass(this.leftButton, `rjss-${this.options.arrowStyle}`);
            aUtils.addClass(this.rightButton, `rjss-${this.options.arrowStyle}`);
        }

        // Change animation style
        const animations = ['wobble', 'dash', 'skew', 'linear']
        if (!animations.includes(this.options.animation)) {
            console.warn('Wrong name of animation passed by slider options');
        } else {
            aUtils.addClass(this.slideBar, `rjss-${this.options.animation}`);
        }

        // Calculate sizes of slider elements again when resize (using debouncing)
        // and after the page is fully loaded
        window.addEventListener('resize', StripeSlider.debouncing(this.sliderInit.bind(this), 600));
        window.addEventListener('load', this.sliderInit.bind(this));
    }
    sliderInit() {
        // Hide document scrollbar before calculating sizes
        // User can use huge images and before they are resized
        // they can cause appearing of document scrollbar
        // (in situations when scrollbar is not expected on page)
        // which leads to errors in slider size calculations
        this.page.style.overflow = 'hidden';

        // Stopping autoslide before calculating vectors
        // Without this, on resize event, autoslide will
        // start without re-calculated vector
        // which cause malfunction of slider
        clearInterval(this.autoslider);

        // Reset slider (slide maximally to the left) when the resize event occurs
        this.slideBar.style.marginLeft = 0;
        aUtils.addClass(this.leftButton, 'rjss-blocked');
        aUtils.removeClass(this.rightButton, 'rjss-blocked');

        // When place for slides is less or equal size of one slide
        // then set slides width to possible max (there will be place only for one slide visible)
        // otherwise set width as value provided in options
        if (this.slider.offsetWidth <= (this.options.slideWidth + this.slideMargin + this.navigationWidth)) {
            this.vector = this.slider.offsetWidth - this.navigationWidth;

            for (let i = this.slidesCount; i--; ) {
                this.slides[i].style.width = `${this.vector - this.slideMargin}px`;
                this.slides[i].style.height = `${this.options.slideHeight}px`;
            }
        } else {
            this.vector = this.options.slideWidth + this.slideMargin;

            for (let i = this.slidesCount; i--; ) {
                this.slides[i].style.width = `${this.options.slideWidth}px`;
                this.slides[i].style.height = `${this.options.slideHeight}px`;
            }
        }

        // Calculate how many images with specified width can be visible in container in one moment
        let containerWidth = Math.floor(this.slider.offsetWidth);
        let freeSpace = containerWidth - this.navigationWidth;
        this.imagesParameter = Math.floor(freeSpace / this.vector);

        // Adjusting width of slides bar
        this.slideBar.style.width = `${this.vector * this.slidesCount}px`;
        let windowSize = this.imagesParameter * this.vector;
        let windowMargin = (containerWidth - windowSize - this.navigationWidth) / 2;
        this.slideContainer.style.width = `${windowSize}px`;
        this.slideContainer.style.margin = `0 ${windowMargin}px`;

        // Centering vertical position of navigation
        for (let navButton of this.navButtons) {
            navButton.style.marginTop = `${(this.options.slideHeight - navButton.offsetHeight)/2}px`;
        }

        // Show navigation buttons when navigation is on
        // and the count of slides is greater than the possible place
        // otherwise sliding is pointless so hide buttons and don't let to slide
        // also align slides bar to the middle of page
        if (this.options.navigation) {
            if (this.slidesCount <= this.imagesParameter) {
                if (!aUtils.hasClass(`#${this.sliderId} .rjss-navigation`, 'rjss-hidden')) {
                    aUtils.addClass(`#${this.sliderId} .rjss-navigation`, 'rjss-hidden');
                    aUtils.addClass(`#${this.sliderId} .rjss-bar`, 'rjss-center');
                }
                this.slider.removeEventListener('click', this.slideBind);
            } else {
                if (aUtils.hasClass(`#${this.sliderId} .rjss-navigation`, 'rjss-hidden')) {
                    aUtils.removeClass(`#${this.sliderId} .rjss-navigation`, 'rjss-hidden');
                    aUtils.removeClass(`#${this.sliderId} .rjss-bar`, 'rjss-center');
                }
                this.slider.addEventListener('click', this.slideBind);
            }
        }

        // If autoslide option is on
        // and the count of slides is lower than the possible place
        // then stop autoslide
        if (this.options.autoslide) {
            if (this.slidesCount <= this.imagesParameter) {
                this.page.removeEventListener('mouseover', this.slidingBind);
                clearInterval(this.autoslider);
            } else {
                this.autoslider = setInterval(this.autoslide.bind(this), this.options.autoslideSpeed);
                this.page.addEventListener('mouseover', this.slidingBind);
            }
        }

        // Classify images
        this.classifyImg();

        // Enable page scrollbar after providing proper calculations
        this.page.style.overflow = '';
    }
    // Sliding when clicking navigation buttons
    slide(e) {
        this.actualMargin = parseInt(this.slideBar.style.marginLeft, 10);

        if (aUtils.hasClass(e.target, 'rjss-left')) {

            // Unblock right navigation button when sliding left
            if (aUtils.hasClass(this.rightButton, 'rjss-blocked')) {
                aUtils.removeClass(this.rightButton, 'rjss-blocked');
            }

            // Sliding left
            if (this.actualMargin < 0) {
                this.slideBar.style.marginLeft = `${this.actualMargin + this.vector}px`;
            }

            // Block left navigation button when there are no more slides
            if (this.actualMargin >= -this.vector) {
                aUtils.addClass(this.leftButton, 'rjss-blocked');
            }

            // Animation when clicking left
            aUtils.addClass(this.slideBar, 'rjss-animated-left');
            setTimeout(() => {
                aUtils.removeClass(this.slideBar, 'rjss-animated-left');
            }, 600);
        } else if (aUtils.hasClass(e.target, 'rjss-right')) {

            // Unblock left navigation button when sliding right
            if (aUtils.hasClass(this.leftButton, 'rjss-blocked')) {
                aUtils.removeClass(this.leftButton, 'rjss-blocked');
            }

            // Sliding right
            if (this.actualMargin <= 0 && this.actualMargin > (this.slideContainer.offsetWidth - this.slideBar.offsetWidth)) {
                this.slideBar.style.marginLeft = `${parseInt(this.actualMargin, 10) - this.vector}px`;
            }

            // Block right navigation button when there are no more slides on right
            if (this.actualMargin <= (this.slideContainer.offsetWidth - this.slideBar.offsetWidth + this.vector)) {
                aUtils.addClass(this.rightButton, 'rjss-blocked');
            }

            // Animation when clicking right
            aUtils.addClass(this.slideBar, 'rjss-animated-right');
            setTimeout(() => {
                aUtils.removeClass(this.slideBar, 'rjss-animated-right');
            }, 600);
        }
    }
    // Automatic sliding
    autoslide() {
        this.actualMargin = parseInt(this.slideBar.style.marginLeft, 10);

        if (this.actualMargin <= 0 && this.actualMargin > (this.slideContainer.offsetWidth - this.slideBar.offsetWidth)) {

            // Unblock left navigation button when sliding right
            if (aUtils.hasClass(this.leftButton, 'rjss-blocked')) {
                aUtils.removeClass(this.leftButton, 'rjss-blocked');
            }

            // Sliding right
            this.slideBar.style.marginLeft = `${parseInt(this.actualMargin, 10) - this.vector}px`;

            // Block right navigation button when there are no more slides
            if (this.actualMargin <= (this.slideContainer.offsetWidth - this.slideBar.offsetWidth + this.vector)) {
                aUtils.addClass(this.rightButton, 'rjss-blocked');
            }

            // Animate when sliding right
            aUtils.addClass(this.slideBar, 'rjss-animated-right');
            setTimeout(() => {
                aUtils.removeClass(this.slideBar, 'rjss-animated-right');
            }, 600);

        // When there is no more slides, return to beginning of the bar
        } else {
            this.slideBar.style.marginLeft = '0px';

            // Animate when slide left
            aUtils.addClass(this.slideBar, 'rjss-animated-left');
            setTimeout(() =>  {
                aUtils.removeClass(this.slideBar, 'rjss-animated-left');
            }, 600);

            aUtils.addClass(this.leftButton, 'rjss-blocked');
            aUtils.removeClass(this.rightButton, 'rjss-blocked');
        }
    }
    // Classifying images in order to highlight them in the best way on bar
    classifyImg() {
        for (let i = this.images.length; i--; ) {
            let imgHeight = this.images[i].offsetHeight;
            let imgWidth = this.images[i].offsetWidth;

            if ((imgWidth >= imgHeight) && (imgWidth/imgHeight >= parseInt(this.slides[i].style.width, 10)/parseInt(this.slides[i].style.height, 10))) {
                // First removing both classes in order to reset after resize event
                aUtils.removeClass(this.images[i], 'rjss-vertical');
                aUtils.removeClass(this.images[i], 'rjss-horizontal');
                aUtils.addClass(this.images[i], 'rjss-horizontal');
            } else {
                // First removing both classes in order to reset after resize event
                aUtils.removeClass(this.images[i], 'rjss-vertical');
                aUtils.removeClass(this.images[i], 'rjss-horizontal');
                aUtils.addClass(this.images[i], 'rjss-vertical');
            }
        }
    }
    // Stop autoslide when hovering over this slider and start when hovering on other elements
    sliding (e) {
        if (e.target.dataset.slider === this.sliderId && this.play) {
            this.play = false;
            clearInterval(this.autoslider);
        } else if (!(e.target.dataset.slider === this.sliderId) && !this.play) {
            this.play = true;
            this.autoslider = setInterval(this.autoslide.bind(this), this.options.autoslideSpeed);
        }
    }
    // Debouncing for resize
    static debouncing(fn, delay) {
        let delayed;

        return function (e) {
            clearTimeout(delayed);
            delayed = setTimeout(function () {
                fn(e);
            }, delay);
        };
    }
}
