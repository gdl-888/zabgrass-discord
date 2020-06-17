const Discord = require('discord.js');
const fs = require('await-fs');
const client = new Discord.Client();

function Split(str, del) { return str.split(del); }; const split = Split;
function Replace(str, rgx, rpl) { return str.replace(rgx, rpl); }; const replace = Replace;
function UCase(s) { return s.toUpperCase(); }; const ucase = UCase;
function LCase(s) { return s.toUpperCase(); }; const lcase = LCase;

//############################################################
//###                      Load Files                      ###
//############################################################

const sqlite3 = require('sqlite3').verbose();

function print(x) { console.log(x); }
function prt(x) { process.stdout.write(x); }

function beep(cnt = 1) { // 경고음 재생
	for(var i=1; i<=cnt; i++)
		prt(''); // prt("");
}

// https://stackoverflow.com/questions/1349404/generate-random-string-characters-in-javascript
function rndval(chars, length) {
	var result           = '';
	var characters       = chars;
	var charactersLength = characters.length;
	for ( var i = 0; i < length; i++ ) {
		result += characters.charAt(Math.floor(Math.random() * charactersLength));
	}
	return result;
}

const inputReader = require('wait-console-input');

function input(p) {
	prt(p);
	return inputReader.readLine('');
}

// set.json
var jdata, jset;

/*
try {
    jdata = require('./set.json');
    jset = jdata;
} catch(e) {
    var new_json = [];
	
    new_json.push(input('DB 이름 : '));

    await fs.writeFile("set.json", '{ "db" : "' + new_json[0] + '" }')
    
    jdata = require('./set.json');
    jset = jdata;
}

const conn = new sqlite3.Database('./' + jset['db'] + '.db', (err) => {
	if(err) {
		print("데이타베이스 연결 실패!");
		process.exit(-1);
	}
});

// https://blog.pagesd.info/2019/10/29/use-sqlite-node-async-await/
conn.query = function (sql, params) {
	var that = this;
		return new Promise(function (resolve, reject) {
		that.all(sql, params, function asyncSQLRun(error, rows) {
			if (error)
				reject(error);
			else
				resolve(rows);
		});
	});
};

conn.commit = function() {};
conn.sd = [];

const curs = {
	execute: async function executeSQL(sql = '', params = []) {
		if(UCase(sql).startsWith("SELECT")) {
			const retval = await conn.query(sql, params);
			conn.sd = retval;
			
			return retval;
		} else {
			await conn.run(sql, params, err => { if(err) print('[오류!] ' + err); beep(3); });
		}
		
		return [];
	},
	fetchall: function fetchSQLData() {
		return conn.sd;
	}
};
*/

const random = {
	choice: function(x) {
		switch(typeof(x)) {
			case 'string':
				return rndval(x, 1);
			case 'object':
				return x[ Math.floor(Math.random() * x.length) ];
		}
	}
}

var bot_token = '12345678';

/*
// token.txt
try {
    bot_token = await fs.readFile('token.txt');
} catch(e) {
    var token = input('토큰 : ');
    await fs.writeFile('token.txt', token);
    print('등록되었습니다. 이후 token.txt 파일에서 바꿀 수 있습니다.');

    bot_token = await fs.readFile('token.txt');
}
*/

// conn = sqlite3.connect(jset['db'] + '.db')
// curs = conn.cursor()

/*
try {
    await curs.execute('select * from SEND_TARGET_TB limit 1');
} catch(e) {
    await curs.execute('create table SEND_TARGET_TB(server text, channel text)');
    print('SEND_TARGET_TB 테이블 생성됨');
    conn.commit();
}

await curs.execute('select * from SEND_TARGET_TB');
*/
channelList = [
	'670426525182459927'//, '675264839094108161', '693808616096137256'
];

var verNative = require('./ver.json');
var verJson = verNative;

var zabgrassCall = '짭그';

var nul = ['', '', '', ''];

var auto = [
    '퇴근 언제하지 ㅠ', 
    '일하기 싫다'
];
var day = [];
var night = [
    '야근이 싫어요', 
    '오늘도 밤샘이다!'
];
var reply = [
    '네? 왜요?', 
    '부르지 마세요', 
    '아니에요'
];

var ask_end = [
    '는',
    '어떰',
    '어때',
    '야',
    '나요'
];

function find(str, chr) {
	var cnt = 1;
	
	for(var c of str) {
		if(c == chr) {
			return cnt;
		}
		cnt++;
	}
	
	return 0;
}

function len(x) {
	return x.length;
}

function getTime() { return Math.floor(new Date().getTime()); }; const get_time = getTime;

