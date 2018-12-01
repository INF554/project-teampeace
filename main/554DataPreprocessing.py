import pandas as pd
import matplotlib.pyplot as plt; plt.rcdefaults()
import numpy as np
import matplotlib.pyplot as plt
from geopy.geocoders import Nominatim
import csv

from geopy.exc import GeocoderTimedOut

from scipy.sparse import coo_matrix

import xlrd 
# from testtest import statea

# dfCoun = pd.read_csv('COW country codes.csv')
# 
# geolocator = Nominatim(timeout=3)
# 
# cl=list(dfCoun.StateNme)
# print(dfCoun.StateNme)
# for x in cl:
# #     if x!="Hesse Electoral" and x!="Hesse Grand Ducal":
#     try:
#         print(x)
#         
#         location = geolocator.geocode(x)
#         
#         
#         
#         a=location.latitude
#         b=location.longitude
#     #     dfCoun.write(location)
#         
#         with open('COW country codes_lati_long.csv', "a+") as output:
#     #     for line in location:
#             output.write(x)
#             output.write(',')
#             output.write(str(a))
#             output.write(',')
#             output.write(str(b))
#             output.write('\n')
#     
#     except:
#         print(x)
#         with open('COW country codes_lati_long.csv', "a+") as output:
#     #     for line in location:
#             
#             output.write('\n')
#         
# print("Hello")   


#Map data processing
# cLatiLong = pd.read_csv('COW country codes_lati_long.csv')
# rowCol=cLatiLong.shape
# 
# didw = pd.read_csv('directed_dyadic_war.csv')
# rowColDI=didw.shape
# 
# 
# for i, row in didw.iterrows():
#     
#     print(int(row.statea))
#     print(int(row.stateb))
#     
#     statea=int(row.statea)
#     stateb=int(row.stateb)
#     
#     a=cLatiLong.loc[statea==cLatiLong.CCode].head(1)
#     b=cLatiLong.loc[stateb==cLatiLong.CCode].head(1)
#     
#     with open('stateAstateB.csv', "a+") as output:
#     #     for line in location:
#         
#         output.write(str(float(a.latitude)))
#         output.write(',')
#         output.write(str(float(a.longitude)))
#         output.write(',')
#         output.write(str(float(b.latitude)))
#         output.write(',')
#         output.write(str(float(b.longitude)))
#         output.write(',')
#         output.write('\n')







#chard diagram data processing

# tradeOriData = pd.read_csv("Dyadic_COW_i.0.csv")
 
# for i, g in tradeOriData.groupby(''):
#     fileName='Dyadic_COW_i.0'+'_'+str(i)
#     g.to_csv('{}.csv'.format(fileName), index=False)

#By using flow2
# tradeOriData = pd.read_csv("Dyadic_COW_i.0.csv")
# for i, g in tradeOriData.groupby(''):
#     fileName='Dyadic_COW_i.0'+'_'+'flow2'+'_'+str(i)
#   
#     tempG=g.ix[:, ['ccode1', 'ccode2','flow2']]
#     tempG.to_csv('{}.txt'.format(fileName), sep=' ',index=False)    



#counting trade relationships for each 
# tradeOriData = pd.read_csv("Dyadic_COW_i.0.csv")
# df = pd.DataFrame(columns=['','countRelations'])
# for i, g in tradeOriData.groupby(''):
# #     fileName='Dyadic_COW_i.0'+'_'+'TradeRelations'
#     
#     df.index = df.index + 1
#     data=[str(i),g.shape[0]]
#     df.loc[-1] = data
# #     df = pd.DataFrame(data,index=index, columns=['','countRelations'])
# 
# fileName='Dyadic_COW_i.0'+'_'+'TradeRelations'+"1870-20i"
# df.to_csv('{}.csv'.format(fileName), sep=',',index=False)    



# Making matrix file for each 
# Flow2(export from source)
# import json
# for ind in range(1870,2015):
# #     ind=20i
#     file="Dyadic_COW_i.0_By _flow2_txt/"+"Dyadic_COW_i.0_flow2_"+str(ind)+".txt" 
#     
#     fileJson="Dyadic_COW_i.0_By _flow2_json/"+"Dyadic_COW_i.0_flow2_"+str(ind)+".json" 
#        
#     l, c, v = np.loadtxt(file, skiprows=1).T[:3,:]
#     m = coo_matrix((v, (l-1, c-1)), shape=(l.max(), c.max()))
#     a=m.toarray()
#     pd.DataFrame(a).to_json(fileJson, orient='split')




# Counting the number of MIDs by and contitenet by year 
# from collections import Counter
# tradeOriData = pd.read_csv("MIDLOCA_2.0_Continent.csv")
# # df[['col1','col2','col3','coli']].groupby(['col1','col2']).count()
# # tradeOriData.assign(occurences = tradeOriData.groupby('').cumcount())
#   
# countMids=tradeOriData.groupby("year")["dispnum"].count()
# countienetMids=tradeOriData.groupby("year")["contient"].count()
# t=list(tradeOriData.groupby("year")["contient"])
# allConList=[]
# for i in range(len(t)):
#     year=list(tradeOriData.groupby("year")["contient"])[i][0]
#     eachContibyYear=list(list(tradeOriData.groupby("year")["contient"])[i][1])
#       
# #     eachContibyYear = [x for x in eachContibyYear if str(x) != '0.0']
#     eachContibyYear = [x for x in eachContibyYear if str(x) != 'nan']
#       
#     if eachContibyYear!=[]:
#         c=Counter(eachContibyYear)
#         con=c.most_common(1)
#         con=con[0][0]
#     if eachContibyYear==[]:
#         con=0
#       
#     allConList.append(con)
#   
#   
# allConList = pd.Series(allConList).astype(str)
#      
# fileName="MIDLOCA_2.0_groupbycountby.csv"
# fileNameT="MIDLOCA_2.0_groupbycountbyCon.csv"
# countMids.to_csv('{}'.format(fileName), sep=',',index=True)    
# allConList.to_csv('{}'.format(fileNameT), sep=',',index=True)   
 
 
 
 
 
# directed_dyadic_war_lati_long file combines country name
# import pandas as pd
 
# DataA = pd.read_csv("directed_dyadic_war_lati_long.csv")
# DataB = pd.read_csv("COW country codes_lati_long.csv")
# DataA.loc[:,'stateNameA']=0
# DataA.loc[:,'stateNameB']=0
# 
# fileName="directed_dyadic_war_lati_long_stateName.csv"
# 
# for i, g in DataA.iterrows():
#     DataA['stateNameA'].iloc[[i]]
#     
#     
#     stateNameA=DataB.loc[DataB['CCode'] == g['statea']].iloc[0]
#     stateNameB=DataB.loc[DataB['CCode'] == g['stateb']].iloc[0]
#     
#     DataA['stateNameA'].iloc[[i]]=stateNameA['StateNme']
#     DataA['stateNameB'].iloc[[i]]=stateNameB['StateNme']
#     
# 
# DataA.to_csv('{}'.format(fileName), sep=',',index=True)    









# Counting the number of countries which are doing War by  
# tradeOriData = pd.read_csv("directed_dyadic_war_lati_long_stateName.csv")
#  
# countList=list(tradeOriData.groupby("year")["statea"])
# batdths=list(tradeOriData.groupby("year")["batdths"])
# df = pd.DataFrame(columns=['year','countCouWars','batdths'])
# # 
# for i in range(len(countList)):
#     df.index = df.index + 1
#     setCou=set(countList[i][1])
#     setbatdths=set(batdths[i][1])
#      
#     couutCount=len(setCou)
#     sumbatdths=sum(setbatdths)
#     year =countList[i][0]
#      
#     data=[year,couutCount,sumbatdths]
#     df.loc[-1] = data
#     
# fileName="directed_dyadic_war_lati_long_stateNamecountby.csv"
# # version2 includes battle death.  
# fileName="directed_dyadic_war_lati_long_stateNamecountbyVer2.csv"
# df.to_csv('{}'.format(fileName), sep=',',index=False)    





# making Dyadic_COW_i.0_Processed.csv
# tradeOriData = pd.read_csv("Dyadic_COW_4.0.csv")
# i = tradeOriData[(tradeOriData.flow2 == -9)].index
# tradeOriData=tradeOriData.drop(i)
#  
# SumTradeBy=list(tradeOriData.groupby("year")["flow2"].sum())
# CountTradeBy=list(tradeOriData.groupby("year")["flow2"].count())
# allCountry1=list(tradeOriData.groupby("year")["ccode1"])
# allCountry2=list(tradeOriData.groupby("year")["ccode2"])
# 
#  
# countryByOne=list(tradeOriData.groupby("year")["ccode1"])
# countryByTwo=list(tradeOriData.groupby("year")["ccode2"])
# List=list(set(tradeOriData.year))
#  
# # set(list(tradeOriData.groupby("")[""]))
#  
#  
# df = pd.DataFrame(columns=['year','SumTrade','CountTradeRela','numCountry','countryset'])
#  
#  
# for i in range(len(SumTradeBy)):
#     df.index = df.index + 1
#      
#     setCouOne=set(countryByOne[i][1])
#     setCouTwo=set(countryByTwo[i][1])
#      
#     setCouOne=setCouOne.union(setCouTwo)
#      
#      
#     couutCount=len(setCouOne)
# #     tradeOriDatadf[i][2]=couutCount
# #     =tradeOriDatadf[i][0]
#     data=[int(List[i]),SumTradeBy[i],int(CountTradeBy[i]),int(couutCount),setCouOne]
#     df.loc[-1] = data
#       
# fileName="Dyadic_COW_4.0_Processed_WithCcode.csv"
# df.to_csv('{}'.format(fileName), sep=',',index=False)    














# with open('Inter-StateWarsList.txt') as f:

# with open("Inter-StateWarsList.txt", "r") as ins:
#     resultFyle = open("Inter-StateWarsList.csv",'w')
# 
#     for line in ins:
#         temp=",".join(line.split(" ", 1))
#         resultFyle.write(temp)


















