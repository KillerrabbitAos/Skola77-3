import { GET as getHandler } from './get';
import { PATCH as patchHandler } from './patch';
import { POST as postHandler } from './post';
import { DELETE as deleteHandler } from './delete';
import { PUT as putHandler } from './put';

export async function GET(req: Request) {
    return getHandler(req);
}

export async function POST(req: Request) {
    return postHandler(req);
}

export async function PATCH(){
    return patchHandler()
}

export async function DELETE(req: Request){
    return deleteHandler(req)
}

export async function PUT(req: Request){
    return putHandler(req)
}