let header=document.querySelector(".header");
let sidebar=document.querySelector(".side_bar");
const headerheight=header.offsetHeight;
window.addEventListener("scroll",
    function(){

        let hide_At;

if (window.matchMedia("(max-width:425px)").matches) {
    hide_At = 500;
} else if (window.matchMedia("(max-width:768px)").matches) {
    hide_At = 600;
} else {
    hide_At = 700;
}
        if(this.scrollY > hide_At){
            header.style.transform= "translateY(-100%)";
            sidebar.style.transform=`translateY(-${headerheight}px)`;
        }else{
            header.style.transform= "translateY(0)";
            sidebar.style.transform="translateY(0)";

            if(this.scrollY > headerheight ){
                header.style.backgroundColor="rgba(0,0,0,0.4)";
            }else if(this.scrollY < headerheight) {
                // header.style.display="flex";
                header.style.backgroundColor="rgb(0,0,0)";

            }
        }

    }
);

let menuBtn = document.querySelector(".menu-toggle");   /* لزرار القايمه في الهيدر*/
let info = document.querySelector(".info");

menuBtn.addEventListener("click", function(){
    info.classList.toggle("active");
});




let galary=document.querySelector(".galary");
let img_button=document.querySelector(".buttons");
let item=document.querySelectorAll(".item");
let isFavoritePage = false;           /*<== تبع زرار ال فافوريت*/

function addheart(){
    let love_btn=document.querySelectorAll(".fa-heart");
    
    love_btn.forEach(
        function(btn){
            btn.addEventListener("click",
                function(){
                    btn.classList.toggle("fa-regular");
                    btn.classList.toggle("fa-solid");
                    let parentitem=btn.closest(".item");
                    let imgsource = parentitem.querySelector("img").src;
                    if(btn.classList.contains("fa-solid")){
                        btn.style.color="red";
                        btn.setAttribute("title","i love this");
                        // let parentitem=btn.closest(".item");   <======  اكتبه في الكراسه
                        // parentitem.style.boxShadow="2px 2px 10px 1px rgba(247, 81, 40, 1)";
                        parentitem.classList.add("red_box");
                        /***************************************************** */
                        
                toggleFavorite(imgsource, btn.classList.contains("fa-solid"));
                //  toggleFavorite(imgsource, true);
                // newdiv(imgsource);
                        /***************************************************** */
                        btn.classList.remove("white_love");
                        let message=document.createElement("div");
                        message.textContent="photo has been added to favorite";
                        message.style.position="fixed";
                        message.style.top="20px";
                        message.style.right="20px";
                        message.style.backgroundColor = "rgba(0,0,0,0.8)";
                        message.style.color = "#fff";
                        message.style.fontSize = "16px";
                        message.style.padding="15px";
                        message.style.borderRadius="10px";
                        message.style.zIndex="10200";
                        message.style.pointerEvents="none";
                        message.style.fontFamily = "Arial, sans-serif";
                        message.style.boxShadow = "2px 2px 10px rgba(0,0,0,0.3)";
                        message.style.transition = "all 0.3s ease";
                        document.body.appendChild(message);
                        
                        setTimeout(function() {
                    message.style.opacity = "0";
                    setTimeout(() => message.remove(), 300); 
                }, 4500);
                    }else{
                        btn.removeAttribute("title");
                        btn.style.color="rgba(255,255,255,0.7)";      
                        parentitem.classList.remove("red_box");
                        btn.classList.add("white_love");

                        toggleFavorite(imgsource, false);
                        if(isFavoritePage){
                            parentitem.remove();
    }
                    }
                }
            )
            
        }
    );
}
addheart();


function enlarge(downloadbtn){                                                /* اكتب الكود ده <=======*/
    let item=downloadbtn.closest(".item");
    let img=item.querySelector("img");
    
    window.open(img.src,"_blank");
   
}

document.addEventListener("click", function(e){
    if(e.target.classList.contains("fa-expand")){
        enlarge(e.target);
    }
});



let home_btn=document.querySelector(".home_btn");
// let og_galary=galary.innerHTML;

home_btn.addEventListener("click", function(){
    window.location.href="index.html";                 /* الطريقه دي احسن دلوقتي عشان هتنفع مع تخزين القلوب في ال localstorage*/
})

//////////////////////////////////////////////

function saveHearts() {
    const items = document.querySelectorAll(".item");

    items.forEach((item) => {
        const heart = item.querySelector(".fa-heart");
        const img = item.querySelector("img");

        const key = "heart_" + img.src; // مفتاح فريد لكل صورة

        // استرجاع الحالة
        if (localStorage.getItem(key) === "true") {
            heart.classList.add("fa-solid");
            heart.classList.remove("fa-regular");
            heart.style.color = "red";
            item.classList.add("red_box");
        } else {
            heart.classList.add("fa-regular");
            heart.classList.remove("fa-solid");
            item.classList.remove("red_box");
        }

        // حفظ الحالة عند الضغط
        heart.addEventListener("click", function () {
            const isLoved = heart.classList.contains("fa-solid");
            localStorage.setItem(key, isLoved);
        });
    });
}
saveHearts();


let side_buttons=document.querySelectorAll("button");
side_buttons.forEach(function(btn){
    btn.addEventListener("click", function(){
        side_buttons.forEach(b =>b.classList.remove("active"));

        btn.classList.add("active");
    })
})

/******************************************************************** */
let favorite_images=[];
function toggleFavorite(source, isLoved){
    if(isLoved){
        // اضف الصورة لو مش موجودة
        if(!favorite_images.includes(source)){
            favorite_images.push(source);
        }
    } else {
        // شيل الصورة لو موجودة
        favorite_images = favorite_images.filter(src => src !== source);
    }

    // حدث الـ localStorage
    localStorage.setItem("favorite_images", JSON.stringify(favorite_images));
}

// عند تحميل الصفحة
let storedFavorites = localStorage.getItem("favorite_images");
if(storedFavorites){
    favorite_images = JSON.parse(storedFavorites);
}


let favorite=document.getElementById("favorite");
favorite.addEventListener("click",function(){
     isFavoritePage = true;
    galary.innerHTML="";

    if(favorite_images ==0){
        galary.innerHTML=`
        <div class="empty_favorite">
            You don't have favorite photos yet.
        </div>
        `
        return;
    }
    favorite_images.forEach(src =>{
        let new_div = document.createElement("div"); 
new_div.classList.add("item"); 
new_div.innerHTML = `
    <img src="${src}" alt="sorry your browser doesn't support this image">
    <div class="buttons">
        <i class="fa-solid fa-heart"></i>
        <i class="fa-solid fa-expand" title="Expand"></i>
    </div>
`;
galary.appendChild(new_div); 

    })
    addheart();
    saveHearts();
})
/************************************************************************* */
///////////////////////////////////////////


let sideBar = document.querySelector(".side_bar");
let toggleBtn = document.querySelector(".sidebar-toggle");

toggleBtn.onclick = function(){
    sideBar.classList.toggle("open");
    toggleBtn.classList.toggle("active");
};

document.addEventListener("click", function (e) {

    // لو السايد بار مفتوح
    if (sideBar.classList.contains("open")) {

        // هل الكليك كان جوه السايد بار أو زرار الفتح؟
        let clickedInsideSidebar = sideBar.contains(e.target);
        let clickedToggleBtn = toggleBtn.contains(e.target);

        // لو لأ → اقفل
        if (!clickedInsideSidebar && !clickedToggleBtn) {
            sideBar.classList.remove("open");
            toggleBtn.classList.remove("active");
        }
    }
});


