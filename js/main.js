
(function ($) {
    "use strict";

    /*[ Load page ]
    ===========================================================*/
    $(".animsition").animsition({
        inClass: 'fade-in',
        outClass: 'fade-out',
        inDuration: 1500,
        outDuration: 800,
        linkElement: '.animsition-link',
        loading: true,
        loadingParentElement: 'html',
        loadingClass: 'animsition-loading-1',
        loadingInner: '<div class="loader05"></div>',
        timeout: false,
        timeoutCountdown: 5000,
        onLoadEvent: true,
        browser: [ 'animation-duration', '-webkit-animation-duration'],
        overlay : false,
        overlayClass : 'animsition-overlay-slide',
        overlayParentElement : 'html',
        transition: function(url){ window.location.href = url; }
    });
    
    /*[ Back to top ]
    ===========================================================*/
    var windowH = $(window).height()/2;

    $(window).on('scroll',function(){
        if ($(this).scrollTop() > windowH) {
            $("#myBtn").css('display','flex');
        } else {
            $("#myBtn").css('display','none');
        }
    });

    $('#myBtn').on("click", function(){
        $('html, body').animate({scrollTop: 0}, 300);
    });


    /*==================================================================
    [ Fixed Header ]*/
    var headerDesktop = $('.container-menu-desktop');
    var wrapMenu = $('.wrap-menu-desktop');

    if($('.top-bar').length > 0) {
        var posWrapHeader = $('.top-bar').height();
    }
    else {
        var posWrapHeader = 0;
    }
    

    if($(window).scrollTop() > posWrapHeader) {
        $(headerDesktop).addClass('fix-menu-desktop');
        $(wrapMenu).css('top',0); 
    }  
    else {
        $(headerDesktop).removeClass('fix-menu-desktop');
        $(wrapMenu).css('top',posWrapHeader - $(this).scrollTop()); 
    }

    $(window).on('scroll',function(){
        if($(this).scrollTop() > posWrapHeader) {
            $(headerDesktop).addClass('fix-menu-desktop');
            $(wrapMenu).css('top',0); 
        }  
        else {
            $(headerDesktop).removeClass('fix-menu-desktop');
            $(wrapMenu).css('top',posWrapHeader - $(this).scrollTop()); 
        } 
    });


    /*==================================================================
    [ Menu mobile ]*/
    $('.btn-show-menu-mobile').on('click', function(){
        $(this).toggleClass('is-active');
        $('.menu-mobile').slideToggle();
    });

    var arrowMainMenu = $('.arrow-main-menu-m');

    for(var i=0; i<arrowMainMenu.length; i++){
        $(arrowMainMenu[i]).on('click', function(){
            $(this).parent().find('.sub-menu-m').slideToggle();
            $(this).toggleClass('turn-arrow-main-menu-m');
        })
    }

    $(window).resize(function(){
        if($(window).width() >= 992){
            if($('.menu-mobile').css('display') == 'block') {
                $('.menu-mobile').css('display','none');
                $('.btn-show-menu-mobile').toggleClass('is-active');
            }

            $('.sub-menu-m').each(function(){
                if($(this).css('display') == 'block') { console.log('hello');
                    $(this).css('display','none');
                    $(arrowMainMenu).removeClass('turn-arrow-main-menu-m');
                }
            });
                
        }
    });


    /*==================================================================
    [ Show / hide modal search ]*/
    $('.js-show-modal-search').on('click', function(){
        $('.modal-search-header').addClass('show-modal-search');
        $(this).css('opacity','0');
    });

    $('.js-hide-modal-search').on('click', function(){
        $('.modal-search-header').removeClass('show-modal-search');
        $('.js-show-modal-search').css('opacity','1');
    });

    $('.container-search-header').on('click', function(e){
        e.stopPropagation();
    });


    /*==================================================================
    [ Isotope ]*/
    var $topeContainer = $('.isotope-grid');
    var $filter = $('.filter-tope-group');

    // filter items on button click
    $filter.each(function () {
        $filter.on('click', 'button', function () {
            var filterValue = $(this).attr('data-filter');
            $topeContainer.isotope({filter: filterValue});
        });
        
    });

    // init Isotope
    $(window).on('load', function () {
        var $grid = $topeContainer.each(function () {
            $(this).isotope({
                itemSelector: '.isotope-item',
                layoutMode: 'fitRows',
                percentPosition: true,
                animationEngine : 'best-available',
                masonry: {
                    columnWidth: '.isotope-item'
                }
            });
        });
    });

    var isotopeButton = $('.filter-tope-group button');

    $(isotopeButton).each(function(){
        $(this).on('click', function(){
            for(var i=0; i<isotopeButton.length; i++) {
                $(isotopeButton[i]).removeClass('how-active1');
            }

            $(this).addClass('how-active1');
        });
    });

    /*==================================================================
    [ Filter / Search product ]*/
    $('.js-show-filter').on('click',function(){
        $(this).toggleClass('show-filter');
        $('.panel-filter').slideToggle(400);

        if($('.js-show-search').hasClass('show-search')) {
            $('.js-show-search').removeClass('show-search');
            $('.panel-search').slideUp(400);
        }    
    });

    $('.js-show-search').on('click',function(){
        $(this).toggleClass('show-search');
        $('.panel-search').slideToggle(400);

        if($('.js-show-filter').hasClass('show-filter')) {
            $('.js-show-filter').removeClass('show-filter');
            $('.panel-filter').slideUp(400);
        }    
    });




    /*==================================================================
    [ Cart ]*/
    $('.js-show-cart').on('click',function(){
        $('.js-panel-cart').addClass('show-header-cart');

        let elements = '';
        let cartTotalPrice = 0;
        const cartItems = JSON.parse(localStorage.getItem('cart-items')) || []
        cartItems.map((item) => {
            elements += `
                <li class="header-cart-item flex-w flex-t m-b-12">
                        <div class="header-cart-item-img">
                            <img src="${item.imageSrc}" alt="IMG">
                        </div>

                        <div class="header-cart-item-txt p-t-8">
                            <a href="#" class="header-cart-item-name m-b-18 hov-cl1 trans-04">
                                ${item.itemName}
                            </a>

                            <span class="header-cart-item-info">
                                ${item.qty} x ${item.size}
                            </span>
                        </div>
                    </li>
            `;

            cartTotalPrice += (item.price * item.qty)
        })
        
        $('.header-cart-total').html('<span>P </span>' + cartTotalPrice);
        $('.header-cart-wrapitem').html(elements);
    });

    $('.js-hide-cart').on('click',function(){
        $('.js-panel-cart').removeClass('show-header-cart');
    });

    /*==================================================================
    [ Cart ]*/
    $('.js-show-sidebar').on('click',function(){
        $('.js-sidebar').addClass('show-sidebar');
    });

    $('.js-hide-sidebar').on('click',function(){
        $('.js-sidebar').removeClass('show-sidebar');
    });

    /*==================================================================
    [ +/- num product ]*/
    $('.btn-num-product-down').on('click', function(){
        var numProduct = Number($(this).next().val());
        if(numProduct > 0) $(this).next().val(numProduct - 1);
    });

    $('.btn-num-product-up').on('click', function(){
        var numProduct = Number($(this).prev().val());
        $(this).prev().val(numProduct + 1);
    });

    /*==================================================================
    [ Rating ]*/
    $('.wrap-rating').each(function(){
        var item = $(this).find('.item-rating');
        var rated = -1;
        var input = $(this).find('input');
        $(input).val(0);

        $(item).on('mouseenter', function(){
            var index = item.index(this);
            var i = 0;
            for(i=0; i<=index; i++) {
                $(item[i]).removeClass('zmdi-star-outline');
                $(item[i]).addClass('zmdi-star');
            }

            for(var j=i; j<item.length; j++) {
                $(item[j]).addClass('zmdi-star-outline');
                $(item[j]).removeClass('zmdi-star');
            }
        });

        $(item).on('click', function(){
            var index = item.index(this);
            rated = index;
            $(input).val(index+1);
        });

        $(this).on('mouseleave', function(){
            var i = 0;
            for(i=0; i<=rated; i++) {
                $(item[i]).removeClass('zmdi-star-outline');
                $(item[i]).addClass('zmdi-star');
            }

            for(var j=i; j<item.length; j++) {
                $(item[j]).addClass('zmdi-star-outline');
                $(item[j]).removeClass('zmdi-star');
            }
        });
    });
    
    /*==================================================================
    [ Show modal1 ]*/
    $('.js-show-modal1').on('click',function(e){
        e.preventDefault();
        $('.js-modal1').addClass('show-modal1');
        const image = e.target.getAttribute("custom-src");
        $('.modal-pic').attr("src", image);
        var displayTitle = $(this).attr('displayTitle');
        $('.js-name-detail').html(displayTitle);

        if (displayTitle == 'SHS Uniform (M)') {
            const itemTypesElement = `
                <option>Choose an option</option>
                <option>Polo</option>
                <option>Vest</option>
                <option>Pants</option>
            `;
            $('.selectItemType').html(itemTypesElement)

            const itemSizesElement = `
                <option value="0">Choose an option</option>
                <option value="624">Size S (₱ 624)</option>
                <option value="678">Size M (₱ 678)</option>
                <option value="692">Size L (₱ 692)</option>
                <option value="706">Size XL (₱ 706)</option>
            `;
            $('.selectSize').html(itemSizesElement)
        }
        else if (displayTitle == 'SHS Uniform (F)') {
            const itemTypesElement = `
                <option>Choose an option</option>
                <option>Polo</option>
                <option>Necktie</option>
                <option>Skirt</option>
            `;
            $('.selectItemType').html(itemTypesElement)

            const itemSizesElement = `
                <option value="0">Choose an option</option>
                <option value="720">Size S (₱ 720)</option>
                <option value="720">Size M (₱ 720)</option>
                <option value="720">Size L (₱ 720)</option>
                <option value="720">Size XL (₱ 720)</option>
            `;
            $('.selectSize').html(itemSizesElement)
        }
        else if (displayTitle == 'PE Uniform') {
            const itemTypesElement = `
                <option>Choose an option</option>
                <option>Polo Shirt</option>
                <option>Shorts</option>
            `;
            $('.selectItemType').html(itemTypesElement)

            const itemSizesElement = `
                <option value="0">Choose an option</option>
                <option value="496">Size S (₱ 496)</option>
                <option value="510">Size M (₱ 510)</option>
                <option value="524">Size L (₱ 524)</option>
                <option value="538">Size XL (₱ 538)</option>
            `;
            $('.selectSize').html(itemSizesElement)
        }
        else if (displayTitle == 'JHS Uniform (M)') {
            const itemTypesElement = `
                <option>Choose an option</option>
                <option>Polo</option>
                <option>Pants</option>
            `;
            $('.selectItemType').html(itemTypesElement)

            const itemSizesElement = `
                <option value="0">Choose an option</option>
                <option value="525">Size S (₱ 525)</option>
                <option value="540">Size M (₱ 540)</option>
                <option value="460">Size L (₱ 460)</option>
                <option value="480">Size XL (₱ 480)</option>
            `;
            $('.selectSize').html(itemSizesElement)
        }
        else if (displayTitle == 'JHS Uniform (F)') {
            const itemTypesElement = `
                <option>Choose an option</option>
                <option>Polo</option>
                <option>Skirt</option>
            `;
            $('.selectItemType').html(itemTypesElement)

            const itemSizesElement = `
                <option value="0">Choose an option</option>
                <option value="742">Size S (₱ 742)</option>
                <option value="756">Size M (₱ 756)</option>
                <option value="770">Size L (₱ 770)</option>
                <option value="784">Size XL (₱ 784)</option>
            `;
            $('.selectSize').html(itemSizesElement)
        }
        else if (displayTitle == 'JHS PE Uniform') {
            const itemTypesElement = `
                <option>Choose an option</option>
                <option>T - Shirt</option>
                <option>Pants</option>
            `;
            $('.selectItemType').html(itemTypesElement)

            const itemSizesElement = `
                <option value="0">Choose an option</option>
                <option value="425">Size S (₱ 425)</option>
                <option value="440">Size M (₱ 440)</option>
                <option value="460">Size L (₱ 460)</option>
                <option value="480">Size XL (₱ 480)</option>
            `;
            $('.selectSize').html(itemSizesElement)
        }
        else if (displayTitle == 'Grade School (F)') {
            const itemTypesElement = `
                <option>Choose an option</option>
                <option>Blouse</option>
                <option>Jumper</option>
            `;
            $('.selectItemType').html(itemTypesElement)

            const itemSizesElement = `
                <option value="0">Choose an option</option>
                <option value="602">Size S (₱ 602)</option>
                <option value="616">Size M (₱ 616)</option>
                <option value="630">Size L (₱ 630)</option>
                <option value="644">Size XL (₱ 644)</option>
            `;
            $('.selectSize').html(itemSizesElement)
        }
        else if (displayTitle == 'Grade School (M)') {
            const itemTypesElement = `
                <option>Choose an option</option>
                <option>Polo</option>
                <option>Shorts</option>
            `;
            $('.selectItemType').html(itemTypesElement)

            const itemSizesElement = `
                <option value="0">Choose an option</option>
                <option value="340">Size S (₱ 340)</option>
                <option value="350">Size M (₱ 350)</option>
                <option value="360">Size L (₱ 360)</option>
                <option value="380">Size XL (₱ 380)</option>
            `;
            $('.selectSize').html(itemSizesElement)
        }
    });

    $('.js-hide-modal1').on('click',function(){
        $('.js-modal1').removeClass('show-modal1');
    });

})(jQuery);