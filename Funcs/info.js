let MyMap = null;
let Markers = [];
let Datas = null;

$(document).ready(function() {
    $("#info_main_img").attr("src", "../Images/lib_imgs/0.jpg");
    $("#info_main_ul").empty();
    $("#info_main_ul").append($("<li>館別: 臺中市立圖書館(總館)</li>"));
    $("#info_main_ul").append($("<li>地址: 臺中市北屯區豐樂路二段158號</li>"));
    $("#info_main_ul").append($("<li>市話: (04)24225101/(04)24229833</li>"));
    $("#info_main_ul").append($("<li>傳真: (04)24229730</li>"));
    $("#info_main_ul").append($("<li>緯度: 24.1947906</li>"));
    $("#info_main_ul").append($("<li>經度: 120.6780349</li>"));
    $("#info_main_ul").append($("<li>網址: <a href='https://www.library.taichung.gov.tw/public/lib/index.asp?m1=27'>https://www.library.taichung.gov.tw/public/lib/index.asp?m1=27</a></li>"));

    handler();
});

function handler() {
    $("#btn_0").on("click", function() {
        search("#search_0");
    });
    $("#btn_1").on("click", function() {
        search("#search_1");
    });
    $("#search_0").on("keypress", function(e) {
        if(e.key == "Enter") {
            search("#search_0");
        }
    });
    $("#search_0").on("keyup", function(e) {
        $("#search_1").val($(this).val());
    });
    $("#search_1").on("keypress", function(e) {
        if(e.key == "Enter") {
            search("#search_1");
        }
    });
    $("#search_1").on("keyup", function(e) {
        $("#search_0").val($(this).val());
    });
}

function initMap() {
    MyMap = new google.maps.Map(document.getElementById("map"), {
        zoom: 12,
        center: { lat: 24.2261061, lng: 120.5791058 },
    });

    $.ajax({
        type:"GET",
        url:"../Datas/taichung_library.json",
        dataType:"json",
        success: function(datas){
            Datas = datas;
            setMarker(MyMap, Datas);
        }   
    });
}

function setMarker(map, datas) {
    for (const data of datas) {
        const marker = new google.maps.Marker({
            map: map,
            position: new google.maps.LatLng(data["lat"], data["lon"]),
            title: data["館別"]
        });
        const infowindow = new google.maps.InfoWindow({
            content: "<h3 style='position: relative; top: 4px;'><a href='https://www.google.com.tw/maps/place/台中市立圖書館"+ data["館別"] +"'>"+ data["館別"] +"</a></h3>"
        });

        Markers.push(marker);

        marker.addListener("click", () => {
            infowindow.open({anchor: marker, map});

            setTimeout(function() {
                infowindow.close();
            }, 2000);
            
            setDivInfo(data);
        });
    }
}

function setDivInfo(data) {
    $("#info_main_img").attr("src", "../Images/lib_imgs/"+ data["index"] +".jpg");
    $("#info_main_ul").empty();
    $("#info_main_ul").append($("<li>館別: " + data["館別"] + "</li>"));
    $("#info_main_ul").append($("<li>地址: " + data["地址"] + "</li>"));
    $("#info_main_ul").append($("<li>市話: " + data["市話"] + "</li>"));
    $("#info_main_ul").append($("<li>傳真: " + data["傳真"] + "</li>"));
    $("#info_main_ul").append($("<li>緯度: " + data["lat"] + "</li>"));
    $("#info_main_ul").append($("<li>經度: " + data["lon"] + "</li>"));
    $("#info_main_ul").append($("<li>網址: <a href="+ data["web"] +">"+ data["web"] +"</a></li>"));
}

function search(input) {
    function clearMarker() {
        for (const marker of Markers) {
            marker.setMap(null);
        }
    }
    
    const keyinp = $(input).val();
    const datas = [];

    clearMarker();

    if(keyinp != "") {
        const keywords = keyinp.split(" ");
        
        for(const data of Datas) {
            for(const tokens of Object.values(data)) {
                let isfind = false;
                
                for(const keyword of keywords) {
                    if(String(tokens).includes(keyword)) {
                        datas.push(data);
                        isfind = true;
    
                        break;
                    }
                }

                if(isfind) {
                    break;
                }
            }
        }
        
        if(datas.length == 0) { alert("[系統] 抱歉 ! 沒有符合的結果 !"); }
        else { setMarker(MyMap, datas); }
    } else { setMarker(MyMap, Datas); }
}