let pyramids=document.getElementById("pyramids");
pyramids.addEventListener("click", function(){
    isFavoritePage=false;
    galary.innerHTML=`
    <div class="item">
            <img src="https://wallpaperaccess.com/full/676894.jpg" alt="sorry your browser doesn't support this image">
            <div class="buttons">
                <i class="fa-regular fa-heart"></i>
                <i class="fa-solid fa-expand" title="Expand"></i>
            </div>
        </div>

    <div class="item">
            <img src="https://i0.wp.com/lionandlambapologetics.org/wp-content/uploads/2023/04/Great-Pyramid-of-Giza-2.jpg?w=1275&ssl=1" alt="sorry your browser doesn't support this image">
            <div class="buttons">
                <i class="fa-regular fa-heart"></i>
                <i class="fa-solid fa-expand" title="Expand"></i>
            </div>
        </div>

    <div class="item">
            <img src="https://university.awakenche.org/wp-content/uploads/Pyramids-of-Giza.webp" alt="sorry your browser doesn't support this image">
            <div class="buttons">
                <i class="fa-regular fa-heart"></i>
                <i class="fa-solid fa-expand" title="Expand"></i>
            </div>
        </div>

    <div class="item">
            <img src="https://tse1.mm.bing.net/th/id/OIP.ZWPISliasDLzBdharkpg8AHaHa?w=1024&h=1024&rs=1&pid=ImgDetMain&o=7&rm=3" alt="sorry your browser doesn't support this image">
            <div class="buttons">
                <i class="fa-regular fa-heart"></i>
                <i class="fa-solid fa-expand" title="Expand"></i>
            </div>
        </div>

    <div class="item">
            <img src="https://tse2.mm.bing.net/th/id/OIP.l8ZcTLPonpfKmY8-42KxfwHaFj?w=800&h=600&rs=1&pid=ImgDetMain&o=7&rm=3" alt="sorry your browser doesn't support this image">
            <div class="buttons">
                <i class="fa-regular fa-heart"></i>
                <i class="fa-solid fa-expand" title="Expand"></i>
            </div>
        </div>

    <div class="item">
            <img src="https://image.lexica.art/md2/02be6309-a153-4068-8574-c2ba004568b5" alt="sorry your browser doesn't support this image">
            <div class="buttons">
                <i class="fa-regular fa-heart"></i>
                <i class="fa-solid fa-expand" title="Expand"></i>
            </div>
        </div>

    <div class="item">
            <img src="https://tse2.mm.bing.net/th/id/OIP.QqbdRROmoMBOH8mdZik85AHaLH?pid=ImgDet&w=474&h=711&rs=1&o=7&rm=3" alt="sorry your browser doesn't support this image">
            <div class="buttons">
                <i class="fa-regular fa-heart"></i>
                <i class="fa-solid fa-expand" title="Expand"></i>
            </div>
        </div>

    <div class="item">
            <img src="https://images.pexels.com/photos/15127144/pexels-photo-15127144/free-photo-of-silhouette-of-pyramids-during-sunset.jpeg?auto=compress&cs=tinysrgb&w=1600" alt="sorry your browser doesn't support this image">
            <div class="buttons">
                <i class="fa-regular fa-heart"></i>
                <i class="fa-solid fa-expand" title="Expand"></i>
            </div>
        </div>

    <div class="item">
            <img src="https://www.focusjunior.it/content/uploads/2022/09/GettyImages-541967088-e1663052480253-683x540.jpg" alt="sorry your browser doesn't support this image">
            <div class="buttons">
                <i class="fa-regular fa-heart"></i>
                <i class="fa-solid fa-expand" title="Expand"></i>
            </div>
        </div>

    <div class="item">
            <img src="https://www.traveloffpath.com/wp-content/uploads/2021/04/Chichen-Itza.jpg.webp" alt="sorry your browser doesn't support this image">
            <div class="buttons">
                <i class="fa-regular fa-heart"></i>
                <i class="fa-solid fa-expand" title="Expand"></i>
            </div>
        </div>

    <div class="item">
            <img src="https://imgcdn.stablediffusionweb.com/2024/11/14/c9e323f8-d7b1-4195-b5b9-726cb01587dc.jpg" alt="sorry your browser doesn't support this image">
            <div class="buttons">
                <i class="fa-regular fa-heart"></i>
                <i class="fa-solid fa-expand" title="Expand"></i>
            </div>
        </div>

    <div class="item">
            <img src="https://images.stockcake.com/public/6/e/1/6e10e3a3-f02a-49d7-97a3-1fd68b78ed33_large/pyramids-at-sunset-stockcake.jpg" alt="sorry your browser doesn't support this image">
            <div class="buttons">
                <i class="fa-regular fa-heart"></i>
                <i class="fa-solid fa-expand" title="Expand"></i>
            </div>
        </div>

    <div class="item">
            <img src="https://img.freepik.com/premium-photo/egyptian-pyramids-desert-with-evening-sunset_926199-252229.jpg" alt="sorry your browser doesn't support this image">
            <div class="buttons">
                <i class="fa-regular fa-heart"></i>
                <i class="fa-solid fa-expand" title="Expand"></i>
            </div>
        </div>

    <div class="item">
            <img src="https://static.vecteezy.com/system/resources/previews/023/531/241/non_2x/magical-pyramid-illustration-ai-generative-free-photo.jpg" alt="sorry your browser doesn't support this image">
            <div class="buttons">
                <i class="fa-regular fa-heart"></i>
                <i class="fa-solid fa-expand" title="Expand"></i>
            </div>
        </div>
    <div class="item">
            <img src="https://thumbs.dreamstime.com/b/pyramid-menkaure-three-pyramid-companions-camels-bedouins-desert-pyramid-menkaure-144917123.jpg?w=768" alt="sorry your browser doesn't support this image">
            <div class="buttons">
                <i class="fa-regular fa-heart"></i>
                <i class="fa-solid fa-expand" title="Expand"></i>
            </div>
        </div>

    <div class="item">
            <img src="https://tse2.mm.bing.net/th/id/OIP.qWhPRI7VYOhu7ieHGayLwQHaFQ?w=2000&h=1421&rs=1&pid=ImgDetMain&o=7&rm=3" alt="sorry your browser doesn't support this image">
            <div class="buttons">
                <i class="fa-regular fa-heart"></i>
                <i class="fa-solid fa-expand" title="Expand"></i>
            </div>
        </div>
        `
    let love_btn=document.querySelectorAll(".fa-heart");
    addheart();
    saveHearts();
})

let cars=document.getElementById("cars");
cars.addEventListener("click", function(){
    isFavoritePage=false;
    galary.innerHTML=`
    <div class="item">
            <img src="https://img.freepik.com/premium-photo/black-sport-car-isolated-white-background_265515-20969.jpg" alt="sorry your browser doesn't support this image">
            <div class="buttons">
                <i class="fa-regular fa-heart"></i>
                <i class="fa-solid fa-expand" title="Expand"></i>
            </div>
        </div>

    <div class="item">
            <img src="https://img.freepik.com/fotos-premium/auto-deportivo-rojo-estacionado-piso-negro_659703-93.jpg?w=360" alt="sorry your browser doesn't support this image">
            <div class="buttons">
                <i class="fa-regular fa-heart"></i>
                <i class="fa-solid fa-expand" title="Expand"></i>
            </div>
        </div>

    <div class="item">
            <img src="https://th.bing.com/th/id/R.d491fb6b0a28a6dd4c39a18c7562737f?rik=HTWVKA9tBS5TGw&pid=ImgRaw&r=0" alt="sorry your browser doesn't support this image">
            <div class="buttons">
                <i class="fa-regular fa-heart"></i>
                <i class="fa-solid fa-expand" title="Expand"></i>
            </div>
        </div>

    <div class="item">
            <img src="https://th.bing.com/th/id/R.74f06313c995045fb5459720b0d4e54e?rik=bCmJls3lsRksZg&pid=ImgRaw&r=0" alt="sorry your browser doesn't support this image">
            <div class="buttons">
                <i class="fa-regular fa-heart"></i>
                <i class="fa-solid fa-expand" title="Expand"></i>
            </div>
        </div>

    <div class="item">
            <img src="https://image-cdn.hypb.st/https://hypebeast.com/image/2023/11/porsche-panamera-turbo-sonderwunsch-release-info-003.jpg?cbr=1&q=90" alt="sorry your browser doesn't support this image">
            <div class="buttons">
                <i class="fa-regular fa-heart"></i>
                <i class="fa-solid fa-expand" title="Expand"></i>
            </div>
        </div>

    <div class="item">
            <img src="https://www.topgear.com/sites/default/files/2023/11/final_front_v5.jpg?w=976&h=549" alt="sorry your browser doesn't support this image">
            <div class="buttons">
                <i class="fa-regular fa-heart"></i>
                <i class="fa-solid fa-expand" title="Expand"></i>
            </div>
        </div>

    <div class="item">
            <img src="https://i.pinimg.com/736x/e8/92/cc/e892cc2ee7b7a9c3711afef2aac73545.jpg" alt="sorry your browser doesn't support this image">
            <div class="buttons">
                <i class="fa-regular fa-heart"></i>
                <i class="fa-solid fa-expand" title="Expand"></i>
            </div>
        </div>

    <div class="item">
            <img src="https://mir-s3-cdn-cf.behance.net/project_modules/1400/9d1947105652381.5f7dcd4ccb895.jpg" alt="sorry your browser doesn't support this image">
            <div class="buttons">
                <i class="fa-regular fa-heart"></i>
                <i class="fa-solid fa-expand" title="Expand"></i>
            </div>
        </div>

    <div class="item">
            <img src="https://tse2.mm.bing.net/th/id/OIP.7OKtanvv4K0pbdhQtdw5bAHaE8?w=1200&h=800&rs=1&pid=ImgDetMain&o=7&rm=3" alt="sorry your browser doesn't support this image">
            <div class="buttons">
                <i class="fa-regular fa-heart"></i>
                <i class="fa-solid fa-expand" title="Expand"></i>
            </div>
        </div>

    <div class="item">
            <img src="https://images.hdqwalls.com/download/hyundai-hyper-econ-concept-hyundai-elantra-sport-btr-edition-vaccar-hyundai-tucson-2017-gl-1080x2400.jpg" alt="sorry your browser doesn't support this image">
            <div class="buttons">
                <i class="fa-regular fa-heart"></i>
                <i class="fa-solid fa-expand" title="Expand"></i>
            </div>
        </div>

    <div class="item">
            <img src="https://img.freepik.com/premium-photo/electric-sport-car-design-concept-clean-energy-vehicle-created-with-generative-ai-technology_67092-10298.jpg" alt="sorry your browser doesn't support this image">
            <div class="buttons">
                <i class="fa-regular fa-heart"></i>
                <i class="fa-solid fa-expand" title="Expand"></i>
            </div>
        </div>

    <div class="item">
            <img src="https://tse4.mm.bing.net/th/id/OIP.ITUyDliN9-MslI-hUHR81AHaEl?rs=1&pid=ImgDetMain&o=7&rm=3" alt="sorry your browser doesn't support this image">
            <div class="buttons">
                <i class="fa-regular fa-heart"></i>
                <i class="fa-solid fa-expand" title="Expand"></i>
            </div>
        </div>

    <div class="item">
            <img src="https://hips.hearstapps.com/hmg-prod/images/2024-crown-limited-heavymetal-043-660cbd99750de.jpg?crop=1.00xw:0.924xh;0" alt="sorry your browser doesn't support this image">
            <div class="buttons">
                <i class="fa-regular fa-heart"></i>
                <i class="fa-solid fa-expand" title="Expand"></i>
            </div>
        </div>

    <div class="item">
            <img src="https://www.evspecs.org/gr/images/63cfda0903063/6402/64020f4accfbd-c.jpg" alt="sorry your browser doesn't support this image">
            <div class="buttons">
                <i class="fa-regular fa-heart"></i>
                <i class="fa-solid fa-expand" title="Expand"></i>
            </div>
        </div>

    <div class="item">
            <img src="https://wallpaperaccess.com/full/126188.jpg" alt="sorry your browser doesn't support this image">
            <div class="buttons">
                <i class="fa-regular fa-heart"></i>
                <i class="fa-solid fa-expand" title="Expand"></i>
            </div>
        </div>

    <div class="item">
            <img src="https://www.carscoops.com/wp-content/uploads/2020/10/2022-GMC-Hummer-EV-35.jpg" alt="sorry your browser doesn't support this image">
            <div class="buttons">
                <i class="fa-regular fa-heart"></i>
                <i class="fa-solid fa-expand" title="Expand"></i>
            </div>
        </div>
    `
    let love_btn=document.querySelectorAll(".fa-heart");
    addheart();
    saveHearts();
})

