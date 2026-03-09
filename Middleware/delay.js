export const delay = (req, res , next)=>{
    if(req.headers.authorization){
        const token = req.headers.authorization.split(' ')[1];
        console.log("check token: ",token)
    }
    setTimeout(() => {
        next();
    }, 3000);
}