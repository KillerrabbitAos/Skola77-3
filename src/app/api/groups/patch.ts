import {NextApiRequest, NextApiResponse} from "next";

export async function PATCH(req: NextApiRequest, res: NextApiResponse) {
    return res.status(501).json({error: 'Not implemented'});
}