let watches=document.getElementById("watches");
watches.addEventListener("click", function(){
    isFavoritePage=false;
    galary.innerHTML=`
    <div class="item">
    <img src="https://th.bing.com/th/id/R.4ec61eb060bbf702efd92012b06d4c44?rik=nYID1b7CANCi5g&riu=http%3a%2f%2fwallup.net%2fwp-content%2fuploads%2f2017%2f11%2f17%2f230769-luxury_watches-watch.jpg&ehk=wmxlUeDr%2bMv6xhv4pPDTnsPAN2L3D2EmzjVqvhbbyAQ%3d&risl=&pid=ImgRaw&r=0" alt="sorry your browser doesn't support this image">
    <div class="buttons">
    <i class="fa-regular fa-heart"></i>
    <i class="fa-solid fa-expand" title="Expand"></i>
    </div>
    </div>
    
    <div class="item">
    <img src="https://th.bing.com/th/id/R.faa4236f01c9458c27af1fef1214199f?rik=4JuGpABWsGdAFQ&riu=http%3a%2f%2fwww.zastavki.com%2fpictures%2foriginals%2f2014%2fBrands____Beautiful_watches_065807_.jpg&ehk=akqyWvVViw5kVAohEcgshnRrzrNO5bufH6aFjEy6m1Y%3d&risl=&pid=ImgRaw&r=0" alt="sorry your browser doesn't support this image">
    <div class="buttons">
    <i class="fa-regular fa-heart"></i>
    <i class="fa-solid fa-expand" title="Expand"></i>
            </div>
            </div>
            
            <div class="item">
            <img src="https://stauer.co.uk/wp-content/uploads/39626-Stauer-47-Automatic-Watch-1-1.webp" alt="sorry your browser doesn't support this image">
            <div class="buttons">
            <i class="fa-regular fa-heart"></i>
            <i class="fa-solid fa-expand" title="Expand"></i>
            </div>
            </div>

            <div class="item">
            <img src="https://images.prestigeonline.com/content/uploads/2018/07/25093150/AP1_1200x800_acf_cropped.jpg" alt="sorry your browser doesn't support this image">
            <div class="buttons">
            <i class="fa-regular fa-heart"></i>
            <i class="fa-solid fa-expand" title="Expand"></i>
            </div>
            </div>

            <div class="item">
            <img src="https://images.pexels.com/photos/280250/pexels-photo-280250.jpeg?cs=srgb&dl=pexels-pixabay-280250.jpg&fm=jpg" alt="sorry your browser doesn't support this image">
            <div class="buttons">
            <i class="fa-regular fa-heart"></i>
            <i class="fa-solid fa-expand" title="Expand"></i>
            </div>
            </div>
            
            <div class="item">
            <img src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhOTekVr1IPahqJ_GVuv7AKXwdft2T-UzF2wY1atzof4oYlNmO0hVODdHu8f50aEMkdd54fQStlsYq3qWAqnekmJ0yCl0Te8T78k8-noWmtplmQunZ8AoBqlPhRocb8_MnIfPPTuX4v_rI/s640/IWC-Pilot-Watch-Timezoner-Chronograph-IW395003-001.jpg" alt="sorry your browser doesn't support this image">
            <div class="buttons">
            <i class="fa-regular fa-heart"></i>
            <i class="fa-solid fa-expand" title="Expand"></i>
            </div>
            </div>
            
            <div class="item">
            <img src="https://img.freepik.com/premium-photo/digital-watch_862330-19801.jpg" alt="sorry your browser doesn't support this image">
            <div class="buttons">
            <i class="fa-regular fa-heart"></i>
            <i class="fa-solid fa-expand" title="Expand"></i>
            </div>
            </div>
            
            <div class="item">
            <img src="https://m.media-amazon.com/images/I/81uFItBcgnL.jpg" alt="sorry your browser doesn't support this image">
            <div class="buttons">
            <i class="fa-regular fa-heart"></i>
            <i class="fa-solid fa-expand" title="Expand"></i>
            </div>
            </div>
            
    <div class="item">
    <img src="https://img.freepik.com/premium-photo/shot-watch_931878-346437.jpg" alt="sorry your browser doesn't support this image">
    <div class="buttons">
    <i class="fa-regular fa-heart"></i>
    <i class="fa-solid fa-expand" title="Expand"></i>
    </div>
    </div>
    
    <div class="item">
            <img src="https://cdn.pixabay.com/photo/2023/10/07/14/24/smartwatch-8300238_1280.jpg" alt="sorry your browser doesn't support this image">
            <div class="buttons">
            <i class="fa-regular fa-heart"></i>
            <i class="fa-solid fa-expand" title="Expand"></i>
            </div>
            </div>
            
            <div class="item">
            <img src="https://tse1.mm.bing.net/th/id/OIP.WcHVqelKjdJyALd-j28M6AHaE6?rs=1&pid=ImgDetMain&o=7&rm=3" alt="sorry your browser doesn't support this image">
            <div class="buttons">
            <i class="fa-regular fa-heart"></i>
            <i class="fa-solid fa-expand" title="Expand"></i>
            </div>
            </div>

            <div class="item">
            <img src="https://img.freepik.com/premium-photo/beautiful-elegance-closeup-wristwatch-concept_796368-9011.jpg" alt="sorry your browser doesn't support this image">
            <div class="buttons">
            <i class="fa-regular fa-heart"></i>
            <i class="fa-solid fa-expand" title="Expand"></i>
            </div>
            </div>
            
            <div class="item">
            <img src="https://tse1.mm.bing.net/th/id/OIP.YcIBmGymx8ByFD2nd5sKXQHaEJ?rs=1&pid=ImgDetMain&o=7&rm=3" alt="sorry your browser doesn't support this image">
            <div class="buttons">
            <i class="fa-regular fa-heart"></i>
            <i class="fa-solid fa-expand" title="Expand"></i>
            </div>
            </div>
            
            <div class="item">
            <img src="https://tse4.mm.bing.net/th/id/OIP.-3N28Lv17e9pqnuGPoUeWQHaHf?rs=1&pid=ImgDetMain&o=7&rm=3" alt="sorry your browser doesn't support this image">
            <div class="buttons">
            <i class="fa-regular fa-heart"></i>
            <i class="fa-solid fa-expand" title="Expand"></i>
            </div>
            </div>
            
            <div class="item">
            <img src="https://tse4.mm.bing.net/th/id/OIP.3PIJJSZ1FVyjlEQPt1PbfAHaHa?rs=1&pid=ImgDetMain&o=7&rm=3" alt="sorry your browser doesn't support this image">
            <div class="buttons">
            <i class="fa-regular fa-heart"></i>
            <i class="fa-solid fa-expand" title="Expand"></i>
            </div>
            </div>
            
            <div class="item">
            <img src="https://i.pinimg.com/736x/2b/4a/0d/2b4a0df08ed8221326c94d15533214d1.jpg" alt="sorry your browser doesn't support this image">
            <div class="buttons">
            <i class="fa-regular fa-heart"></i>
            <i class="fa-solid fa-expand" title="Expand"></i>
            </div>
            </div>
    `
    let love_btn=document.querySelectorAll(".fa-heart");
    addheart();
    saveHearts();
})