# Put Each Year
# tradeOriData = pd.read_csv("directed_dyadic_war_lati_long_stateName.csv")
#  
# grY=set(tradeOriData.year)
# AllgrY=set(list(range(1823,200i)))
# difY=set(AllgrY).difference(set(grY))
# difY=sorted(difY)
#   
# allY = pd.DataFrame()
# warStart=1823
#  
# cun=[]
# # resultFyle = open("directed_dyadic_war_lati_long_stateName_all.csv",'w')
#  
# for i, row in tradeOriData.iterrows():
#     if i!=0:
#         break
#      
#     for i in difY:
#  
# #         cun.append(row.year)
# #         tradeOriData
#          
#         add=i
#         temp=row
#         temp = temp.replace(temp, 0)
#         temp.year=add
#  
#         tradeOriData=tradeOriData.append(temp)
#          
#  
# fileName="directed_dyadic_war_lati_long_stateName_allYear.csv"
# tradeOriData.to_csv('{}'.format(fileName), sep=',',index=False)    







# Put Each Year for war data
# tradeOriData = pd.read_csv("directed_dyadic_war_lati_long_stateNamecountbyyear.csv")
# tradeOriData = pd.read_csv("directed_dyadic_war_lati_long_stateNamecountbyVer2.csv")
# 
# grY=set(tradeOriData.year)
# AllgrY=set(list(range(1823,2003)))
# difY=set(AllgrY).difference(set(grY))
# difY=sorted(difY)
#   
# allY = pd.DataFrame()
# warStart=1823
#  
# cun=[]
# # resultFyle = open("directed_dyadic_war_lati_long_stateName_all.csv",'w')
#  
# for i, row in tradeOriData.iterrows():
#     if i!=0:
#         break
#      
#     for i in difY:
#  
# #         cun.append(row.year)
# #         tradeOriData
#          
#         add=i
#         temp=row
#         temp = temp.replace(temp, 0)
#         temp.year=add
#  
#         tradeOriData=tradeOriData.append(temp)
#          
#  
# # fileName="directed_dyadic_war_lati_long_stateNamecountbyyearAll.csv"
# fileName="directed_dyadic_war_lati_long_stateNamecountbyyearAllVer2.csv"
# tradeOriData = tradeOriData.sort_values(['year'])
# tradeOriData.to_csv('{}'.format(fileName), sep=',',index=False) 






# Put Each Year for MIDs data
# tradeOriData = pd.read_csv("MIDLOCA_2.0_groupbycountbyyear.csv")
# tradeOriData = pd.read_csv("MIDLOCA_2.0_groupbycountbyyearCon.csv")
# 
# warStart=1816 
# grY=set(tradeOriData.year)
# AllgrY=set(list(range(warStart,2010)))
# difY=set(AllgrY).difference(set(grY))
# difY=sorted(difY)
# #   
# allY = pd.DataFrame()
# # warStart=1816
# #  
# cun=[]
# # resultFyle = open("directed_dyadic_war_lati_long_stateName_all.csv",'w')
# #  
# for i, row in tradeOriData.iterrows():
#     if i!=0:
#         break
#       
#     for i in difY:
#   
# #         cun.append(row.year)
# #         tradeOriData
#           
#         add=i
#         temp=row
#         temp = temp.replace(temp, 0)
#         temp.year=add
#   
#         tradeOriData=tradeOriData.append(temp)
#           
# tradeOriData.sort_values(['year'])
# fileName="MIDLOCA_2.0_groupbycountbyyearAllYearConti.csv"
# tradeOriData = tradeOriData.sort_values(['year'])
# tradeOriData.to_csv('{}'.format(fileName), sep=',',index=False) 







