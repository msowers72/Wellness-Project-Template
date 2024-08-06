/**
* Template Name: Serenity
* Template URL: https://bootstrapmade.com/serenity-bootstrap-corporate-template/
* Updated: Mar 17 2024 with Bootstrap v5.3.3
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/

(function() {
  "use strict";

  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim()
    if (all) {
      return [...document.querySelectorAll(el)]
    } else {
      return document.querySelector(el)
    }
  }

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all)
    if (selectEl) {
      if (all) {
        selectEl.forEach(e => e.addEventListener(type, listener))
      } else {
        selectEl.addEventListener(type, listener)
      }
    }
  }

  /**
   * Easy on scroll event listener 
   */
  const onscroll = (el, listener) => {
    el.addEventListener('scroll', listener)
  }

  /**
   * Scrolls to an element with header offset
   */
  const scrollto = (el) => {
    let header = select('#header')
    let offset = header.offsetHeight

    let elementPos = select(el).offsetTop
    window.scrollTo({
      top: elementPos - offset,
      behavior: 'smooth'
    })
  }

  /**
   * Toggle .header-scrolled class to #header when page is scrolled
   */
  let selectHeader = select('#header')
  if (selectHeader) {
    const headerScrolled = () => {
      if (window.scrollY > 100) {
        selectHeader.classList.add('header-scrolled')
      } else {
        selectHeader.classList.remove('header-scrolled')
      }
    }
    window.addEventListener('load', headerScrolled)
    onscroll(document, headerScrolled)
  }

  /**
   * Back to top button
   */
  let backtotop = select('.back-to-top')
  if (backtotop) {
    const toggleBacktotop = () => {
      if (window.scrollY > 100) {
        backtotop.classList.add('active')
      } else {
        backtotop.classList.remove('active')
      }
    }
    window.addEventListener('load', toggleBacktotop)
    onscroll(document, toggleBacktotop)
  }

  /**
   * Mobile nav toggle
   */
  on('click', '.mobile-nav-toggle', function(e) {
    select('#navbar').classList.toggle('navbar-mobile')
    this.classList.toggle('bi-list')
    this.classList.toggle('bi-x')
  })

  /**
   * Mobile nav dropdowns activate
   */
  on('click', '.navbar .dropdown > a', function(e) {
    if (select('#navbar').classList.contains('navbar-mobile')) {
      e.preventDefault()
      this.nextElementSibling.classList.toggle('dropdown-active')
    }
  }, true)

  /**
   * Scrool with ofset on links with a class name .scrollto
   */
  on('click', '.scrollto', function(e) {
    if (select(this.hash)) {
      e.preventDefault()

      let navbar = select('#navbar')
      if (navbar.classList.contains('navbar-mobile')) {
        navbar.classList.remove('navbar-mobile')
        let navbarToggle = select('.mobile-nav-toggle')
        navbarToggle.classList.toggle('bi-list')
        navbarToggle.classList.toggle('bi-x')
      }
      scrollto(this.hash)
    }
  }, true)

  /**
   * Scroll with ofset on page load with hash links in the url
   */
  window.addEventListener('load', () => {
    if (window.location.hash) {
      if (select(window.location.hash)) {
        scrollto(window.location.hash)
      }
    }
  });

  /**
   * Initiate portfolio lightbox 
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

  /**
   * Skills animation
   */
  let skilsContent = select('.skills-content');
  if (skilsContent) {
    new Waypoint({
      element: skilsContent,
      offset: '80%',
      handler: function(direction) {
        let progress = select('.progress .progress-bar', true);
        progress.forEach((el) => {
          el.style.width = el.getAttribute('aria-valuenow') + '%'
        });
      }
    })
  }

  /**
   * Clients Slider
   */
  new Swiper('.clients-slider', {
    speed: 400,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    slidesPerView: 'auto',
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    },
    breakpoints: {
      320: {
        slidesPerView: 2,
        spaceBetween: 40
      },
      480: {
        slidesPerView: 3,
        spaceBetween: 60
      },
      640: {
        slidesPerView: 4,
        spaceBetween: 80
      },
      992: {
        slidesPerView: 6,
        spaceBetween: 120
      }
    }
  });

  /**
   * Init swiper slider with 1 slide at once in desktop view
   */
  new Swiper('.slides-1', {
    speed: 600,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    slidesPerView: 'auto',
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    }
  });

  /**
   * Porfolio isotope and filter
   */
  window.addEventListener('load', () => {
    let portfolioContainer = select('.portfolio-container');
    if (portfolioContainer) {
      let portfolioIsotope = new Isotope(portfolioContainer, {
        itemSelector: '.portfolio-item',
        layoutMode: 'fitRows'
      });

      let portfolioFilters = select('#portfolio-flters li', true);

      on('click', '#portfolio-flters li', function(e) {
        e.preventDefault();
        portfolioFilters.forEach(function(el) {
          el.classList.remove('filter-active');
        });
        this.classList.add('filter-active');

        portfolioIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        portfolioIsotope.on('arrangeComplete', function() {
          AOS.refresh()
        });
      }, true);
    }

  });

  /**
   * Initiate portfolio lightbox 
   */
  const portfolioLightbox = GLightbox({
    selector: '.portfolio-lightbox'
  });

  /**
   * Portfolio details slider
   */
  new Swiper('.portfolio-details-slider', {
    speed: 400,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    }
  });

  /**
   * Animation on scroll
   */
  window.addEventListener('load', () => {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    })
  });

  /**
   * Initiate Pure Counter 
   */
  new PureCounter();

})()

