

/*
=========================================
? => Welcome To Js :----
=========================================
*/


//? Treatment Advice Section Js :--

const Add_New_Advice_Btn = document.querySelector('.Add-New-Advice');
const add_new_advice_container = document.querySelector('.add-new-advice-container');
const Treatment_Type_Select = document.querySelector('#Treatment_Type_Select');
const Oocyte_Source = document.querySelector('.Oocyte_Source');
const Semen_Source = document.querySelector('.Semen_Source');
const Embryo_Source = document.querySelector('.Embryo_Source');
const Checkbox_IVF = document.querySelector('.Checkbox_IVF')




Add_New_Advice_Btn.addEventListener('click', () => {
    add_new_advice_container.style.display = "block"
})

Treatment_Type_Select.addEventListener('change', function () {
    const selectedOption = this.options[this.selectedIndex].value;
    // alert('Selected Treatment: ' + selectedOption);



    if (selectedOption === "IVF") {
        Oocyte_Source.style.display = "flex";
        Semen_Source.style.display = "flex";
        Checkbox_IVF.style.display = "flex"
        Embryo_Source.style.display = "none";

    }
    else if (selectedOption === "IUI") {
        Checkbox_IVF.style.display = "none"
        Oocyte_Source.style.display = "none";
        Embryo_Source.style.display = "none";
        Semen_Source.style.display = "flex";

    }
    else if (selectedOption === "FET") {
        Checkbox_IVF.style.display = "none"
        Oocyte_Source.style.display = "none";
        Semen_Source.style.display = "none";
        Embryo_Source.style.display = "flex";
    }
    else {
        Checkbox_IVF.style.display = "none"
        Oocyte_Source.style.display = "none";
        Semen_Source.style.display = "none";
        Embryo_Source.style.display = "none";
    }
});