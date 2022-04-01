
let iphone=["iphone12","11000","iphone12 pro","13000","iphone13","17000","iphone13 mini","17000","iphone13 pro","24000","iphone13 pro max","26000"];
let samsung=["samsungS20","3500","samsungS20 FE","4200","samsungS21","4000","samsungS21 PLUS","10000","samsungS21 ULTRA","15000"];
let xioami=["redminote 9 ","2000","redminote 9 pro max","2500","redminote 10","3500","redminote 10 pro","4000","redminote 10 pro max","6000"];


let i;
let urunAciklama,urunSecenek;
let eklenecekler=[];
let fiyatlar=[];


let listeSepet=document.getElementById("sepetMarket");
let toplamTutar=0;
const kod="telefon";


for(i=0;i<document.getElementsByName("kategori").length;i++)
{
    document.getElementsByName("kategori")[i].addEventListener("change",urunleriGetir);
}   

function olustur(){
    urunAciklama=document.createElement("label");
    urunSecenek=document.createElement("input");
    document.getElementById("urunPanel").appendChild(urunAciklama);
    document.getElementById("urunPanel").appendChild(urunSecenek);
    urunSecenek.type="checkbox";
    urunSecenek.setAttribute("name","urunler");
    urunAciklama.setAttribute("for","urunler");
    urunAciklama.setAttribute("class","urunler");
}

function urunleriGetir(){
    const silinecekler = document.getElementById("urunPanel");
    while (silinecekler.hasChildNodes()) {
      silinecekler.removeChild(silinecekler.firstChild);
    }
    if(document.getElementById("kategoriphone").checked)
    {
        for(i=0;i<iphone.length;i=i+2)
        {
            olustur();
            urunSecenek.value=iphone[i+1];
            urunAciklama.innerHTML=iphone[i]; 
           
        }
    }
    else if(document.getElementById("kategorisamsung").checked)
    {
        for(i=0;i<samsung.length;i=i+2)
        {
        olustur();
        urunSecenek.value=samsung[i+1];
        urunAciklama.innerHTML=samsung[i];
        }
    }
    else if(document.getElementById("kategorixioami").checked)
    {
        for(i=0;i<xioami.length;i=i+2)
        {
        olustur();
        urunSecenek.value=xioami[i+1];
        urunAciklama.innerHTML=xioami[i];
        
        }
    }
}

function sepeteEkle(){
    const listeUrunlerFiyat=document.getElementsByName("urunler");
    const listeUrunlerAd=document.getElementsByClassName("urunler");
    let adet=document.getElementById("urunAdet").value;

        eklenecekler=[];
        fiyatlar=[];

       
        for(i=0;i<listeUrunlerFiyat.length;i++){
            if(listeUrunlerFiyat[i].checked){
                toplamTutar+=(Number(listeUrunlerFiyat[i].value)*adet);
                eklenecekler.push(listeUrunlerAd[i].innerHTML);
                fiyatlar.push(listeUrunlerFiyat[i].value);
            }
        }
        console.log(eklenecekler);
        console.log(fiyatlar);

    for(i=0;i<adet;i++)
    {
        let sepeteEklenecekUrun;
        for(let j=0;j<eklenecekler.length;j++){
            sepeteEklenecekUrun=document.createElement("option");
            listeSepet.options.add(sepeteEklenecekUrun);
            sepeteEklenecekUrun.text=eklenecekler[j];
            sepeteEklenecekUrun.value=fiyatlar[j];
        }
    }
    document.getElementById("sepetTutar").innerHTML=toplamTutar+" TL";
}
function sepettenCikar(){
    let seciliIndeks=listeSepet.selectedIndex;
    let silinecekUrununFiyati=listeSepet.options[seciliIndeks].value;
    listeSepet.options.remove(seciliIndeks);
    toplamTutar=toplamTutar-silinecekUrununFiyati;
    document.getElementById("sepetTutar").innerHTML=toplamTutar+" TL";
}

function sepetiBosalt(){
    document.querySelectorAll('#sepetMarket option').forEach(eleman => eleman.remove());
    toplamTutar=0;
    document.getElementById("sepetTutar").innerHTML=toplamTutar+" TL";

}

function koduEkle(){
    let girilenKod=document.getElementById("txtIndirim").value;
    if(girilenKod == kod)
    {
        if(toplamTutar>=50)
        {
            toplamTutar=toplamTutar-10;
            
            document.getElementById("sepetTutar").innerHTML=toplamTutar+" TL";
            document.getElementById("sonuc").innerHTML="İndirim uygulandı.";
            document.getElementById("txtIndirim").disabled=true;
            document.getElementById("txtIndirim").value="";
        }
        else{
            document.getElementById("sonuc").innerHTML="Girdiğiniz kod için minimum sepet tutarı 50 TL olmalıdır!";
        }
    }
        else{
            document.getElementById("sonuc").innerHTML="Geçerli bir kod girmediniz!";
    }
}
   