#ISO A3 to COW Ccode
# import json
# from pprint import pprint
# 
# with open('map.geojson') as data_file:    
#     data = json.load(data_file)
#     
# with open('myfile.geojson') as data_file:    
#     data = json.load(data_file)
#  
# resultFyle = pd.read_csv("COW country codes_lati_long.csv")
# staAbbSet=set(list(resultFyle.StateAbb))
# 
# resultFyle.loc[resultFyle['CCode'] ==2]["StateAbb"]
# 
# allCode=[]
# for ind in range(len(data["features"])):
#     allCode.append(data["features"][ind]["properties"]["A3"])
# 
#     
#     
#     if data["features"][ind]["properties"]["A3"]=="USA":
#         data["features"][ind]["properties"]["A3"]= list(resultFyle.loc[resultFyle['CCode'] == 2]["StateAbb"])[0]
#     
#     if data["features"][ind]["properties"]["A3"]=="CAN":
#         data["features"][ind]["properties"]["A3"]= list(resultFyle.loc[resultFyle['CCode'] == 20]["StateAbb"])[0]
#         
#     if data["features"][ind]["properties"]["A3"]=="BHS":
#             data["features"][ind]["properties"]["A3"]= list(resultFyle.loc[resultFyle['CCode'] == 31]["StateAbb"])[0]
#         
#     if data["features"][ind]["properties"]["A3"]=="CUB":
#                 data["features"][ind]["properties"]["A3"]= list(resultFyle.loc[resultFyle['CCode'] == 40]["StateAbb"])[0]
#         
#     if data["features"][ind]["properties"]["A3"]=="HTI":
#                 data["features"][ind]["properties"]["A3"]= list(resultFyle.loc[resultFyle['CCode'] == 41]["StateAbb"])[0]
#         
#     if data["features"][ind]["properties"]["A3"]=="DOM":
#                 data["features"][ind]["properties"]["A3"]= list(resultFyle.loc[resultFyle['CCode'] == 42]["StateAbb"])[0]
#         
#     if data["features"][ind]["properties"]["A3"]=="JAM":
#                 data["features"][ind]["properties"]["A3"]= list(resultFyle.loc[resultFyle['CCode'] == 51]["StateAbb"])[0]
#         
#     if data["features"][ind]["properties"]["A3"]=="TTO":
#                 data["features"][ind]["properties"]["A3"]= list(resultFyle.loc[resultFyle['CCode'] ==  52]["StateAbb"])[0]
#         
#     if data["features"][ind]["properties"]["A3"]=="BRB":
#                 data["features"][ind]["properties"]["A3"]= list(resultFyle.loc[resultFyle['CCode'] == 53]["StateAbb"])[0]
#         
#     if data["features"][ind]["properties"]["A3"]=="DMA":
#                 data["features"][ind]["properties"]["A3"]= list(resultFyle.loc[resultFyle['CCode'] == 54]["StateAbb"])[0]
#         
#     if data["features"][ind]["properties"]["A3"]=="GRD":
#                 data["features"][ind]["properties"]["A3"]= list(resultFyle.loc[resultFyle['CCode'] == 55]["StateAbb"])[0]
#         
#     if data["features"][ind]["properties"]["A3"]=="LCA":
#         data["features"][ind]["properties"]["A3"]= list(resultFyle.loc[resultFyle['CCode'] ==56]["StateAbb"])[0]
#         
#     if data["features"][ind]["properties"]["A3"]=="VCT":
#         data["features"][ind]["properties"]["A3"]= list(resultFyle.loc[resultFyle['CCode'] ==57]["StateAbb"])[0]
#     if data["features"][ind]["properties"]["A3"]=="ATG":
#         data["features"][ind]["properties"]["A3"]= list(resultFyle.loc[resultFyle['CCode'] ==58]["StateAbb"])[0]
#     if data["features"][ind]["properties"]["A3"]=="KNA":
#         data["features"][ind]["properties"]["A3"]= list(resultFyle.loc[resultFyle['CCode'] ==60]["StateAbb"])[0]
#     if data["features"][ind]["properties"]["A3"]=="MEX":
#         data["features"][ind]["properties"]["A3"]= list(resultFyle.loc[resultFyle['CCode'] ==70]["StateAbb"])[0]
#     if data["features"][ind]["properties"]["A3"]=="BLZ":
#         data["features"][ind]["properties"]["A3"]= list(resultFyle.loc[resultFyle['CCode'] ==80]["StateAbb"])[0]
#     if data["features"][ind]["properties"]["A3"]=="GTM":
#         data["features"][ind]["properties"]["A3"]= list(resultFyle.loc[resultFyle['CCode'] ==90]["StateAbb"])[0]
#     if data["features"][ind]["properties"]["A3"]=="HND":
#         data["features"][ind]["properties"]["A3"]= list(resultFyle.loc[resultFyle['CCode'] ==91]["StateAbb"])[0]
#     if data["features"][ind]["properties"]["A3"]=="SLV":
#         data["features"][ind]["properties"]["A3"]= list(resultFyle.loc[resultFyle['CCode'] ==92]["StateAbb"])[0]
#     if data["features"][ind]["properties"]["A3"]=="NIC":
#         data["features"][ind]["properties"]["A3"]= list(resultFyle.loc[resultFyle['CCode'] ==93]["StateAbb"])[0]
#     if data["features"][ind]["properties"]["A3"]=="CRI":
#         data["features"][ind]["properties"]["A3"]= list(resultFyle.loc[resultFyle['CCode'] ==94]["StateAbb"])[0]
#     if data["features"][ind]["properties"]["A3"]=="PAN":
#         data["features"][ind]["properties"]["A3"]= list(resultFyle.loc[resultFyle['CCode'] ==95]["StateAbb"])[0]
#     if data["features"][ind]["properties"]["A3"]=="COL":
#         data["features"][ind]["properties"]["A3"]= list(resultFyle.loc[resultFyle['CCode'] ==100]["StateAbb"])[0]
#     if data["features"][ind]["properties"]["A3"]=="VEN":
#         data["features"][ind]["properties"]["A3"]= list(resultFyle.loc[resultFyle['CCode'] ==101]["StateAbb"])[0]
#     if data["features"][ind]["properties"]["A3"]=="GUY":
#         data["features"][ind]["properties"]["A3"]= list(resultFyle.loc[resultFyle['CCode'] ==110]["StateAbb"])[0]
#     if data["features"][ind]["properties"]["A3"]=="SUR":
#         data["features"][ind]["properties"]["A3"]= list(resultFyle.loc[resultFyle['CCode'] ==115]["StateAbb"])[0]
#     if data["features"][ind]["properties"]["A3"]=="ECU":
#         data["features"][ind]["properties"]["A3"]= list(resultFyle.loc[resultFyle['CCode'] ==130]["StateAbb"])[0]
#     if data["features"][ind]["properties"]["A3"]=="PER":
#         data["features"][ind]["properties"]["A3"]= list(resultFyle.loc[resultFyle['CCode'] ==135]["StateAbb"])[0]
#     if data["features"][ind]["properties"]["A3"]=="BRA":
#         data["features"][ind]["properties"]["A3"]= list(resultFyle.loc[resultFyle['CCode'] ==140]["StateAbb"])[0]
#     if data["features"][ind]["properties"]["A3"]=="BOL":
#         data["features"][ind]["properties"]["A3"]= list(resultFyle.loc[resultFyle['CCode'] ==145]["StateAbb"])[0]
#     if data["features"][ind]["properties"]["A3"]=="PRY":
#         data["features"][ind]["properties"]["A3"]= list(resultFyle.loc[resultFyle['CCode'] ==150]["StateAbb"])[0]
#     if data["features"][ind]["properties"]["A3"]=="CHL":
#         data["features"][ind]["properties"]["A3"]= list(resultFyle.loc[resultFyle['CCode'] ==155]["StateAbb"])[0]
#     if data["features"][ind]["properties"]["A3"]=="ARG":
#         data["features"][ind]["properties"]["A3"]= list(resultFyle.loc[resultFyle['CCode'] ==160]["StateAbb"])[0]
#     if data["features"][ind]["properties"]["A3"]=="URY":
#         data["features"][ind]["properties"]["A3"]= list(resultFyle.loc[resultFyle['CCode'] ==165]["StateAbb"])[0]
#     if data["features"][ind]["properties"]["A3"]=="GBR":
#         data["features"][ind]["properties"]["A3"]= list(resultFyle.loc[resultFyle['CCode'] ==200]["StateAbb"])[0]
#     if data["features"][ind]["properties"]["A3"]=="IRL":
#         data["features"][ind]["properties"]["A3"]= list(resultFyle.loc[resultFyle['CCode'] ==205]["StateAbb"])[0]
#     if data["features"][ind]["properties"]["A3"]=="NLD":
#         data["features"][ind]["properties"]["A3"]= list(resultFyle.loc[resultFyle['CCode'] ==210]["StateAbb"])[0]
#     if data["features"][ind]["properties"]["A3"]=="BEL":
#         data["features"][ind]["properties"]["A3"]= list(resultFyle.loc[resultFyle['CCode'] ==211]["StateAbb"])[0]
#     if data["features"][ind]["properties"]["A3"]=="LUX":
#         data["features"][ind]["properties"]["A3"]= list(resultFyle.loc[resultFyle['CCode'] ==212]["StateAbb"])[0]
#     if data["features"][ind]["properties"]["A3"]=="FRA":
#         data["features"][ind]["properties"]["A3"]= list(resultFyle.loc[resultFyle['CCode'] ==220]["StateAbb"])[0]
#     if data["features"][ind]["properties"]["A3"]=="MCO":
#         data["features"][ind]["properties"]["A3"]= list(resultFyle.loc[resultFyle['CCode'] ==221]["StateAbb"])[0]
#     if data["features"][ind]["properties"]["A3"]=="LIE":
#         data["features"][ind]["properties"]["A3"]= list(resultFyle.loc[resultFyle['CCode'] ==223]["StateAbb"])[0]
#     if data["features"][ind]["properties"]["A3"]=="CHE":
#         data["features"][ind]["properties"]["A3"]= list(resultFyle.loc[resultFyle['CCode'] ==225]["StateAbb"])[0]
#     if data["features"][ind]["properties"]["A3"]=="ESP":
#         data["features"][ind]["properties"]["A3"]= list(resultFyle.loc[resultFyle['CCode'] ==230]["StateAbb"])[0]
#     if data["features"][ind]["properties"]["A3"]=="AND":
#         data["features"][ind]["properties"]["A3"]= list(resultFyle.loc[resultFyle['CCode'] ==232]["StateAbb"])[0]
#     if data["features"][ind]["properties"]["A3"]=="PRT":
#         data["features"][ind]["properties"]["A3"]= list(resultFyle.loc[resultFyle['CCode'] ==235]["StateAbb"])[0]
#     if data["features"][ind]["properties"]["A3"]=="DEU":
#         data["features"][ind]["properties"]["A3"]= list(resultFyle.loc[resultFyle['CCode'] ==255]["StateAbb"])[0]
#     if data["features"][ind]["properties"]["A3"]=="":
#         data["features"][ind]["properties"]["A3"]= list(resultFyle.loc[resultFyle['CCode'] ==260]["StateAbb"])[0]
#     if data["features"][ind]["properties"]["A3"]=="":
#         data["features"][ind]["properties"]["A3"]= list(resultFyle.loc[resultFyle['CCode'] ==265]["StateAbb"])[0]
#     if data["features"][ind]["properties"]["A3"]=="POL":
#         data["features"][ind]["properties"]["A3"]= list(resultFyle.loc[resultFyle['CCode'] ==290]["StateAbb"])[0]
#     if data["features"][ind]["properties"]["A3"]=="AUT":
#         data["features"][ind]["properties"]["A3"]= list(resultFyle.loc[resultFyle['CCode'] ==305]["StateAbb"])[0]
#     if data["features"][ind]["properties"]["A3"]=="HUN":
#         data["features"][ind]["properties"]["A3"]= list(resultFyle.loc[resultFyle['CCode'] ==310]["StateAbb"])[0]
#     if data["features"][ind]["properties"]["A3"]=="":
#         data["features"][ind]["properties"]["A3"]= list(resultFyle.loc[resultFyle['CCode'] ==315]["StateAbb"])[0]
#     if data["features"][ind]["properties"]["A3"]=="CZE":
#         data["features"][ind]["properties"]["A3"]= list(resultFyle.loc[resultFyle['CCode'] ==316]["StateAbb"])[0]
#     if data["features"][ind]["properties"]["A3"]=="SVK":
#         data["features"][ind]["properties"]["A3"]= list(resultFyle.loc[resultFyle['CCode'] ==317]["StateAbb"])[0]
#     if data["features"][ind]["properties"]["A3"]=="ITA":
#         data["features"][ind]["properties"]["A3"]= list(resultFyle.loc[resultFyle['CCode'] ==325]["StateAbb"])[0]
#     if data["features"][ind]["properties"]["A3"]=="SMR":
#         data["features"][ind]["properties"]["A3"]= list(resultFyle.loc[resultFyle['CCode'] ==331]["StateAbb"])[0]
#     if data["features"][ind]["properties"]["A3"]=="MLT":
#         data["features"][ind]["properties"]["A3"]= list(resultFyle.loc[resultFyle['CCode'] ==338]["StateAbb"])[0]
#     if data["features"][ind]["properties"]["A3"]=="ALB":
#         data["features"][ind]["properties"]["A3"]= list(resultFyle.loc[resultFyle['CCode'] ==339]["StateAbb"])[0]
#     if data["features"][ind]["properties"]["A3"]=="MKD":
#         data["features"][ind]["properties"]["A3"]= list(resultFyle.loc[resultFyle['CCode'] ==343]["StateAbb"])[0]
#     if data["features"][ind]["properties"]["A3"]=="HRV":
#         data["features"][ind]["properties"]["A3"]= list(resultFyle.loc[resultFyle['CCode'] ==344]["StateAbb"])[0]
#     if data["features"][ind]["properties"]["A3"]=="YUG":
#         data["features"][ind]["properties"]["A3"]= list(resultFyle.loc[resultFyle['CCode'] ==345]["StateAbb"])[0]
#     if data["features"][ind]["properties"]["A3"]=="BIH":
#         data["features"][ind]["properties"]["A3"]= list(resultFyle.loc[resultFyle['CCode'] ==346]["StateAbb"])[0]
#     if data["features"][ind]["properties"]["A3"]=="SVN":
#         data["features"][ind]["properties"]["A3"]= list(resultFyle.loc[resultFyle['CCode'] ==349]["StateAbb"])[0]
#     if data["features"][ind]["properties"]["A3"]=="GRC":
#         data["features"][ind]["properties"]["A3"]= list(resultFyle.loc[resultFyle['CCode'] ==350]["StateAbb"])[0]
#     if data["features"][ind]["properties"]["A3"]=="CYP":
#         data["features"][ind]["properties"]["A3"]= list(resultFyle.loc[resultFyle['CCode'] ==352]["StateAbb"])[0]
#     if data["features"][ind]["properties"]["A3"]=="BGR":
#         data["features"][ind]["properties"]["A3"]= list(resultFyle.loc[resultFyle['CCode'] ==355]["StateAbb"])[0]
#     if data["features"][ind]["properties"]["A3"]=="MDA":
#         data["features"][ind]["properties"]["A3"]= list(resultFyle.loc[resultFyle['CCode'] ==359]["StateAbb"])[0]
#     if data["features"][ind]["properties"]["A3"]=="ROU":
#         data["features"][ind]["properties"]["A3"]= list(resultFyle.loc[resultFyle['CCode'] ==360]["StateAbb"])[0]
#     if data["features"][ind]["properties"]["A3"]=="RUS":
#         data["features"][ind]["properties"]["A3"]= list(resultFyle.loc[resultFyle['CCode'] ==365]["StateAbb"])[0]
#     if data["features"][ind]["properties"]["A3"]=="EST":
#         data["features"][ind]["properties"]["A3"]= list(resultFyle.loc[resultFyle['CCode'] ==366]["StateAbb"])[0]
#     if data["features"][ind]["properties"]["A3"]=="LVA":
#         data["features"][ind]["properties"]["A3"]= list(resultFyle.loc[resultFyle['CCode'] ==367 ]["StateAbb"])[0]
#     if data["features"][ind]["properties"]["A3"]=="LTU":
#         data["features"][ind]["properties"]["A3"]= list(resultFyle.loc[resultFyle['CCode'] ==368]["StateAbb"])[0]
#     if data["features"][ind]["properties"]["A3"]=="UKR":
#         data["features"][ind]["properties"]["A3"]= list(resultFyle.loc[resultFyle['CCode'] ==369]["StateAbb"])[0]
#     if data["features"][ind]["properties"]["A3"]=="BLR":
#         data["features"][ind]["properties"]["A3"]= list(resultFyle.loc[resultFyle['CCode'] ==370]["StateAbb"])[0]
#     if data["features"][ind]["properties"]["A3"]=="ARM":
#         data["features"][ind]["properties"]["A3"]= list(resultFyle.loc[resultFyle['CCode'] ==371]["StateAbb"])[0]
#     if data["features"][ind]["properties"]["A3"]=="GEO":
#         data["features"][ind]["properties"]["A3"]= list(resultFyle.loc[resultFyle['CCode'] ==372]["StateAbb"])[0]
#     if data["features"][ind]["properties"]["A3"]=="AZE":
#         data["features"][ind]["properties"]["A3"]= list(resultFyle.loc[resultFyle['CCode'] ==373]["StateAbb"])[0]
#     if data["features"][ind]["properties"]["A3"]=="FIN":
#         data["features"][ind]["properties"]["A3"]= list(resultFyle.loc[resultFyle['CCode'] ==375]["StateAbb"])[0]
#     if data["features"][ind]["properties"]["A3"]=="SWE":
#         data["features"][ind]["properties"]["A3"]= list(resultFyle.loc[resultFyle['CCode'] ==380]["StateAbb"])[0]
#     if data["features"][ind]["properties"]["A3"]=="NOR":
#         data["features"][ind]["properties"]["A3"]= list(resultFyle.loc[resultFyle['CCode'] ==385]["StateAbb"])[0]
#     if data["features"][ind]["properties"]["A3"]=="DNK":
#         data["features"][ind]["properties"]["A3"]= list(resultFyle.loc[resultFyle['CCode'] ==390]["StateAbb"])[0]
#     if data["features"][ind]["properties"]["A3"]=="ISL":
#         data["features"][ind]["properties"]["A3"]= list(resultFyle.loc[resultFyle['CCode'] ==395]["StateAbb"])[0]
#     if data["features"][ind]["properties"]["A3"]=="CPV":
#         data["features"][ind]["properties"]["A3"]= list(resultFyle.loc[resultFyle['CCode'] ==344]["StateAbb"])[0]
#     if data["features"][ind]["properties"]["A3"]=="STP":
#         data["features"][ind]["properties"]["A3"]= list(resultFyle.loc[resultFyle['CCode'] ==403 ]["StateAbb"])[0]
#     if data["features"][ind]["properties"]["A3"]=="GNB":
#         data["features"][ind]["properties"]["A3"]= list(resultFyle.loc[resultFyle['CCode'] ==404]["StateAbb"])[0]
#     if data["features"][ind]["properties"]["A3"]=="GNQ":
#         data["features"][ind]["properties"]["A3"]= list(resultFyle.loc[resultFyle['CCode'] ==411]["StateAbb"])[0]
#     if data["features"][ind]["properties"]["A3"]=="GMB":
#         data["features"][ind]["properties"]["A3"]= list(resultFyle.loc[resultFyle['CCode'] ==420]["StateAbb"])[0]
#     if data["features"][ind]["properties"]["A3"]=="MLI":
#         data["features"][ind]["properties"]["A3"]= list(resultFyle.loc[resultFyle['CCode'] ==432]["StateAbb"])[0]
#     if data["features"][ind]["properties"]["A3"]=="SEN":
#         data["features"][ind]["properties"]["A3"]= list(resultFyle.loc[resultFyle['CCode'] ==433]["StateAbb"])[0]
#     if data["features"][ind]["properties"]["A3"]=="BEN":
#         data["features"][ind]["properties"]["A3"]= list(resultFyle.loc[resultFyle['CCode'] ==434]["StateAbb"])[0]
#     if data["features"][ind]["properties"]["A3"]=="MRT":
#         data["features"][ind]["properties"]["A3"]= list(resultFyle.loc[resultFyle['CCode'] ==435]["StateAbb"])[0]
#     if data["features"][ind]["properties"]["A3"]=="NER":
#         data["features"][ind]["properties"]["A3"]= list(resultFyle.loc[resultFyle['CCode'] ==436]["StateAbb"])[0]
#     if data["features"][ind]["properties"]["A3"]=="CIV":
#         data["features"][ind]["properties"]["A3"]= list(resultFyle.loc[resultFyle['CCode'] ==437]["StateAbb"])[0]
#     if data["features"][ind]["properties"]["A3"]=="GIN":
#         data["features"][ind]["properties"]["A3"]= list(resultFyle.loc[resultFyle['CCode'] ==438]["StateAbb"])[0]
#     if data["features"][ind]["properties"]["A3"]=="BFA":
#         data["features"][ind]["properties"]["A3"]= list(resultFyle.loc[resultFyle['CCode'] == 439]["StateAbb"])[0]
#     if data["features"][ind]["properties"]["A3"]=="LBR":
#         data["features"][ind]["properties"]["A3"]= list(resultFyle.loc[resultFyle['CCode'] ==450]["StateAbb"])[0]
#     if data["features"][ind]["properties"]["A3"]=="SLE":
#         data["features"][ind]["properties"]["A3"]= list(resultFyle.loc[resultFyle['CCode'] ==451]["StateAbb"])[0]
#     if data["features"][ind]["properties"]["A3"]=="GHA":
#         data["features"][ind]["properties"]["A3"]= list(resultFyle.loc[resultFyle['CCode'] ==452]["StateAbb"])[0]
#     if data["features"][ind]["properties"]["A3"]=="TGO":
#         data["features"][ind]["properties"]["A3"]= list(resultFyle.loc[resultFyle['CCode'] ==461]["StateAbb"])[0]
#     if data["features"][ind]["properties"]["A3"]=="CMR":
#         data["features"][ind]["properties"]["A3"]= list(resultFyle.loc[resultFyle['CCode'] ==471]["StateAbb"])[0]
#     if data["features"][ind]["properties"]["A3"]=="NGA":
#         data["features"][ind]["properties"]["A3"]= list(resultFyle.loc[resultFyle['CCode'] ==475]["StateAbb"])[0]
#     if data["features"][ind]["properties"]["A3"]=="GAB":
#         data["features"][ind]["properties"]["A3"]= list(resultFyle.loc[resultFyle['CCode'] == 481]["StateAbb"])[0]
#     if data["features"][ind]["properties"]["A3"]=="CAF":
#         data["features"][ind]["properties"]["A3"]= list(resultFyle.loc[resultFyle['CCode'] ==482]["StateAbb"])[0]
#     if data["features"][ind]["properties"]["A3"]=="TCD":
#         data["features"][ind]["properties"]["A3"]= list(resultFyle.loc[resultFyle['CCode'] ==483]["StateAbb"])[0]
#     if data["features"][ind]["properties"]["A3"]=="COG":
#         data["features"][ind]["properties"]["A3"]= list(resultFyle.loc[resultFyle['CCode'] ==484]["StateAbb"])[0]
#     if data["features"][ind]["properties"]["A3"]=="COD":
#         data["features"][ind]["properties"]["A3"]= list(resultFyle.loc[resultFyle['CCode'] ==490]["StateAbb"])[0]
#     if data["features"][ind]["properties"]["A3"]=="UGA":
#         data["features"][ind]["properties"]["A3"]= list(resultFyle.loc[resultFyle['CCode'] ==500]["StateAbb"])[0]
#     if data["features"][ind]["properties"]["A3"]=="KEN":
#         data["features"][ind]["properties"]["A3"]= list(resultFyle.loc[resultFyle['CCode'] ==501]["StateAbb"])[0]
#     if data["features"][ind]["properties"]["A3"]=="TZA":
#         data["features"][ind]["properties"]["A3"]= list(resultFyle.loc[resultFyle['CCode'] ==510]["StateAbb"])[0]
#     if data["features"][ind]["properties"]["A3"]=="":
#         data["features"][ind]["properties"]["A3"]= list(resultFyle.loc[resultFyle['CCode'] ==511]["StateAbb"])[0]
#     if data["features"][ind]["properties"]["A3"]=="BDI":
#         data["features"][ind]["properties"]["A3"]= list(resultFyle.loc[resultFyle['CCode'] ==516]["StateAbb"])[0]
#     if data["features"][ind]["properties"]["A3"]=="RWA":
#         data["features"][ind]["properties"]["A3"]= list(resultFyle.loc[resultFyle['CCode'] ==517]["StateAbb"])[0]
#     if data["features"][ind]["properties"]["A3"]=="SOM":
#         data["features"][ind]["properties"]["A3"]= list(resultFyle.loc[resultFyle['CCode'] ==520]["StateAbb"])[0]
#     if data["features"][ind]["properties"]["A3"]=="DJI":
#         data["features"][ind]["properties"]["A3"]= list(resultFyle.loc[resultFyle['CCode'] ==522]["StateAbb"])[0]
#     if data["features"][ind]["properties"]["A3"]=="ETH":
#         data["features"][ind]["properties"]["A3"]= list(resultFyle.loc[resultFyle['CCode'] ==530]["StateAbb"])[0]
#     if data["features"][ind]["properties"]["A3"]=="ERI":
#         data["features"][ind]["properties"]["A3"]= list(resultFyle.loc[resultFyle['CCode'] ==531]["StateAbb"])[0]
#     if data["features"][ind]["properties"]["A3"]=="AGO":
#         data["features"][ind]["properties"]["A3"]= list(resultFyle.loc[resultFyle['CCode'] ==540]["StateAbb"])[0]
#     if data["features"][ind]["properties"]["A3"]=="MOZ":
#         data["features"][ind]["properties"]["A3"]= list(resultFyle.loc[resultFyle['CCode'] ==541]["StateAbb"])[0]
#     if data["features"][ind]["properties"]["A3"]=="ZMB":
#         data["features"][ind]["properties"]["A3"]= list(resultFyle.loc[resultFyle['CCode'] ==551]["StateAbb"])[0]
#     if data["features"][ind]["properties"]["A3"]=="ZWE":
#         data["features"][ind]["properties"]["A3"]= list(resultFyle.loc[resultFyle['CCode'] ==552]["StateAbb"])[0]
#     if data["features"][ind]["properties"]["A3"]=="MWI":
#         data["features"][ind]["properties"]["A3"]= list(resultFyle.loc[resultFyle['CCode'] ==553]["StateAbb"])[0]
#     if data["features"][ind]["properties"]["A3"]=="ZAF":
#         data["features"][ind]["properties"]["A3"]= list(resultFyle.loc[resultFyle['CCode'] ==560]["StateAbb"])[0]
#     if data["features"][ind]["properties"]["A3"]=="NAM":
#         data["features"][ind]["properties"]["A3"]= list(resultFyle.loc[resultFyle['CCode'] ==565]["StateAbb"])[0]
#     if data["features"][ind]["properties"]["A3"]=="LSO":
#         data["features"][ind]["properties"]["A3"]= list(resultFyle.loc[resultFyle['CCode'] ==570]["StateAbb"])[0]
#     if data["features"][ind]["properties"]["A3"]=="BWA":
#         data["features"][ind]["properties"]["A3"]= list(resultFyle.loc[resultFyle['CCode'] ==571]["StateAbb"])[0]
#     if data["features"][ind]["properties"]["A3"]=="SWZ":
#         data["features"][ind]["properties"]["A3"]= list(resultFyle.loc[resultFyle['CCode'] ==572]["StateAbb"])[0]
#     if data["features"][ind]["properties"]["A3"]=="MDG":
#         data["features"][ind]["properties"]["A3"]= list(resultFyle.loc[resultFyle['CCode'] ==580]["StateAbb"])[0]
#     if data["features"][ind]["properties"]["A3"]=="COM":
#         data["features"][ind]["properties"]["A3"]= list(resultFyle.loc[resultFyle['CCode'] ==581]["StateAbb"])[0]
#     if data["features"][ind]["properties"]["A3"]=="MUS":
#         data["features"][ind]["properties"]["A3"]= list(resultFyle.loc[resultFyle['CCode'] ==590]["StateAbb"])[0]
#     if data["features"][ind]["properties"]["A3"]=="SYC":
#         data["features"][ind]["properties"]["A3"]= list(resultFyle.loc[resultFyle['CCode'] ==591]["StateAbb"])[0]
#     if data["features"][ind]["properties"]["A3"]=="MAR":
#         data["features"][ind]["properties"]["A3"]= list(resultFyle.loc[resultFyle['CCode'] ==600]["StateAbb"])[0]
#     if data["features"][ind]["properties"]["A3"]=="DZA":
#         data["features"][ind]["properties"]["A3"]= list(resultFyle.loc[resultFyle['CCode'] == 615]["StateAbb"])[0]
#     if data["features"][ind]["properties"]["A3"]=="TUN":
#         data["features"][ind]["properties"]["A3"]= list(resultFyle.loc[resultFyle['CCode'] ==616]["StateAbb"])[0]
#     if data["features"][ind]["properties"]["A3"]=="LBY":
#         data["features"][ind]["properties"]["A3"]= list(resultFyle.loc[resultFyle['CCode'] ==620]["StateAbb"])[0]
#     if data["features"][ind]["properties"]["A3"]=="SDN":
#         data["features"][ind]["properties"]["A3"]= list(resultFyle.loc[resultFyle['CCode'] ==625]["StateAbb"])[0]
#     if data["features"][ind]["properties"]["A3"]=="IRN":
#         data["features"][ind]["properties"]["A3"]= list(resultFyle.loc[resultFyle['CCode'] ==630]["StateAbb"])[0]
#     if data["features"][ind]["properties"]["A3"]=="TUR":
#         data["features"][ind]["properties"]["A3"]= list(resultFyle.loc[resultFyle['CCode'] ==640]["StateAbb"])[0]
#     if data["features"][ind]["properties"]["A3"]=="IRQ":
#         data["features"][ind]["properties"]["A3"]= list(resultFyle.loc[resultFyle['CCode'] ==645]["StateAbb"])[0]
#     if data["features"][ind]["properties"]["A3"]=="EGY":
#         data["features"][ind]["properties"]["A3"]= list(resultFyle.loc[resultFyle['CCode'] ==651]["StateAbb"])[0]
#     if data["features"][ind]["properties"]["A3"]=="SYR":
#         data["features"][ind]["properties"]["A3"]= list(resultFyle.loc[resultFyle['CCode'] ==652 ]["StateAbb"])[0]
#     if data["features"][ind]["properties"]["A3"]=="LBN":
#         data["features"][ind]["properties"]["A3"]= list(resultFyle.loc[resultFyle['CCode'] ==660]["StateAbb"])[0]
#     if data["features"][ind]["properties"]["A3"]=="JOR":
#         data["features"][ind]["properties"]["A3"]= list(resultFyle.loc[resultFyle['CCode'] ==663]["StateAbb"])[0]
#     if data["features"][ind]["properties"]["A3"]=="ISR":
#         data["features"][ind]["properties"]["A3"]= list(resultFyle.loc[resultFyle['CCode'] ==666 ]["StateAbb"])[0]
#     if data["features"][ind]["properties"]["A3"]=="SAU":
#         data["features"][ind]["properties"]["A3"]= list(resultFyle.loc[resultFyle['CCode'] ==670]["StateAbb"])[0]
#     if data["features"][ind]["properties"]["A3"]=="":
#         data["features"][ind]["properties"]["A3"]= list(resultFyle.loc[resultFyle['CCode'] ==678]["StateAbb"])[0]
#     if data["features"][ind]["properties"]["A3"]=="YEM":
#         data["features"][ind]["properties"]["A3"]= list(resultFyle.loc[resultFyle['CCode'] ==679]["StateAbb"])[0]
#     if data["features"][ind]["properties"]["A3"]=="":
#         data["features"][ind]["properties"]["A3"]= list(resultFyle.loc[resultFyle['CCode'] ==680]["StateAbb"])[0]
#     if data["features"][ind]["properties"]["A3"]=="KWT":
#         data["features"][ind]["properties"]["A3"]= list(resultFyle.loc[resultFyle['CCode'] ==690]["StateAbb"])[0]
#     if data["features"][ind]["properties"]["A3"]=="BHR":
#         data["features"][ind]["properties"]["A3"]= list(resultFyle.loc[resultFyle['CCode'] ==692]["StateAbb"])[0]
#     if data["features"][ind]["properties"]["A3"]=="QAT":
#         data["features"][ind]["properties"]["A3"]= list(resultFyle.loc[resultFyle['CCode'] == 694]["StateAbb"])[0]
#     if data["features"][ind]["properties"]["A3"]=="ARE":
#         data["features"][ind]["properties"]["A3"]= list(resultFyle.loc[resultFyle['CCode'] ==696]["StateAbb"])[0]
#     if data["features"][ind]["properties"]["A3"]=="OMN":
#         data["features"][ind]["properties"]["A3"]= list(resultFyle.loc[resultFyle['CCode'] ==698 ]["StateAbb"])[0]
#     if data["features"][ind]["properties"]["A3"]=="AFG":
#         data["features"][ind]["properties"]["A3"]= list(resultFyle.loc[resultFyle['CCode'] ==700]["StateAbb"])[0]
#     if data["features"][ind]["properties"]["A3"]=="TKM":
#         data["features"][ind]["properties"]["A3"]= list(resultFyle.loc[resultFyle['CCode'] ==701]["StateAbb"])[0]
#     if data["features"][ind]["properties"]["A3"]=="TJK":
#         data["features"][ind]["properties"]["A3"]= list(resultFyle.loc[resultFyle['CCode'] ==702]["StateAbb"])[0]
#     if data["features"][ind]["properties"]["A3"]=="KGZ":
#         data["features"][ind]["properties"]["A3"]= list(resultFyle.loc[resultFyle['CCode'] ==703]["StateAbb"])[0]
#     if data["features"][ind]["properties"]["A3"]=="UZB":
#         data["features"][ind]["properties"]["A3"]= list(resultFyle.loc[resultFyle['CCode'] ==704]["StateAbb"])[0]
#     if data["features"][ind]["properties"]["A3"]=="KAZ":
#         data["features"][ind]["properties"]["A3"]= list(resultFyle.loc[resultFyle['CCode'] ==705]["StateAbb"])[0]
#     if data["features"][ind]["properties"]["A3"]=="CHN":
#         data["features"][ind]["properties"]["A3"]= list(resultFyle.loc[resultFyle['CCode'] ==710]["StateAbb"])[0]
#     if data["features"][ind]["properties"]["A3"]=="MNG":
#         data["features"][ind]["properties"]["A3"]= list(resultFyle.loc[resultFyle['CCode'] ==712]["StateAbb"])[0]
#     if data["features"][ind]["properties"]["A3"]=="TWN":
#         data["features"][ind]["properties"]["A3"]= list(resultFyle.loc[resultFyle['CCode'] ==713]["StateAbb"])[0]
#     if data["features"][ind]["properties"]["A3"]=="":
#         data["features"][ind]["properties"]["A3"]= list(resultFyle.loc[resultFyle['CCode'] ==730]["StateAbb"])[0]
#     if data["features"][ind]["properties"]["A3"]=="PRK":
#         data["features"][ind]["properties"]["A3"]= list(resultFyle.loc[resultFyle['CCode'] == 731]["StateAbb"])[0]
#     if data["features"][ind]["properties"]["A3"]=="KOR":
#         data["features"][ind]["properties"]["A3"]= list(resultFyle.loc[resultFyle['CCode'] ==732]["StateAbb"])[0]
#     if data["features"][ind]["properties"]["A3"]=="JPN":
#         data["features"][ind]["properties"]["A3"]= list(resultFyle.loc[resultFyle['CCode'] ==740]["StateAbb"])[0]
#     if data["features"][ind]["properties"]["A3"]=="IND":
#         data["features"][ind]["properties"]["A3"]= list(resultFyle.loc[resultFyle['CCode'] ==750]["StateAbb"])[0]
#     if data["features"][ind]["properties"]["A3"]=="BTN":
#         data["features"][ind]["properties"]["A3"]= list(resultFyle.loc[resultFyle['CCode'] ==760]["StateAbb"])[0]
#     if data["features"][ind]["properties"]["A3"]=="PAK":
#         data["features"][ind]["properties"]["A3"]= list(resultFyle.loc[resultFyle['CCode'] ==770]["StateAbb"])[0]
#     if data["features"][ind]["properties"]["A3"]=="BGD":
#         data["features"][ind]["properties"]["A3"]= list(resultFyle.loc[resultFyle['CCode'] ==771 ]["StateAbb"])[0]
#     if data["features"][ind]["properties"]["A3"]=="MMR":
#         data["features"][ind]["properties"]["A3"]= list(resultFyle.loc[resultFyle['CCode'] ==775]["StateAbb"])[0]
#     if data["features"][ind]["properties"]["A3"]=="LKA":
#         data["features"][ind]["properties"]["A3"]= list(resultFyle.loc[resultFyle['CCode'] ==780]["StateAbb"])[0]
#     if data["features"][ind]["properties"]["A3"]=="MDV":
#         data["features"][ind]["properties"]["A3"]= list(resultFyle.loc[resultFyle['CCode'] ==781]["StateAbb"])[0]
#     if data["features"][ind]["properties"]["A3"]=="NPL":
#         data["features"][ind]["properties"]["A3"]= list(resultFyle.loc[resultFyle['CCode'] ==790]["StateAbb"])[0]
#     if data["features"][ind]["properties"]["A3"]=="THA":
#         data["features"][ind]["properties"]["A3"]= list(resultFyle.loc[resultFyle['CCode'] ==800]["StateAbb"])[0]
#     if data["features"][ind]["properties"]["A3"]=="KHM":
#         data["features"][ind]["properties"]["A3"]= list(resultFyle.loc[resultFyle['CCode'] ==811]["StateAbb"])[0]
#     if data["features"][ind]["properties"]["A3"]=="LAO":
#         data["features"][ind]["properties"]["A3"]= list(resultFyle.loc[resultFyle['CCode'] ==812 ]["StateAbb"])[0]
#     if data["features"][ind]["properties"]["A3"]=="VNM":
#         data["features"][ind]["properties"]["A3"]= list(resultFyle.loc[resultFyle['CCode'] ==816]["StateAbb"])[0]
#     if data["features"][ind]["properties"]["A3"]=="":
#         data["features"][ind]["properties"]["A3"]= list(resultFyle.loc[resultFyle['CCode'] ==817]["StateAbb"])[0]
#     if data["features"][ind]["properties"]["A3"]=="MYS":
#         data["features"][ind]["properties"]["A3"]= list(resultFyle.loc[resultFyle['CCode'] ==820]["StateAbb"])[0]
#     if data["features"][ind]["properties"]["A3"]=="SGP":
#         data["features"][ind]["properties"]["A3"]= list(resultFyle.loc[resultFyle['CCode'] ==830 ]["StateAbb"])[0]
#     if data["features"][ind]["properties"]["A3"]=="BRN":
#         data["features"][ind]["properties"]["A3"]= list(resultFyle.loc[resultFyle['CCode'] ==835]["StateAbb"])[0]
#     if data["features"][ind]["properties"]["A3"]=="PHL":
#         data["features"][ind]["properties"]["A3"]= list(resultFyle.loc[resultFyle['CCode'] ==840]["StateAbb"])[0]
#     if data["features"][ind]["properties"]["A3"]=="IDN":
#         data["features"][ind]["properties"]["A3"]= list(resultFyle.loc[resultFyle['CCode'] ==850]["StateAbb"])[0]
#     if data["features"][ind]["properties"]["A3"]=="TLS":
#         data["features"][ind]["properties"]["A3"]= list(resultFyle.loc[resultFyle['CCode'] ==860]["StateAbb"])[0]
#     if data["features"][ind]["properties"]["A3"]=="AUS":
#         data["features"][ind]["properties"]["A3"]= list(resultFyle.loc[resultFyle['CCode'] ==900]["StateAbb"])[0]
#     if data["features"][ind]["properties"]["A3"]=="PNG":
#         data["features"][ind]["properties"]["A3"]= list(resultFyle.loc[resultFyle['CCode'] ==910]["StateAbb"])[0]
#     if data["features"][ind]["properties"]["A3"]=="NZL":
#         data["features"][ind]["properties"]["A3"]= list(resultFyle.loc[resultFyle['CCode'] ==920]["StateAbb"])[0]
#     if data["features"][ind]["properties"]["A3"]=="VUT":
#         data["features"][ind]["properties"]["A3"]= list(resultFyle.loc[resultFyle['CCode'] ==935]["StateAbb"])[0]
#     if data["features"][ind]["properties"]["A3"]=="SLB":
#         data["features"][ind]["properties"]["A3"]= list(resultFyle.loc[resultFyle['CCode'] ==940]["StateAbb"])[0]
#     if data["features"][ind]["properties"]["A3"]=="KIR":
#         data["features"][ind]["properties"]["A3"]= list(resultFyle.loc[resultFyle['CCode'] ==946]["StateAbb"])[0]
#     if data["features"][ind]["properties"]["A3"]=="TUV":
#         data["features"][ind]["properties"]["A3"]= list(resultFyle.loc[resultFyle['CCode'] ==947]["StateAbb"])[0]
#     if data["features"][ind]["properties"]["A3"]=="FJI":
#         data["features"][ind]["properties"]["A3"]= list(resultFyle.loc[resultFyle['CCode'] ==950]["StateAbb"])[0]
#     if data["features"][ind]["properties"]["A3"]=="TON":
#         data["features"][ind]["properties"]["A3"]= list(resultFyle.loc[resultFyle['CCode'] ==955]["StateAbb"])[0]
#     if data["features"][ind]["properties"]["A3"]=="NRU":
#         data["features"][ind]["properties"]["A3"]= list(resultFyle.loc[resultFyle['CCode'] ==970]["StateAbb"])[0]
#     if data["features"][ind]["properties"]["A3"]=="MHL":
#         data["features"][ind]["properties"]["A3"]= list(resultFyle.loc[resultFyle['CCode'] ==983]["StateAbb"])[0]
#     if data["features"][ind]["properties"]["A3"]=="PLW":
#         data["features"][ind]["properties"]["A3"]= list(resultFyle.loc[resultFyle['CCode'] ==986]["StateAbb"])[0]
#     if data["features"][ind]["properties"]["A3"]=="FSM":
#         data["features"][ind]["properties"]["A3"]= list(resultFyle.loc[resultFyle['CCode'] ==987]["StateAbb"])[0]
#     if data["features"][ind]["properties"]["A3"]=="WSM":
#         data["features"][ind]["properties"]["A3"]= list(resultFyle.loc[resultFyle['CCode'] ==990]["StateAbb"])[0]
# 
# 
# 
#     
# from geojson import Point, Feature, FeatureCollection, dump
# 
# features = []
# 
# for ind in range(len(data["features"])):
# 
#     features.append(data["features"][ind])
# 
# feature_collection = FeatureCollection(features)
# with open('map_COW.geojson', 'w') as f:
#     dump(feature_collection, f)













