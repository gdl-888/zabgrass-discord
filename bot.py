import discord
import random
import asyncio
import datetime
import time

bot_token = ''
channel_id = ''
zabgrassCall = '짭그'

client = discord.Client()

null = ['', '', '', '']

auto = [
    '퇴근 언제하지 ㅠ', 
    '흠', 
    '여튼 카처가 나빴어요.'
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



async def autoSendMessage():
    await client.wait_until_ready()
    ContentList = work()
    while not client.is_closed:
        Content = random.choice(ContentList)
        await client.send_message(client.get_channel(channel_id), Content)
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
                    await client.send_message(client.get_channel(channel_id), Content)
                    done = True
                except:
                    done = True
                break
        if msg.find('짭그') >= 0 and done == False:
            try:
                await client.send_message(client.get_channel(channel_id), Content)
                done = True
            except:
                done = True
    

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
        

client.loop.create_task(autoSendMessage())
client.run(bot_token)