let Anime=document.getElementById("Anime");
Anime.addEventListener("click", function(){
    isFavoritePage=false;
    galary.innerHTML=`
    <div class="item">
            <img src="https://wallpapers.com/images/hd/best-anime-pictures-1920-x-1080-9zg8tgn76b38y70w.jpg" alt="sorry your browser doesn't support this image">
            <div class="buttons">
                <i class="fa-regular fa-heart"></i>
                <i class="fa-solid fa-expand" title="Expand"></i>
            </div>
        </div>

    <div class="item">
            <img src="https://tse3.mm.bing.net/th/id/OIP.RHfvQOQGBcc7TsVZpbkJ3QHaEK?pid=ImgDet&w=474&h=266&rs=1&o=7&rm=3" alt="sorry your browser doesn't support this image">
            <div class="buttons">
                <i class="fa-regular fa-heart"></i>
                <i class="fa-solid fa-expand" title="Expand"></i>
            </div>
        </div>

    <div class="item">
            <img src="https://tse2.mm.bing.net/th/id/OIP.wofxSboTHakXcv-oknztWwHaEK?pid=ImgDet&w=474&h=266&rs=1&o=7&rm=3" alt="sorry your browser doesn't support this image">
            <div class="buttons">
                <i class="fa-regular fa-heart"></i>
                <i class="fa-solid fa-expand" title="Expand"></i>
            </div>
        </div>

    <div class="item">
            <img src="https://cdn.theanimegallery.com/theanimegallery/0efef4fd-66d7-4633-ac6d-bba09ae58f2b-naruto-anime-photo.webp" alt="sorry your browser doesn't support this image">
            <div class="buttons">
                <i class="fa-regular fa-heart"></i>
                <i class="fa-solid fa-expand" title="Expand"></i>
            </div>
        </div>

    <div class="item">
            <img src="https://wallpapers.com/images/hd/best-anime-pictures-3840-x-2160-j2eq42xa8rerlrik.jpg" alt="sorry your browser doesn't support this image">
            <div class="buttons">
                <i class="fa-regular fa-heart"></i>
                <i class="fa-solid fa-expand" title="Expand"></i>
            </div>
        </div>

    <div class="item">
            <img src="https://www.kolpaper.com/wp-content/uploads/2021/11/tanjiro-wallpaper-kolpaper-4.jpg" alt="sorry your browser doesn't support this image">
            <div class="buttons">
                <i class="fa-regular fa-heart"></i>
                <i class="fa-solid fa-expand" title="Expand"></i>
            </div>
        </div>

    <div class="item">
            <img src="https://tse1.mm.bing.net/th/id/OIP._zUQ_zscth_enqZrA0ZxzgHaLR?rs=1&pid=ImgDetMain&o=7&rm=3" alt="sorry your browser doesn't support this image">
            <div class="buttons">
                <i class="fa-regular fa-heart"></i>
                <i class="fa-solid fa-expand" title="Expand"></i>
            </div>
        </div>

    <div class="item">
            <img src="https://64.media.tumblr.com/8946eecf89fd71fb6d850e410ae3fc9a/2f37b034a692b0fe-ad/s1280x1920/c0d185e5f262517fe06580f60162cf2d7f07dcb9.jpg" alt="sorry your browser doesn't support this image">
            <div class="buttons">
                <i class="fa-regular fa-heart"></i>
                <i class="fa-solid fa-expand" title="Expand"></i>
            </div>
        </div>

    <div class="item">
            <img src="https://external-preview.redd.it/1k_dfZaE5XFAyLLGD3F8m5532ydBHiF-gqgdIn3q0DE.jpg?auto=webp&s=0fd7d4490dfe2623fe7a98d58c3cbb267c077c22" alt="sorry your browser doesn't support this image">
            <div class="buttons">
                <i class="fa-regular fa-heart"></i>
                <i class="fa-solid fa-expand" title="Expand"></i>
            </div>
        </div>

    <div class="item">
            <img src="https://www.nme.com/wp-content/uploads/2023/03/Attack-on-Titan-season-4-part-3.jpg" alt="sorry your browser doesn't support this image">
            <div class="buttons">
                <i class="fa-regular fa-heart"></i>
                <i class="fa-solid fa-expand" title="Expand"></i>
            </div>
        </div>

    <div class="item">
            <img src="https://i.pinimg.com/736x/3c/4c/d6/3c4cd6379c5e2fad2e5bbefdb4ef3f3a.jpg" alt="sorry your browser doesn't support this image">
            <div class="buttons">
                <i class="fa-regular fa-heart"></i>
                <i class="fa-solid fa-expand" title="Expand"></i>
            </div>
        </div>

    <div class="item">
            <img src="https://tse1.mm.bing.net/th/id/OIP.ZKTfwcHe_t14gfe0_7wgjAHaNb?w=1024&h=1856&rs=1&pid=ImgDetMain&o=7&rm=3" alt="sorry your browser doesn't support this image">
            <div class="buttons">
                <i class="fa-regular fa-heart"></i>
                <i class="fa-solid fa-expand" title="Expand"></i>
            </div>
        </div>

    <div class="item">
            <img src="https://static0.gamerantimages.com/wordpress/wp-content/uploads/2024/12/mixcollage-09-dec-2024-12-34-am-9321-1.jpg" alt="sorry your browser doesn't support this image">
            <div class="buttons">
                <i class="fa-regular fa-heart"></i>
                <i class="fa-solid fa-expand" title="Expand"></i>
            </div>
        </div>

    <div class="item">
            <img src="https://i.pinimg.com/474x/d3/13/46/d313460f08f6067ede83d4c6c04b22d8.jpg?nii=t" alt="sorry your browser doesn't support this image">
            <div class="buttons">
                <i class="fa-regular fa-heart"></i>
                <i class="fa-solid fa-expand" title="Expand"></i>
            </div>
        </div>

    <div class="item">
            <img src="https://tse2.mm.bing.net/th/id/OIP.qK0ZNA-ZVtaE21uUc8gVmAHaHa?rs=1&pid=ImgDetMain&o=7&rm=3" alt="sorry your browser doesn't support this image">
            <div class="buttons">
                <i class="fa-regular fa-heart"></i>
                <i class="fa-solid fa-expand" title="Expand"></i>
            </div>
        </div>

    <div class="item">
            <img src="https://tse1.mm.bing.net/th/id/OIP.x5es5QuuY8XUQXpJ5s-mEgHaHa?rs=1&pid=ImgDetMain&o=7&rm=3" alt="sorry your browser doesn't support this image">
            <div class="buttons">
                <i class="fa-regular fa-heart"></i>
                <i class="fa-solid fa-expand" title="Expand"></i>
            </div>
        </div>
        
        
        `
        let love_btn=document.querySelectorAll(".fa-heart");
    addheart();
    saveHearts();
})


