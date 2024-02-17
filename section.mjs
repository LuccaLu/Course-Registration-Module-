import fs from 'fs';

class Section {
  constructor(subject, number, name, sectionid, crn, room, type, times, days) {
    this.subject = subject;
    this.number = number;
    this.name = name;
    this.sectionid = sectionid;
    this.crn = crn;
    this.room = room;
    this.type = type;
    this.times = times;
    this.days = days;
  }


static load(filename) {
    const fileContents = fs.readFileSync(filename, { encoding: "utf-8" });
    const lines = fileContents.split("\n");
    const sections = [];

    let currentSection = null;
    lines.forEach(line => {
        if (line.trim().length === 0) return; 
        if (line[0] !== ' ') { 
            if (currentSection) sections.push(currentSection); 
            const subject = line.slice(0,4).trim();
            const number = line.slice(5,9).trim();
            const name = line.slice(10,37).trim();
            const sectionid = line.slice(38,41).trim();
            const crn = line.slice(42,47).trim();
            const room = line.slice(77,84).trim();
            const type = line.slice(85,89).trim();
            const days = line.slice(52,66).trim();
            const times = line.slice(67,76).trim();
            
            currentSection = new Section(subject, number, name, sectionid, crn, room, type, times, days);
        } else if (currentSection) {
            currentSection.subject;
            currentSection.number;
            currentSection.name;
            const sectionid = line.slice(38,41).trim();
            const crn = line.slice(42,47).trim();
            const room = line.slice(77,84).trim();
            const type = line.slice(85,89).trim();
            const days = line.slice(52,66).trim();
            const times = line.slice(67,76).trim();

            currentSection = new Section(currentSection.subject, currentSection.number, currentSection.name, sectionid, crn, room, type, times, days);
        }
        if (currentSection) sections.push(currentSection); 
    });
    if (currentSection) sections.push(currentSection); 

    return sections;
}


  match(subject, number, sectionid) {
    return this.subject.trim() === subject.trim() && this.number.trim() === number.trim() && this.sectionid.trim() === sectionid.trim();
  }


  conflictsWith(otherSection) {
    const daysOverlap = this.days.split('').some(day => otherSection.days.includes(day));
    if (!daysOverlap) return false;

    const thisStartTime = parseInt(this.times.split(' ')[0]);
    const thisEndTime = parseInt(this.times.split(' ')[1]);
    const otherStartTime = parseInt(otherSection.times.split(' ')[0]);
    const otherEndTime = parseInt(otherSection.times.split(' ')[1]);

    const timeOverlap = (thisStartTime < otherEndTime && thisEndTime > otherStartTime);
    return daysOverlap && timeOverlap;
}
}

export { Section };
