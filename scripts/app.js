// this is some pretty hairy code! so buckle up...
// start by definining the board being queried based on the current URL

var path = window.location.pathname;

var page = path.split("/").pop();

var boardname = page.replace(".html", "")

var board = "/" + boardname + "/"

// this is all for the "upload image" stuff

var render = function (tx, out, type, name, blk) {
  var link = "b://" + tx;
  document.querySelector("#imglink").value = link;
  var p = document.createElement("div")
  p.className = 'row'
  var c = document.querySelector("#container")
  var share = "<div class='util'></div><br>"
  try {
    if (/image\/.*/.test(type)) {
      let content = out[0].lb2
      p.innerHTML = "<img src='https://bico.media/" + tx + "'></img>" + "<br />" + "<br />" + "<br />"
      c.insertBefore(p, c.firstChild)
    } else if (/audio\/.*/.test(type)) {
      let content = out[0].lb2
      p.innerHTML = "<div class='label'>" + type + " | " + name + link + "</div>" + share + "<audio controls><source src='data:" + type + ";base64," + content + "'></audio>"
      c.insertBefore(p, c.firstChild)
    } else if (/video\/.*/.test(type)) {
      let content = out[0].lb2
      p.innerHTML = "<div class='label'>" + type + " | " + name + link + "</div>" + share + "<video controls><source src='data:" + type + ";base64," + content + "'></video>"
      c.insertBefore(p, c.firstChild)
    } else if (/.*\/json/.test(type)) {
      let content = out[0].ls2
      p.innerHTML = "<div class='label'>" + type + " | " + name + link + "</div>" + share + "<pre>" + content + "</pre>"
      c.insertBefore(p, c.firstChild)
    } else if (/text\/markdown/.test(type)) {
      let content = out[0].ls2
      var converter = new showdown.Converter()
      var html = converter.makeHtml(content);
      p.innerHTML = "<div class='label'>" + type + " | " + name + link + "</div>" + share + "<div>" + html + "</div>"
      c.insertBefore(p, c.firstChild)
    } else if (/application\/.+/.test(type)) {
      let content = out[0].lb2
      p.innerHTML = "<div class='label'>" + type + " | " + name + link + "</div>" + share + "<a class='btn' href='data:" + type + ";base64," + content + "' download>Download</a>"
      c.insertBefore(p, c.firstChild)
    } else {
      let content = out[0].ls2
      p.innerHTML = "<div class='label'>" + type + " | " + name + link + "</div>" + share + "<pre>" + content + "</pre>"
      c.insertBefore(p, c.firstChild)
    }
  } catch (e) {
  }
}
document.addEventListener("DOMContentLoaded", function (e) {
  document.addEventListener("click", function (e) {
    if (e.target.className === 'permalink') {
      location.reload()
    }
  })
  document.querySelector("#file").onchange = function (e) {
    var filetype = e.target.files[0].type
    var reader = new FileReader();
    reader.addEventListener('load', function (event) {
      databutton.build({
        data: [
          "19HxigV4QyBv3tHpQVcUEQyq1pzZVdoAut",
          event.target.result,
          filetype
        ],
        button: {
          $el: "#imgbutton",
          $pay: {
            to: [{
              address: "haichan@moneybutton.com",
              value: 1000
            },
            {
              address: "2564@moneybutton.com",
              value: 1000
            }]
          },
          onPayment: function (msg) {
            document.querySelector("#imgbutton").classList.add('hidden')
            document.querySelector("#file").classList.add('hidden')
            var txid = msg.txid
            var current_query = {
              v: 3,
              q: {
                find: { "tx.h": txid },
                limit: 1
              }
            };
            var b64 = btoa(JSON.stringify(current_query))
            var current_url = 'https://babel.bitdb.network/s/1DHDifPvtPgKFPZMRSxmVHhiPvFmxZwbfh/' + b64
            var bitsocket = new EventSource(current_url)
            bitsocket.onmessage = function (ee) {
              var m = JSON.parse(ee.data)
              if (m.type === 'u') {
                let out = m.data[0].out
                let tx = m.data[0].tx.h
                let type = m.data[0].out[0].s3
                let name = m.data[0].out[0].s5
                render(tx, out, type, name)
              }
            }
          }
        }
      })
    })
    reader.readAsArrayBuffer(e.target.files[0]);
  }
  if (h) {
    fetch(furl, header).then(function (r) {
      return r.json()
    }).then(function (r) {
      var items = [].concat(r.u).concat(r.c)
      items.filter(function (item) {
        return item.out[0]
      }).reverse().forEach(function (item) {
        let out = item.out
        let type = item.out[0].s3
        let name = item.out[0].s5
        let tx = item.tx.h
        render(tx, out, type, name, item.blk)
      })
    }).catch(function (e) {
    })
  }
})

