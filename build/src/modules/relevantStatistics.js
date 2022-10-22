"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRelevantStatistics = void 0;
const monthsData_1 = require("../mock/monthsData");
const getRelevantStatistics = (statistics) => {
    // console.log(statistics);
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    const data_last_month = statistics[monthsData_1.MONTHS_DATA[currentMonth - 1]];
    const data_current_month = statistics[monthsData_1.MONTHS_DATA[currentMonth]];
    return {
        data_last_month,
        data_current_month,
    };
};
exports.getRelevantStatistics = getRelevantStatistics;