#Combine GDP data with cow country code(not used for 554 project)
# cLatiLong = pd.read_csv('COW country codes_lati_long.csv')
# 
# 
# gdpData = pd.read_csv('horizontal-file_02-2010_GDP_CSV.csv');
# 
# i=0
# for coun in list(gdpData['country']): 
# 
#     print(coun)
#     searc=cLatiLong.loc[cLatiLong['StateNme'] == coun.rstrip()]
#     ccode=list(set(searc.loc[1:]["CCode"]))
#     if ccode==[]:
#         gdpData.iat[i,1]=0
#         i=i+1
#     if ccode!=[]:
#         gdpData.iat[i,1]=ccode[0]
#         i=i+1    
# 
# fileName='horizontal-file_02-2010_GDP_CSV_withCCode.csv'
# gdpData.to_csv('{}'.format(fileName), sep=',',index=False) 









#Aanalysis1 part
# warData = pd.read_csv("directed_dyadic_war_lati_long_stateName_allYear.csv")
# warYearList=set(list(warData.warstrtyr))
# testY=warYearList.pop()
# if (testY==0):
#     testY=warYearList.pop()
#      
# tradeData = pd.read_csv("Dyadic_COW_4.0.csv")
#  
# tradeAmountByEachCountry= pd.read_csv("National_COW_4.0.csv")
#  
# i = tradeData[(tradeData.flow2 == -9)].index
# tradeDataEX=tradeData.drop(i)
#  
# tradeCriteria=tradeDataEX.groupby("year")["smoothtotrade"].mean()
# # tradeCriteriaList=len(list(tradeCriteria))
# tradeYearList=set(list(tradeData.year))
# tradeYearListY=tradeYearList.pop()
# if (tradeYearListY==0):
#     tradeYearListY=tradeYearList.pop()
# # tradeCriteriaList=len(list(tradeCriteria))
# tradeCriteriaList=list(tradeCriteria)
#  
# countWarandNoTrade=0
#  
# total=0
# smcountWarandTrade=0
# bcountWarandTrade=0
# sbcountWarandTrade=0
#  
# # lastYear=-3
# lastYear=1
# countWarandTrade=0
#  
# diffList=[]
#  
# inter="smoothtotrade"
#  
# tradeOriData= pd.DataFrame(columns=['year', 'stateA', 'stateB','totalStateA','totalStateB','totalsmoth','importance']);
# # [rowSLR["year"], listCout[0], listCout[1], rowSLR["smoothtotrade"]]
#  
#  
# ite=0
#  
# for i, row in warData.iterrows():
#      
#     listCout=[row.statea, row.stateb]
#     listCout.sort()
#      
#     warStartYear=row.warstrtyr
#     if warStartYear >= tradeYearListY:#only check this cases.
#         tradeBeforeWar=tradeData.loc[tradeData['year'] <= warStartYear ]
#          
#         ai = tradeBeforeWar[(tradeBeforeWar.flow1 == -9)].index
#         tradeBeforeWar=tradeBeforeWar.drop(ai)
#         ai = tradeBeforeWar[(tradeBeforeWar.flow2 == -9)].index
#         tradeBeforeWar=tradeBeforeWar.drop(ai)
#          
#         if tradeBeforeWar.shape[0]==0:# If there is no 
#             countWarandNoTrade=countWarandNoTrade+1
#          
#         if tradeBeforeWar.shape[0]!=0:
#  
#              
#              
#              
#             seleRow=tradeBeforeWar[((tradeBeforeWar['ccode1'] == row.statea) & (tradeBeforeWar['ccode2']==row.stateb)) | (tradeBeforeWar['ccode1'] == row.stateb) & (tradeBeforeWar['ccode2']==row.statea)]
# #             print()
# #             i = seleRow[(seleRow.flow2 == -9)].index
# #             seleRow=seleRow.drop(i)
#             if seleRow.shape[0]!=0:
# #                 print(seleRow.shape[0])
#                  
#                 i = seleRow[(seleRow.flow2 == -9)].index
#                 seleRow=seleRow.drop(i)
#  
#                 if seleRow.shape[0]!=0:
#                     lastSomeYearseleRow=seleRow.tail(lastYear)
#                      
#                      
#                     lastSomeYearMean=lastSomeYearseleRow["smoothtotrade"].mean()
#                     print(lastSomeYearMean)
#                      
#                     for lth in lastSomeYearseleRow['year']:
#                          
#                         averTradeByYear=tradeCriteriaList[lth-1-1870]
#                      
#                     #Calculating importance of the corresponding trade relation for each country
#                     countryAInf=tradeAmountByEachCountry.loc[(tradeAmountByEachCountry['ccode']==listCout[0]) & (tradeAmountByEachCountry['year']==lth)] 
#                     countryBInf=tradeAmountByEachCountry.loc[(tradeAmountByEachCountry['ccode']==listCout[1]) & (tradeAmountByEachCountry['year']==lth)]        
#                      
#                     totalA=countryAInf["imports"]+countryAInf["exports"]
#                     totalB=countryBInf["imports"]+countryBInf["exports"]
#                     totalAB=[float(totalA),float(totalB)]
# #                     importance=lastSomeYearMean/min(totalAB)
#                     importance=lastSomeYearMean/max(totalAB)
#                      
# #                     importanceForA=lastSomeYearMean/float(totalA)*200
# #                     importanceForB=lastSomeYearMean/float(totalB)*200
#                      
#                      
#                     importanceForA=lastSomeYearMean/float(totalA)
#                     importanceForB=lastSomeYearMean/float(totalB)
#                      
#                      
# #                     importanceForA=float(totalA)
# #                     importanceForB=float(totalB)
#                      
#                      
#                     importanceDIffbetAandB=abs(importanceForA-importanceForB)
# #                     print(importanceDIffbetAandB)
#                     diffList.append(importanceDIffbetAandB)
#                      
#                     for isR, rowSLR in lastSomeYearseleRow.iterrows():
#                            if rowSLR["flow1"]==-9.0:
#                                temp = [rowSLR["year"], listCout[0], listCout[1], float(totalA),float(totalB),lastSomeYearMean]
#                                tradeOriData.loc[ite]=temp
#                                ite=ite+1
#                                countWarandNoTrade=countWarandNoTrade+1
#                                 
#                                 
#                            if rowSLR["flow1"]!=-9.0:
#                                total=total+1
#                                 
#  
#                                if importance<0.1:
#  
#                                    temp = [rowSLR["year"], listCout[0], listCout[1], float(totalA),float(totalB),lastSomeYearMean,importance]
#                                     
#                                    if tradeOriData.shape[0]!=0:
#                                         
#                                        noEnter=0
#                                         
#                                        for temI, tempRTrade in tradeOriData.iterrows():
#                                            if (tempRTrade.year==temp[0]) and (tempRTrade.stateA==temp[1]) and (tempRTrade.stateB==temp[2]) and (tempRTrade.totalStateA==temp[3]) and (tempRTrade.totalStateB==temp[4]) and (tempRTrade.totalsmoth==temp[5]) and (tempRTrade.importance==temp[6]):
#                                                noEnter=1
#                                                break
#                                        if noEnter==0:
#                                             tradeOriData.loc[ite]=temp
#                                             ite=ite+1
#                                             smcountWarandTrade=smcountWarandTrade+1
#                                                 
#                                  
#                                    if tradeOriData.shape[0]==0:
#                                        tradeOriData.loc[ite]=temp
#                                        ite=ite+1
#                                        smcountWarandTrade=smcountWarandTrade+1
# #                                    tradeOriData=tradeOriData.append(pd.DataFrame(temp))
#           
#   
#  
#          
# #                                 if lastSomeYearMean>averTradeByYear:
# #                                if importance>0.1:
#                                if importance>0.1:
# #                                if importanceDIffbetAandB>0.000001:
#                                    temp = [rowSLR["year"], listCout[0], listCout[1], float(totalA),float(totalB),lastSomeYearMean,importance]
#                                     
#                                    if tradeOriData.shape[0]!=0:
#                                         
#                                        noEnter=0
#                                         
#                                        for temI, tempRTrade in tradeOriData.iterrows():
#                                            if (tempRTrade.year==temp[0]) and (tempRTrade.stateA==temp[1]) and (tempRTrade.stateB==temp[2]) and (tempRTrade.totalStateA==temp[3]) and (tempRTrade.totalStateB==temp[4]) and (tempRTrade.totalsmoth==temp[5]) and (tempRTrade.importance==temp[6]):
#                                                noEnter=1
#                                                break
#                                        if noEnter==0:
#                                             tradeOriData.loc[ite]=temp
#                                             ite=ite+1
#                                             bcountWarandTrade=bcountWarandTrade+1
#                                                 
#                                  
#                                    if tradeOriData.shape[0]==0:
#                                        tradeOriData.loc[ite]=temp
#                                        ite=ite+1
#                                        bcountWarandTrade=bcountWarandTrade+1
#  
#                                if importance>0.5:
# #                                if importance>0.5:
# #                                if importance>0.05:
# #                                if importance>0.05:
# #                                if importance>0.05:
#                                     
#                                    temp = [rowSLR["year"], listCout[0], listCout[1], float(totalA),float(totalB),lastSomeYearMean,importance]
#                                     
#                                    if tradeOriData.shape[0]!=0:
#                                         
#                                        noEnter=0
#                                         
#                                        for temI, tempRTrade in tradeOriData.iterrows():
#                                            if (tempRTrade.year==temp[0]) and (tempRTrade.stateA==temp[1]) and (tempRTrade.stateB==temp[2]) and (tempRTrade.totalStateA==temp[3]) and (tempRTrade.totalStateB==temp[4]) and (tempRTrade.totalsmoth==temp[5]) and (tempRTrade.importance==temp[6]):
#                                                noEnter=1
#                                                sbcountWarandTrade=sbcountWarandTrade+1
#                                                break
#                                        if noEnter==0:
# #                                             tradeOriData.loc[ite]=temp
# #                                             ite=ite+1
#                                             sbcountWarandTrade=sbcountWarandTrade+1
#                                                 
#                                  
#                                    if tradeOriData.shape[0]==0:
# #                                        tradeOriData.loc[ite]=temp
# #                                        ite=ite+1
#                                        sbcountWarandTrade=sbcountWarandTrade+1
#  
#                                      
#                                  
#  
#  
# fileName="tradeImportanceAndWars.csv"
# tradeOriData = tradeOriData.sort_values(['year'])
# tradeOriData.to_csv('{}'.format(fileName), sep=',',index=False)  
#  
# print(countWarandNoTrade)
#  
# print(smcountWarandTrade/ite)
# print(bcountWarandTrade/ite)
# print(sbcountWarandTrade/ite)










































