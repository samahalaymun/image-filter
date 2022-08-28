const fileInput = document.querySelector(".file-input");
const chooseImgBtn = document.querySelector(".choose-img");
const previewImage = document.querySelector(".preview-img img")
const filterOptions = document.querySelectorAll(".filter button")
const filterName = document.querySelector(".slider-info .name");
const filterValue = document.querySelector(".slider-info .value");
const filterSlider = document.querySelector(".slider input");
const saveImgBtn = document.querySelector(".save-img");
const resetFilterBtn = document.querySelector(".reset-filter");
const rotateOptions = document.querySelectorAll(".rotate button")
let Brightness = 100, Saturation = 100, Inversion = 0, Grayscale = 0;
let rotate = 0;
let flipHorizontal = 1, flipVertical = 1;
const applyFilters = () => {
    previewImage.style.transform = ` rotate(${rotate}deg) scale(${flipHorizontal},${flipVertical})`;
    previewImage.style.filter = `brightness(${Brightness}%) saturate(${Saturation}%) grayscale(${Grayscale}%) invert(${Inversion}%)`;
}
const loadImage = () => {
    let file = fileInput.files[0];
    if (!file) return;
    previewImage.src = URL.createObjectURL(file);
    previewImage.addEventListener("load", () => {
        resetFilter();
        document.querySelector(".container").classList.remove("disable");
    })
  
}
filterOptions.forEach(option => {
    option.addEventListener("click", () => {
        document.querySelector(".filter .active").classList.remove("active");
        option.classList.add("active");
        filterName.innerText = option.innerText;
        if (option.id === "Brightness") {
            filterSlider.max = "200";
            filterSlider.value = Brightness;
            filterValue.innerText = `${Brightness}%`;
        } else if (option.id === "Saturation") {
            filterSlider.max = "200";
            filterSlider.value = Saturation;
            filterValue.innerText = `${Saturation}%`;
        } else if (option.id === "Inversion") {
            filterSlider.max = "100";
            filterSlider.value = Inversion;
            filterValue.innerText = `${Inversion}%`;
        } else if (option.id === "Grayscale") {
            filterSlider.max = "100";
            filterSlider.value = Grayscale;
            filterValue.innerText = `${Grayscale}%`;
        }

    })

})
rotateOptions.forEach(option => {
    option.addEventListener("click", () => {
        console.log(option.id)
        if (option.id === "rotate-left") {
            rotate -= 90;
        } else if (option.id === "rotate-right") {
            rotate += 90;
        }
        else if (option.id === "reflect-vertical") {
            flipHorizontal = flipHorizontal === 1 ? -1 : 1
        }
        else if (option.id === "reflect-horizontal") {
            flipVertical = flipVertical === 1 ? -1 : 1
        }
        applyFilters()

    })

})
const updateFilter = () => {
    filterValue.innerText = `${filterSlider.value}%`;
    const selectedFilter = document.querySelector(".filter .active")
    if (selectedFilter.id === "Brightness") {
        Brightness = filterSlider.value;
    } else if (selectedFilter.id === "Saturation") {
        Saturation = filterSlider.value;
    }
    else if (selectedFilter.id === "Inversion") {
        Inversion = filterSlider.value;
    } else if (selectedFilter.id === "Grayscale") {
        Grayscale = filterSlider.value;
    }

    applyFilters()
}
const resetFilter = () => {
    console.log("reset")
    Brightness = 100, Saturation = 100, Inversion = 0, Grayscale = 0;
    rotate = 0;
    flipHorizontal = 1, flipVertical = 1;
    filterOptions[0].click();
    applyFilters();
}
const saveImage = () => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    canvas.width = previewImage.naturalWidth;
    canvas.height = previewImage.naturalHeight;
    ctx.filter = `brightness(${Brightness}%) saturate(${Saturation}%) grayscale(${Grayscale}%) invert(${Inversion}%)`;
    ctx.translate(canvas.width/2, canvas.height/2)
    ctx.scale(flipHorizontal,flipVertical);
    if(rotate !== 0){
        ctx.rotate(rotate * Math.PI / 180)
    }
    ctx.drawImage(previewImage, -canvas.width/2, -canvas.height/2, canvas.width, canvas.height);
    const link=document.createElement("a");
    link.download="image.jpg";
    link.href=canvas.toDataURL();
    link.click();
}
filterSlider.addEventListener("input", updateFilter)
fileInput.addEventListener("change", loadImage)
chooseImgBtn.addEventListener("click", () => fileInput.click());
resetFilterBtn.addEventListener("click", resetFilter);
saveImgBtn.addEventListener("click", saveImage)




