import { NextResponse } from "next/server";
import { isAdmin } from "@/lib/auth";
import { adminDb } from "@/lib/supabase";
import crypto from "crypto";
export const runtime="nodejs";
export const maxDuration=60;
const MAX=100*1024*1024;
export async function POST(req){
 if(!(await isAdmin()))return NextResponse.json({error:"Unauthorized"},{status:401});
 try{
  const fd=await req.formData();const file=fd.get("file");const kind=fd.get("kind");
  if(!file || typeof file.arrayBuffer!=="function")return NextResponse.json({error:"Choose a file first."},{status:400});
  if(file.size>MAX)return NextResponse.json({error:"File is larger than 100 MB."},{status:413});
  const allowedImage=/^image\/(jpeg|png|webp|gif|avif)$/i;
  const allowedMedia=/^(video\/(mp4|webm|quicktime)|application\/pdf|application\/zip|application\/vnd\.android\.package-archive|application\/msword|application\/vnd\.openxmlformats-officedocument\..+)$/i;
  if(kind==="cover"&&!allowedImage.test(file.type))return NextResponse.json({error:"Cover must be JPG, PNG, WebP, GIF or AVIF."},{status:400});
  if(kind!=="cover"&&!allowedMedia.test(file.type))return NextResponse.json({error:"Allowed attachments: MP4/WebM video, PDF, ZIP, APK and Office documents."},{status:400});
  const db=adminDb();const bucket="media";const {data:bucketData}=await db.storage.getBucket(bucket);
  if(!bucketData){const {error}=await db.storage.createBucket(bucket,{public:true,fileSizeLimit:MAX});if(error && !String(error.message).toLowerCase().includes("already"))throw error;}
  const ext=(file.name.split(".").pop()||"bin").toLowerCase().replace(/[^a-z0-9]/g,"");
  const path=`${kind}/${Date.now()}-${crypto.randomBytes(5).toString("hex")}.${ext}`;
  const {error}=await db.storage.from(bucket).upload(path,Buffer.from(await file.arrayBuffer()),{contentType:file.type,upsert:false});
  if(error)throw error;
  const {data}=db.storage.from(bucket).getPublicUrl(path);
  return NextResponse.json({url:data.publicUrl,type:file.type.startsWith("video/")?"video":"file"});
 }catch(e){return NextResponse.json({error:e.message||"Upload failed."},{status:500});}
}
