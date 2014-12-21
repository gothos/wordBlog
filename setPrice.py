#!/usr/bin/python

import mysql.connector as sql
from mysql.connector import errorcode



def use_database(cnx,cursor,name):              
    try:
        cnx.database = name    
    except sql.Error as err:
        if err.errno == errorcode.ER_BAD_DB_ERROR:
            create_database(cursor,name)
            cnx.database = name
        else:
            print(err)



if __name__ == '__main__':
    cnx = sql.connect(host='localhost',user='root',password='rooter')
    cursor = cnx.cursor()
    #cursor.execute("drop database URL")
    #cnx.commit() 
    
    #create_database(cursor,'URL')
    use_database(cnx,cursor,'BLOG')
    allActiveWords = {}
    #query = "SELECT idCampaign FROM adam_campaign WHERE status ='2'"
    #cursor.execute(query)
    #b = cursor.fetchall()
    #print('b',b)
    query = "SELECT idWord_id FROM adam_campaignwords WHERE idCampaign_id in (SELECT idCampaign FROM adam_campaign WHERE status ='2')";
    cursor.execute(query)
    b = cursor.fetchall()
    print('b',b)
    #query = "SELECT DISTINCT idWord_id FROM adam_campaignwords WHERE idCampaign_id in (SELECT idCampaign FROM adam_campaign WHERE status ='2')";
    #cursor.execute(query)
    #a = cursor.fetchall()
    #print('a',a)
    sumOfAllActiveWords = len(b)
    print('d',sumOfAllActiveWords)
    a = []
    for i in b:
        if i not in a:
            a.append(i)
    print('a',a)
    for i in a:
        count = 0
        for k in b:
            if i == k:
                count = count + 1
        allActiveWords[i[0]] = count
    print('c',allActiveWords)
    dic = {}
    for i in allActiveWords.keys():
        allActiveWords[i] = "{0:.4f}".format(float(allActiveWords[i])/sumOfAllActiveWords)
        #allActiveWords[i] = float(allActiveWords[i])/sumOfAllActiveWords
    print('c',allActiveWords)
    L = []
    for i in allActiveWords.keys():
        L.append(allActiveWords[i])
    minValue = min(L)
    maxValue = max(L)
    dif= float(maxValue) - float(minValue)
    
    part = dif/6
    print('part',part)
    valueDic = {1:{'price':0.05,'value':minValue}}
    price = [0.1,0.2,0.3,0.4]
    for i in range(2,6):
        #print('i',i,'=====================================')
        value = float(minValue) + i*part
        valueDic[i] = {'price':price[i-2],'value':value}
    print('valueDic',valueDic) 
    for i in allActiveWords.keys():
        print('icko',i,'=====================================')
        print (allActiveWords[i])
        #print (allActiveWords[i][0])
        flag = 0
        for k in valueDic.keys():
            print('kcko',k)
            #print('al',allActiveWords[i])
            print('val',valueDic[k]['value'])
            #print('typeAl',float(allActiveWords[i])),'val',type(valueDic[k]['value']))
            if float(allActiveWords[i]) >=  float(valueDic[k]['value']):
                print('proslo1')
                if k == 5 or (k < 5 and float(allActiveWords[i]) < float(valueDic[k + 1]['value'])):
                    print('proslo2')
                    query = "UPDATE adam_words set CPC = '"+str(valueDic[k]['price'])+"' WHERE idWord = '"+str(i)+"'"
                    print('query',query)
                    cursor.execute(query)
                    cnx.commit()
                    flag = 1
            if flag == 1:
                break
             
    print('OK')
    
    
    
    
    
    
    
    
    
    
    
    
