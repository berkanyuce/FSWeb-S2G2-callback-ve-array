const { fifaData } = require('./fifa.js')


/* Görev 1: 
	Verilen datayı parçalayarak aşağıdaki verileri (console.log-ing) elde ederek pratik yapın. 
	
	💡 İPUCU: Öncelikle datayı filtrelemek isteyebilirsiniz */


	let finalMaci = fifaData.filter(mac => mac.Stage == "Final" && mac.Year == 2014);
	finalMaci = finalMaci[0]

//(a) 2014 Dünya kupası Finali Evsahibi takım ismi (dizide "Home Team Name" anahtarı)
	//console.log(finalMaci["Home Team Name"])
//(b) 2014 Dünya kupası Finali Deplasman takım ismi  (dizide "Away Team Name" anahtarı)
	//console.log(finalMaci["Away Team Name"])
//(c) 2014 Dünya kupası finali Ev sahibi takım golleri (dizide "Home Team Goals" anahtarı)
	//console.log(finalMaci["Home Team Goals"])
//(d)2014 Dünya kupası finali Deplasman takım golleri  (dizide "Away Team Goals" anahtarı)
	//console.log(finalMaci["Away Team Goals"])
//(e) 2014 Dünya kupası finali kazananı*/
/*
	let skor = finalMaci["Home Team Goals"] - finalMaci["Away Team Goals"];
	if(skor > 0)
		console.log("Kazanan", finalMaci["Home Team Name"])
	else if(skor < 0)
		console.log("Kazanan", finalMaci["Away Team Name"])
	else
		// Penaltılarda kazananı yazma örneğini az sonra yapıcaz.
		console.log("Penaltılar")
*/


/*  Görev 2: 
	Finaller adlı fonksiyonu kullanarak aşağıdakileri uygulayın:
	1. Bir dizi(array) olan Fifa datasını fonksiyonun birinci parametresi olarak alacak
	2. Sadece final maçlarını içeren nesnenin(object) datalarını filtreleyerek, bir dizi olarak döndürecek(return)
	
	💡 İPUCU - verilen data içindeki nesnelerin(objects) "Stage" anahtarına bakmalısınız
*/

function Finaller(data) {
	const finalMaclari = data.filter((mac) => {
		return mac.Stage == "Final";
	});
	return finalMaclari;
}
//console.log(Finaller(fifaData))


/*  Görev 3: 
	Bir higher-order fonksiyonu olan Yillar isimli fonksiyona aşağıdakileri uygulayın: 
	1. fifaData dizisini(array) fonksiyonun birinci parametresi olarak alacak
	2. Görev 2'de yazdığınız Finaller fonksiyonunu, geriçağırım(callback) olarak fonksiyonun ikinci parametresi olarak alacak
	3. Finaller data setindeki tüm yılları içeren "years" adındaki diziyi(array) döndürecek
	*/

function Yillar(data, Finaller) {
	let finaller = Finaller(data);
	const years = finaller.map((mac) => { return mac.Year; });
	return years;
}
//console.log(Yillar(fifaData, Finaller))

/*  Görev 4: 
	Bir higher-order fonksiyonunu olan Kazananlar isimli fonksiyona aşağıdakileri uygulayın:  
	1. fifaData dizisini(array) fonksiyonunun birinci parametresi olarak alacak
	2. Görev 2'de yazdığınız Finaller fonksiyonunu, geriçağırım(callback) olarak fonksiyonun ikinci parametresi olarak alacak
	3. Her final maçının kazananını (evsahibi ya da deplasman) belirleyecek
	💡 İPUCU: Beraberlikler(ties) için şimdilik endişelenmeyin (Detaylı bilgi için README dosyasına bakabilirsiniz.)
	4. Tüm kazanan ülkelerin isimlerini içeren `kazananlar` adında bir dizi(array) döndürecek(return)  */ 

