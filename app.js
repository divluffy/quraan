let sura = document.querySelector('.surah')
let qaraa = document.querySelector('#qaraa')
let container = document.querySelector('.container')
let aya = document.querySelector('.aya')
let lang = document.querySelector('.lang')
let out2 = document.querySelector('.out2')
let out3 = document.querySelector('.out3')
let out4 = document.querySelector('.out4')
let out5 = document.querySelector('.out5')
let out6 = document.querySelector('.out6')
let out7 = document.querySelector('.out7')
let out8 = document.querySelector('.out8')
let out9 = document.querySelector('.out9')
let out10 = document.querySelector('.out10')

let url = 'https://api.quran.sutanlab.id/surah'
let url2 = 'https://mp3quran.net/api/_english.php'



// create optione quraa
fetch(url2).then(data=>{
    return data.json()
}).then(getData=>{

    for (let i = 0; i < getData.reciters.length; i++) {
        qaraa.innerHTML += `<option value="${getData.reciters[i].Server}" name="${getData.reciters[i].name}">${getData.reciters[i].name}</option>`
    }
})


qaraa.addEventListener('change', ()=>{
    let theSurah = sura.value
    let theQaraa = qaraa.value
    sura.value = ""

    //get api for name and number surah
    fetch(url).then(data=>{return data.json()}).then(getData=>{
    let numberSurah = 0
        //get number of surah
        for (let i = 0; i < getData.data.length; i++) {
            if( theSurah == getData.data[i].name.short ||
                theSurah == getData.data[i].name.translation.en ||
                theSurah == getData.data[i].name.transliteration.en){
                    numberSurah = i+1
            }
        }
        
        //add number surah for server value
        if(numberSurah <10){
            theQaraa = `${theQaraa}/00${numberSurah}.mp3`
        }else if(numberSurah <100){
            theQaraa = `${theQaraa}/0${numberSurah}.mp3`
        }else if(numberSurah <115){
            theQaraa = `${theQaraa}/${numberSurah}.mp3`
        }

        //send values
    out9.src = theQaraa
    out10.href = theQaraa
    out4.innerHTML = getData.data[numberSurah-1].numberOfVerses
    out6.innerHTML = numberSurah
    out7.innerHTML = theSurah
    out5.innerHTML = getData.data[numberSurah-1].tafsir.id

// rewaya and name
    fetch(url2).then(data=>{
        return data.json()
    }).then(getData=>{

            let rewaya = ""
            let name = ''
                for (let i = 0; i < getData.reciters.length; i++) {
                    if(getData.reciters[i].Server == qaraa.value){
                        rewaya = getData.reciters[i].rewaya
                        name = getData.reciters[i].name
                    }
                }
            out2.innerHTML = name
            out3.innerHTML = rewaya
                        
    })
    //show form if there input
    container.classList.add('active')

 }).catch(()=>{
     alert("plz enter name surah languge arabic or english")
 })

})



