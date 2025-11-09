import {
    getChaps,
    getChap
} from "../utils/gitaApi.js";

export const fetchChaps=async(req,res)=>{
    try{
        const data=await getChaps();
        res.json(data);
    }catch(err){
        res.status(500).json({message:"error fetching chapters"});
    }
}
export const fetchOneChap=async(req,res)=>{
    try{
        const chapId=req.params.id;
        const data=await getChap(chapId);
        res.json(data);
    }catch{
        res.status(500).json({message:"error fetching chapter"});
    }
}