function Kazananlar(data, Finaller) {
	// Bu kod geçmişte Batı Almanya'nın finallerde penaltılarda kazanmadığı bilinerek yazıldı.
	let finaller = Finaller(data);
	const winners = finaller.map((mac) => { 
		if(mac["Home Team Goals"] == mac["Away Team Goals"]){
			let sonuc = mac["Win conditions"].split(' ');
			return sonuc[0];
		}
		else{
			let macSonucu = mac["Home Team Goals"] - mac["Away Team Goals"];
			if(macSonucu > 0)
				return mac["Home Team Name"]
			else 
				return mac["Away Team Name"]
		}
	});
	return winners;
}
//console.log(Kazananlar(fifaData, Finaller))



/*  Görev 5: 
	Bir higher-order fonksiyonu olan YillaraGoreKazananlar isimli fonksiyona aşağıdakileri uygulayın:
	1. fifaData dizisini(array) fonksiyonunun birinci parametresi olarak alacak
	2. Görev 2'de yazdığınız Finaller fonksiyonunu, geriçağırım(callback) olarak fonksiyonun ikinci parametresi olarak alacak
	3. Görev 3'de yazdığınız Yillar fonksiyonunu, geriçağırım(callback) olarak fonksiyonun üçüncü parametresi olarak alacak
	4. Görev 4'de yazdığınız Kazananlar fonksiyonunu, geriçağırım(callback) olarak fonksiyonun dördüncü parametresi olarak alacak
	5. Her yıl için "{yıl} yılında, {ülke} dünya kupasını kazandı!" cümlesini(string) içeren bir diziyi(array) döndürecek
	
	💡 İPUCU: her cümlenin adım 4'te belirtilen cümleyle birebir aynı olması gerekmektedir.
*/

function YillaraGoreKazananlar(data, Finaller, Yillar, Kazananlar) {
	let finalYillari = Yillar(data, Finaller)
	let kazananlar = Kazananlar(fifaData, Finaller)
	let result = [];
	for(let i = 0; i < kazananlar.length; i++){
		result.push(`${finalYillari[i]} yılında, ${kazananlar[i]} dünya kupasını kazandı!`)
	}
	return result
}
//console.log(YillaraGoreKazananlar(fifaData, Finaller, Yillar, Kazananlar))


/*  Görev 6: 
	Bir higher order fonksiyonu olan `OrtalamaGolSayisi` isimli fonksiyona aşağıdakileri uygulayın: 
	1. Görev 2'de yazdığınız `Finaller` fonksiyonunu birinci parametre olarak alacak; 'fifaData' dizisini argüman olarak eklediğinizden emin olun
	
	💡 İPUCU: Çağırma örneği: `OrtalamaGolSayisi(Finaller(fifaData));`
	
	2. Her maç için Ortalama toplam evsahibi gol sayısı ve toplam deplasman gol sayısını hesaplayacak (her maçta atılan toplam gol sayısı)
	
	3. Sonucun 2. ondalığını yuvarlayıp, bulunan değeri döndürecek(return)
	
	💡 İPUCU: .reduce, .toFixed (dizilim(syntax) için MDN'ye bakın) kullan, ve bunu 2 adımda yapın) 
	
*/

function OrtalamaGolSayisi(finalMaclari) {
	const toplam = finalMaclari.reduce((total, mac) => total + mac["Home Team Goals"] + mac["Away Team Goals"], 0); //buraya yazılan 0, total değişkenini 0'dan başlatır.
	const macSayisi = finalMaclari.length;
	let result = toplam / macSayisi;
	return result.toFixed(2);
}
//console.log(OrtalamaGolSayisi(Finaller(fifaData)))



/// EKSTRA ÇALIŞMALAR ///

/*  BONUS 1:  
	`UlkelerinKazanmaSayilari` isminde bir fonksiyon oluşturun, parametre olarak `data` ve `takım kısaltmalarını` alacak ve hangi ülkenin kaç dünya kupası olduğunu döndürecek
	
	İpucu: "takım kısaltmaları" (team initials) için datada araştırma yapın!
İpucu: `.reduce` Kullanın*/

function UlkelerinKazanmaSayilari(data) {
	
    /* kodlar buraya */
	// Takım kısaltmalarını kullanmak kodu uzatacağı için böyle yazdım.
	let kazananlar = Kazananlar(fifaData, Finaller)
	let sayac = {};

    for (let i = 0; i < kazananlar.length; i++) {
        let ulke = kazananlar[i];
        if (sayac[ulke]) {
            sayac[ulke]++;
        } else {
            sayac[ulke] = 1;
        }
    }

    return sayac;
}
//console.log(UlkelerinKazanmaSayilari(fifaData))