// banned txid's
// these txid's are being excluded from the query results
// soon this will all be done seperately, and banned txid's won't be easily viewable

var n = {
  "$nin": [
    "27a45e9fbef1ac261d46a8b8edd89a2c5c2c2a6fce86f770425832e8d7377b31",
    "8d333d53fab7f5f327f885177e0eea323bf9bcdc0547a3a6983fec1deb34d0f4",
    "3b9e1eb8f67b1ac587a656ab11a9b52c26784c3ded9bd859cf702c517dbab642",
    "81080aa2d2dd0a72d93f4e6b4dec431946cd88fd0697d3aa32ccf124c5d346c8",
    "1f468e3f5e0635c3c2f7c820a4dd83c800c876c424cccbf89b1d0456c4ecc732",
    "d34b061b40c872d65c18ac9238669ade4141eecf1592158ba7058e0e40077fc9",
    "98565893fa4ab38557f84fac633243c006c469fb2046e6c64e617c27066c890e",
    "4aa8d823d724c4c184843126b4d22149bd0124f7c74d02ae4b74342365102cbc",
    "4e1c5a0c7073c7bb833fc120c476c473f8e3c0a09b2823461d24d54bb510f796",
    "fdebf53c0b7f1377d2fcbfa9a6483bbdc4081fb552bb868513ad35eb7ad2b553",
    "09e91d4d1dda803dab1aa0144f67da3c0c6f0e5af514aaeb1a188ec95b32d9ec",
    "6543c5c068095d7cae1d3c78cbfc9896158ab48a6133b5fc210939858c1c6431",
    "103b0d2d39b1fd8465d38fa1069316e6c745d9658f90158af80af5aaf0561882",
    "01b4515503066731c0665f160e4c9869575de0f08d3190b2d9d9d592456a863e",
    "8d31be10ddca10b6f166415c1d4a9c75aae574930f9f193e8f313670cc534525",
    "16ea1ab8c28a9cee95163bafd87f77349cfa39826eb4aa549de48987122678b7",
    "de773a423d27f49f1fff120a66fc80a93ff4c6d125f31de8fac5e802db164db8",
    "3262e4f5e429d8c46860500e552d11f7a1fdc58ca8135536b802c8017ff1d42e",
    "8d333d53fab7f5f327f885177e0eea323bf9bcdc0547a3a6983fec1deb34d0f4",
    "8c274a4b16ec5275c37b5af94671c180b82219846ad5a0c5069639a9f1dcf38d",
    "b3edaf249b4ba5f192047a037b7c9f3a646ae66be4b05e19a51d44f89965176f",
    "4e1c5a0c7073c7bb833fc120c476c473f8e3c0a09b2823461d24d54bb510f796",
    "72fbcb51022deda042fd495257ff090677ad10613e09a3c9e2268446a038e8b8"
  ]
}

// query for threads

