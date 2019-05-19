google.charts.load("current", { packages: ["corechart"] });
google.charts.setOnLoadCallback(drawChart);
url = "https://docs.google.com/spreadsheets/d/1v6tnxDsjtZm6RV9zZqr3AWBh_6qk-LrayslweRase2Y/gviz/tq?sheet=New_Zealand&headers=1&tq=";
raw_data_thai_url = "https://docs.google.com/spreadsheets/d/1NAowDCSPZAo1NStiV_E2gp4QOCjUnG4VK_a_mhtxOfg/edit?usp=sharing/gviz/tq?sheet=Raw_Data_Thai&headers=1&tq=";

function drawChart() {
  var queryString = encodeURIComponent("select A,B,C,D,E,F,G");
  var query = new google.visualization.Query( raw_data_thai_url + queryString );
  query.send(handleAlldepartmentLineResponse);

  var queryString = encodeURIComponent("select A,H");
  var query = new google.visualization.Query( raw_data_thai_url + queryString);
  query.send(handleMinistryLineResponse);

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
    title: "กราฟแสดงการเปลี่ยนแปลงของงบประมาณแต่ละกรมในกระทรวงพลังงาน",
    subtitle : "หน่วย ( ล้านบาท )",
    vAxis:{
        title: 'งบประมาณ'
    },
    hAxis: {
        title: 'ปีพุทธศักราช (พ.ศ.)'
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
    title: "กราฟแสดงการเปลี่ยนแปลงของงบประมาณของกระทรวงพลังงาน",
    subtitle : "หน่วย ( ล้านบาท )",
    vAxis:{
        title: 'งบประมาณ'
    },
    hAxis: {
        title: 'ปีพุทธศักราช (พ.ศ.)'
    },
  };

  var rev_line = new google.visualization.LineChart(
    document.getElementById("Ministry_line")
  );
  rev_line.draw(data, options);
}

function handleRevAreaResponse(response) {
  if (response.isError()) {
    errorAlert(response);
    return;
  }
  var data = response.getDataTable();

  var options_fullStacked = {
    title : "Government's Revenue Factors",
    isStacked: "relative",
    legend: { position: "right", maxLines: 3 },
    vAxis: {
      format: "#%",
      minValue: 0,
      ticks: [2552,2554,2556,2558,2560,2562]
    },
    hAxis: {
      format:'#',
      title: "year"
    }
  };
  
  var rev_area = new google.visualization.AreaChart(
    document.getElementById("NZ_rev_area_div")
  );
  rev_area.draw(data, options_fullStacked);
}

function handleGDPAreaResponse(response) {
  if (response.isError()) {
    errorAlert(response);
    return;
  }
  var data = response.getDataTable();

  var options_fullStacked = {
    title : "GDP Factors",
    isStacked: "relative",
    legend: { position: "right", maxLines: 3 },
    vAxis: {
      format: "#%",
      minValue: 0,
      ticks: [2552,2554,2556,2558,2560,2562]
    },
    hAxis: {
      format:'#',
      title: "year"
    }
  };
  
  var gdp_area = new google.visualization.AreaChart(
    document.getElementById("NZ_gdp_area_div")
  );
  gdp_area.draw(data, options_fullStacked);
}