let planets=document.getElementById("planets");
planets.addEventListener("click", function(){
    isFavoritePage=false;
    galary.innerHTML=`
    <div class="item">
            <img src="https://img.freepik.com/premium-photo/realistic-planets-solar-system_762785-162327.jpg?w=2000" alt="sorry your browser doesn't support this image">
            <div class="buttons">
                <i class="fa-regular fa-heart"></i>
                <i class="fa-solid fa-expand" title="Expand"></i>
            </div>
        </div>
    <div class="item">
            <img src="https://img.freepik.com/premium-photo/parade-planets-space-3d-illustration_717906-1338.jpg" alt="sorry your browser doesn't support this image">
            <div class="buttons">
                <i class="fa-regular fa-heart"></i>
                <i class="fa-solid fa-expand" title="Expand"></i>
            </div>
        </div>
    <div class="item">
            <img src="https://img.freepik.com/premium-photo/world-planet-space_987694-328.jpg" alt="sorry your browser doesn't support this image">
            <div class="buttons">
                <i class="fa-regular fa-heart"></i>
                <i class="fa-solid fa-expand" title="Expand"></i>
            </div>
        </div>
    <div class="item">
            <img src="https://img.freepik.com/premium-photo/beautiful-space-rogue-planet-solar-system-shooting-star_1322041-2308.jpg" alt="sorry your browser doesn't support this image">
            <div class="buttons">
                <i class="fa-regular fa-heart"></i>
                <i class="fa-solid fa-expand" title="Expand"></i>
            </div>
        </div>
    <div class="item">
            <img src="https://img.freepik.com/premium-photo/planets-solar-system-universe_1274714-14261.jpg?w=2000" alt="sorry your browser doesn't support this image">
            <div class="buttons">
                <i class="fa-regular fa-heart"></i>
                <i class="fa-solid fa-expand" title="Expand"></i>
            </div>
        </div>
    <div class="item">
            <img src="https://tse1.mm.bing.net/th/id/OIP.Wt7IZ_DLqr3Hdb_fbnFgJgHaEK?rs=1&pid=ImgDetMain&o=7&rm=3" alt="sorry your browser doesn't support this image">
            <div class="buttons">
                <i class="fa-regular fa-heart"></i>
                <i class="fa-solid fa-expand" title="Expand"></i>
            </div>
        </div>
    <div class="item">
            <img src="https://tse3.mm.bing.net/th/id/OIP.T7vBHIwkrFHdXytwfs5YBgHaQD?w=1179&h=2556&rs=1&pid=ImgDetMain&o=7&rm=3" alt="sorry your browser doesn't support this image">
            <div class="buttons">
                <i class="fa-regular fa-heart"></i>
                <i class="fa-solid fa-expand" title="Expand"></i>
            </div>
        </div>
    <div class="item">
            <img src="https://img.freepik.com/premium-photo/futuristic-planets-outer-space-beautiful-galaxy-view-illustration_746565-148132.jpg" alt="sorry your browser doesn't support this image">
            <div class="buttons">
                <i class="fa-regular fa-heart"></i>
                <i class="fa-solid fa-expand" title="Expand"></i>
            </div>
        </div>
    <div class="item">
            <img src="https://images.rawpixel.com/image_1300/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIyLTA1L3BkMzYtMS1nc2ZjXzIwMTcxMjA4X2FyY2hpdmVfZTAwMTAxNi5qcGc.jpg" alt="sorry your browser doesn't support this image">
            <div class="buttons">
                <i class="fa-regular fa-heart"></i>
                <i class="fa-solid fa-expand" title="Expand"></i>
            </div>
        </div>
    <div class="item">
            <img src="https://e0.pxfuel.com/wallpapers/748/940/desktop-wallpaper-earth-ipad-tablet-and-background-cool-planet-thumbnail.jpg" alt="sorry your browser doesn't support this image">
            <div class="buttons">
                <i class="fa-regular fa-heart"></i>
                <i class="fa-solid fa-expand" title="Expand"></i>
            </div>
        </div>
    <div class="item">
            <img src="https://img.freepik.com/premium-photo/high-resolution-images-presents-creating-planets-solar-system_1296313-12533.jpg" alt="sorry your browser doesn't support this image">
            <div class="buttons">
                <i class="fa-regular fa-heart"></i>
                <i class="fa-solid fa-expand" title="Expand"></i>
            </div>
        </div>
    <div class="item">
            <img src="https://i.pinimg.com/736x/9f/a7/b7/9fa7b70e562c9a899544c90327aa93f9.jpg" alt="sorry your browser doesn't support this image">
            <div class="buttons">
                <i class="fa-regular fa-heart"></i>
                <i class="fa-solid fa-expand" title="Expand"></i>
            </div>
        </div>
    <div class="item">
            <img src="https://tse2.mm.bing.net/th/id/OIP.XXSNbaEuQKIJtoUdkFBi8gHaFj?rs=1&pid=ImgDetMain&o=7&rm=3" alt="sorry your browser doesn't support this image">
            <div class="buttons">
                <i class="fa-regular fa-heart"></i>
                <i class="fa-solid fa-expand" title="Expand"></i>
            </div>
        </div>
    <div class="item">
            <img src="https://tse3.mm.bing.net/th/id/OIP.nHvMYsrvumaTNG6IiNdzYAHaEo?rs=1&pid=ImgDetMain&o=7&rm=3" alt="sorry your browser doesn't support this image">
            <div class="buttons">
                <i class="fa-regular fa-heart"></i>
                <i class="fa-solid fa-expand" title="Expand"></i>
            </div>
        </div>
    <div class="item">
            <img src="https://img.freepik.com/premium-photo/fantastic-beautiful-planets-far-uncharted-space_158863-1068.jpg" alt="sorry your browser doesn't support this image">
            <div class="buttons">
                <i class="fa-regular fa-heart"></i>
                <i class="fa-solid fa-expand" title="Expand"></i>
            </div>
        </div>
    <div class="item">
            <img src="https://tse3.mm.bing.net/th/id/OIP.qrfv3NMYImhegaUyKrEXSgHaFj?rs=1&pid=ImgDetMain&o=7&rm=3" alt="sorry your browser doesn't support this image">
            <div class="buttons">
                <i class="fa-regular fa-heart"></i>
                <i class="fa-solid fa-expand" title="Expand"></i>
            </div>
        </div>
    
    `
    let love_btn=document.querySelectorAll(".fa-heart");
    addheart();
    saveHearts();
})

let Nature=document.getElementById("Nature");
Nature.addEventListener("click",function(){
        isFavoritePage=false;
    galary.innerHTML=`
    <div class="item">
            <img src="https://th.bing.com/th/id/R.9bcf216ba66d755d01307dd6e62e58b4?rik=Jrd94WgAuN8Ohw&riu=http%3a%2f%2fgetwallpapers.com%2fwallpaper%2ffull%2fc%2f7%2f1%2f460702.jpg&ehk=Nv7Yrbgxp8%2feoSXfYXHknPBkG%2bGt7Ytdwg%2bl0nYhpi0%3d&risl=&pid=ImgRaw&r=0" alt="sorry your browser doesn't support this image">
            <div class="buttons">
                <i class="fa-regular fa-heart"></i>
                <i class="fa-solid fa-expand" title="Expand"></i>
            </div>
        </div>

    <div class="item">
            <img src="https://img.freepik.com/premium-photo/rose-with-red-flowers-ai-generated_523886-1759.jpg" alt="sorry your browser doesn't support this image">
            <div class="buttons">
                <i class="fa-regular fa-heart"></i>
                <i class="fa-solid fa-expand" title="Expand"></i>
            </div>
        </div>

    <div class="item">
            <img src="https://wallpaperaccess.com/full/1124086.jpg" alt="sorry your browser doesn't support this image">
            <div class="buttons">
                <i class="fa-regular fa-heart"></i>
                <i class="fa-solid fa-expand" title="Expand"></i>
            </div>
        </div>

    <div class="item">
            <img src="https://th.bing.com/th/id/R.77e2aa933d8769c8bc8a2bee615c4cf1?rik=ym4Ue0nhd5tQuA&pid=ImgRaw&r=0" alt="sorry your browser doesn't support this image">
            <div class="buttons">
                <i class="fa-regular fa-heart"></i>
                <i class="fa-solid fa-expand" title="Expand"></i>
            </div>
        </div>

    <div class="item">
            <img src="https://static.vecteezy.com/system/resources/previews/032/258/837/large_2x/waterfall-lotus-flowers-waterfall-nature-nature-wallpaper-nature-wallpaper-nature-wallpaper-ai-generated-free-photo.jpg" alt="sorry your browser doesn't support this image">
            <div class="buttons">
                <i class="fa-regular fa-heart"></i>
                <i class="fa-solid fa-expand" title="Expand"></i>
            </div>
        </div>

    <div class="item">
            <img src="https://img.freepik.com/premium-photo/beautiful-magic-forest-landscape_849761-21561.jpg" alt="sorry your browser doesn't support this image">
            <div class="buttons">
                <i class="fa-regular fa-heart"></i>
                <i class="fa-solid fa-expand" title="Expand"></i>
            </div>
        </div>

    <div class="item">
            <img src="https://i.pinimg.com/736x/e9/7f/b0/e97fb03291d10a6c874e73a75ef25d04.jpg" alt="sorry your browser doesn't support this image">
            <div class="buttons">
                <i class="fa-regular fa-heart"></i>
                <i class="fa-solid fa-expand" title="Expand"></i>
            </div>
        </div>

    <div class="item">
            <img src="https://img.freepik.com/premium-photo/sunsetsunrise-summer-landscapebeautiful-natureblue-skyamazing-colorful-cloudsnatural-backgroundartistic-wallpaperlakesun-incredibly-beautiful-sunsetsun-skylake_1028938-76345.jpg" alt="sorry your browser doesn't support this image">
            <div class="buttons">
                <i class="fa-regular fa-heart"></i>
                <i class="fa-solid fa-expand" title="Expand"></i>
            </div>
        </div>

    <div class="item">
            <img src="https://static.vecteezy.com/system/resources/thumbnails/040/697/593/small_2x/ai-generated-tranquil-scene-mountain-peak-pine-tree-moonlight-reflecting-on-water-generated-by-ai-free-photo.jpg" alt="sorry your browser doesn't support this image">
            <div class="buttons">
                <i class="fa-regular fa-heart"></i>
                <i class="fa-solid fa-expand" title="Expand"></i>
            </div>
        </div>

    <div class="item">
            <img src="https://img.freepik.com/premium-photo/bright-moon-night-landscape_839169-35752.jpg" alt="sorry your browser doesn't support this image">
            <div class="buttons">
                <i class="fa-regular fa-heart"></i>
                <i class="fa-solid fa-expand" title="Expand"></i>
            </div>
        </div>

    <div class="item">
            <img src="https://i.pinimg.com/736x/61/e4/8c/61e48c39183b4b384963a6fcb0005d82.jpg" alt="sorry your browser doesn't support this image">
            <div class="buttons">
                <i class="fa-regular fa-heart"></i>
                <i class="fa-solid fa-expand" title="Expand"></i>
            </div>
        </div>

    <div class="item">
            <img src="https://wallpapercave.com/wp/44P5llm.jpg" alt="sorry your browser doesn't support this image">
            <div class="buttons">
                <i class="fa-regular fa-heart"></i>
                <i class="fa-solid fa-expand" title="Expand"></i>
            </div>
        </div>

    <div class="item">
            <img src="https://tse3.mm.bing.net/th/id/OIP.Uin5dLlbL8saKIBZY2M2GQHaE7?rs=1&pid=ImgDetMain&o=7&rm=3" alt="sorry your browser doesn't support this image">
            <div class="buttons">
                <i class="fa-regular fa-heart"></i>
                <i class="fa-solid fa-expand" title="Expand"></i>
            </div>
        </div>

    <div class="item">
            <img src="https://tse2.mm.bing.net/th/id/OIP.0nNb-ZxIp3684apzSzLTzAHaLH?pid=ImgDet&w=184&h=276&c=7&dpr=1.3&o=7&rm=3" alt="sorry your browser doesn't support this image">
            <div class="buttons">
                <i class="fa-regular fa-heart"></i>
                <i class="fa-solid fa-expand" title="Expand"></i>
            </div>
        </div>

    <div class="item">
            <img src="https://tse2.mm.bing.net/th/id/OIP.oZEARlk1OvMFRdxwiQmqSwHaLF?rs=1&pid=ImgDetMain&o=7&rm=3" alt="sorry your browser doesn't support this image">
            <div class="buttons">
                <i class="fa-regular fa-heart"></i>
                <i class="fa-solid fa-expand" title="Expand"></i>
            </div>
        </div>

    <div class="item">
            <img src="https://www.uncovercolorado.com/wp-content/uploads/2021/03/oh-be-joyful-crested-butte-colorado-campground-mountains-768x553.jpg" alt="sorry your browser doesn't support this image">
            <div class="buttons">
                <i class="fa-regular fa-heart"></i>
                <i class="fa-solid fa-expand" title="Expand"></i>
            </div>
        </div>
    
    `
    let love_btn=document.querySelectorAll(".fa-heart");
    addheart();
    saveHearts();
})

