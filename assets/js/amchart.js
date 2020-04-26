//AMCHART
$(document).ready(function () {

    var navListItems = $('div.setup-panel div a'),
        allWells = $('.setup-content'),
        allNextBtn = $('.nextBtn');

    allWells.hide();

    navListItems.click(function (e) {
        e.preventDefault();
        var $target = $($(this).attr('href')),
            $item = $(this);

        if (!$item.hasClass('disabled')) {
            navListItems.removeClass('btn-primary').addClass('btn-default');
            $item.addClass('btn-primary');
            allWells.hide();
            $target.show();
            $target.find('input:eq(0)').focus();
        }
    });

    allNextBtn.click(function () {
        var curStep = $(this).closest(".setup-content"),
            curStepBtn = curStep.attr("id"),
            nextStepWizard = $('div.setup-panel div a[href="#' + curStepBtn + '"]').parent().next().children("a"),
            curInputs = curStep.find("input[type='text'],input[type='url']"),
            isValid = true;

        $(".form-group").removeClass("has-error");
        for (var i = 0; i < curInputs.length; i++) {
            if (!curInputs[i].validity.valid) {
                isValid = false;
                $(curInputs[i]).closest(".form-group").addClass("has-error");
            }
        }

        if (isValid)
            nextStepWizard.removeAttr('disabled').trigger('click');
    });

    $('div.setup-panel div a.btn-primary').trigger('click');
});