#Aanalysis2 part
warData = pd.read_csv("directed_dyadic_war_lati_long_stateName_allYear.csv")
 
warCountry=warData.statea.tolist()
warCountry=warCountry+warData.stateb.tolist()
warCountry=set(warCountry)
warCountry.pop()
 
warYearList=set(list(warData.warstrtyr))
testY=warYearList.pop()
if (testY==0):
    testY=warYearList.pop()
      
tradeData = pd.read_csv("Dyadic_COW_4.0.csv")
tradeYearList=set(list(tradeData.year))
tradeAmountByEachCountry= pd.read_csv("National_COW_4.0.csv")
  
#Find the trade relationship which has trade
i = tradeData[(tradeData.flow2 == -9)].index
tradeData=tradeData.drop(i)
  
i = tradeData[(tradeData.flow1 == -9)].index
tradeData=tradeData.drop(i)
  
  
# i = tradeData[(tradeData.flow2 == 0) & (tradeData.flow1 == 0)].index
# tradeData=tradeData.drop(i)
  
# i = tradeData[(tradeData.flow2 == 0)].index
# tradeData=tradeData.drop(i)
  
i = tradeData[(tradeData.flow1 == 0)].index
tradeData=tradeData.drop(i)
  
  
i = tradeData[(tradeData.year > 2003)].index
tradeData=tradeData.drop(i)
  
  
tradeDataEX=tradeData
tradeCriteria=tradeDataEX.groupby("year")["smoothtotrade"].mean()
# tradeCriteriaList=len(list(tradeCriteria))
tradeYearList=set(list(tradeData.year))
tradeYearListY=tradeYearList.pop()
if (tradeYearListY==0):
    tradeYearListY=tradeYearList.pop()
