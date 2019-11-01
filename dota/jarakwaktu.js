module.exports = {
  jarakwaktu : function (awal) {
  var hasil;
  var akhir = new Date();
  console.log("AWAL  : " + awal);
  console.log("AKHIR : " + akhir);
  var jaraktahun = awal.getFullYear() - akhir.getFullYear();
  var bulanawal = awal.getMonth() + 1;
  var bulanakhir = akhir.getMonth() + 1;
  if (jaraktahun == 0) {
    var jarakbulan = bulanakhir - bulanawal;
    if (jarakbulan == 0) {
      var jarakhari = akhir.getDate() - awal.getDate();
      if (jarakhari == 0) {
        var jarakjam = akhir.getHours() - awal.getHours();
        if (jarakjam == 0) {
          var jarakmenit = akhir.getMinutes() - awal.getMinutes();
          if (jarakmenit == 0) {
            var jarakdetik = akhir.getSeconds - awal.getSeconds();
            hasil = jarakdetik + " seconds";
          } else {
            hasil = jarakmenit + " minutes";
          }
        } else {
          var j = jarakjam * 60 - awal.getMinutes() + akhir.getMinutes();
          var jam = (j - (j % 60)) / 60;
          var menit = j % 60;
          if (jam == 0) {
            hasil = menit + " minutes";
          } else {
            hasil = jam + " hours";
          }
        }
      } else {
        var j = jarakhari * 24 - awal.getHours() + akhir.getHours();
        var hari = (j - (j % 24)) / 24;
        var jam = j % 24;
        if (hari == 0) {
          hasil = jam + " hours";
        } else {
          if (akhir.getHours() >= awal.getHours()) {
            hasil = hari + " days";
          } else {
            var z = hari;
            hasil = z + " days";
          }
        }
      }
    } else {
      if (akhir.getDate() >= awal.getDate()) {
        var j = jarakbulan;
        hasil = j + " months";
      } else {
        var j = jarakbulan - 1;
        if (j == 0) {
          var x;
          switch (bulanawal-1) {
            case 0:
              x = 31;
              break;
            case 1:
              if (awal.getFullYear() % 4 == 0) {
                x = 29;
              } else {
                x = 28;
              }
              break;
            case 2:
              x = 31;
              break;
            case 3:
              x = 30;
              break;
            case 4:
              x = 31;
              break;
            case 5:
              x = 30;
              break;
            case 6:
              x = 31;
              break;
            case 7:
              x = 31;
              break;
            case 8:
              x = 30;
              break;
            case 9:
              x = 31;
              break;
            case 10:
              x = 30;
              break;
            case 11:
              x = 31;
              break;
          }
          console.log(bulanawal);
          var h = x - awal.getDate() + akhir.getDate();
          if (akhir.getHours() >= awal.getHours()) {
            hasil = h + " days";
          } else {
            var z = h - 1;
            hasil = z + " days";
          }
        } else {
          hasil = j + " months";
        }
      }
    }
  } else {
    if (bulanakhir >= bulanawal) {
      var j = jaraktahun;
      hasil = j + " years";
    } else {
      var j = 12 - bulanawal + bulanakhir;
      hasil = j + " months";
    }
  }
  return hasil;
}
  }