let games=document.getElementById("video_games");
games.addEventListener("click", function(){
    isFavoritePage=false;
    galary.innerHTML=`
    <div class="item">
            <img src="https://images.unsplash.com/photo-1664092815415-e1e26aff03aa?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="sorry your browser doesn't support this image">
            <div class="buttons">
                <i class="fa-regular fa-heart"></i>
                <i class="fa-solid fa-expand" title="Expand"></i>
            </div>
        </div>

    <div class="item">
            <img src="https://img.freepik.com/premium-photo/game-controller-headphones-detailed-polished-techdriven-dynamic_1270611-1086.jpg" alt="sorry your browser doesn't support this image">
            <div class="buttons">
                <i class="fa-regular fa-heart"></i>
                <i class="fa-solid fa-expand" title="Expand"></i>
            </div>
        </div>

    <div class="item">
            <img src="https://static0.gamerantimages.com/wordpress/wp-content/uploads/2020/08/Ghost-Recon-Wildlands-1.jpg" alt="sorry your browser doesn't support this image">
            <div class="buttons">
                <i class="fa-regular fa-heart"></i>
                <i class="fa-solid fa-expand" title="Expand"></i>
            </div>
        </div>

    <div class="item">
            <img src="https://tse1.mm.bing.net/th/id/OIP.jOrcDQY4NJV23E9-fimNvQHaLH?pid=ImgDet&w=474&h=711&rs=1&o=7&rm=3" alt="sorry your browser doesn't support this image">
            <div class="buttons">
                <i class="fa-regular fa-heart"></i>
                <i class="fa-solid fa-expand" title="Expand"></i>
            </div>
        </div>

    <div class="item">
            <img src="https://img.gta5-mods.com/q95/images/dirt-roads-mod/7e4468-2015-05-12_00002.jpg" alt="sorry your browser doesn't support this image">
            <div class="buttons">
                <i class="fa-regular fa-heart"></i>
                <i class="fa-solid fa-expand" title="Expand"></i>
            </div>
        </div>

    <div class="item">
            <img src="https://tse1.mm.bing.net/th/id/OIP.JDskGZO6Z1LrS0WALEe_AgHaEK?rs=1&pid=ImgDetMain&o=7&rm=3" alt="sorry your browser doesn't support this image">
            <div class="buttons">
                <i class="fa-regular fa-heart"></i>
                <i class="fa-solid fa-expand" title="Expand"></i>
            </div>
        </div>

    <div class="item">
            <img src="https://i.pinimg.com/736x/fa/32/e8/fa32e8d52ad36941a51adacdbd091a85.jpg" alt="sorry your browser doesn't support this image">
            <div class="buttons">
                <i class="fa-regular fa-heart"></i>
                <i class="fa-solid fa-expand" title="Expand"></i>
            </div>
        </div>

    <div class="item">
            <img src="https://www.ggrecon.com/media/3w1jwjya/tlou-part-one-remake-release-time.jpeg?width=1000&v=1daeed7b009e9f0&quality=60" alt="sorry your browser doesn't support this image">
            <div class="buttons">
                <i class="fa-regular fa-heart"></i>
                <i class="fa-solid fa-expand" title="Expand"></i>
            </div>
        </div>

    <div class="item">
            <img src="https://th.bing.com/th?id=OIF.%2bXlse8GehZJeIYfas1A2qg&rs=1&pid=ImgDetMain&o=7&rm=3" alt="sorry your browser doesn't support this image">
            <div class="buttons">
                <i class="fa-regular fa-heart"></i>
                <i class="fa-solid fa-expand" title="Expand"></i>
            </div>
        </div>

    <div class="item">
            <img src="https://cdn.wccftech.com/wp-content/uploads/2023/12/Call-of-Duty-Modern-Warfare-III-728x414.jpg" alt="sorry your browser doesn't support this image">
            <div class="buttons">
                <i class="fa-regular fa-heart"></i>
                <i class="fa-solid fa-expand" title="Expand"></i>
            </div>
        </div>

    <div class="item">
            <img src="https://cdn.mos.cms.futurecdn.net/9482c163617b5be8b1270aecc65c661a-650-80.jpg" alt="sorry your browser doesn't support this image">
            <div class="buttons">
                <i class="fa-regular fa-heart"></i>
                <i class="fa-solid fa-expand" title="Expand"></i>
            </div>
        </div>

    <div class="item">
            <img src="https://www.psu.com/app/uploads/2018/01/battlefield-1-1024x576.jpg" alt="sorry your browser doesn't support this image">
            <div class="buttons">
                <i class="fa-regular fa-heart"></i>
                <i class="fa-solid fa-expand" title="Expand"></i>
            </div>
        </div>

    <div class="item">
            <img src="https://tse2.mm.bing.net/th/id/OIP.oQjhJmkOw3pIEFQ3FLL76QHaHa?w=768&h=768&rs=1&pid=ImgDetMain&o=7&rm=3" alt="sorry your browser doesn't support this image">
            <div class="buttons">
                <i class="fa-regular fa-heart"></i>
                <i class="fa-solid fa-expand" title="Expand"></i>
            </div>
        </div>

    <div class="item">
            <img src="https://tse4.mm.bing.net/th/id/OIP.MYAAsd-DSNktXox9dO8QKQHaEo?rs=1&pid=ImgDetMain&o=7&rm=3" alt="sorry your browser doesn't support this image">
            <div class="buttons">
                <i class="fa-regular fa-heart"></i>
                <i class="fa-solid fa-expand" title="Expand"></i>
            </div>
        </div>

    <div class="item">
            <img src="https://assetsio.reedpopcdn.com/ar1qhx.jpg?width=1200&height=630&fit=crop&enable=upscale&auto=webp" alt="sorry your browser doesn't support this image">
            <div class="buttons">
                <i class="fa-regular fa-heart"></i>
                <i class="fa-solid fa-expand" title="Expand"></i>
            </div>
        </div>

    <div class="item">
            <img src="https://i.pinimg.com/originals/1e/0c/19/1e0c19db6b69dd0d546cf23903b099e6.jpg" alt="sorry your browser doesn't support this image">
            <div class="buttons">
                <i class="fa-regular fa-heart"></i>
                <i class="fa-solid fa-expand" title="Expand"></i>
            </div>
        </div>
    `
    let love_btn=document.querySelectorAll(".fa-heart");
    addheart();
    saveHearts();
})

