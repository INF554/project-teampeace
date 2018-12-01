library(sp)
library(rworldmap)
library(dplyr)

# The single argument to this function, points, is a data.frame in which:
#   - column 1 contains the longitude in degrees
#   - column 2 contains the latitude in degrees
coords2continent = function(points)
{  
  countriesSP <- getMap(resolution='low')
  #countriesSP <- getMap(resolution='high') #you could use high res map from rworldxtra if you were concerned about detail
  
  # converting points to a SpatialPoints object
  # setting CRS directly to that from rworldmap
  pointsSP = SpatialPoints(points, proj4string=CRS(proj4string(countriesSP)))  
  
  
  # use 'over' to get indices of the Polygons object containing each point 
  indices = over(pointsSP, countriesSP)
  
  #indices$continent   # returns the continent (6 continent model)
  indices$REGION   # returns the continent (7 continent model)
  #indices$ADMIN  #returns country name
  #indices$ISO3 # returns the ISO3 code 
}

setwd("C:/Users/User/Documents/File/Coursework & Research/USC/5.USC(Fall 2018)/INF 554 Information Visualization/HW/Development(Project)")

# pointsTest = data.frame(lon=c(0, 90, -45, -100, 130), lat=c(52, 40, -10, 45, -30 ))

MyData <- read.csv(file="MIDLOCA_2.0.csv", header=TRUE, sep=",")
lons=c(MyData['midloc2_xlongitude'])
lats=c(MyData['midloc2_ylatitude'])
points=data.frame(lon=lons,lat=lats)

allContiInfor=c()

for (i in 1:nrow(points)){
  if (is.na(points[i,1])==FALSE)
  {
    # Levels: Africa Antarctica Asia Australia Europe North America South America
    # 0-7
    
    decisionContinent=coords2continent(points[i,])
    allContiInfor=c(allContiInfor,decisionContinent)
  }
  if (is.na(points[i,1])==TRUE)
  {
    allContiInfor=c(allContiInfor,0)
  }
}

write.csv(allContiInfor, "allContiInfor.csv", row.names=FALSE)
max(allContiInfor,na.rm=TRUE)
colname(allContiInfor)<-c(continent)
testData<-MyData

unit(testData,allContiInfor)  
transform(testData, newcol=paste(year, customerID, sep="_"))

merged<-merge(testData, allContiInfor)
testData['y']

# decisionContinent=coords2continent(points)

# coords2country(points)



