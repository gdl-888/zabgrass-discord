import discord
import random
import asyncio
import datetime
import time
import sqlite3
import json

############################################################
###                      Load Files                      ###
############################################################

#set.json
try:
    jdata = open('set.json').read()
    jset = json.loads(jdata)
except:
    new_json = []

    print('DB 이름 : ', end = '')
    new_json += [input()]

    with open("set.json", "w") as f:
        f.write('{ "db" : "' + new_json[0] + '" }')
    
    jdata = open('set.json').read()
    jset = json.loads(jdata)

#token.txt
try:
    bot_token = open('token.txt').read()
except:
    print('토큰 : ', end = '')
    token = input()
    with open('token.txt', 'w') as f:
        f.write(token)
    print('등록되었습니다. 이후 token.txt 파일에서 바꿀 수 있습니다.')

    bot_token = open('token.txt').read()

conn = sqlite3.connect(jset['db'] + '.db')
curs = conn.cursor()

try:
    curs.execute('select * from SEND_TARGET_TB limit 1')
except:
    curs.execute('create table SEND_TARGET_TB(server text, channel text);')
    print('SEND_TARGET_TB 테이블 생성됨')
    conn.commit()

curs.execute('select * from SEND_TARGET_TB')
channelList = curs.fetchall()

verNative = open('ver.json').read()
verJson = json.loads(verNative)

#bot_token = 'NDA0OTQwMDUxODk4ODI2NzYz.DUymiQ.RjOdJnNCAjlISOdnPJXLK2ASRc0'
#channel_id = '396884596962361344'
zabgrassCall = '짭그'

client = discord.Client()

null = ['', '', '', '']

auto = [
    '퇴근 언제하지 ㅠ', 
    '흠'
    ]
day = []
night = [
    '야근이 싫어요', 
    '오늘도 밤샘이다!'
    ]
reply = [
    '네? 왜요?', 
    '부르지 마세요', 
    '아니에요'
    ]

ask_end = [
    '는',
    '어떰',
    '어때',
    '야',
    '나요'
]

ask = []

for i in range(len(ask_end)):
    ask += [ask_end[i]+'?']

print(ask)



async def autoSendMessage(channel_id):
    await client.wait_until_ready()
    ContentList = work()
    while not client.is_closed:
        curs.execute('select * from SEND_TARGET_TB where channel="'+channel_id+'"')
        check = curs.fetchall()
        try:
            check[0][1]
        except:
            break
        Content = random.choice(ContentList)
        await client.get_channel(channel_id).send(Content)
        wait = waittime()
        print('다음 메시지는 '+str(wait)+'초 후에.')
        await asyncio.sleep(wait)

@client.event
# 로그인 성공
async def on_ready():
    print('Logged in as')
    print(client.user.name)
    print(client.user.id)
    print('------')

@client.event
async def on_message(message):
    done = False
    msg = message.content
    Content = random.choice(reply)
    if client.user.id != message.author.id:
        for i in range(len(ask)):
            print(msg.find(ask[i]))
            if msg.find(ask[i]) >= 0 and done == False:
                Content = random.choice(reply+null)
                print(Content)
                try:
                    await message.channel.send(Content)
                    done = True
                except:
                    done = True
                break
        if msg.find('짭그') >= 0 and done == False:
            try:
                await message.channel.send(Content)
                done = True
            except:
                done = True
    if message.content.startswith('!zab'):
        try:
            zabCall, Channel = message.content.split()
            Channel = Channel.replace('<', '')
            Channel = Channel.replace('>', '')
            Channel = Channel.replace('#', '')
            curs.execute('delete from SEND_TARGET_TB where channel="'+Channel+'"')
            curs.execute('insert into SEND_TARGET_TB(server, channel) values("'+message.server.id+'", "'+Channel+'")')
            conn.commit()
            await message.channel.send('완료.')
            client.loop.create_task(autoSendMessage(Channel))
        except:
            await message.channel.send('잘못된 사용법: `!zab #채널`')
    if message.content.startswith('!nozab'):
        try:
            zabCall, Channel = message.content.split()
            Channel = Channel.replace('<', '')
            Channel = Channel.replace('>', '')
            Channel = Channel.replace('#', '')
            curs.execute('delete from SEND_TARGET_TB where channel="'+Channel+'"')
            conn.commit()
            await message.channel.send('완료.')
        except:
            await message.channel.send('잘못된 사용법: `!nozab #채널`')
    if message.content.startswith('a!help'):
        await message.channel.send('`!zab` 짭\n`!nozab` 안돼 짭'+'\n\n'+'\nver: '+verJson['ver'])
    

def Datetime():
    utcnow = datetime.datetime.utcnow()
    timeGap = datetime.timedelta(hours=9)
    KRtime = utcnow + timeGap
    nowDatetime = KRtime.strftime('%Y-%m-%d %H:%M:%S')
    return KRtime

def waittime():
    hour = list(range(2, 8))
    min_ten = list(range(1, 6))
    min_one = list(range(0, 10))
    time = random.choice(hour)*60*60 + random.choice(min_ten)*60*10 + random.choice(min_one)*60
    return time

def work():
    time = Datetime()
    print(time.hour)
    if time.hour > 9 and time.hour < 22:
        ContentList = auto + day
        #print('day')
    else:
        ContentList = auto + night
        #print('night')
    return ContentList
        
for n in range(len(channelList)):
    client.loop.create_task(autoSendMessage(channelList[n][1]))

client.run(bot_token)
