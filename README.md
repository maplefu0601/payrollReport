# Payroll report generator


## Getting Started


1. Run `npm install` from within the root of the project folder.

## Usage

This starter kit provides a number of **npm** scripts to make your development workflow effortless. Available tasks include:

2. Run `npm run start` to start page
**`npm run start`** ~ Builds a version of the project and makes it available at [http://localhost:3000](http://localhost:3000).



## Additional Info
1. This projeect is built using AngularJs. The first time when I saw this project, I wanted to use very simple HTML+Javascript to implement it. Since I'm using AngularJs in my current company, I think maybe it's quite easy and simple for me to finish this project.
2. I decided to use Sqlite as a local database, create two tables instead of one 'payroll' table. Another table 'payrollReport' was used for keeping report data. When inserting or updating records to 'payroll', it will automatically set data to 'payrollReport' using triggers. But soon I found that it's not so easy to access Sqlite local database using AngularJs, so I changed to WebSQL without any triggers.
3. There are not so many skills or technoligies that I could feel proud. The triggers was. If you want to speedup loading page or improve performance, you could load database from the beginning, and keep it in memory. When uploading another file, you just concat those records to original one. So you don't have to query all data from database again.
4. One trick is about the paid period. I need to calculate the last day in that month. In Feb, there could be 28 days or 29 days.
5. The entities design is pretty simple.
6. One concern is about uploading several different file with different report id, should I generate all records stored in database, or just those records in that file? `According your instruction 6.The report should be based on all of the data across all of the uploaded time reports, for all time.` It looks like I should create the report from everything in database.