// DOM Elements for search feature
const productContainer = document.querySelector('.products_wrapper');
const ulEl = document.querySelector('.servics-ul');
const btnEl = document.querySelector('.btn_search');
const inputEl = document.querySelector(".form_control");


// Card info object
const gameData = [
  {
    id: 1,
    title: "Reading",
    category: "Intellectual",
    releaseDate: "Place Holder",
    img: "./assets/img/img-1.jpg",
    price: "Learn More",
    
  },

{
    id: 2,
    title: "Relationships",
    category: "Social",
    releaseDate: "Place Holder",
    img: "./assets/img/img-2.jpg",
    price: "Learn More",
  },
  {
    id: 3,
    title: "Journal",
    category: "Intellectual",
    releaseDate: "Place Holder",
    img: "./assets/img/img-3.jpg",
    price: "Learn More",
  },
  {
    id: 4,
    title: "Brain Games",
    category: "Intellectual",
    releaseDate: "Place Holder",
    img: "./assets/img/img-4.jpg",
    price: "Learn More",
  },
  {
    id: 5,
    title: "The Arts",
    category: "Intellectual",
    releaseDate: "Place Holder",
    img: "./assets/img/img-5.jpg",
    price: "Learn More",
  },
  {
    id: 6,
    title: "Quality Sleep",
    category: "Emotional",
    releaseDate: "Place Holder",
    img: "./assets/img/img-6.jpg",
    price: "Learn More",
  },
  {
    id: 7,
    title: "Cope With Loss",
    category: "Emotional",
    releaseDate: "Place Holder",
    img: "./assets/img/img-7.jpg",
    price: "Learn More",
  },
  {
    id: 8,
    title: "Training",
    category: "Employment",
    releaseDate: "Place Holder",
    img: "./assets/img/img-8.jpg",
    price: "Learn More",
  },
  {
    id: 9,
    title: "Reduce Stress",
    category: "Emotional",
    releaseDate: "Place Holder",
    img: "./assets/img/img-9.jpg",
    price: "Learn More",
  },
  {
    id: 10,
    title: "Yogo",
    category: "Physical",
    releaseDate: "Place Holder3",
    img: "./assets/img/img-10.jpg",
    price: "Learn More",
  },
  {
    id: 11,
    title: "Nutrition",
    category: "Physical",
    releaseDate: "Place Holder",
    img: "./assets/img/img-11.jpg",
    price: "Learn More",
  },
  {
    id: 12,
    title: "Reflection",
    category: "Spiritual",
    releaseDate: "Place Holder",
    img: "./assets/img/img-12.jpg",
    price: "Learn More",
  },
  {
    id: 13,
    title: "Weightlifting",
    category: "Physical",
    releaseDate: "Place Holder",
    img: "./assets/img/img-13.jpg",
    price: "Learn More",
  },
  {
    id: 14,
    title: "Strength",
    category: "Spiritual",
    releaseDate: "Place Holder",
    img: "./assets/img/img-14.jpg",
    price: "Learn More",
  },
  {
    id: 15,
    title: "Compassion",
    category: "Spiritual",
    releaseDate: "Place Holder",
    img: "./assets/img/img-15.jpg",
    price: "Learn More",
  },
  {
    id: 16,
    title: "Service",
    category: "Spiritual",
    releaseDate: "Place Holder",
    img: "./assets/img/img-16.jpg",
    price: "Learn More",
  },
  {
    id: 17,
    title: "Build Resilience",
    category: "Emotional",
    releaseDate: "Place Holder",
    img: "./assets/img/img-17.jpg",
    price: "Learn More",
  },
  {
    id: 18,
    title: "Running",
    category: "Physical",
    releaseDate: "Place Holder",
    img: "./assets/img/img-18.jpg",
    price: "Learn More",
  },
  {
    id: 19,
    title: "Communication™",
    category: "Social",
    releaseDate: "Place Holder",
    img: "./assets/img/img-3.jpg",
    price: "Learn More",
  },
  {
    id: 20,
    title: "Valuing Diversity™",
    category: "Social",
    releaseDate: "Place Holder",
    img: "./assets/img/img-16.jpg",
    price: "Learn More",
  },
  {
    id: 21,
    title: "Social Networks",
    category: "Social",
    releaseDate: "Place Holder",
    img: "./assets/img/img-12.jpg",
    price: "Learn More",
  },
  {
    id: 2,
    title: "Diversity",
    category: "Employment",
    releaseDate: "Place Holder",
    img: "./assets/img/img-10.jpg",
    price: "Learn More",
  },
  {
    id: 23,
    title: "Burnout",
    category: "Employment",
    releaseDate: "Place Holder",
    img: "./assets/img/img-15.jpg",
    price: "Learn More",
  },
  {
    id: 24,
    title: "Finances",
    category: "Employment",
    releaseDate: "Place Holder",
    img: "./assets/img/img-3.jpg",
    price: "Learn More",
  },
  
  
];

