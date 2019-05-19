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
    title: "การเปลี่ยนแปลงของงบประมาณแต่ละกรมในกระทรวงพลังงาน",
    vAxis:{
        title: 'งบประมาณ ( ล้านบาท )'
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
    title: "การเปลี่ยนแปลงของงบประมาณของกระทรวงพลังงาน",
    vAxis:{
        title: 'งบประมาณ ( ล้านบาท )'
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




