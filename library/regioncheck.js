module.exports = {
  check:function(data,region){
    if(data.regionRestriction!=null){
      if(data.regionRestriction.allowed!=null){
        if(data.regionRestriction.allowed.includes(region)){
          return true;
        }else{
          return false;
        }
      }else if(data.regionRestriction.blocked!=null){
         if(data.regionRestriction.blocked.includes(region)){
          return false;
        }else{
          return true;
        }
      }
    }else{
      return true;
    }
  }
}