# tradeCriteriaList=len(list(tradeCriteria))
tradeCriteriaList=list(tradeCriteria)
tradeCriteria=tradeDataEX.groupby("year")["flow2"].mean()
MEANTradeBy=list(tradeDataEX.groupby("year")["flow2"].mean())
  
# i = tradeData[(tradeData.flow2 == -9)].index
# tradeData=tradeData.drop(i)
countWarandNoTrade=0
  
total=0
smcountWarandTrade=0
bcountWarandTrade=0
sbcountWarandTrade=0
#  
# lastYear=-3
lastYear=1
countWarandTrade=0
#  
diffList=[]
#  
inter="smoothtotrade"
#  
newData= pd.DataFrame(columns=['year', 'stateA', 'stateB','totalStateA','totalStateB','totalsmoth','importanceFir','importanceSec','importance']);
# [rowSLR["year"], listCout[0], listCout[1], rowSLR["smoothtotrade"]]
#  
#  
ite=0
#  
# for i, row in warData.iterrows():
for i, row in tradeData.iterrows():    
    print(i)
    listCout=[row.ccode1, row.ccode2]
    listCout.sort()
#      
    tradeYear=row.year
#     if warStartYear >= tradeYearListY:#only check this cases.
#         tradeBeforeWar=tradeData.loc[tradeData['year'] <= warStartYear ]
#          
    ai = tradeData[(tradeData.flow1 == -9)].index
    tradeData=tradeData.drop(ai)
    ai = tradeData[(tradeData.flow2 == -9)].index
    tradeData=tradeData.drop(ai)
          
