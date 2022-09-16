exports.Query = {
    travels: (parent, args, {db}) => db.travels,
    travelDays: (parent, args, {db}) => db.travelDays
}
