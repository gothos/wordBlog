#!/usr/bin/python

import mysql.connector as sql
from mysql.connector import errorcode
from hashlib import md5
from time import time,gmtime,strftime,localtime



def use_database(cnx,cursor,name):              
    try:
        cnx.database = name    
    except sql.Error as err:
        if err.errno == errorcode.ER_BAD_DB_ERROR:
            create_database(cursor,name)
            cnx.database = name
        else:
            print(err)


def select_value():
    query = "SELECT * FROM adam_statistics"

    try:
        cursor.execute(query)
        x = cursor.fetchall()
        return x
    except sql.Error as err:
        if err.errno == errorcode.ER_TABLE_EXISTS_ERROR:
            print("already exists.")
        else:
            print(err)


            
if __name__ == '__main__':
    cnx = sql.connect(host='localhost',user='root',password='rooter')
    cursor = cnx.cursor()
    use_database(cnx,cursor,'BLOG')
    query = "DELETE FROM adam_cpcs WHERE id > 0"
    cursor.execute(query)
    query = "DELETE FROM adam_campaignscosts WHERE id > 0"
    cursor.execute(query)
    #query = "DELETE FROM adam_bills WHERE id > 0"
    #cursor.execute(query)
    x = select_value()
    uniqueCampaigns = {}
    for i in x:
        if i[2] not in uniqueCampaigns.keys():
            uniqueCampaigns[i[2]] = []
        dicken = {}
        dicken['date'] = i[3]
        query = "select CPC FROM adam_words WHERE idWord='"+i[1]+"'"
        cursor.execute(query)
        b = cursor.fetchone()
        dicken['wordPrice'] = b[0] 
        dicken['uniqueCountOfClicks'] = i[6]
        dicken['priceToPay']= b[0] * i[6]
        uniqueCampaigns[i[2]].append(dicken)
    
    dic = {}
    L = []
    for i in uniqueCampaigns.keys():
        if i not in dic.keys():
            dic[i] = []
            
            
        used = []
        for k in uniqueCampaigns[i]:
            if k['date'] not in used:
                date = str(k['date'])
                dickey = {'date':k['date']}
                used.append(k['date'])
                superSumOfUniqueClicks = 0
                superPriceToPay = 0
                for m in uniqueCampaigns[i]:
                    if k['date'] == m['date']:
                        superSumOfUniqueClicks = superSumOfUniqueClicks + m['uniqueCountOfClicks']
                        superPriceToPay = superPriceToPay + m['priceToPay']
                if superSumOfUniqueClicks != 0:
                    avgCPC = superPriceToPay/superSumOfUniqueClicks
                else:
                    avgCPC = 0
                flag = 0
                month = str(k['date'].month)
                if len(month) == 1:
                    month = '0'+month
                year = str(k['date'].year)
                yearMonth = year +'-'+ month
                for n in range(len(L)):
                
                
                    if L[n]['date'] == yearMonth and L[n]['idCampaign'] == i:
                        sum_ = float(L[n]['totalCost'])
                        sum_ = sum_ + superPriceToPay
                        L[n]['totalCost'] = sum_
                        flag = 1
                        break
                if flag == 0:
                    L.append({'idCampaign':i,'date':yearMonth,'totalCost':superPriceToPay})
                dickey['avgCPC'] =  avgCPC
                avgCPC = "{0:.4f}".format(avgCPC)
                query = "INSERT INTO adam_cpcs (idCampaign_id,avgCPC,date) VALUES ('"+i+"','"+str(avgCPC)+"','"+date+"')"; 
                cursor.execute(query)
                cnx.commit()
                dic[i].append(dickey)

    
    for i in range(len(L)):
        query = "INSERT INTO adam_campaignscosts (idCampaign_id,totalCost,period) VALUES ('"+L[i]['idCampaign']+"','"+str(L[i]['totalCost'])+"','"+L[i]['date']+"')";
        cursor.execute(query)
        cnx.commit()
    for i in range(len(L)):
        query = "select idPerson_id FROM adam_campaign WHERE idCampaign='"+L[i]['idCampaign']+"'"
        cursor.execute(query)
        b = cursor.fetchone()
        L[i]['idPerson'] = b[0]
    M = []
    for i in range(len(L)):
        flag = 0
        for k in range(len(M)):
        
            if M[k]['idPerson'] == L[i]['idPerson'] and M[k]['date'] == L[i]['date']:
                sum_ = float(M[k]['totalCost'])
                sum_ = sum_ + L[i]['totalCost']
                M[k]['totalCost'] = sum_
                flag = 1
                break
                
        if flag == 0:
            M.append({'idPerson':L[i]['idPerson'],'date': L[i]['date'],'totalCost':L[i]['totalCost']})
    
    usedVarSymbols = []        
    query = "SELECT * FROM adam_bills WHERE status = 0"
    cursor.execute(query)
    x = cursor.fetchall()
    for i in x:
        usedVarSymbols.append(i[5])
    query = "DELETE FROM adam_bills WHERE id > 0"
    cursor.execute(query)        
    
    for i in range(len(M)):
        
        import hashlib
        
        varSymbol = str(M[i]['idPerson']) + str(M[i]['date'])
        
        varSymbol = abs(int(hashlib.md5(varSymbol).hexdigest(), 16) % (10 ** 10))
        if str(varSymbol) in usedVarSymbols:
            varSymbol = str(M[i]['idPerson']) + str(M[i]['date']) + str(M[i]['totalCost'])
        
            varSymbol = abs(int(hashlib.md5(varSymbol).hexdigest(), 16) % (10 ** 10))
            
        usedVarSymbols.append(str(varSymbol))
        query = "INSERT INTO adam_bills (idPerson_id,status,period,totalCost,varSymbol) VALUES ('"+str(M[i]['idPerson'])+"','"+str(0)+"','"+M[i]['date']+"','"+str(M[i]['totalCost'])+"','"+str(varSymbol)+"')";
        cursor.execute(query)
        cnx.commit()
    print('x',usedVarSymbols)
    cnx.close()
    cursor.close()
    
    print ('ok')      
