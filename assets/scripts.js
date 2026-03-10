const counters = document.querySelectorAll(".counter");

counters.forEach(counter => {

let target = +counter.getAttribute("data-target");

let count = 0;

let increment = target / 100;

function updateCounter(){

count += increment;

if(count < target){
counter.innerText = Math.floor(count);
requestAnimationFrame(updateCounter);
}else{
counter.innerText = target;
}

}

updateCounter();

});