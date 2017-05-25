var fs = require('fs');
fs.readFile('file.txt', function(err, data) {
    if(err) throw err;
    var array = data.toString().split("\n");
    var userSongArr = [];
    var userFollowerArr = [];
    var nUser = parseInt(array[0]);
    var givenUserId = 0;
    var givenSongId = 0;
    for(var i=1; i < array.length; i=i+2) {
      if(i < 2*nUser+1){
        userSongArr.push({userId: array[i].split(" ")[0], nSongs: array[i].split(" ")[1], songlist: array[i+1]} );
      }
      if(i >= 2*nUser+1 && i < 4*nUser+1) {
        userFollowerArr.push({userId: array[i], followerList: array[i+1]});
      }
      if(i === 4*nUser+1) {
        givenUserId = array[i].split(" ")[0];
        givenSongId = array[i].split(" ")[1];
      }
    }
    getNetworkUserIds(userSongArr, userFollowerArr, givenUserId, givenSongId);
});

function getNetworkUserIds(songArr, followArr, userId, songId) {
  for (var j=0; j<followArr.length; j++){
    if(followArr[j].userId == userId) {
      // console.log(j);
      for (var k=0; k<followArr[j].followerList.length; k++) {
          console.log(j);
          getNetworkUserIds(songArr, followArr, followArr[j].followerList[k], songId);

      }

    }
  }
}