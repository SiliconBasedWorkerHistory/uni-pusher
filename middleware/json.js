const jsonResponse = (_,res,next)=>{
    res.json200 = (data=[],msg="OK")=>{
        res.json({
            data,msg,code:200
        });
    }
    res.json400 = (data = [])=>{
        res.status(400).json({
            data,msg:"Bad Request",code:400
        });
    }
    res.json401 = (data = [])=>{
        res.status(401).json({
            data,msg:"Unauthed",code:401
        });
    }
    res.json403 = (data = [])=>{
        res.status(403).json({
            data,msg:"Unauthed",code:403
        });
    }
    res.json404 = (data = [])=>{
        res.status(404).json({
            data,msg:"Not Found",code:404
        });
    }
    res.json500 = (data = [])=>{
        res.status(500).json({
            data,msg:"Internal Server Error",code:500
        });
    }
    next();
}

module.exports = {
    jsonResponse
}