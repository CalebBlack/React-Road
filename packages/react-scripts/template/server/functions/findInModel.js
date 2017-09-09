module.exports = function(model,query){
  return new Promise((resolve,reject)=>{
    model.find(query).then(data=>{
      if (data[0]) {
        resolve(data[0]);
      } else {
        reject('entry not found');
      }
    }).catch(err=>{
      reject(err);
    });
  });
}