var threads = {
  "v": 3,
  "q": {
    "db": ["u", "c"],
    "find": {
      "out.s1": "1P8FmmWdyRY1bmHJso6nGc7smBSvwvFoje",
      "out.s2": board,
      "out.s3": "THREAD",
      "out.s5": { "$regex": "b://.*" },
      "out.s4": { "$regex": "" },
      "tx.h": n
    },
    "sort": {
      "blk.i": -1,
      "i": -1
    },
    "limit": 60,
  },
  "r": {
    "f": "[ .[] | { op: .in[0].e.a?, txid: .tx.h, timestamp: .blk.t?, txt: .out[0]?.s4, img: .out[0].s5 }]"
  }
}
var b64 = btoa(JSON.stringify(threads));
var url = "https://neongenesis.bitdb.network/q/1HcBPzWoKDL2FhCMbocQmLuFTYsiD73u1j/" + b64;
var header = {
  headers: { key: "14QX7pn5GbipWvNLyDfrdcZLzwvPYJSnhB" }
};
fetch(url, header).then(function (r) {
  return r.json()
}).then(function (r) {
  let res = r.u.concat(r.c)
  res.forEach(function (output) {
    var threadid = output.txid;
    var op = output.op;
    var url = "https://bico.media/" + output.img + ".png"
    var threadtext = document.createTextNode(`${output.txt}`);
    var thread = document.createElement("div");
    thread.id = (`${threadid}`);
    thread.setAttribute('class', 'thread');
    var txurl = "https://whatsonchain.com/tx/" + output.txid;
    thread.innerHTML =
      //minimize thread
      "<button id=minimize" + threadid + " class='minimize'> - </button>" +
      //opens replyform
      "<button id=openreply>Reply</button>"
      + "<button id=tipop"
      + threadid + " class='tipop'>Tip" +
      "<div id=optipsubmit" + threadid + " class='hidden'>" +
      "<div id=optipbutton" + threadid + " class='hidden'></div>" + "</div>" + "</button>" +
      "<a id=optx href=" + txurl + ">" + threadid + "</a>" + "<br />" +
      // OP img
      "<img src=" + `${url}` + " class=pic></img>" +
      // OP text
      "<div class='op'>" +
      "<p id=optext" + threadid + " class='threadtext'>" + "</p>" + "<br />" +
      "<div id=replyop" + threadid + " class='hidden'>" +
      "<textarea id=replyform" + threadid + " placeholder='Type your reply...' class='hidden'></textarea>" + "<br />" + "<br />" +
      "<input id=replyimglink" + threadid + " placeholder='b:// image link' class='hidden'></textarea>" + "<br />" +
      "<button href='#' id=replydone" + threadid + " class='hidden'>Post reply!</button>" +
      "<button href='#' id='closereply' style='center' class='hidden'>Close</button>" + "<br />" +
      "<div id='replysubmit' class='hidden'>" + "<br />" +
      "<div id=replybutton" + threadid + "></div>" + "</div>" + "</div>" + "</div>";
      // append the thread to the page
    document.body.appendChild(thread);
    // greentext... needs work
    $("#optext" + threadid).ready(function () {
      $("p.threadtext:contains(>)").css("color", "yellowgreen");
    });
    thread.querySelector("#optext" + threadid).appendChild(threadtext);
    // reply to thread
    thread.querySelector("#openreply").addEventListener("click", function (e) {
      thread.querySelector("#replyform" + threadid).classList.remove('hidden')
      thread.querySelector("#replyform" + threadid).classList.add('replyform')
      thread.querySelector("#replyop" + threadid).classList.remove('hidden')
      thread.querySelector("#replyop" + threadid).classList.add('replybox')
      thread.querySelector("#replyimglink" + threadid).classList.remove('hidden')
      thread.querySelector("#replyimglink" + threadid).classList.add('replyimglink')
      thread.querySelector("#replysubmit").classList.remove('hidden')
      thread.querySelector("#closereply").classList.remove('hidden')
      thread.querySelector("#replydone" + threadid).classList.remove('hidden')
      thread.querySelector("#openreply").classList.add('hidden')
    });
    // close replyform
    thread.querySelector("#closereply").addEventListener("click", function (e) {
      thread.querySelector("#replyform" + threadid).classList.add('hidden')
      thread.querySelector("#replyimglink" + threadid).classList.add('hidden')
      thread.querySelector("#replysubmit").classList.add('hidden')
      thread.querySelector("#replydone" + threadid).classList.add('hidden')
      thread.querySelector("#openreply").classList.remove('hidden')
      thread.querySelector("#closereply").classList.add('hidden')
      thread.querySelector("#replyop").classList.add('hidden')
    });
    // show button for tip
    thread.querySelector("#tipop" + threadid).addEventListener("click", function (e) {
      thread.querySelector("#optipsubmit" + threadid).classList.remove('hidden')
    });
    // minimize thread
    thread.querySelector("#minimize" + threadid).addEventListener("click", function (e) {
      thread.classList.add('hidden')
    });
    // tip op
    thread.querySelector("#tipop" + threadid).addEventListener("click", function (e) {
      thread.querySelector("#optipbutton" + threadid).classList.remove('hidden')
      thread.querySelector("#optipsubmit" + threadid).classList.add('submitclose')
      const div = document.getElementById("optipbutton" + threadid);
      moneyButton.render(div, {
        to: op,
        amount: "0.0102",
        currency: "USD",
        onPayment: function (e) {
          thread.querySelector("#optipsubmit" + threadid).classList.add('hidden')
          console.log("paid!", e)
          setTimeout(function () {
          }, 1000)
        }
      })
    })
    // render the money button after querying for the b:// image's origin address
    thread.querySelector("#replydone" + threadid).addEventListener("click", function (e) {
      var btip = thread.querySelector("#replyimglink" + threadid).value;
      var tip = btip.replace("b://", '');
      var bquery = {
        "v": 3,
        "q": {
          "db": ["u", "c"],
          "find": {
            "tx.h": tip,
          },
          limit: 1,
        },
        "r": {
          "f": "[ .[] | { addr: .in[0].e.a? }]"
        }
      };
      var b64 = btoa(JSON.stringify(bquery));
      var url = "https://genesis.bitdb.network/q/1FnauZ9aUH2Bex6JzdcV4eNX7oLSSEbxtN/" + b64;
      var header = {
        headers: { key: "14QX7pn5GbipWvNLyDfrdcZLzwvPYJSnhB" }
      };
      fetch(url, header).then(function (r) {
        return r.json()
      }).then(function (r) {
        let res = r.u.concat(r.c)
        res.forEach(function (output) {
          var tipaddr = output.addr;
          function emp(btip) {
            if (btip == "") {
              return op;
            } else {
              return tipaddr;
            }
          }
          var ret = document.querySelector("#replyform" + threadid).value
          var retimg = document.querySelector("#replyimglink" + threadid).value;
          function a(ret) {
            if (ret == "") {
              return "  "
            } else {
              return ret;
            }
          }
          databutton.build({
            data: ["1P8FmmWdyRY1bmHJso6nGc7smBSvwvFoje", board, "REPLY", a(ret), retimg, threadid],
            button: {
              $el: "#replybutton" + threadid,
              label: "",
              $pay: {
                to: [{
                  address: "haichan@moneybutton.com",
                  value: 5000
                },
                {
                  address: emp(btip),
                  value: 900
                }],
              },
              onPayment: function (e) {
                window.location.reload();
                console.log("paid!", e)
                setTimeout(function () {
                  feed()
                }, 1000)
              }
            }
          })

        })
      })
    })
    // query for replies to thread based on txid (threadid)
    var replies = {
      "v": 3,
      "q": {
        "db": ["u", "c"],
        "find": {
          "out.s1": "1P8FmmWdyRY1bmHJso6nGc7smBSvwvFoje",
          "out.s2": board,
          "out.s3": "REPLY",
          "out.s4": { "$regex": "" },
          "out.s6": threadid,
          "tx.h": n
        },
        "sort": {
          "blk.i": 1,
          "i": 1
        },
        "limit": 100,
      },
      "r": {
        "f": "[ group_by(.blk.t)[] | .[] | { replyp: .in[0].e.a?, replytxid: .tx.h, replystamp: .blk.t?, replytxt: .out[0].s4, replyimg: .out[0].s5, replyto: .out[0].s6 }]"
      }
    }
    var b64 = btoa(JSON.stringify(replies));
    var url = "https://neongenesis.bitdb.network/q/1HcBPzWoKDL2FhCMbocQmLuFTYsiD73u1j/" + b64;
    var header = {
      headers: { key: "14QX7pn5GbipWvNLyDfrdcZLzwvPYJSnhB" }
    }
    fetch(url, header).then(function (r) {
      return r.json()
    }).then(function (r) {
      let res = r.c.concat(r.u)
      res.forEach(function (output) {
        var replyp = output.replyp;
        var replyto = output.replyto;
        var replytxt = output.replytxt;
        var replytxid = output.replytxid;
        var replyimg = document.createElement('img');
        replyimg.setAttribute('class', 'replyimg');
        var replyurl = "https://bico.media/" + output.replyimg + ".jpg"
        replyimg.setAttribute("src", `${url}`);
        var replyto = document.getElementById(`${replyto}`);
        var replytext = document.createTextNode(`${output.replytxt}`);
        var reply = document.createElement("div");
        reply.setAttribute("class", "reply");
        // replies to OP
        reply.innerHTML =
          //reply image
          "<img src=" + `${replyurl}` + " class=replypic></img>" +
          //reply tip
          "<button id=replytip" + replyp + " class='replytip'>Tip" +
          "<div id=replytipsubmit" + replyp + " class='hidden'>" +
          "<div id=replytipbutton" + replyp + " class='hidden'>" +
          "</div>" + "</div>" + "<br />" +
          //not even sure if this is still needed since tips auto-hide the button now?
          "<button id=replytipclose" + replyp +
          " class='hidden'>Close</button>" + "</button>" +
          "<p id=replytext" + replytxid + " class='replytext'>" + "</p>" + "</p>";
        thread.appendChild(reply);
        // greentext for replies
        // currently under construction! ☠️
        //$("#replytext" + threadid).ready(function() {
        //$("p.replytext:contains(>)").css("color", "yellowgreen");
        //});
        thread.querySelector("#replytext" + replytxid).appendChild(replytext);
        thread.querySelector("#replytip" + replyp).addEventListener("click", function (e) {
          thread.querySelector("#replytipsubmit" + replyp).classList.remove('hidden')
          thread.querySelector("#replytipbutton" + replyp).classList.remove('hidden')
          thread.querySelector("#replytipsubmit" + replyp).classList.add('submitclose')
          const div = document.getElementById("replytipbutton" + replyp);
          moneyButton.render(div, {
            to: replyp,
            amount: "0.01",
            currency: "USD",
            onPayment: function (e) {
              thread.querySelector("#replytipsubmit" + replyp).classList.add('hidden')
              console.log("paid!", e)
              setTimeout(function () {
                feed()
              }, 1000)
            }
          });
        });
        // not even sure if this is still relevant, but it /was/ for closing the reply tip box
        thread.querySelector("#replytipclose" + replyp).addEventListener("click", function (e) {
          thread.querySelector("#replytipsubmit" + replyp).classList.add('hidden')
          thread.querySelector("#replytipsubmit" + replyp).classList.remove('submitclose')
          thread.querySelector("#replytipbutton" + replyp).classList.add('hidden')
          thread.querySelector("#replytipclose" + replyp).classList.add('hidden')
        });
      })
    })
  })
})

// post credits scene:
// https://soundcloud.com/l_a_n/new-life-now-by-oneohtrix