function toDate(t) {
	var date = new Date(Number(t));
	
	var hour = date.getHours(); hour = (hour < 10 ? "0" : "") + hour;
    var min  = date.getMinutes(); min = (min < 10 ? "0" : "") + min;
    var sec  = date.getSeconds(); sec = (sec < 10 ? "0" : "") + sec;
    var year = date.getFullYear();
    var month = date.getMonth() + 1; month = (month < 10 ? "0" : "") + month;
    var day  = date.getDate(); day = (day < 10 ? "0" : "") + day;

    return year + "-" + month + "-" + day + " " + hour + ":" + min + ":" + sec;
}

function Datetime() {
    var date = new Date();
	
	var hour = date.getHours(); 
    var min  = date.getMinutes(); 
    var sec  = date.getSeconds(); 
    var year = date.getFullYear();
    var month = date.getMonth();
    var day  = date.getDate(); 

    return {
		"hour": hour
	};
}

function range(s, e) {
	var retval = [];
	
	for(var i=s; i<e; i++) {
		retval.push(i);
	}
	
	return retval;
}

function list(x) { return x; }

function waittime() {
    hour = list(range(0, 2));
    min_ten = list(range(0, 6));
    min_one = list(range(0, 10));
    time = random.choice(hour)*60*60 + random.choice(min_ten)*60*10 + random.choice(min_one)*60;
    return time;
}

function work() {
    time = Datetime();
    //print("time.hour: " + time.hour);
    if(time.hour >= 7 && time.hour <= 17) {
        ContentList = auto.concat(day);
        //print('day');
	} else {
        ContentList = auto.concat(night);
        //print('night');
	}
    return ContentList;
}

var ask = []; // = ask_end 안됨
for(var li of ask_end) {
	ask.push(li);
}

for(i of ask_end) {
    ask.push(i + '?');
}

print(ask);

async function autoSendMessage(channel_id) {
    var ContentList = work();
	
    async function timer() {
		var wt = waittime() * 1000;
		print("[[" + client.channels.get(channel_id).name + " 채널에 " + wt / 1000 + "초 후 자동으로 메시지를 보냅니다.]]");
		setTimeout(function() {
			/*
			curs.execute('select * from SEND_TARGET_TB where channel="'+channel_id+'"');
			check = curs.fetchall();
			if(!check[0][1]) {
				return;
			}
			*/
			var Content = random.choice(ContentList);
			client.channels.get(channel_id).send(Content);
			// wait = waittime();
			// print('다음 메시지는 ' + String(wait) + '초 후에.');
			
			timer();
		}, wt);
	}
	timer();
}

client.on('ready', async () => {
    print('Logged in as');
    print(client.user.username);
    print(client.user.id);
    print('------');
	
	for(n of channelList) {
		autoSendMessage(n);
	}
});

client.on('message', async message => {
    var done = false;
    var msg = message.content;
    var Content = random.choice(reply);
    if(client.user.id != message.member.user.id) {
        for(var i=0; i<len(ask); i++) {
            print(find(msg, ask[i]));
            if(msg.includes(ask[i]) && !done) {
                Content = random.choice(reply);
                print(Content);
                try {
                    message.channel.send(Content);
                    done = true;
                } catch(e) {
                    done = true;
				}
                break;
			}
		}
        if(msg.includes('짭그') && !done) {
            try {
                message.channel.send(Content);
                done = true;
            } catch(e) {
                done = true;
			}
		}
	}
	/*
    if(message.content.startsWith('z!zab')) {
        try {
			const matches = mention.match(/<#!?(\d+)>/);
			const Channel = matches[1];
			
            await curs.execute('delete from SEND_TARGET_TB where channel="'+Channel+'"')
            await curs.execute('insert into SEND_TARGET_TB(server, channel) values("'+message.guild.id+'", "'+Channel+'")')
            conn.commit()
            message.channel.send('완료.');
		} catch(e) {
            message.channel.send('잘못된 사용법: `z!zab <\\#채널번호>`'); // 채널 링크 생성은 마지막으로 해본날 기준 #xxx로 안 되는 걸로 알고있음
		}
	}
	if(message.content.startsWith('z!nozab')) {
        try {
            const matches = mention.match(/<#!?(\d+)>/);
			const Channel = matches[1];
			
            await curs.execute('delete from SEND_TARGET_TB where channel="'+Channel+'"')
            conn.commit()
            message.channel.send('완료.');
        } catch(e) {
            message.channel.send('잘못된 사용법: `z!nozab #채널`');
		}
	}
    if(message.content.startsWith('z!help')) {
        message.channel.send('`!zab` 짭\n`!nozab` 안돼 짭'+'\n\n'+'\nver: '+verJson['ver']);
	}
	*/
});

client.login(bot_token);
        



