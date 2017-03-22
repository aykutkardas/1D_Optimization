/*
 * @Name:   RocketCut v1.0.0 
 * @Desc:   1D Optimization Tools
 * @Author: Aykut Kardaş
 *
 */


function REPORT(RESULT) {

  var i, j,
    REP = [],
    BREP = [],
    tmp_result,
    index;

  for (i = 0; i < RESULT.length; i += 1) {

    tmp_result = RESULT[i].toString();
    //console.log(tmp_result);
    index = REP.indexOf(tmp_result);

    if (index > -1) {

      //console.log(index);
      BREP[index].q += 1;

    } else {

      var tmpr = tmp_result.split(",").slice(1, 1000);
      var blocks = [];
      var bblocks = [];

      for (z = 0; z < tmpr.length; z++) {
        var indx = blocks.indexOf(tmpr[z]);
        if (indx > -1) {
          bblocks[indx].q += 1;
        } else {
          blocks.push(tmpr[z]);
          bblocks.push({
            list: tmpr[z],
            q: 1
          })
        }

      }

      REP.push(tmp_result);
      BREP.push({
        list: tmp_result.split(",").slice(1, 1000),
        block: bblocks,
        q: 1
      });

    }

  }

  return [BREP.slice(1, BREP.length)];
}

function OPT(ITEMS, LIMIT) {

  // KULLANILACAK DEĞİŞKENLERİ OLUŞTUR
  var NEW_ITEMS = [9e+9],
    i, j, z, y,
    TEMP = [0],
    RESULT = [];


  // ITEM LISTESINI DONGUYE AL
  for (i = 0; i < ITEMS.length; i += 1) {

    // ITEM LISTESINDEKI HER PARCAYI ADEDI KADAR DONGUYE AL
    for (j = 0; j < ITEMS[i].q; j += 1) {

      // DONGUDEN GELEN HER PARCAYI YENI ITEM LISTESINE EKLE
      NEW_ITEMS.push(ITEMS[i].len);

    }

  }


  // SAYIYI BUYUKTEN KUCUGE SIRALAMA FONKSIYONU
  function nSort(a, b) {
    if (a > b) return -1;
    else if (a < b) return 1;
    else return 0;
  }

  // YENI ITEM LISTESINI BUYUKTEN KUCUGE SIRALA
  NEW_ITEMS = NEW_ITEMS.sort(nSort);


  // TÜM ÖLÇÜLERDE DÖNGÜYE GİR
  for (z = 0; z <= NEW_ITEMS.length; z += 1) {

    // EĞER PARÇA EKLENDİKTEN SONRA LIMIT TE KALAN ALAN -1 DEN BÜYÜKSE 
    // VE SIRADAKİ PARÇA KALAN ALANDAN KÜÇÜK YA DA EŞİTSE
    if ((LIMIT - TEMP[0]) > -1 && NEW_ITEMS[z] <= (LIMIT - TEMP[0])) {

      // PARÇA KALAN ALANINI PARCA EKLEDİKTEN SONRAKİ HALİNE GÜNCELLE.
      TEMP[0] = TEMP[0] + NEW_ITEMS[z] + 5;

      // PARÇAYI EKLE
      TEMP.push(NEW_ITEMS[z]);

      // ANA LİSTEDEN PARÇAYI ÇIKAR.
      NEW_ITEMS.splice(z, 1);

      z = 0;

      // NAKARAT #
      for (y = 0; y <= NEW_ITEMS.length; y += 1) {

        // EĞER PARÇA EKLENDİKTEN SONRA LIMIT TE KALAN ALAN -1 DEN BÜYÜKSE // VE SIRADAKİ PARÇA KALAN ALANDAN KÜÇÜK YA DA EŞİTSE
        if ((LIMIT - TEMP[0]) > 0 && NEW_ITEMS[y] <= (LIMIT - TEMP[0])) {

          // PARÇA KALAN ALANINI PARCA EKLEDİKTEN SONRAKİ HALİNE GÜNCELLE.
          TEMP[0] = TEMP[0] + NEW_ITEMS[y] + 5;

          // PARÇAYI EKLE
          TEMP.push(NEW_ITEMS[y]);

          // ANA LİSTEDEN PARÇAYI ÇIKAR.
          NEW_ITEMS.splice(y, 1);

          y = 0;

        }

      }

      // EĞER PARÇA EKLENDİKTEN SONRA KALAN ALAN 0 DAN KÜÇÜKSE
    } else {


      // EKLENEN PARÇALAR LİSTESİNİ, SONUCA EKLE.
      RESULT.push(TEMP);

      // EKLENEN PARÇALAR LİSTESİNİ TEMİZLE
      TEMP = [0];

    }

  }

  // SONUCU EKRANA BAS
  return REPORT(RESULT);
}
