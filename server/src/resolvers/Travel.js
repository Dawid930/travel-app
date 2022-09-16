
exports.Travel = {
    travelDays: ({id}, args, {db}) => {
        return db.travelDays.filter((travelDay) => travelDay.travelId === id)
    }
}