// display all dynamic data
// window.addEventListener("DOMContentLoaded", () => {
//   displayGameData(gameData);

  // getting unique category
//   const categories = gameData.reduce(
//       function (values, item) {

//           if (!values.includes(item.category)) {
//               values.push(item.category);
//           }
//           return values
//       },
//       ["ALL"]
//   );
//   const categoryBtns = categories.map(function (category) {
//       return `<li><a href="#services_main" data-id="${category}">${category}</a></li>`
//   }).join("");
   
//   ulEl.innerHTML = categoryBtns;

//   const linksEl = document.querySelectorAll('li a');

//   // allows me to get the dataset.id for each category
//   linksEl.forEach((links) => {
//       links.addEventListener('click', (e) => {
//           const category = e.target.dataset.id;
//           const gameCategory = gameData.filter(function (data) {
//               if (data.category === category) {
//                   return data;
//               };
              
//           });
//           if (category === 'ALL') {
//               displayGameData(gameData)
//           } else {
//               displayGameData(gameCategory)
//           }
//       });
//   });
// });



// function to display data on page
// function displayGameData(games) {
//   let displayData = games.map(function (cat_items) {
//       return `
//               <div class="products">
//                   <div class="pr_img">
//                       <img src="${cat_items.img}" alt="">                       
//                   </div>
                 
//                   <div class="content">
//                       <h3 class="title">${cat_items.title}</h3>
//                       <p class="release_date">Release Date: ${cat_items.releaseDate}</p>
//                       <p class="price">${cat_items.price}</p>
//                   </div>
                 
//               </div>`
      
//   });
//   displayData = displayData.join("");
  
//   productContainer.innerHTML = displayData;

// };

// search
// btnEl.addEventListener('click', (e) => {
//   let searchValue = inputEl.value.toLowerCase();
  
 
//   if (searchValue !== "") {
//       let searchCategory = gameData.filter(function (data) {
//           if (data.title.toLowerCase().includes(searchValue)) {
//               return data;
//           } else if (data.category.toLowerCase().includes(searchValue)) {
//               return data;
//           };
          
//       });
//       if (searchCategory) {
//               displayGameData(searchCategory)
//       }
//       inputEl.value = "";
//   } else {
//       alert("Please Enter a Category!")
//   }
// });

// inputEl.addEventListener("keypress", function(event) {
//   let searchValue = inputEl.value.toLowerCase();

//   if (event.key === "Enter" && searchValue !== "") {
//     event.preventDefault();

//     let searchCategory = gameData.filter(function (data) {
//       if (data.title.toLowerCase().includes(searchValue)) {
//           return data;
//       } else if (data.category.toLowerCase().includes(searchValue)) {
//           return data;
//       };
      
//   });
//   if (searchCategory) {
//     displayGameData(searchCategory)
// }
// inputEl.value = "";

//     console.log(searchCategory)
//   } 
// });