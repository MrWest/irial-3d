import React, { useState, useEffect } from "react";
import { Grid, Button } from "@material-ui/core";
import moment from "moment";

const getYear = (monday, sunday) =>
  moment(monday).year() === moment(sunday).year()
    ? moment(monday).format("YYYY")
    : `${moment(monday).format("YYYY")} / ${moment(sunday).format("YYYY")}`;

const getMonth = (monday, sunday) =>
  moment(monday).month() === moment(sunday).month()
    ? moment(monday).format("MMMM")
    : `${moment(monday).format("MMMM")} / ${moment(sunday).format("MMMM")}`;

const generateWeek = (date) => {
  const daysAfterMonday = moment(date).weekday() - 1;
  const monday = moment(date).add(-daysAfterMonday, "days");
  const weekDays = [];

  for (var i = 0; i < 7; i++) {
    weekDays.push(moment(monday).add(i, "days"));
  }
  const sunday = weekDays[6];
  const month = getMonth(monday, sunday);
  const year = getYear(monday, sunday);
  const week = { year, month, weekDays };
  return week;
};

const DayOfWeek = ({ dayOfWeek, dayOfMonth, isSeledted, onClick }) => (
  <Grid container justify="center">
    <Grid item>
      <button
        onClick={onClick}
        style={{
          border: 0,
          background: "transparent",
          padding: 0,
          outline: "none",
          cursor: "pointer",
        }}
      >
        <p style={{ marginBottom: 16, textAlign: "center" }}>{dayOfWeek}</p>
        <Grid container justify="center" alignItems="center">
          <Grid
            item
            container
            justify="center"
            alignItems="center"
            style={{
              height: 56,
              width: 56,
              borderRadius: 28,
              background: isSeledted ? "#efdfdf" : "#dfdfdf",
              border: "1px solid #fdfdfd",
            }}
          >
            {dayOfMonth}
          </Grid>
        </Grid>
      </button>
    </Grid>
  </Grid>
);
const WeekOfMonth = ({ week, selectedDate, setSelectedDate }) => (
  <div>
    <Grid container justify="center">
      <Grid item>
        <h2>
          {week.month}{" "}
          <span style={{ opacity: 0.3, fontSize: 12 }}>{week.year} </span>
        </h2>
      </Grid>
    </Grid>
    <Grid container>
      {week.weekDays.map((wd) => (
        <Grid key={wd.date()} item xs>
          <DayOfWeek
            dayOfWeek={moment(wd).format("ddd")}
            dayOfMonth={moment(wd).format("DD")}
            isSeledted={
              moment(wd).format("YYYY-MM-DD") ===
              moment(selectedDate).format("YYYY-MM-DD")
            }
            onClick={() => setSelectedDate(wd)}
          />
        </Grid>
      ))}
    </Grid>
  </div>
);

const HorizontalCalendar = (props) => {
  const { date, onDateChange, contentWidth } = props;
  const [selectedDate, setSelectedDate] = useState(date || new Date());
  const [currentDate, setCurrentDate] = useState(selectedDate);
  const [currentWeek, setCurrentWeek] = useState(generateWeek(currentDate));
  const [previousWeek, setPreviousWeek] = useState(
    generateWeek(moment(currentDate).add(-7, "days"))
  );
  const [nextWeek, setNextWeek] = useState(
    generateWeek(moment(currentDate).add(7, "days"))
  );
  const [translationIndex, setTranslationIndex] = useState(1);
  const [daysAreaWidth, setDaysAreaWidth] = useState(contentWidth || 1024);

  // const [ animationClass, setAnimationClass ] = useState('');

  useEffect(() => {
    setTimeout(function request() {
      if (translationIndex === 0)
        setCurrentDate(moment(currentDate).add(-7, "days"));
      if (translationIndex === 2)
        setCurrentDate(moment(currentDate).add(7, "days"));
      if (translationIndex !== 1) setTranslationIndex(1);
    }, 1000);
  }, [translationIndex]);

  useEffect(() => {
    setPreviousWeek(generateWeek(moment(currentDate).add(-7, "days")));
    setCurrentWeek(generateWeek(currentDate));
    setNextWeek(generateWeek(moment(currentDate).add(7, "days")));
  }, [currentDate]);

  useEffect(() => {
    if (!contentWidth) {
      const entireComponent = document.getElementById("horizontal-calendar");
      const buttonArea = document.getElementById("horizontal-calendar-button");
      setDaysAreaWidth(
        entireComponent.clientWidth - buttonArea.clientWidth * 2
      );
    }
  }, []);

  useEffect(() => {
    if (onDateChange) onDateChange(selectedDate);
  }, [selectedDate]);

  return (
    <Grid id="horizontal-calendar" container alignItems="stretch">
      <Grid item id="horizontal-calendar-button" style={{ paddingTop: 68 }}>
        {" "}
        {/*arbitrary padding matchong the Month section height */}
        <Grid container style={{ height: `100%` }} alignItems="center">
          <Button onClick={() => setTranslationIndex(0)}>previous</Button>
        </Grid>
      </Grid>
      <Grid
        item
        xs
        style={{
          width: daysAreaWidth,
          display: "grid",
          overflow: "hidden",
          flexBasis: "unset",
        }}
      >
        <Grid
          container
          style={{
            flexWrap: "nowrap",
            transition:
              translationIndex !== 1 ? "transform 0.8s ease-out 0.2s" : "none",
            transform: `translate3d(-${translationIndex * 33.33}%, 0px, 0px)`,
          }}
        >
          <Grid item style={{ width: daysAreaWidth }}>
            <WeekOfMonth
              week={previousWeek}
              selectedDate={selectedDate}
              setSelectedDate={setSelectedDate}
            />
          </Grid>
          <Grid item style={{ width: daysAreaWidth }}>
            <WeekOfMonth
              week={currentWeek}
              selectedDate={selectedDate}
              setSelectedDate={setSelectedDate}
            />
          </Grid>
          <Grid item style={{ width: daysAreaWidth }}>
            <WeekOfMonth
              week={nextWeek}
              selectedDate={selectedDate}
              setSelectedDate={setSelectedDate}
            />
          </Grid>
        </Grid>
      </Grid>
      <Grid item style={{ paddingTop: 68 }}>
        <Grid container style={{ height: `100%` }} alignItems="center">
          <Button
            onClick={() => {
              setTranslationIndex(2);
            }}
          >
            next
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default HorizontalCalendar;
