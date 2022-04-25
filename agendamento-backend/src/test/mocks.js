const listDataBase = [
    {
        "name": "Diana",
        "birthDate": "1998/06/09",
        "schedulingDateTime": "2022/4/24 07:00",
        "attended": false
    },
    {
        "name": "Samuel",
        "birthDate": "2009/10/1555",
        "schedulingDateTime": "2022/4/24 08:00",
        "attended": false
    }
];

const schedule = {
    "name": "Diana",
    "birthDate": "1998/06/09",
    "schedulingDateTime": "2022/4/24 07:00",
    "attended": false
};

const Wrongschedule = {
    "name": "Diana",
    "birthDate": "data",
    "schedulingDateTime": "2022/4/24 07:00",
    "attended": false
}

module.exports = {listDataBase, schedule, Wrongschedule};