#  
    countryAInf=tradeAmountByEachCountry.loc[(tradeAmountByEachCountry['ccode']==listCout[0]) & (tradeAmountByEachCountry['year']==tradeYear)] 
    countryBInf=tradeAmountByEachCountry.loc[(tradeAmountByEachCountry['ccode']==listCout[1]) & (tradeAmountByEachCountry['year']==tradeYear)]        
                      
    totalA=countryAInf["imports"]+countryAInf["exports"]
    totalB=countryBInf["imports"]+countryBInf["exports"]
    totalAB=[float(totalA),float(totalB)]
#                     importance=lastSomeYearMean/min(totalAB)
#     row["smoothtotrade"]
    importance=row["smoothtotrade"]/max(totalAB)
      
    importanceFir=row["smoothtotrade"]/totalAB[0]
    importanceSec=row["smoothtotrade"]/totalAB[1]
#      
#      
#      
    temp=[tradeYear,listCout[0],listCout[1],float(totalA),float(totalB),row["smoothtotrade"],importanceFir,importanceSec,importance]
    newData.loc[ite]=temp
#      
    ite=ite+1
 
 
 
                      
  
fileName="interTestVer2.csv"
newData = newData.sort_values(['year'])
newData.to_csv('{}'.format(fileName), sep=',',index=False)                            




#TEST
# allTradeImfor=pd.read_csv("interTest.csv")
# 
# warData = pd.read_csv("directed_dyadic_war_lati_long_stateName_allYear.csv")
# warYearList=set(list(warData.warstrtyr))
# 
# for i, row in warData.iterrows():
#       
#     listCout=[row.statea, row.stateb]
#     listCout.sort()
#       
#     warStartYear=row.warstrtyr
#     if warStartYear>1870:
#         cand=allTradeImfor.loc[allTradeImfor['year']<=warStartYear]
#         cand=cand.loc[(cand['stateA']==row['statea'] ) | (cand['stateA']==row['stateb'])]
#         cand=cand.loc[(cand['stateB']==row['statea'] ) | (cand['stateB']==row['stateb'])]
#         if cand.shape[0]!=0:
#             print("here")





















