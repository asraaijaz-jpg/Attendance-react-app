import { useState, useEffect } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Table from "react-bootstrap/Table";
import FormCheck from "react-bootstrap/FormCheck";
import Container from "react-bootstrap/Container";
import Dropdown from "react-bootstrap/Dropdown";
import moment from "moment";

function App() {
  const [names, setNames] = useState([]);
  const currentMonth = moment().format("MMM");
  const currentYear = moment().format("YYYY");
  const [selectedMonth, setSelectedMonth] = useState(currentMonth);
  const [selectedYear, setSelectedYear] = useState(currentYear);
  useEffect(() => {
    fetch("https://randomuser.me/api?results=10")
      .then((res) => res.json())
      .then((json) => json.results)
      .then((people) => people.map((person) => person.name.first))
      .then((names) => setNames(names));

    console.log(daysOfMonth());
  }, []);

  function daysOfMonth() {
    const today = moment();
    const daysInMonth = moment().daysInMonth();
    console.log(daysInMonth);
    const firstDay = moment().startOf("month");

    return Array.from(Array(daysInMonth).keys()).map((i) =>
      firstDay.clone().add(i, "days")
    );
  }

  return (
    <Container>
      <h1 className="text-center">Beacon House School System</h1>
      <h3 className="text-center">Attendance Roster</h3>
      <Dropdown>
        <Dropdown.Toggle>{currentMonth}</Dropdown.Toggle>

        <Dropdown.Menu>
          {Array.from(Array(12).keys())
            .map((i) => moment().month(i).format("MMM"))
            .map((month) => (
              <Dropdown.Item>{month}</Dropdown.Item>
            ))}
        </Dropdown.Menu>
      </Dropdown>

      <Table striped hover>
        <thead>
          <tr>
            <td>Name</td>
            {daysOfMonth().map((date, i) => (
              <td key={i}>{date.format("MMM DD")}</td>
            ))}
          </tr>
        </thead>
        <tbody>
          {names.map((name) => (
            <tr>
              <td>{name}</td>
              {daysOfMonth().map((date, i) => (
                <td key={i}>
                  <FormCheck />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}

export default App;
