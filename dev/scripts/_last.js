/*
 * Custom scripts
 */
(function ($) {

})(jQuery);


window.addEventListener( "DOMContentLoaded", function() {
    new MyScript();
});
window.addEventListener("resize", function() {
    new ResizeWindiw();
});

function ResizeWindiw() {
    new SliderResize();
}

function MyScript() {
    new Burger();
    new Slider();
    new Tabs();
    new InitMap();
    new Form();
    new Numbers();
}

function Burger() {
    this.boxBurger = document.querySelector('.burger');
    this.navMenu = document.querySelector('.nav-menu');
    this.boxBurger.addEventListener('click', this.addEvent.bind(this));
}

Burger.prototype.addEvent = function () {
    this.navMenu.classList.toggle("nav-menu_visibility-none");
    this.navMenu.classList.toggle("nav-menu_visibility-block");
    this.burgerLineTop = this.boxBurger.querySelector('.js-line-top');
    this.burgerLineTop.classList.toggle("burger-top");
    this.burgerLineMidle = this.boxBurger.querySelector('.js-line-midle');
    this.burgerLineMidle.classList.toggle("burger-midle");
    this.burgerLineBottom = this.boxBurger.querySelector('.js-line-bottom');
    this.burgerLineBottom.classList.toggle("burger-bottom");
};


window.addEventListener("scroll", function() {
    this.header = document.querySelector('.header');
    this.section = document.querySelector('.section');
    this.headerData = this.header.getAttribute('data-speed');
    this.sectionData = this.section.getAttribute('data-speed');
    var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    position = scrollTop / this.headerData;
    this.header.style.cssText += "background-position: center "+position+"px;";
    this.section.style.cssText += "background-position: center "+position+"px;";
});



function SliderResize() {
    this.sliderResize = document.querySelector('.slider');
    this.sliderElemResize =  this.sliderResize.querySelector('.slider__elem');
    this.traks =  this.sliderResize.querySelector('.track-slider');
    this.getStyle();
    this.updateTransform();
}

SliderResize.prototype.getStyle = function () {
    this.heightResize = this.sliderElemResize.clientHeight;
    this.sliderResize.style.cssText += "height:"+this.heightResize+"px;";
};

SliderResize.prototype.updateTransform = function () {
    var sliderDotsResize = this.sliderResize.querySelector('.slider__dots');
        dotsItemResize = sliderDotsResize.querySelector('.js-active');
       dataAttr = dotsItemResize.getAttribute('data-slider');

        numberUpdate = -this.heightResize * dataAttr;

    this.traks.style.cssText += "transform: translateY("+numberUpdate+"px);transition: transform ease 0ms;";
};
function Slider() {
    this.slider = document.querySelector('.slider');
    this.addNewsElemet();
    this.cloneSliderElem();
}

Slider.prototype.addNewsElemet = function () {
    var newsElem = document.createElement('div');
    newsElem.setAttribute("class", "track-slider");
    this.slider.appendChild(newsElem);
    this.trackSlider = this.slider.querySelector('.track-slider');

};

Slider.prototype.cloneSliderElem = function () {
    this.sliderElem = this.slider.querySelectorAll('.slider__elem');
    this.addStyle();
    this.addPattern();
    for(var q=0;q<this.sliderElem.length;q++) {
        this.clone = this.sliderElem[q].cloneNode(true);
        this.trackSlider.appendChild(this.clone);
        this.slider.removeChild(this.sliderElem[q]);
    }
};

Slider.prototype.addStyle = function () {
    this.height = parseInt(getComputedStyle(this.sliderElem[0]).height);
    h = getComputedStyle(this.sliderElem[0]).height;
    w = getComputedStyle(this.sliderElem[0]).width;
    nw =this.sliderElem[0].clientHeight;
    this.slider.style.cssText += "height:"+this.height+"px;";
};

Slider.prototype.addPattern = function () {
    var str = "";
    for(var d=0;d<this.sliderElem.length;d++){
        str += this.childPattern(d);
    }
    var dots 		= this.parentPattern(str);
    this.slider.insertAdjacentHTML("beforeEnd", dots);
    this.addEventDots = this.slider.querySelector('.slider__dots');
    this.addEventDots.addEventListener("click", this.eventDots.bind(this));
    this.addClassActive();
};

