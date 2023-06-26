$(document).ready(function() {
    $.ajax({
        type:"GET",
        url:"../Datas/taichung_library.json",
        dataType:"json",
        success: function(datas){
            addImages(datas);
            setMenuImg(datas);
        }   
    });
});

function addImages(datas) {
    for(const data of datas) {
        $("#main_img_ul").append($("<li class='slide'><img src='../Images/lib_imgs/"+ data["index"] +".jpg' alt='library Images'></li>"));
    }

    setSlides();
}

function setSlides() {
    const slides = $(document).find(".slide");
    let myInterval = true;
    let index = 0;

    $(".main_img").mouseenter(function() {
        myInterval = false;
    });
    $(".main_img").mouseleave(function() {
        myInterval = true;
    });

    setInterval(function() {
        if(myInterval) {
            slides[index].classList.remove("activate");
            
            index++;
            index = index % slides.length
    
            slides[index].classList.add("activate");
        }
    }, 4500);
}

function setMenuImg(datas) {
    const imgs = $(".main_menu").find("img");

    for(const img of imgs) {
        const rand = Math.floor(Math.random() * datas.length);
        
        img.src = "../Images/lib_imgs/" + rand + ".jpg";
        img.alt = rand + ".jpg";
    }
}