#Aanalysis3 part
# warData = pd.read_csv("directed_dyadic_war_lati_long_stateName_allYear.csv")
#   
# warCountry=warData.statea.tolist()
# warCountry=warCountry+warData.stateb.tolist()
# warCountry=set(warCountry)
# warCountry.pop()
#   
# warYearList=set(list(warData.warstrtyr))
# testY=warYearList.pop()
# if (testY==0):
#     testY=warYearList.pop()
#        
# tradeData = pd.read_csv("Dyadic_COW_4.0.csv")
# tradeYearList=set(list(tradeData.year))
# tradeAmountByEachCountry= pd.read_csv("National_COW_4.0.csv")
#    
# #Find the trade relationship which has trade
# i = tradeData[(tradeData.flow2 == -9)].index
# tradeData=tradeData.drop(i)
#    
# i = tradeData[(tradeData.flow1 == -9)].index
# tradeData=tradeData.drop(i)
#    
#    
# # i = tradeData[(tradeData.flow2 == 0) & (tradeData.flow1 == 0)].index
# # tradeData=tradeData.drop(i)
#    
# i = tradeData[(tradeData.flow2 == 0)].index
# tradeData=tradeData.drop(i)
#    
# i = tradeData[(tradeData.flow1 == 0)].index
# tradeData=tradeData.drop(i)
#    
#    
# i = tradeData[(tradeData.year > 2003)].index
# tradeData=tradeData.drop(i)
#   
#   
# # i = tradeData[(tradeData.year < 1990)].index
# # tradeData=tradeData.drop(i)
#    
#    
# tradeDataEX=tradeData
# tradeCriteria=tradeDataEX.groupby("year")["smoothtotrade"].mean()
# # tradeCriteriaList=len(list(tradeCriteria))
# tradeYearList=set(list(tradeData.year))
# tradeYearListY=tradeYearList.pop()
# if (tradeYearListY==0):
#     tradeYearListY=tradeYearList.pop()
# # tradeCriteriaList=len(list(tradeCriteria))
# tradeCriteriaList=list(tradeCriteria)
# # tradeCriteria=tradeDataEX.groupby("year")["flow2"].mean()
# # MEANTradeBy=list(tradeDataEX.groupby("year")["flow2"].mean())
#    
# # i = tradeData[(tradeData.flow2 == -9)].index
# # tradeData=tradeData.drop(i)
# countWarandNoTrade=0
#    
# total=0
# smcountWarandTrade=0
# bcountWarandTrade=0
# sbcountWarandTrade=0
#    
# # lastYear=-3
# lastYear=1
# countWarandTrade=0
#    
# diffList=[]
#    
# inter="smoothtotrade"
#    
# newData= pd.DataFrame(columns=['year', 'stateA', 'stateB','totalStateA','totalStateB','totalsmoth','importanceFir','importanceSec','importance']);
# # [rowSLR["year"], listCout[0], listCout[1], rowSLR["smoothtotrade"]]
#    
#    
# ite=0
# lower=0 
# upper=0
#  
# warL=0
# warU=0
# # for i, row in warData.iterrows():
# for i, row in tradeData.iterrows():    
# #     print(i)
#     listCout=[row.ccode1, row.ccode2]
# #     listCout.sort()
#        
#     tradeYear=row.year
# #     if warStartYear >= tradeYearListY:#only check this cases.
# #         tradeBeforeWar=tradeData.loc[tradeData['year'] <= warStartYear ]
#            
#     ai = tradeData[(tradeData.flow1 == -9)].index
#     tradeData=tradeData.drop(ai)
#     ai = tradeData[(tradeData.flow2 == -9)].index
#     tradeData=tradeData.drop(ai)
#            
#    
#     countryAInf=tradeAmountByEachCountry.loc[(tradeAmountByEachCountry['ccode']==listCout[0]) & (tradeAmountByEachCountry['year']==tradeYear)] 
#     countryBInf=tradeAmountByEachCountry.loc[(tradeAmountByEachCountry['ccode']==listCout[1]) & (tradeAmountByEachCountry['year']==tradeYear)]        
#                        
#     totalA=countryAInf["imports"]+countryAInf["exports"]
#     totalB=countryBInf["imports"]+countryBInf["exports"]
#     totalAB=[float(totalA),float(totalB)]
# #                     importance=lastSomeYearMean/min(totalAB)
# #     row["smoothtotrade"]
#     importance=row["smoothtotrade"]/max(totalAB)
#        
#     importanceFir=row["smoothtotrade"]/totalAB[0]
#     importanceSec=row["smoothtotrade"]/totalAB[1]
#        
#        
#        
#     temp=[tradeYear,listCout[0],listCout[1],float(totalA),float(totalB),row["smoothtotrade"],importanceFir,importanceSec,importance]
#     newData.loc[ite]=temp
#       
#     if importance<0.1:
#         candiWar=warData.loc[warData['year']<=tradeYear]
#         candiWar=candiWar[(candiWar['statea']==listCout[0]) | (candiWar['statea']==listCout[1])]
#         candiWar=candiWar[(candiWar['stateb']==listCout[0]) | (candiWar['stateb']==listCout[1])]
#         lower=lower+1
#         if candiWar.shape[0]!=0:
#             warL=warL+1
#       
#     if importance>0.1:
#          
#         candiWar=warData.loc[warData['year']<=tradeYear]
#         candiWar=candiWar[(candiWar['statea']==listCout[0]) | (candiWar['statea']==listCout[1])]
#         candiWar=candiWar[(candiWar['stateb']==listCout[0]) | (candiWar['stateb']==listCout[1])]
#          
#         if candiWar.shape[0]!=0:
#             warU=warU+1
#         upper=upper+1
#         print(temp)
#           
#     if ite==2000:
#         print("Stop")
#            
#     ite=ite+1
#     print('\n')
#     print(ite)
#     print(lower)
#     print(upper)
# #     print(lower/ite)  
#   
#   
# print(lower/ite)                














#Processing data for scattor plot
# tradeOriData = pd.read_csv("Dyadic_COW_4.0_Processed.csv")
# warData=pd.read_csv("directed_dyadic_war_lati_long_stateNamecountbyyearAllVer3.csv")
# 
# newData= pd.DataFrame(columns=['year', 'countCouWars','SumTrade' , 'CountTradeRela' , 'numCountry']);
# for i, row in warData.iterrows(): 
#     sel=tradeOriData.loc[tradeOriData["year"]==row["year"]]
#     
#     if sel.shape[0]==0:
#         temp=[row['year'], row['countCouWars'], 0,0,0]
#         newData.loc[i]=temp
#         
#     if sel.shape[0]!=0:
#         temp=[row['year'], row['countCouWars'], sel['SumTrade'].get_values()[0], sel['CountTradeRela'].get_values()[0], sel['numCountry'].get_values()[0]]
#         newData.loc[i]=temp
#             
#             
#     if row["year"]==1870:
#         print("here")
#         
#         
#         
# print("temp")
# fileName="WarAndTrade.csv"
# # newData = newData.sort_values(['year'])
# newData.to_csv('{}'.format(fileName), sep=',',index=False)







# The number of export places by Year
# tradeOriData = pd.read_csv("Dyadic_COW_4.0_ForRelationCountingVer2.csv")
# a=list(tradeOriData.groupby(['year', 'ccode1']))
# b=tradeOriData.groupby(['year', 'ccode1']).count()
# df1 = pd.DataFrame(columns=['year','ccode1','countexport'])
# df2 = pd.DataFrame(columns=['year','ccode1','countexport','exportcountr'])
# # t=list(tradeOriData.groupby("year")["contient"])
# # allConList=[]
# for i in range(len(a)):
#     year=list(tradeOriData.groupby(['year', 'ccode1']))[i][0]
# #     print(year)
#     sec=list(tradeOriData.groupby(['year', 'ccode1']))[i][1]
# #     print(sec)
# 
#     temp1=[year[0],year[1], len(sec)]
#     df1.loc[i]=temp1
#     
#     temp2=[year[0],year[1], len(sec),list(sec['ccode2'].values)]
#     df2.loc[i]=temp2
# print("Hello")
# 
# fileName1='TheNumberOfExportedCountrByYear1.csv'
# df1.to_csv('{}.csv'.format(fileName1), sep=',',index=False)  
# 
# fileName2='TheNumberOfExportedCountrByYear2.csv'
# df2.to_csv('{}.csv'.format(fileName2), sep=',',index=False)  







# Accumulation on #war and amount of trade using interval
tradeOriData = pd.read_csv("WarAndTrade_From1870.csv")
# a=list(tradeOriData.groupby(['year', 'ccode1']))
# b=tradeOriData.groupby(['year', 'ccode1']).count()
df1 = pd.DataFrame(columns=['yperiod','totalcountCouWars' ,'totalSumTrade'] )
# df2 = pd.DataFrame(columns=['year','ccode1','countexport','exportcountr'])
# # t=list(tradeOriData.groupby("year")["contient"])
# # allConList=[]
year=[]
countCouWars=[]
SumTrade=[]
numCountry=[]

ilo=0
for i,row in tradeOriData.iterrows():
#     print(row)
    year.append(row['year'])
    countCouWars.append(row['countCouWars'])
    SumTrade.append(row['SumTrade'])
#     SumTrade.append(row['numCountry'])
#     if (i>0) and (i%13==0) and (i!=130):
    if (i>0) and (i%5==0) and (i<130):
        perioid=[year[0], year[len(year)-1]]
#         sum(countCouWars)
#         sum(SumTrade)
        temp=[perioid,sum(countCouWars),sum(SumTrade)]
        df1.loc[ilo]=temp
        ilo=ilo+1
        year=[]
        countCouWars=[]
        SumTrade=[]
    if (i>=133):
        perioid=[year[0], year[len(year)-1]]
#         sum(countCouWars)
#         sum(SumTrade)
        temp=[perioid,sum(countCouWars),sum(SumTrade)]
        df1.loc[ilo]=temp
        ilo=ilo+1
        year=[]
        countCouWars=[]
        SumTrade=[]
        
fileName1='WarAndTrade_From1870Inter5Year.csv'
df1.to_csv('{}.csv'.format(fileName1), sep=',',index=False)  

        