//AMCHART MAP
am4core.ready(function () {

    // Themes begin
    am4core.useTheme(am4themes_animated);
    // Themes end

    // Create map instance
    var chart = am4core.create("chartdiv", am4maps.MapChart);

    // Set map definition
    chart.geodata = am4geodata_nigeriaLow;

    // Set projection
    chart.projection = new am4maps.projections.Miller();

    // Create map polygon series
    var polygonSeries = chart.series.push(new am4maps.MapPolygonSeries());

    //Disable Zoom
    chart.maxZoomLevel = 1;

    //enable scroll
    chart.chartContainer.wheelable = false;

    //scroll - areas
    chart.seriesContainer.draggable = false;
    chart.seriesContainer.resizable = false;
    chart.tapToActivate = false;

    // Exclude Antartica
    polygonSeries.exclude = ["AQ"];

    //hover
    // Create hover state and set alternative fill color


    // Make map load polygon (like country names) data from GeoJSON
    polygonSeries.useGeodata = true;

    // Create hover state and set alternative fill color
    /*  var hs = polygonTemplate.states.create("hover");
     hs.properties.fill = chart.colors.getIndex(0); */

    // Add image series
    var imageSeries = chart.series.push(new am4maps.MapImageSeries());
    imageSeries.mapImages.template.propertyFields.longitude = "longitude";
    imageSeries.mapImages.template.propertyFields.latitude = "latitude";
    imageSeries.mapImages.template.tooltipText = "{title}";
    imageSeries.mapImages.template.propertyFields.url = "url";

    var circle = imageSeries.mapImages.template.createChild(am4core.Circle);
    circle.radius = 3;
    circle.propertyFields.fill = "color";

    var circle2 = imageSeries.mapImages.template.createChild(am4core.Circle);
    circle2.radius = 3;
    circle2.propertyFields.fill = "color";


    circle2.events.on("inited", function (event) {
        animateBullet(event.target);
    })


    function animateBullet(circle) {
        var animation = circle.animate([{
            property: "scale",
            from: 1,
            to: 5
        }, {
            property: "opacity",
            from: 1,
            to: 0
        }], 1000, am4core.ease.circleOut);
        animation.events.on("animationended", function (event) {
            animateBullet(event.target.object);
        })
    }

    $.get("https://devabu.github.io/NoviCovidNigeria/php/getCities.php", function (data) {
        var juhu = data.replace("\n", "");
        var juhu = data.split("\n");

        array3 = juhu.filter(function (str) {
            return /\S/.test(str);
        });

        array3.splice(0, 5);
        array3.splice(140, 5);

        for (var i = 0; i < array3.length; i++) {
            array3[i] = array3[i].trim()
        }

        LagosLat = 6.531663
        LagosLong = 3.385572

        AbujaFCTLat = 9.073971
        AbujaFCTLong = 7.397779

        KanoLat = 11.999558
        KanoLong = 8.588275

        OgunLat = 6.998985
        OgunLong = 3.463008

        GombeLat = 10.279024
        GombeLong = 11.174007

        KatsinaLat = 12.981387
        KatsinaLong = 7.620701

        OsunLat = 7.984149
        OsunLong = 5.094684

        OyoLat = 7.842759
        OyoLong = 3.939327

        EdoLat = 6.649489
        EdoLong = 5.938304

        BornoLat = 11.896478
        BornoLong = 13.152327

        KwaraLat = 11.823779
        KwaraLong = 9.600695

        AkwaLat = 4.912479
        AkwaLong = 7.857951

        KadunaLat = 10.509432
        KadunaLong = 7.416938

        BauchiLat = 10.300137
        BauchiLong = 9.821605

        DeltaLat = 5.704307
        DeltaLong = 5.938824

        EkitiLat = 7.724343
        EkitiLong = 5.308467

        OndoLat = 7.099996
        OndoLong = 4.843039

        AbiaLat = 6.336491
        AbiaLong = 7.408497

        EnuguLat = 6.457650
        EnuguLong = 7.543270

        RiversLat = 4.851686
        RiversLong = 6.915505

        NigerLat = 9.947339
        NigerLong = 5.592120

        JigawaLat = 12.570090
        JigawaLong = 8.940068

        BenueLat = 7.349184
        BenueLong = 8.739587


        AnambraLat = 6.231872
        AnambraLong = 6.942210
        SokotoLat = 13.005657
        SokotoLong = 5.246400

        ZamfaraLat = 12.156641
        ZamfaraLong = 6.228675

        AdamawaLat = 9.336272
        AdamawaLong = 12.403049

        PlateauLat = 9.230972
        PlateauLong = 9.513674

        var colorFill;

        var dataArray3 = []
        for (var i = 0; i < array3.length - 5; i++) {

            if (array3[i + 1] < 10) {
                colorFill = am4core.color("#faff00")
            } else if (array3[i + 1] < 50) {
                colorFill = am4core.color("#fbba09");
            } else if (array3[i + 1] < 100) {
                colorFill = am4core.color("#fc7512");
            } else {
                colorFill = am4core.color("#fd1d1d");
            }


            if (array3[i] == "Lagos") {
                lat = LagosLat
                long = LagosLong
            } else if (array3[i] == "Abuja FCT") {
                lat = AbujaFCTLat
                long = AbujaFCTLong
            } else if (array3[i] == "Kano") {
                lat = KanoLat
                long = KanoLong
            } else if (array3[i] == "Ogun") {
                lat = OgunLat
                long = OgunLong
            } else if (array3[i] == "Gombe") {
                lat = OgunLat
                long = OgunLong
            } else if (array3[i] == "Katsina") {
                lat = KatsinaLat
                long = KatsinaLong
            } else if (array3[i] == "Osun") {
                lat = OsunLat
                long = OsunLong
            } else if (array3[i] == "Oyo") {
                lat = OyoLat
                long = OyoLong
            } else if (array3[i] == "Edo") {
                lat = EdoLat
                long = EdoLong
            } else if (array3[i] == "Borno") {
                lat = BornoLat
                long = BornoLong
            } else if (array3[i] == "Kwara") {
                lat = KwaraLat
                long = KwaraLong
            } else if (array3[i] == "Akwa Ibom") {
                lat = AkwaLat
                long = AkwaLong
            } else if (array3[i] == "Kaduna") {
                lat = KadunaLat
                long = KadunaLong
            } else if (array3[i] == "Bauchi") {
                lat = BauchiLat
                long = BauchiLong
            } else if (array3[i] == "Delta") {
                lat = DeltaLat
                long = DeltaLong
            } else if (array3[i] == "Ekiti") {
                lat = EkitiLat
                long = EkitiLong
            } else if (array3[i] == "Ondo") {
                lat = OndoLat
                long = OndoLong
            } else if (array3[i] == "Abia") {
                lat = AbiaLat
                long = AbiaLong
            } else if (array3[i] == "Enugu") {
                lat = EnuguLat
                long = EnuguLong
            } else if (array3[i] == "Rivers") {
                lat = RiversLat
                long = RiversLong
            } else if (array3[i] == "Niger") {
                lat = NigerLat
                long = NigerLong
            } else if (array3[i] == "Jigawa") {
                lat = JigawaLat
                long = JigawaLong
            } else if (array3[i] == "Benue") {
                lat = BenueLat
                long = BenueLong
            } else if (array3[i] == "Anambra") {
                lat = AnambraLat
                long = AnambraLong
            } else if (array3[i] == "Sokoto") {
                lat = SokotoLat
                long = SokotoLong
            } else if (array3[i] == "Zamfara") {
                lat = ZamfaraLat
                long = ZamfaraLong
            } else if (array3[i] == "Adamawa") {
                lat = AdamawaLat
                long = AdamawaLong
            } else if (array3[i] == "Plateau") {
                lat = PlateauLat
                long = PlateauLong
            }



            dataArray3.push({
                "title": `${array3[i]}`,
                "value": `${array3[i + 1]}`,
                "latitude": lat,
                "longitude": long,
                "color": `${colorFill}`
            })

            i += 4;
        }

        var colorSet = new am4core.ColorSet();

        imageSeries.data = dataArray3;



    }); // end am4core.ready()
})