Slider.prototype.parentPattern = function (str) {
        return  '<ul class="slider__dots">'+str+'</ul>'
};

Slider.prototype.childPattern = function (d) {
        return      '<li class="dots__item" data-slider='+d+'>'+
                        '<div class="hexagon">'+
                            '<div class="hexagon__elem hexagon__elem_mod-1"></div>'+
                            '<div class="hexagon__elem hexagon__elem_mod-2"></div>'+
                        '</div>'+
                    '</li>'
};

Slider.prototype.eventDots = function (e) {
    var targetDots      = e && e.target || e.srcElement;
        parentTArgetOne = targetDots.parentElement;
        parentTArgetTwo = parentTArgetOne.parentElement;
    this.parent          = (targetDots.tagName == 'LI') ?
                           targetDots:
                          (parentTArgetOne.tagName == 'LI') ?
                           parentTArgetOne:
                          (parentTArgetTwo.tagName == 'LI') ? parentTArgetTwo:"";

    if(this.parent == "") return;



    this.dataAttr = this.parent.getAttribute('data-slider');
    this.offset();
    this.changeClass();
};

Slider.prototype.offset = function () {
    this.slideres = this.slider.clientHeight;
    var   numbers = -this.slideres * this.dataAttr;
    this.trackSlider.style.cssText += "transform: translateY("+numbers+"px);transition: transform ease 700ms;";
};

Slider.prototype.addClassActive = function () {
    var sliderDots = this.slider.querySelector('.slider__dots');
        dotsItem = sliderDots.firstChild;
        hexagon = dotsItem.querySelector('.hexagon');
        dotsItem.classList.add("js-active");
        hexagon.classList.add('hexagon_mod-bg-active');
};

Slider.prototype.changeClass = function () {
    var dotsItem = this.slider.querySelectorAll('.dots__item');
    for(var s=0;s<dotsItem.length;s++){
        var chd = dotsItem[s].querySelector('.hexagon');
            chh =dotsItem[s].classList.remove('js-active');
        chd.classList.remove('hexagon_mod-bg-active');
    }
    var addClassClick = this.parent.querySelector('.hexagon');
    addClassClick.classList.add('hexagon_mod-bg-active');
    this.parent.classList.add("js-active");
};



function Tabs() {
    this.categories = document.querySelector('.categories__tabs');
    this.list = this.categories.querySelector('.tabs-list');
    this.listElem = this.categories.querySelectorAll('.tabs-list-item > a');
    this.listElem[0].classList.add('btn-tabs-active');
    this.addStyle();
}


Tabs.prototype.addStyle = function (e) {
    for(var i=0;i<this.listElem.length;i++) {
        this.clickEvent = this.listElem[i].addEventListener("click", this.addEvent.bind(this));
        this.href = this.listElem[i].getAttribute('href');
        this.id =  this.categories.querySelector(this.href);
        this.id.style.cssText += "display:none;"
    }
    this.tabsActive = this.categories.querySelector('.btn-tabs-active');
    this.idActive =  this.tabsActive.getAttribute('href');
    this.visibility =  this.categories.querySelector(this.idActive);
    this.visibility.style.cssText += "display:block;"
};

Tabs.prototype.addEvent= function (e) {
    this.targetLInk = e && e.target;
    event.preventDefault();
    if(this.targetLInk.tagName != 'A') return;
    for(var w=0;w<this.listElem.length;w++) {
        this.listElem[w].classList.remove('btn-tabs-active');
        this.click =  this.listElem[w].getAttribute('href');
        this.vis =  this.categories.querySelector(this.click);
        this.vis.style.cssText += "display:none;"
    }

    this.linkClick =  this.targetLInk.getAttribute('href');
    this.visibilityClick =  this.categories.querySelector(this.linkClick);
    this.visibilityClick.style.cssText += "display:block;";
    this.targetLInk.classList.add('btn-tabs-active');
};

