import fs from 'fs'

var splitlines = fs.readFileSync("registrarCleaned.txt", { encoding:"utf-8"}).split("\n")
var offering, previous
var count=1

for ( let line of splitlines ){
    console.log(line)
    let section = line.slice(38,41)
    if( /\S/.test(section) ){
        console.log(`new offering ${count}`)
        count++
        previous=offering

        offering = {
            section: line.slice(38,41),
            name: line.slice(10,37),
            subject: line.slice(0,4),
            number: line.slice(5,9),
            crn: line.slice(42,47),
            slot: line.slice(48,50),
            days: line.slice(52,66),
            times: line.slice(67,76)
        }
        if (! /\S/.test(offering.subject) ){ // same course
            offering.subject = previous.subject
            offering.name = previous.name
            offering.number =  previous.number
        }
        let name = offering.name
        console.log(offering)
        console.log(JSON.stringify(offering))
    }

}