let books=document.getElementById("books");
books.addEventListener("click", function(){
    isFavoritePage=false;
    galary.innerHTML=`
    <div class="item">
            <img src="https://img.freepik.com/premium-photo/book-library-with-open-textbookeducation-learning-concept_946346-1659.jpg?w=2000" alt="sorry your browser doesn't support this image">
            <div class="buttons">
                <i class="fa-regular fa-heart"></i>
                <i class="fa-solid fa-expand" title="Expand"></i>
            </div>
        </div>

    <div class="item">
            <img src="https://img.freepik.com/premium-photo/old-books-closeup_926199-34686.jpg" alt="sorry your browser doesn't support this image">
            <div class="buttons">
                <i class="fa-regular fa-heart"></i>
                <i class="fa-solid fa-expand" title="Expand"></i>
            </div>
        </div>

    <div class="item">
            <img src="https://tse4.mm.bing.net/th/id/OIP.Pb-g2IQThdbFcaj-e36lCwHaJ1?w=1507&h=2000&rs=1&pid=ImgDetMain&o=7&rm=3" alt="sorry your browser doesn't support this image">
            <div class="buttons">
                <i class="fa-regular fa-heart"></i>
                <i class="fa-solid fa-expand" title="Expand"></i>
            </div>
        </div>

    <div class="item">
            <img src="https://img.freepik.com/premium-photo/stack-books-with-word-old-top_1057389-76134.jpg" alt="sorry your browser doesn't support this image">
            <div class="buttons">
                <i class="fa-regular fa-heart"></i>
                <i class="fa-solid fa-expand" title="Expand"></i>
            </div>
        </div>

    <div class="item">
            <img src="https://images.stockcake.com/public/d/e/5/de50ef7e-01f6-4c77-ba80-437821177471_large/reading-time-pause-stockcake.jpg" alt="sorry your browser doesn't support this image">
            <div class="buttons">
                <i class="fa-regular fa-heart"></i>
                <i class="fa-solid fa-expand" title="Expand"></i>
            </div>
        </div>

    <div class="item">
            <img src="https://tse2.mm.bing.net/th/id/OIP.2bZL2PLM8hrWU_JqogfY5QHaMG?w=960&h=1568&rs=1&pid=ImgDetMain&o=7&rm=3" alt="sorry your browser doesn't support this image">
            <div class="buttons">
                <i class="fa-regular fa-heart"></i>
                <i class="fa-solid fa-expand" title="Expand"></i>
            </div>
        </div>

    <div class="item">
            <img src="https://img.freepik.com/premium-photo/book-library-with-open-textbook_1042628-296570.jpg" alt="sorry your browser doesn't support this image">
            <div class="buttons">
                <i class="fa-regular fa-heart"></i>
                <i class="fa-solid fa-expand" title="Expand"></i>
            </div>
        </div>

    <div class="item">
            <img src="https://www.raisingglobalkidizens.com/wp-content/uploads/2021/08/several-books-in-two-piles-with-shelves-of-books-in-the-background-735x1103.png" alt="sorry your browser doesn't support this image">
            <div class="buttons">
                <i class="fa-regular fa-heart"></i>
                <i class="fa-solid fa-expand" title="Expand"></i>
            </div>
        </div>

    <div class="item">
            <img src="https://img.freepik.com/premium-photo/library-image-generated-ai_644690-10522.jpg" alt="sorry your browser doesn't support this image">
            <div class="buttons">
                <i class="fa-regular fa-heart"></i>
                <i class="fa-solid fa-expand" title="Expand"></i>
            </div>
        </div>

    <div class="item">
            <img src="https://cdn.pixabay.com/photo/2023/01/15/16/20/library-7720589_1280.jpg" alt="sorry your browser doesn't support this image">
            <div class="buttons">
                <i class="fa-regular fa-heart"></i>
                <i class="fa-solid fa-expand" title="Expand"></i>
            </div>
        </div>

    <div class="item">
            <img src="https://img.freepik.com/premium-photo/classic-style-book-with-illustration-elements-ai-generator_1299778-8913.jpg?w=1060" alt="sorry your browser doesn't support this image">
            <div class="buttons">
                <i class="fa-regular fa-heart"></i>
                <i class="fa-solid fa-expand" title="Expand"></i>
            </div>
        </div>

    <div class="item">
            <img src="https://miro.medium.com/v2/resize:fit:1200/1*Z-N7BruHNSeJrk26MC3bCA.png" alt="sorry your browser doesn't support this image">
            <div class="buttons">
                <i class="fa-regular fa-heart"></i>
                <i class="fa-solid fa-expand" title="Expand"></i>
            </div>
        </div>

    <div class="item">
            <img src="https://img.freepik.com/premium-photo/books-table-photogenerated-ai_944019-2215.jpg" alt="sorry your browser doesn't support this image">
            <div class="buttons">
                <i class="fa-regular fa-heart"></i>
                <i class="fa-solid fa-expand" title="Expand"></i>
            </div>
        </div>

    <div class="item">
            <img src="https://cdn.pixabay.com/photo/2023/04/05/19/44/book-7902218_960_720.jpg" alt="sorry your browser doesn't support this image">
            <div class="buttons">
                <i class="fa-regular fa-heart"></i>
                <i class="fa-solid fa-expand" title="Expand"></i>
            </div>
        </div>

    <div class="item">
            <img src="https://www.redhill.co.za/wp-content/uploads/2023/03/explore-ib.jpg" alt="sorry your browser doesn't support this image">
            <div class="buttons">
                <i class="fa-regular fa-heart"></i>
                <i class="fa-solid fa-expand" title="Expand"></i>
            </div>
        </div>

    <div class="item">
            <img src="https://thumbs.dreamstime.com/b/photostock-stack-books-wooden-board-background-evokes-rustic-charm-vertical-mobile-wallpaper-316568493.jpg" alt="sorry your browser doesn't support this image">
            <div class="buttons">
                <i class="fa-regular fa-heart"></i>
                <i class="fa-solid fa-expand" title="Expand"></i>
            </div>
        </div>

    `
    let love_btn=document.querySelectorAll(".fa-heart");
    addheart();
    saveHearts();
})

let flowers=document.getElementById("flowers");
flowers.addEventListener("click", function(){
    isFavoritePage=false;
    galary.innerHTML=`
    <div class="item">
            <img src="https://th.bing.com/th/id/R.71f046203c9a1769c95f0bfe152f13bf?rik=g2zNENlpJL9cow&pid=ImgRaw&r=0" alt="sorry your browser doesn't support this image">
            <div class="buttons">
                <i class="fa-regular fa-heart"></i>
                <i class="fa-solid fa-expand" title="Expand"></i>
            </div>
        </div>

    <div class="item">
            <img src="https://tse3.mm.bing.net/th/id/OIP.t22iziokFvOV1EMj8hSbrwHaFk?w=1280&h=964&rs=1&pid=ImgDetMain&o=7&rm=3" alt="sorry your browser doesn't support this image">
            <div class="buttons">
                <i class="fa-regular fa-heart"></i>
                <i class="fa-solid fa-expand" title="Expand"></i>
            </div>
        </div>

    <div class="item">
            <img src="https://tse2.mm.bing.net/th/id/OIP.tkdX7n4fsH-wE0UaNlXE-AHaJu?rs=1&pid=ImgDetMain&o=7&rm=3" alt="sorry your browser doesn't support this image">
            <div class="buttons">
                <i class="fa-regular fa-heart"></i>
                <i class="fa-solid fa-expand" title="Expand"></i>
            </div>
        </div>

    <div class="item">
            <img src="https://tse3.mm.bing.net/th/id/OIP.VDh2sVoybvA9bFuS90CSTgHaFj?rs=1&pid=ImgDetMain&o=7&rm=3" alt="sorry your browser doesn't support this image">
            <div class="buttons">
                <i class="fa-regular fa-heart"></i>
                <i class="fa-solid fa-expand" title="Expand"></i>
            </div>
        </div>

    <div class="item">
            <img src="https://images.pexels.com/photos/23957437/pexels-photo-23957437.jpeg?cs=srgb&dl=pexels-marianna-skavatsou-719708617-23957437.jpg&fm=jpg" alt="sorry your browser doesn't support this image">
            <div class="buttons">
                <i class="fa-regular fa-heart"></i>
                <i class="fa-solid fa-expand" title="Expand"></i>
            </div>
        </div>

    <div class="item">
            <img src="https://p0.pikist.com/photos/369/162/rose-petal-flowers-beautiful-pretty-flowers-nature-rose-garden-fresh-medium-buds.jpg" alt="sorry your browser doesn't support this image">
            <div class="buttons">
                <i class="fa-regular fa-heart"></i>
                <i class="fa-solid fa-expand" title="Expand"></i>
            </div>
        </div>

    <div class="item">
            <img src="https://pics.craiyon.com/2023-09-26/b8a5127da33241a78f048c9ac639ea92.webp" alt="sorry your browser doesn't support this image">
            <div class="buttons">
                <i class="fa-regular fa-heart"></i>
                <i class="fa-solid fa-expand" title="Expand"></i>
            </div>
        </div>

    <div class="item">
            <img src="https://cdn.mos.cms.futurecdn.net/CDjnTYxBJ3xgDSEprNt4CR.jpg" alt="sorry your browser doesn't support this image">
            <div class="buttons">
                <i class="fa-regular fa-heart"></i>
                <i class="fa-solid fa-expand" title="Expand"></i>
            </div>
        </div>

    <div class="item">
            <img src="https://th.bing.com/th/id/R.f205c3108eccb4c8dbfbb0d2183a929b?rik=hEFesRJE6%2fUUGA&riu=http%3a%2f%2fwww.autogrow.co.uk%2fimages%2fproducts%2f694%2f1309274870_perennial_3w7501_full.jpg&ehk=P2blZcj5plV%2fSNWAU%2bAoqlPrX8EPp9KiYQFshGDCUMs%3d&risl=&pid=ImgRaw&r=0" alt="sorry your browser doesn't support this image">
            <div class="buttons">
                <i class="fa-regular fa-heart"></i>
                <i class="fa-solid fa-expand" title="Expand"></i>
            </div>
        </div>

    <div class="item">
            <img src="https://keyassets.timeincuk.net/inspirewp/live/wp-content/uploads/sites/8/2018/03/E79XAA-1280x1920.jpg" alt="sorry your browser doesn't support this image">
            <div class="buttons">
                <i class="fa-regular fa-heart"></i>
                <i class="fa-solid fa-expand" title="Expand"></i>
            </div>
        </div>

    <div class="item">
            <img src="https://th.bing.com/th/id/R.4da1ee7dd2827ec7e9fa4a00c51cfefe?rik=Okf4NccizCTpJA&pid=ImgRaw&r=0" alt="sorry your browser doesn't support this image">
            <div class="buttons">
                <i class="fa-regular fa-heart"></i>
                <i class="fa-solid fa-expand" title="Expand"></i>
            </div>
        </div>

    <div class="item">
            <img src="https://tse3.mm.bing.net/th/id/OIP.LZQwzAzuDTX7-Erjz2F0OgHaLH?pid=ImgDet&w=474&h=711&rs=1&o=7&rm=3" alt="sorry your browser doesn't support this image">
            <div class="buttons">
                <i class="fa-regular fa-heart"></i>
                <i class="fa-solid fa-expand" title="Expand"></i>
            </div>
        </div>

    <div class="item">
            <img src="https://tse2.mm.bing.net/th/id/OIP.07HAwh37UHiJhTLJQ94x0gHaLD?rs=1&pid=ImgDetMain&o=7&rm=3" alt="sorry your browser doesn't support this image">
            <div class="buttons">
                <i class="fa-regular fa-heart"></i>
                <i class="fa-solid fa-expand" title="Expand"></i>
            </div>
        </div>

    <div class="item">
            <img src="https://a-z-animals.com/media/2023/08/GettyImages-1459292543-2048x1365.jpg" alt="sorry your browser doesn't support this image">
            <div class="buttons">
                <i class="fa-regular fa-heart"></i>
                <i class="fa-solid fa-expand" title="Expand"></i>
            </div>
        </div>

    <div class="item">
            <img src="https://i0.wp.com/www.heiditown.com/wp-content/uploads/2016/07/Wildflowers-wild-chipmunks-on-Grand-Mesa.-HeidiTown.com-4.jpg?resize=400%2C600&ssl=1" alt="sorry your browser doesn't support this image">
            <div class="buttons">
                <i class="fa-regular fa-heart"></i>
                <i class="fa-solid fa-expand" title="Expand"></i>
            </div>
        </div>

    <div class="item">
            <img src="https://wallpaper-house.com/data/out/5/wallpaper2you_65027.jpg" alt="sorry your browser doesn't support this image">
            <div class="buttons">
                <i class="fa-regular fa-heart"></i>
                <i class="fa-solid fa-expand" title="Expand"></i>
            </div>
        </div>
    `
    let love_btn=document.querySelectorAll(".fa-heart");
    addheart();
    saveHearts();
})