function InitMap() {
    var centerLatLng = new google.maps.LatLng(37.782105, -122.400752);

    var mapOptions = {
        center: centerLatLng,
        zoom: 18,
        scrollwheel: false,
        styles: [{"featureType":"landscape","stylers":[{"saturation":-100},{"lightness":60}]},{"featureType":"road.local","stylers":[{"saturation":-100},{"lightness":40},{"visibility":"on"}]},{"featureType":"transit","stylers":[{"saturation":-100},{"visibility":"simplified"}]},{"featureType":"administrative.province","stylers":[{"visibility":"off"}]},{"featureType":"water","stylers":[{"visibility":"on"},{"lightness":30}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#ef8c25"},{"lightness":40}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"visibility":"off"}]},{"featureType":"poi.park","elementType":"geometry.fill","stylers":[{"color":"#b6c54c"},{"lightness":40},{"saturation":-40}]},{}]
    };

    var map = new google.maps.Map(document.getElementById("map"), mapOptions);


    var marker = new google.maps.Marker({
        position: centerLatLng,
        map: map

    });

    google.maps.event.addListener(map, "click", function() {
        infoWindow.close();
    });
}


function Numbers() {
    this.numberBox = document.querySelector('.content-numbers');
    this.numbersElem = this.numberBox.querySelectorAll('.js-number-btn');
    this.addEvent();
    this.jsBtnPrev = this.numberBox.querySelector('.js-btn-prev');
    this.jsBtnPrev.addEventListener("click", this.activePrev.bind(this));
    this.jsBtnNext = this.numberBox.querySelector('.js-btn-next');
    this.jsBtnNext.addEventListener("click", this.activeNext.bind(this));
}

Numbers.prototype.addEvent = function () {
    for(var c=0;c<this.numbersElem.length;c++) {
        this.numbersElem[c].addEventListener("click", this.activeElem.bind(this));
    }
};

Numbers.prototype.removeActive = function () {
    for(var e=0;e<this.numbersElem.length;e++) {
        this.numbersElem[e].classList.remove('number-active');
    }
};

Numbers.prototype.activeElem = function (e) {
    var targetElem = e && e.target;
    if(targetElem.tagName!= 'LI') return;
    this.removeActive();
    targetElem.classList.add('number-active');
};

Numbers.prototype.activePrev = function () {
  var  activePrevElem = this.numberBox.querySelector('.number-active');
       prev = activePrevElem.previousElementSibling.classList.contains("js-number-btn");
        if(prev) {
            activePrevElem.previousElementSibling.classList.add('number-active');
            activePrevElem.classList.remove('number-active');
        }
            return
};

Numbers.prototype.activeNext = function () {
    var  activeNextElem = this.numberBox.querySelector('.number-active');
         next = activeNextElem.nextElementSibling.classList.contains("js-number-btn");
    if(next) {
        activeNextElem.nextElementSibling.classList.add('number-active');
        activeNextElem.classList.remove('number-active');
    }
    return
};


function Form() {
    this.formBlock = document.querySelector('.touch__form');
    this.fieldInput = document.querySelectorAll('.field__input');
    this.AddInput();
}

Form.prototype.AddInput = function () {
    for(var p=0;p<this.fieldInput.length;p++){
        this.fieldInput[p].addEventListener("input", this.activForm.bind(this));
    }

};

Form.prototype.validation = function (elem) {
    var str = elem.value;
        this.result = testing.test(str);
};

Form.prototype.patern = function (ret) {
    var regularExpressions = {
        'name':'([a-zA-Z]+)$',
        'email': '[A-Za-z0-9](([_\.\-]?[a-zA-Z0-9]+)*)@([A-Za-z0-9]+)(([\.\-]?[a-zA-Z0-9]+)*)\.([A-Za-z]{2,})',
        'subject':'([a-zA-Z]+)$',
        'time':'/^\d+$/',
        'message':'([a-zA-Z]+)$'
    };

    patt =   regularExpressions[ret.name];
    testing = new RegExp(patt);

    return testing;
};

Form.prototype.activForm = function (e) {
    var targetElem = e && e.target;
    targetElem.classList.add('input__invalid');
        this.patern(targetElem);
        this.validation(targetElem, patt);

        if(this.result){
            targetElem.classList.add('input__validity');
            targetElem.classList.remove('input__invalid');
        } else {
            targetElem.classList.remove('input__validity');
            targetElem.classList.add('input__invalid');
        }
};

Form.prototype.result = function () {

};