"use strict"

const nav = document.querySelector(".nav");
const hamburgerBtn = document.querySelector(".hamburger");
const NavLinks = document.querySelector(".nav-links");
const allSection = document.querySelectorAll(".section")
const animateEl = document.querySelectorAll(".animation");
const footerLinks = document.querySelector(".footer-links");
const header = document.querySelector(".header");
const spinner = document.querySelector(".loader");
const main = document.querySelector(".main");
const orderNow = document.querySelector(".home-button")
const orderSection = document.querySelector(".formContainer");

const init = () => {
  setTimeout(() => {
    spinner.style.display = `none`;
    spinner.style.opacity = 0;
    main.style.display = `block`;
    setTimeout(() => (main.style.opacity = 1), 500);
  }, 4000);
};
init();

orderNow.addEventListener("click",function(e){
    e.preventDefault()
    orderSection.scrollIntoView({behavior: `smooth`})
})

const revealSticky = function (entries) {
    const [entry] = entries
    // console.log(entry);
    if (!entry.isIntersecting) nav.classList.add("sticky")
    else nav.classList.remove("sticky");
}

const headerObserver = new IntersectionObserver(revealSticky,{
    root: null,
    threshold: 0
})

headerObserver.observe(header)

hamburgerBtn.addEventListener("click",function (e) {
    // NavLinks.classList.toggle("display")
     const id = e.target.closest(".nav")
     const navLink = id.querySelector(".nav-links")
     if (!navLink) return
     navLink.classList.toggle("display");
})

const smoothScroll = function (click,parentEl,childEl) {
    click.addEventListener("click",function(e){
        e.preventDefault()
        const id = e.target.closest(parentEl)
        const anchor = id.querySelectorAll(childEl)
        anchor.forEach(anchor => anchor.addEventListener("click", function(){
            const a = anchor.getAttribute("href")
    
            document.querySelector(a).scrollIntoView({ behavior: `smooth` });
        }))
    }) 
}

smoothScroll(nav, ".nav", "a");
smoothScroll(footerLinks, ".footer-wrapper", "a");

const revealSection = function (entries,observer) {
    const [entry] = entries
    if(!entry.isIntersecting) return
     entry.target.classList.remove("section--hidden");
    observer.unobserve(entry.target);
}

const sectionObserver = new IntersectionObserver(revealSection, {
    root: null,
    threshold: 0.1
})

allSection.forEach(section => {
    sectionObserver.observe(section)
    section.classList.add("section--hidden");
})

//////////////////////////////////
const animateSection = function (entries,_) {
    const [entry] = entries
    if (!entry.isIntersecting) return
    entry.target.classList.toggle("animate")
}

const animationObserver = new IntersectionObserver(animateSection,{
    root:null,
    threshold : 0
})

animateEl.forEach(section => {
    animationObserver.observe(section)
})
// const text = document.querySelector(".aboutus-para")

////////////////////
const slides = document.querySelectorAll(".slide")

let curSlide = 0
let maxslide = slides.length 

const gotoSlide = function (slide) {
  slides.forEach((s, i) => {
    s.style.transform = `translateX(${100 * (i - slide)}%)`;
  });
};

setInterval(()=> {
   const slide = curSlide > maxslide  ? curSlide = 0 : curSlide++ 
    gotoSlide(slide);
},1000)




const form = document.querySelector("form")
form.addEventListener("submit",function(){
    const formName = document.querySelector(".name-input").value;
    const phone = document.querySelector(".number-input").value;
    const order = document.querySelector(".text").value;

    const url = `https://Wa.me/2348105757294?text=name:${formName}%0aphoneNumber:${phone}%0aorder:${order}%0a`;
    window.open(url,"_blank").focus()
    formName.value = ``
    phone.value = ``;
    order.value = ``;
})

