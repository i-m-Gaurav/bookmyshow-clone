import { NextRequest, NextResponse } from "next/server";
import {prisma} from '@/lib/prisma';

export async function GET(req:NextRequest){
    
    const email = req.nextUrl.searchParams.get('email');

    const user = await prisma.user.findUnique({
        where : {
            email,
        }
    });

    return NextResponse.json(user, {status: 200});

}