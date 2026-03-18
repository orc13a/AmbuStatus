const garage = [
    {
        gate: "P5",
        timestamp: null,
        status: "home",
        assignedUnit: "A1",
        shiftStart: '11:00',
        shiftEnd: '23:00',
        workInWeekends: false,
        awayCount: 0,
        breaks: {
            day: {
                firstBreakStart: '14:00',
                firstBreakEnd: '17:00',
                secondBreakStart: '18:00',
                secondBreakEnd: '21:00',
                hadFirstBrake: false,
                hadSecondBrake: false,
            },
            night: {
                firstBreakStart: null,
                firstBreakEnd: null,
                secondBreakStart: null,
                secondBreakEnd: null,
                hadFirstBrake: null,
                hadSecondBrake: null,
            }
        }
    },
    {
        gate: "P4",
        timestamp: Date.now(),
        status: "home",
        assignedUnit: "D1",
        shiftStart: '06:00',
        shiftEnd: '18:00',
        workInWeekends: false,
        awayCount: 0,
        breaks: {
            day: {
                firstBreakStart: '09:00',
                firstBreakEnd: '12:00',
                secondBreakStart: '13:00',
                secondBreakEnd: '16:00',
                hadFirstBrake: false,
                hadSecondBrake: false,
            },
            night: {
                firstBreakStart: null,
                firstBreakEnd: null,
                secondBreakStart: null,
                secondBreakEnd: null,
                hadFirstBrake: null,
                hadSecondBrake: null,
            }
        }
    },
    {
        gate: "P3",
        timestamp: null,
        status: "home",
        assignedUnit: "DN3",
        shiftStart: '07:00',
        shiftEnd: '19:00',
        workInWeekends: true,
        awayCount: 0,
        breaks: {
            day: {
                firstBreakStart: '11:00',
                firstBreakEnd: '14:00',
                secondBreakStart: '15:30',
                secondBreakEnd: '18:30',
                hadFirstBrake: false,
                hadSecondBrake: false,
            },
            night: {
                firstBreakStart: '22:30',
                firstBreakEnd: '01:30',
                secondBreakStart: '02:30',
                secondBreakEnd: '05:30',
                hadFirstBrake: false,
                hadSecondBrake: false,
            }
        }
    },
    {
        gate: "P2",
        timestamp: null,
        status: "home",
        assignedUnit: "DN2",
        shiftStart: '07:00',
        shiftEnd: '19:00',
        workInWeekends: true,
        awayCount: 0,
        breaks: {
            day: {
                firstBreakStart: '11:00',
                firstBreakEnd: '14:00',
                secondBreakStart: '15:30',
                secondBreakEnd: '18:30',
                hadFirstBrake: false,
                hadSecondBrake: false,
            },
            night: {
                firstBreakStart: '22:30',
                firstBreakEnd: '01:30',
                secondBreakStart: '02:30',
                secondBreakEnd: '05:30',
                hadFirstBrake: false,
                hadSecondBrake: false,
            }
        }
    },
    {
        gate: "P1",
        timestamp: null,
        status: "home",
        assignedUnit: "DN1",
        shiftStart: '07:00',
        shiftEnd: '19:00',
        workInWeekends: true,
        awayCount: 0,
        breaks: {
            day: {
                firstBreakStart: '11:00',
                firstBreakEnd: '14:00',
                secondBreakStart: '15:30',
                secondBreakEnd: '18:30',
                hadFirstBrake: false,
                hadSecondBrake: false,
            },
            night: {
                firstBreakStart: '22:30',
                firstBreakEnd: '01:30',
                secondBreakStart: '02:30',
                secondBreakEnd: '05:30',
                hadFirstBrake: false,
                hadSecondBrake: false,
            }
        }
    }
];

export default garage;