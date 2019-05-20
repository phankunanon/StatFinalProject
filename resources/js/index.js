google.charts.load("current", { packages: ["corechart"] });
google.charts.setOnLoadCallback(drawChart);
raw_data_thai_url = "https://docs.google.com/spreadsheets/d/1NAowDCSPZAo1NStiV_E2gp4QOCjUnG4VK_a_mhtxOfg/edit?usp=sharing/gviz/tq?sheet=Raw_Data_Thai&headers=1&tq=";

function drawChart() {
  var queryString = encodeURIComponent("select A,B,C,D,E,F,G");
  var query = new google.visualization.Query( raw_data_thai_url + queryString );
  query.send(handleAlldepartmentLineResponse);

  var queryString = encodeURIComponent("select A,H");
  var query = new google.visualization.Query( raw_data_thai_url + queryString);
  query.send(handleMinistryLineResponse);
  
  var queryString = encodeURIComponent("select A,B,C,D,E,F,G");
  var query = new google.visualization.Query( raw_data_thai_url + queryString );
  query.send(handleMinistryStep);

}

function errorAlert(res) {
  alert(
    "Error in query: " +
      res.getMessage() +
      " " +
      res.getDetailedMessage()
  );
}

function handleAlldepartmentLineResponse(response) {
  if (response.isError()) {
    errorAlert(response);
    return;
  }

  var data = response.getDataTable();

  var options = {
    title: "อัตราการเปลี่ยนแปลงของงบประมาณแต่ละกรมในกระทรวงพลังงาน",
    vAxis:{
        title: 'งบประมาณ ( ล้านบาท )'
    },
    hAxis: {
        title: 'ปีพุทธศักราช (พ.ศ.)'
    },
    fontName: 'Prompt, sans-serif',
    curveType:'function',
    series: [
      {color: '#edc951'}, 
      {color: '#eb6841'}, 
      {color: '#cc2a36'},
      {color: '#4f372d'},
      {color: '#00a0b0'},
      {color: '#89B288'}
    ],
    animation: {
      startup: true,
        duration: 1200,
        easing: 'inAndOut',
    },
  };

  var gdp_line = new google.visualization.LineChart(
    document.getElementById("All_Sub_Depart_line")
  );
 
  gdp_line.draw(data, options);
}

function handleMinistryLineResponse(response) {
  if (response.isError()) {
    errorAlert(response);
    return;
  }

  var data = response.getDataTable();

  var options = {
    title: "การเปลี่ยนแปลงของงบประมาณของกระทรวงพลังงาน",
    vAxis:{
        title: 'งบประมาณ ( ล้านบาท )'
    },
    hAxis: {
        title: 'ปีพุทธศักราช (พ.ศ.)'
    },
    fontName: 'Prompt, sans-serif',
    smoothLine: true,
    animation: {
      startup: true,
        duration: 1200,
        easing: 'inAndOut',
    },
  };

  var rev_line = new google.visualization.LineChart(
    document.getElementById("Ministry_line")
  );
  rev_line.draw(data, options);
}

function handleMinistryStep(response) {
    if (response.isError()) {
      errorAlert(response);
      return;
    }
  
    var data = response.getDataTable();
  
    var options = {
        isStacked: 'relative',
        height: 450,
        legend: {position: 'top', maxLines: 3},
        title: "อัตราส่วนงบประมาณของกรมในกระทรวงพลังงาน",
        vAxis:{
            title: 'งบประมาณ ( ล้านบาท )',
            minValue: 0,
            ticks: [0, .2, .4, .6, .8,1]
        },
        hAxis: {
            title: 'ปีพุทธศักราช (พ.ศ.)'
        },
        fontName: 'Prompt, sans-serif',
        areaOpacity: 0.95,
        series: [
          {color: '#F8B195'}, 
          {color: '#F67280'}, 
          {color: '#C06C84'},
          {color: '#6C5B7B'},
          {color: '#355C7D'},
          {color: '#594F4F'}
        ],
    };
  
    var rev_line = new google.visualization.SteppedAreaChart(
      document.getElementById("Ministry_step")
    );
    rev_line.draw(data, options);
  }
  