/*  BONUS 2:  
EnCokGolAtan() isminde bir fonksiyon yazın, `data` yı parametre olarak alsın ve Dünya kupası finallerinde en çok gol atan takımı döndürsün */

function EnCokGolAtan(data) {
	
    /* kodlar buraya */
	let finalMaclari = Finaller(data);
	// Takım skorlarını hesaplamak için bir nesne oluşturun
	let takimSkorlari = {};

	// Veriler üzerinde dönün ve skorları hesaplayın
	for (let i = 0; i < finalMaclari.length; i++) {
		let mac = finalMaclari[i];
		let evSahibiTakim = mac['Home Team Name'];
		let evSahibiGol = mac['Home Team Goals'];
		let konukTakim = mac['Away Team Name'];
		let konukGol = mac['Away Team Goals'];

		if (evSahibiTakim in takimSkorlari) {
			takimSkorlari[evSahibiTakim] += evSahibiGol;
		} else {
			takimSkorlari[evSahibiTakim] = evSahibiGol;
		}

		if (konukTakim in takimSkorlari) {
            takimSkorlari[konukTakim] += konukGol;
        } else {
            takimSkorlari[konukTakim] = konukGol;
        }
	}

	// En fazla gol atan takımı bulun
	let enFazlaGolAtanTakim = null;
	let enFazlaGol = 0;

	for (let takim in takimSkorlari) {
	if (takimSkorlari[takim] > enFazlaGol) {
		enFazlaGolAtanTakim = takim;
		enFazlaGol = takimSkorlari[takim];
	}
	}
	return enFazlaGolAtanTakim;
}
//console.log(EnCokGolAtan(fifaData))


/*  BONUS 3: 
EnKotuDefans() adında bir fonksiyon yazın, `data` yı parametre olarak alsın ve Dünya kupasında finallerinde en çok golü yiyen takımı döndürsün*/

function EnKotuDefans(data) {
	
    /* kodlar buraya */
	let finalMaclari = Finaller(data);
	// Takım skorlarını hesaplamak için bir nesne oluşturun
	let takimSkorlari = {};

	// Veriler üzerinde dönün ve skorları hesaplayın
	for (let i = 0; i < finalMaclari.length; i++) {
		let mac = finalMaclari[i];
		let evSahibiTakim = mac['Home Team Name'];
		let evSahibiYedigiGol = mac['Away Team Goals'];
		let konukTakim = mac['Away Team Name'];
		let konukYedigiGol = mac['Home Team Goals'];

		if (evSahibiTakim in takimSkorlari) {
			takimSkorlari[evSahibiTakim] += evSahibiYedigiGol;
		} else {
			takimSkorlari[evSahibiTakim] = evSahibiYedigiGol;
		}

		if (konukTakim in takimSkorlari) {
            takimSkorlari[konukTakim] += konukYedigiGol;
        } else {
            takimSkorlari[konukTakim] = konukYedigiGol;
        }
	}

	// En fazla gol atan takımı bulun
	let enFazlaGolYiyenTakim = null;
	let enFazlaGol = 0;

	for (let takim in takimSkorlari) {
	if (takimSkorlari[takim] > enFazlaGol) {
		enFazlaGolYiyenTakim = takim;
		enFazlaGol = takimSkorlari[takim];
	}
	}
	return enFazlaGolYiyenTakim;
}
//console.log(EnKotuDefans(fifaData))


/* Hala vaktiniz varsa, README dosyasında listelenen hedeflerden istediğinizi aşağıdaki boşluğa yazabilirsiniz. */


/* Bu satırın aşağısındaki kodları lütfen değiştirmeyin */
function sa(){
    console.log('Kodlar çalışıyor');
    return 'as';
}
sa();
module.exports = {
    sa,
    Finaller,
    Yillar,
    Kazananlar,
    YillaraGoreKazananlar,
    OrtalamaGolSayisi
}
