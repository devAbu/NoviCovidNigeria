$.get("https://devabu.github.io/NoviCovidNigeria/php/getData.php", function (data) {
      var juhu = data.replace("\n", "");
      var juhu = data.split("\n");

      array = juhu.filter(function (str) {
            return /\S/.test(str);
      });

      console.log(array);

      document.getElementById("total").innerHTML = `<div class="stats">
        <div class="number">${array[3]} </div>
        <div class="factor text-secondary pt-2">Total Confirmed cases	
  </div>
        </div>`;

      document.getElementById("recover").innerHTML = `<div class="stats">
        <div class="number">${array[5]} </div>
        <div class="factor text-secondary pt-2">Discharged</div>
        </div>`;
      document.getElementById("dead").innerHTML = `<div class="stats">
        <div class="number">${array[7]} </div>
        <div class="factor text-secondary pt-2">Death</div>
        </div>`;
});