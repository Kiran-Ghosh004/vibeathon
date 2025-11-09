import { getShlok } from "../utils/gitaApi.js";
export const fetchShlok =async(req,res)=>{
    try{
        const{ch,sl}=req.params;
        const data=await getShlok(ch,sl);
        res.json(data);
    }catch{
        res.status(500).json({message:"Error fetching"});
    }
}