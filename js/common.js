$(document).ready(function() {
    var repairSlider = $("#repairsGallery");
       repairSlider.owlCarousel({
           loop:true,
           nav:true,
           autoplay:false,
           smartSpeed:1000,
           margin:25,
       center:false,     //если нужны обрезаные края
       navText:['<span class="nav-left"></span>','<span class="nav-right"></span>'],
       responsive:{
           0:{
               items:1
           },
           480:{
               items:2
           },
           768:{
               items:3
           },
           992:{
               items:4
           },
             1240:{
               items:5
           },
       }
   });
});
