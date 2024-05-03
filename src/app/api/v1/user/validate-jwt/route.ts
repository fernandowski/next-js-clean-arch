import routeHandler from "@/main/routes/route-handler";
import {validateUserJWT} from "@/main/factories/compose";
import {NextRequest} from "next/server";
import {UserVerifyJWTController} from "@/infrastructure/web/controllers/user/UserVerifyJWTController";

export async function POST(req: NextRequest) {
    return routeHandler(new UserVerifyJWTController(validateUserJWT))(req);
}

export async function GET(req: NextRequest) {
    return routeHandler(new UserVerifyJWTController(validateUserJWT))(req);
}
