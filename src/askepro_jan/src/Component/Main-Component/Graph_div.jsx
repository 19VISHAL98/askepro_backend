import React, { Component } from "react";
import { Menu, Grid, Form, Button, GridColumn, Dropdown } from "semantic-ui-react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
const Graph_div = (graph) => {
  let date = []
  const service_url = `${process.env.REACT_APP_BASE_URL}/serviceCategory`;
  const [services, setServices] = React.useState(null);
  const [show, setShow] = React.useState(true);
  const [forData, setFor] = React.useState("Application");
  const [forService, setForService] = React.useState("All Service");
  const [forYear, setYear] = React.useState(2021);
  const [forMonth, setForMonth] = React.useState("1");
  const [frequency, setfrequency] = React.useState("Daily");
  const [dates, setDate] = React.useState([]);
  const [data, setData] = React.useState(graph.data);

  React.useEffect(() => {
    getServices();
  }, []);

  const getServices = async () => {
    const services = await (await fetch(service_url, { method: "GET" })).json();
    const serviceData = services?.data?.map((e) => ({
      name: e.name,
    }));

    const currYear = new Date().getFullYear()
    for (let year = 2021; year <= currYear; year++) {
      date.push(year);
    }
    setDate(date);
    await setServices(serviceData);

  };


  const hamdleGo = async () => {

    let graphData
    if (frequency === "Monthly"){
      if (forService !== "All Service") 
        graphData = await (await fetch(`${process.env.REACT_APP_BASE_URL}/admin/graphs?year=${forYear}&for=${forData}&service=${forService}&monthnum=${forMonth}`, { method: "GET" })).json();
      else
        graphData = await (await fetch(`${process.env.REACT_APP_BASE_URL}/admin/graphs?year=${forYear}&for=${forData}&monthnum=${forMonth}`, { method: "GET" })).json();
    setShow(false);
  }else if (frequency === "Yearly") {
    if (forService !== "All Service")
      graphData = await(await fetch(`${process.env.REACT_APP_BASE_URL}/admin/graphs?year=${forYear}&for=${forData}&service=${forService}`, { method: "GET" })).json();
    else
      graphData = await(await fetch(`${process.env.REACT_APP_BASE_URL}/admin/graphs?year=${forYear}&for=${forData}`, { method: "GET" })).json();
    setShow(false);
  } else if (frequency === "Daily") {
    graphData = await(await fetch(`${process.env.REACT_APP_BASE_URL}/admin/graphs?&for=${forData}`, { method: "GET" })).json();
    setShow(true);
  } else {
    alert(`Check Your filters again: Data For:${forData} Year: ${forYear} Month:${forMonth} Service: ${forService} Frquency:${frequency}`)
    setData(graph.data);


    return
  }
  setData(graphData.graphData);
}
if (!services)
  return (<></>)
console.log(show);
return (
  <>
    <div className="revenue_data">

      {/* <Button.Group widths='3'>
          <Button active={forData === "Application" ? true : false} onClick={() => setFor("Application")}>Application</Button>
          <Button active={forData === "Client" ? true : false} onClick={() => setFor("Client")}>Client</Button>
          <Button active={forData === "Revenue" ? true : false} onClick={() => setFor("Revenue")}>Revenue</Button>
        </Button.Group>  */}
      <div className="Revenue">
        <Button.Group widths='3'>
          <Button className="revenue_btn" active={forData === "Application" ? true : false} onClick={() => setFor("Application")}>Application</Button>
          <Button className="revenue_btn" active={forData === "Client" ? true : false} onClick={() => setFor("Client")}>Client</Button>
          <Button className="revenue_btn" active={forData === "Revenue" ? true : false} onClick={() => setFor("Revenue")}>Revenue</Button>
        </Button.Group>
      </div>
      <div className="filter">
        <Grid doubling columns={2}>
          <Grid.Row>
            <Grid.Column width={5}>
              <Form>
                <Form.Group>
                  <Form.Field
                    className="select2"
                    label="Service"
                    control="select"
                    labelside="left"
                    selection
                    onChange={(event) => setForService(event.target.value)}
                  > <option value="All Service">All services</option>
                    {services.map((e) => <option value={e.name}>{e.name}</option>)}
                  </Form.Field>
                </Form.Group>
              </Form>
            </Grid.Column>
            <Grid.Column width={5}>

              <Button.Group>
                <Button className="grey_btn" active={frequency === "Yearly" ? true : false} onClick={() => { setfrequency("Yearly"); }}>Yearly</Button>
                <Button className="grey_btn" active={frequency === "Monthly" ? true : false} onClick={() => { setfrequency("Monthly"); }}>Monthly</Button>
                <Button className="grey_btn" active={frequency === "Daily" ? true : false} onClick={() => { setfrequency("Daily"); }}>Daily</Button>
              </Button.Group>

            </Grid.Column>
            <Grid.Column width={5}>
              <Form>
                <Form.Group>
                  <Form.Field
                    label="Choose Year"
                    className="select"
                    control="select"
                    selection
                    onChange={(event) => setYear(event.target.value)}
                  >
                    {dates.map((e) => <option value={e}>{e}</option>)}

                  </Form.Field>
                  <Form.Select
                    label="Choose Month"
                    className="select"
                    control="select"
                    selection
                    onChange={(event) => setForMonth(event.target.value)}
                  >

                    <option value="1">January</option>
                    <option value="2">Feburary</option>
                    <option value="3">March</option>
                    <option value="4">April</option>
                    <option value="5">May</option>
                    <option value="6">June</option>
                    <option value="7">July</option>
                    <option value="8">August</option>
                    <option value="9">September</option>
                    <option value="10">October</option>
                    <option value="11">November</option>
                    <option value="12">December</option>
                  </Form.Select>

                  <Button className="grey_btn" size="tiny" onClick={() => { hamdleGo() }}>GO</Button>
                </Form.Group>
              </Form>

            </Grid.Column>
            {show === true ? <ResponsiveContainer width="95%" height={400}>
              <BarChart
                width={875}
                height={500}
                data={data || graph.data}

                margin={{
                  top: 5,
                  right: 0,
                  left: 0,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey={forData === "Revenue" ? "price" : "count"} fill="#4285F4" />
              </BarChart>
            </ResponsiveContainer> : <ResponsiveContainer width="95%" height={400}>
              <LineChart
                width={875}
                height={500}
                data={data}
                margin={{
                  top: 5,
                  right: 0,
                  left: 0,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey={forData === "Revenue" ? "price" : "count"} stroke="#9d9494" activeDot={{ r: 4 }} />

              </LineChart>
            </ResponsiveContainer>}
          </Grid.Row>
        </Grid>
      </div>

    </div>
  </>
);
};

export default Graph_div;