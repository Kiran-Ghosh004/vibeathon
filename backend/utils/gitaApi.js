import axios from 'axios';
import NodeCache from 'node-cache';
const base="https://vedicscriptures.github.io/";
const cache=new NodeCache({stdTTL:3600});
export const getChaps=async()=>{
    const cached=cache.get("chapters");
    if(cached) return cached;
    const res=await axios.get(`${base}/chapters`);
    cache.set("chapters",res.data);
    return res.data;
}
export const getChap=async(ch)=>{
    const key=`chapter_${ch}`;
    const cached=cache.get(key);
    if(cached) return cached;
    const res=await axios.get(`${base}/chapter/${ch}`);
    cache.set(key,res.data);
    return res.data;
}
export const getShlok=async(ch,sl)=>{
    const key=`shlok_${ch}_${sl}`
    const cached=cache.get(key);
    if(cached) return cached;
    const res=await axios.get(`${base}/slok/${ch}/${sl}`);
    cache.set(key,res.data);
    return res.data;
}