# Requester
This actually makes the calls to Megabus.com with the `request` module.

# Date Options

## Days
This is an array of numbers that stand for each day.

|Value|Weekday|
|---|-----------|
| 0 | Sunday    |
| 1 | Monday    |
| 2 | Tuesday   |
| 3 | Wednesday |
| 4 | Thursday  |
| 5 | Friday    |
| 6 | Saturday  |

## Weekends
This will auto make the `days` option `[5,6,0]`

## Testing
The testing is located in the `datehelpers.spec.js` file [here](https://github.com/varughese/megabus-ticket-finder/blob/master/test/datehelpers.spec.js).

# Make FilterID
This creates the filterId used in the `subscriptions` table. It accepts either a ticket or a string for input. If it is a ticket object, it will make the string. If it is a string, it will validate the string.