let programmers=document.getElementById("programmers");
programmers.addEventListener("click", function () {
    isFavoritePage=false;
    galary.innerHTML=`
    <div class="item">
            <img src="https://img.freepik.com/premium-photo/programmer-working-software-development_1029679-7169.jpg" alt="sorry your browser doesn't support this image">
            <div class="buttons">
                <i class="fa-regular fa-heart"></i>
                <i class="fa-solid fa-expand" title="Expand"></i>
            </div>
        </div>

    <div class="item">
            <img src="https://img.freepik.com/premium-photo/rear-view-muslim-female-programmer-hijab-sitting-front-computer-screen_274679-44363.jpg" alt="sorry your browser doesn't support this image">
            <div class="buttons">
                <i class="fa-regular fa-heart"></i>
                <i class="fa-solid fa-expand" title="Expand"></i>
            </div>
        </div>

    <div class="item">
            <img src="https://img.freepik.com/premium-photo/computer-desktop-screen-with-full-codes-book-with-coffee-cup-table_517312-19308.jpg" alt="sorry your browser doesn't support this image">
            <div class="buttons">
                <i class="fa-regular fa-heart"></i>
                <i class="fa-solid fa-expand" title="Expand"></i>
            </div>
        </div>

    <div class="item">
            <img src="https://img.freepik.com/premium-photo/enhancing-user-experience-javascript-enables-interactive-dynamic-content-webpage_271410-28909.jpg" alt="sorry your browser doesn't support this image">
            <div class="buttons">
                <i class="fa-regular fa-heart"></i>
                <i class="fa-solid fa-expand" title="Expand"></i>
            </div>
        </div>

    <div class="item">
            <img src="https://img.freepik.com/premium-photo/productive-workstation-desk_951586-60517.jpg" alt="sorry your browser doesn't support this image">
            <div class="buttons">
                <i class="fa-regular fa-heart"></i>
                <i class="fa-solid fa-expand" title="Expand"></i>
            </div>
        </div>

    <div class="item">
            <img src="https://thumbs.dreamstime.com/b/sleek-laptop-displays-lines-code-clean-desk-coding-machine-learning-361369414.jpg" alt="sorry your browser doesn't support this image">
            <div class="buttons">
                <i class="fa-regular fa-heart"></i>
                <i class="fa-solid fa-expand" title="Expand"></i>
            </div>
        </div>

    <div class="item">
            <img src="https://miro.medium.com/v2/da:true/resize:fit:1024/0*W0TgX3uhe3F5O_5K" alt="sorry your browser doesn't support this image">
            <div class="buttons">
                <i class="fa-regular fa-heart"></i>
                <i class="fa-solid fa-expand" title="Expand"></i>
            </div>
        </div>

    <div class="item">
            <img src="https://img.freepik.com/premium-photo/laptop-with-code-screen-dirty-cup-coffee-generative-ai_847288-5095.jpg" alt="sorry your browser doesn't support this image">
            <div class="buttons">
                <i class="fa-regular fa-heart"></i>
                <i class="fa-solid fa-expand" title="Expand"></i>
            </div>
        </div>

    <div class="item">
            <img src="https://img.freepik.com/premium-photo/hacker-wearing-hoodie-typing-laptop-with-ominous-green-code-screen-generative-ai_742252-14362.jpg" alt="sorry your browser doesn't support this image">
            <div class="buttons">
                <i class="fa-regular fa-heart"></i>
                <i class="fa-solid fa-expand" title="Expand"></i>
            </div>
        </div>

    <div class="item">
            <img src="https://thumbs.dreamstime.com/b/ethical-hackers-penetration-testing-ethical-hacking-concept-faceless-hooded-male-person-cybersecurity-data-protection-293739755.jpg" alt="sorry your browser doesn't support this image">
            <div class="buttons">
                <i class="fa-regular fa-heart"></i>
                <i class="fa-solid fa-expand" title="Expand"></i>
            </div>
        </div>

    <div class="item">
            <img src="https://miro.medium.com/v2/resize:fit:1200/1*_DciWPB_rV8Zuz28EUGCvQ.jpeg" alt="sorry your browser doesn't support this image">
            <div class="buttons">
                <i class="fa-regular fa-heart"></i>
                <i class="fa-solid fa-expand" title="Expand"></i>
            </div>
        </div>

    <div class="item">
            <img src="https://swall.teahub.io/photos/small/88-883605_php-emblem-wallpaper-php-elephant-logo-png.png" alt="sorry your browser doesn't support this image">
            <div class="buttons">
                <i class="fa-regular fa-heart"></i>
                <i class="fa-solid fa-expand" title="Expand"></i>
            </div>
        </div>

    <div class="item">
            <img src="https://tse1.mm.bing.net/th/id/OIP.JCQNqJRKLApoUVWDDBBBsAHaHa?rs=1&pid=ImgDetMain&o=7&rm=3" alt="sorry your browser doesn't support this image">
            <div class="buttons">
                <i class="fa-regular fa-heart"></i>
                <i class="fa-solid fa-expand" title="Expand"></i>
            </div>
        </div>

    <div class="item">
            <img src="https://img.freepik.com/premium-vector/programming-code-coding-hacker-sign-programming-code-icon-made-with-binary-code-wireframe-hand_127544-3400.jpg" alt="sorry your browser doesn't support this image">
            <div class="buttons">
                <i class="fa-regular fa-heart"></i>
                <i class="fa-solid fa-expand" title="Expand"></i>
            </div>
        </div>

    <div class="item">
            <img src="https://tse2.mm.bing.net/th/id/OIP.aHUzm3L-5ZBKajHNDGXemgHaFj?rs=1&pid=ImgDetMain&o=7&rm=3" alt="sorry your browser doesn't support this image">
            <div class="buttons">
                <i class="fa-regular fa-heart"></i>
                <i class="fa-solid fa-expand" title="Expand"></i>
            </div>
        </div>

    <div class="item">
            <img src="https://ih1.redbubble.net/image.764102418.5499/fposter,small,wall_texture,product,750x1000.u1.jpg" alt="sorry your browser doesn't support this image">
            <div class="buttons">
                <i class="fa-regular fa-heart"></i>
                <i class="fa-solid fa-expand" title="Expand"></i>
            </div>
        </div>
    `
    let love_btn=document.querySelectorAll(".fa-heart");
    addheart();
    saveHearts();
}
    
)